import { useState } from "react";
import { imageToText } from "../utils/imageToText";
import { convertToImage, getPdfFromBuffer } from "../utils/pdf";
import { useDropzone } from "react-dropzone";
import { ClipboardCopy } from "./ClipboardCopy";
import { LoaderCircle } from "lucide-react";

export const PdfReader: React.FC = () => {
  const [text, setText] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const { getRootProps, getInputProps } = useDropzone({
    accept: {
      "application/pdf": [".pdf"],
    },
    onDropAccepted: (files) => {
      handleFileChange(files[0]);
    },
    maxFiles: 1,
    maxSize: 25000000, // 25MB
  });

  const handleFileRead = async (e: ProgressEvent<FileReader>) => {
    const content = e.target?.result;
    if (content instanceof ArrayBuffer) {
      const pdf = await getPdfFromBuffer(content);
      const images = await convertToImage(pdf);
      const text = await imageToText(images);
      setText(text);
    }
    setLoading(false);
  };

  const handleFileChange = (file: File) => {
    setLoading(true);
    setText("");
    const fileReader = new FileReader();
    fileReader.onloadend = handleFileRead;
    fileReader.readAsArrayBuffer(file);
  };

  return (
    <>
      <div
        {...getRootProps({
          className:
            "rounded-lg border border-solid border-gray-300 bg-white hover:brightness-95 bg-clip-border w-[600px] p-12 cursor-pointer mx-auto my-4",
        })}
      >
        <label>
          <p className="cursor-pointer">
            Drag 'n' drop your pdf here, or click to select a file
          </p>
          <input {...getInputProps()} />
        </label>
      </div>
      {loading && (
        <div className="flex flex-col items-center">
          <LoaderCircle size={32} className="animate-spin text-gray-500 ml-2" />
          <p className="text-center">Reading your file...</p>
        </div>
      )}
      {text && (
        <div className="text-left border border-black rounded-md relative h-[60vh]">
          <ClipboardCopy textToCopy={text} />
          <div className="overflow-auto h-full py-4 px-8">
            <pre>{text}</pre>
          </div>
        </div>
      )}
    </>
  );
};
