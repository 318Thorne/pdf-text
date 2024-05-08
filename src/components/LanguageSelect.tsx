import { AcceptedLanguage } from "@/hooks/useTextExtract";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "./ui/select";

interface LangugeSelectProps {
  onValueChange: (value: AcceptedLanguage) => void;
}

export const LangugeSelect: React.FC<LangugeSelectProps> = ({
  onValueChange,
}) => {
  return (
    <div className="w-1/4 flex justify-center m-auto pt-4 pb-2">
      <Select onValueChange={onValueChange} defaultValue="eng">
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Select a language" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="eng">English</SelectItem>
          <SelectItem value="deu">German</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
};
