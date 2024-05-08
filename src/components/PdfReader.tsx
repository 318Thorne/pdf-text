import { useState } from "react";
import { imageToText } from "../utils/imageToText";
import { convertToImage, getPdfFromBuffer } from "../utils/pdf";
import { useDropzone, ErrorCode } from "react-dropzone";
import { Dropzone } from "./Dropzone";
import { Loader } from "./Loader";
import { TextBlock } from "./TextBlock";

const MAX_FILE_SIZE_IN_MB = 25;

const ERRORS: Record<string, string> = {
  [ErrorCode.FileInvalidType]: "Your file must be a PDF.",
  [ErrorCode.FileTooLarge]: `Your file must not exceed ${MAX_FILE_SIZE_IN_MB}MB.`,
  [ErrorCode.TooManyFiles]: "You can only upload one file at a time.",
};

export const PdfReader: React.FC = () => {
  const [text, setText] = useState<string | undefined>(undefined);
  const [loading, setLoading] = useState<boolean>(false);

  const hasProcessed = !loading && text !== undefined;

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

  const handleFileRead = async (e: ProgressEvent<FileReader>) => {
    try {
      const content = e.target?.result;
      if (content instanceof ArrayBuffer) {
        const pdf = await getPdfFromBuffer(content);
        const images = await convertToImage(pdf);
        const text = await imageToText(images);
        setText(text);
      }
    } catch (error) {
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
    }
  };

  return (
    <>
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
