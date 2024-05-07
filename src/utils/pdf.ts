import * as pdfjs from "pdfjs-dist";
import { PDFDocumentProxy } from "pdfjs-dist/types/src/display/api";
// todo add to dist
pdfjs.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/4.2.67/pdf.worker.min.mjs`;

export const getPdfFromBuffer = async (buffer: ArrayBuffer) =>
  await pdfjs.getDocument({ data: buffer }).promise;

export const convertToImage = async (pdf: PDFDocumentProxy) => {
  const container = document.createElement("div");

  const images = Array.from({ length: pdf.numPages }, async (_, i) => {
    const page = await pdf.getPage(i + 1);
    const viewport = page.getViewport({ scale: 1.5 });
    const canvas = document.createElement("canvas");
    canvas.height = viewport.height;
    canvas.width = viewport.width;
    container.appendChild(canvas);
    await page.render({
      canvasContext: canvas.getContext("2d")!,
      viewport: viewport,
    }).promise;
    return canvas.toDataURL("image/png");
  });

  return Promise.all(images);
};
