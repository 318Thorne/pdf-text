import { CopyCheck, Copy } from "lucide-react";
import { useEffect, useState } from "react";

interface ClipboardCopyProps {
  textToCopy: string;
}

export const ClipboardCopy: React.FC<ClipboardCopyProps> = ({ textToCopy }) => {
  const [copied, setCopied] = useState<boolean>(false);

  const handleCopyClicked = () => {
    navigator.clipboard.writeText(textToCopy).then(() => {
      setCopied(true);
    });
  };

  useEffect(() => {
    if (copied) {
      const timeout = setTimeout(() => {
        setCopied(false);
      }, 2000);
      return () => clearTimeout(timeout);
    }
  }, [copied]);

  return (
    <div className="absolute top-2 right-2">
      {copied ? (
        <span className="flex gap-2">
          copied!
          <CopyCheck />
        </span>
      ) : (
        <span
          className="cursor-pointer"
          role="button"
          onClick={handleCopyClicked}
        >
          <Copy />
        </span>
      )}
    </div>
  );
};
