import { useState } from "react";

export function InputCorreoUsuarioModal({ onChange }: { onChange: (correo: string) => void }) {
  const [correo, setCorreo] = useState("");
  return (
    <input
      id="correo-empleado"
      className="swal2-input"
      type="email"
      placeholder="Correo empleado"
      value={correo}
      onChange={e => {
        setCorreo(e.target.value);
        onChange(e.target.value);
      }}
    />
  );
}