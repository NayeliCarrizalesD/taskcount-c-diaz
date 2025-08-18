// InputCorreoUsuarioModal.tsx
export function InputCorreoUsuarioModal({ value, onChange }: { value: string, onChange: (val: string) => void }) {
  return (
    <input
      id="correo-empleado"
      className="swal2-input"
      type="email"
      placeholder="Correo empleado"
      value={value}
      onChange={e => onChange(e.target.value)}
    />
  );
}