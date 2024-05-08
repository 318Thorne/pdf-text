import { useState } from "react";
import {
  buildImageToTextConverter,
  convertToImage,
  getPdfFromBuffer,
} from "@/utils";
import { useDropzone, ErrorCode } from "react-dropzone";
import { Dropzone } from "./Dropzone";
import { Loader } from "./Loader";
import { TextBlock } from "./TextBlock";
import { AcceptedLanguage, useTextExtract } from "@/hooks";
import { LangugeSelect } from "./LanguageSelect";

const MAX_FILE_SIZE_IN_MB = 25;

const ERRORS: Record<string, string> = {
  [ErrorCode.FileInvalidType]: "Your file must be a PDF.",
  [ErrorCode.FileTooLarge]: `Your file must not exceed ${MAX_FILE_SIZE_IN_MB}MB.`,
  [ErrorCode.TooManyFiles]: "You can only upload one file at a time.",
};

export const PdfReader: React.FC = () => {
  const [language, setLanguage] = useState<AcceptedLanguage>("eng");
  const [text, setText] = useState<string | undefined>(undefined);
  const [loading, setLoading] = useState<boolean>(false);
  const { worker } = useTextExtract(language);
  const dropzoneProps = useDropzone({
    accept: {
      "application/pdf": [".pdf"],
    },
    onDropAccepted: (files) => {
      handleFileChange(files[0]);
    },
    maxFiles: 1,
    maxSize: MAX_FILE_SIZE_IN_MB * 1000000, // multiply by 1,000,000 to convert MB to bytes
  });

  const convertImagesToText = worker
    ? buildImageToTextConverter(worker)
    : undefined;

  const hasProcessed = !loading && text !== undefined;

  const handleFileRead = async (e: ProgressEvent<FileReader>) => {
    try {
      const content = e.target?.result;
      if (content instanceof ArrayBuffer && convertImagesToText) {
        const pdf = await getPdfFromBuffer(content);
        const images = await convertToImage(pdf);
        const text = await convertImagesToText(images);
        setText(text);
      }
    } catch (error) {
      // ideally some proper logging and error handling would be done here
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleFileChange = (file: File) => {
    setLoading(true);
    setText("");
    try {
      const fileReader = new FileReader();
      fileReader.onloadend = handleFileRead;
      fileReader.readAsArrayBuffer(file);
    } catch (error) {
      setLoading(false);
      console.error(error);
    }
  };

  return (
    <>
      <LangugeSelect onValueChange={setLanguage} />
      <Dropzone {...dropzoneProps} customErrors={ERRORS} />
      <Loader loading={loading} message="Reading your file..." />
      {hasProcessed &&
        (text ? (
          <TextBlock text={text} />
        ) : (
          <p>Sorry! could not extract any text from your pdf.</p>
        ))}
    </>
  );
};
