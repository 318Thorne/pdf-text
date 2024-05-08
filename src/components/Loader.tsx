import { LoaderCircle } from "lucide-react";

interface LoaderProps {
  loading: boolean;
  message?: string;
}

export const Loader: React.FC<LoaderProps> = ({
  loading,
  message = "loading",
}) => {
  return loading ? (
    <div className="flex flex-col items-center">
      <LoaderCircle size={32} className="animate-spin text-gray-500 ml-2" />
      <p className="text-center">{message}</p>
    </div>
  ) : null;
};
