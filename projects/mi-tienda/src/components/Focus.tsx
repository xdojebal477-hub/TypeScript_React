import { useEffect, useRef } from "react";

const FocusInput = () => {
  const inputRef = useRef<HTMLInputElement>(null);

  // useRef para guardar un valor sin causar re-render
  const renderCount = useRef(0);

  // useState para un valor que SÍ causa re-render
  const [text, setText] = useState("");

  // useEffect: se ejecuta en cada render porque [text] cambia
  useEffect(() => {
    renderCount.current += 1; // actualizar ref NO re-renderiza
  });

  // useEffect: solo al montar ([] vacío)
  useEffect(() => {
    inputRef.current?.focus(); // enfoca el input automáticamente
  }, []);
  return (
    <div className="card">
      <label style={{ display: "block", marginBottom: "10px" }}>
        Nombre del Usuario (Auto-focus):
      </label>
      <input
        ref={inputRef}
        type="text"
        placeholder="Escribe aquí..."
        style={{ padding: "8px", width: "100%", boxSizing: "border-box" }}
      />
    </div>
  );
};

export default FocusInput;
