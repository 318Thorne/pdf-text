import { useState } from "react";
import { imageToText } from "../utils/imageToText";
import { convertToImage, getPdfFromBuffer } from "../utils/pdf";

export const PdfReader: React.FC = () => {
  const [text, setText] = useState<string>("");

  const handleFileRead = async (e: ProgressEvent<FileReader>) => {
    const content = e.target?.result;
    if (content instanceof ArrayBuffer) {
      const pdf = await getPdfFromBuffer(content);
      const images = await convertToImage(pdf);
      const text = await imageToText(images);
      setText(text);
    }
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const file = event.target.files[0];
      const fileReader = new FileReader();
      fileReader.onloadend = handleFileRead;
      fileReader.readAsArrayBuffer(file);
    }
  };

  return (
    <>
      <label>
        Select a file:
        <input type="file" id="fileInput" onChange={handleFileChange} />
      </label>
      {text && (
        <div>
          <p>{text}</p>
        </div>
      )}
    </>
  );
};
