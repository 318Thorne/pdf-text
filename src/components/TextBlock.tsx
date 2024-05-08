import { ClipboardCopy } from "./ClipboardCopy";

interface TextBlockProps {
  text?: string;
}
export const TextBlock: React.FC<TextBlockProps> = ({ text }) =>
  text && (
    <div className="text-left border border-black rounded-md relative h-[60vh]">
      <ClipboardCopy textToCopy={text} />
      <div className="overflow-auto h-full py-4 px-8">
        <pre>{text}</pre>
      </div>
    </div>
  );
