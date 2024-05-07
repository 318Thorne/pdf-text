import { createWorker } from "tesseract.js";

export const imageToText = async (images: string[]): Promise<string> => {
  const worker = await createWorker("eng");
  const pdfText = [];
  for (const image of images) {
    const {
      data: { text },
    } = await worker.recognize(image);
    pdfText.push(text);
  }

  await worker.terminate();
  return pdfText.join("\n");
};
