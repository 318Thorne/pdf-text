import { Worker, createWorker } from "tesseract.js";

export const convertImagesToText = async (
  images: string[]
): Promise<string> => {
  const worker = await createWorker("eng");
  const imageToText = buildImageToTextConverter(worker);
  const text = imageToText(images);
  await worker.terminate();
  return text;
};

export const buildImageToTextConverter =
  (worker: Worker) =>
  async (images: string[]): Promise<string> => {
    const pdfText = [];
    for (const image of images) {
      const {
        data: { text },
      } = await worker.recognize(image);
      pdfText.push(text);
    }

    return pdfText.join("\n");
  };
