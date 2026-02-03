import { useState } from "react";


type AlertProps = {
  message: string;
  type: "info" | "warning" | "error";
  showIcon?: boolean;
};

const Alert = ({ message, type, showIcon = true }: AlertProps) => {
  // Construcción dinámica de la clase: "alert alert-error"
  const [isVisible, setIsVisible] = useState(true);

  const cssClass = `alert alert-${type}`;
  
  if(!isVisible) return null;
  return (
    <div className={cssClass}>
      <div>
        {showIcon && <span className="mr-2">
          {type === 'error' ? '🚨' : type === 'warning' ? '⚠️' : 'ℹ️'}
        </span>}
        <strong>{message}</strong>
      </div>

      <button className="btn btn-close" onClick={() => setIsVisible(false)}>
        ✖
      </button>
    </div>
  );
};
export default Alert;
