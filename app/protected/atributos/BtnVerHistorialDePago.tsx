

import Link from "next/link";

type Cliente = {
  id_cliente?: number;
  nombre_cliente: string;
  telefono_cliente: string;
  correo_cliente: string;
  rfc: string;
};


export function BtnVerHistorialDePago({ cliente }: { cliente: Cliente }) {
  return (
    <Link href={`/protected/catalogo_clientes/${cliente.id_cliente}/historial`}>
      <button
        className="px-4 py-2.5 rounded-xl font-bold bg-[#008fcb] hover:bg-[#007cb0] text-white transition-colors duration-150 text-sm cursor-pointer shadow-lg shadow-[#008fcb]/10 mb-2 me-2"
      >
        Ver Historial de Pago
      </button>
    </Link>
  );
}