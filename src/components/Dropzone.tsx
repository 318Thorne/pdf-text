import cn from "classnames";
import { DropzoneState } from "react-dropzone";

interface ReactDropzoneProps extends DropzoneState {
  customErrors?: Record<string, string>;
}

export const Dropzone: React.FC<ReactDropzoneProps> = ({
  getRootProps,
  getInputProps,
  fileRejections,
  customErrors,
}) => {
  const isError = fileRejections.length > 0;
  const firstError = fileRejections[0]?.errors[0];
  const firstErrorMessage =
    customErrors?.[firstError?.code] || firstError?.message;
  return (
    <>
      <div
        {...getRootProps({
          className: cn(
            "rounded-lg border border-solid border-gray-300 bg-white hover:brightness-95 bg-clip-border w-[600px] p-12 cursor-pointer mx-auto my-4",
            { "border-red-500": isError }
          ),
        })}
      >
        <label>
          <p className="cursor-pointer">
            Drag 'n' drop your pdf here, or click to select a file
          </p>
          <input {...getInputProps()} />
        </label>
      </div>
      {firstErrorMessage && <p className="text-red-500">{firstErrorMessage}</p>}
    </>
  );
};
