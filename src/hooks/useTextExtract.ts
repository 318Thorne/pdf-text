import { useEffect, useState } from "react";
import { createWorker, Worker } from "tesseract.js";

export type AcceptedLanguage = "eng" | "deu";

export const useTextExtract = (lang: AcceptedLanguage) => {
  const [worker, setWorker] = useState<Worker | null>(null);

  useEffect(() => {
    if (lang) {
      loadWorker();
    }

    return () => {
      worker?.terminate();
    };

    async function loadWorker() {
      await worker?.terminate();
      const newWorker = await createWorker(lang);
      setWorker(newWorker);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lang]);

  return { worker };
};
