type AlertProps = {
  message: string;
  type: "info" | "warning" | "error";
  showIcon?: boolean;
};

const Alert = ({ message, type, showIcon = true }: AlertProps) => {
  // Construcción dinámica de la clase: "alert alert-error"
  const cssClass = `alert alert-${type}`;

  return (
    <div className={cssClass}>
      {showIcon && (
        <span>
          {type === "error" ? "🚨" : type === "warning" ? "⚠️" : "ℹ️"}
        </span>
      )}

      <strong>{message}</strong>
    </div>
  );
};
export default Alert;
