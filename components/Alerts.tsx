import { AiFillInfoCircle, AiFillWarning } from "react-icons/ai";
import { IoIosAlert } from "react-icons/io";
import { FaCheckCircle } from "react-icons/fa";

type AlertType = "info" | "error" | "warning" | "success";

type AlertProps = {
  message: string;
  type: AlertType;
};

export default function Alert({ message, type }: AlertProps) {
  const icon = getIcon(type);

  if (type === "error") {
    return (
      <div className="flex items-center gap-x-3 rounded-md border border-error-70 bg-error-20 p-3 text-error-70">
        <span className="text-xl">{icon}</span>
        <p className="font-medium">{message}</p>
      </div>
    );
  }

  if (type === "info") {
    return (
      <div className="flex items-center gap-x-3 rounded-md border border-info-70 bg-info-20 p-3 text-info-70">
        <span className="text-xl">{icon}</span>
        <p className="font-medium">{message}</p>
      </div>
    );
  }

  if (type === "warning") {
    return (
      <div className="flex items-center gap-x-3 rounded-md border border-warning-70 bg-warning-20 p-3 text-warning-70">
        <span className="text-xl">{icon}</span>
        <p className="font-medium">{message}</p>
      </div>
    );
  }

  if (type === "success") {
    return (
      <div className="flex items-center gap-x-3 rounded-md border border-success-70 bg-success-20 p-3 text-success-70">
        <span className="text-xl">{icon}</span>
        <p className="font-medium">{message}</p>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-x-3 rounded-md border border-primary-70 bg-primary-20 p-3 text-primary-70">
      <p className="font-medium">{message}</p>
    </div>
  );
}

function getIcon(type: AlertType) {
  switch (type) {
    case "info":
      return <AiFillInfoCircle />;
    case "error":
      return <IoIosAlert />;
    case "warning":
      return <AiFillWarning />;
    case "success":
      return <FaCheckCircle />;
  }
}
