

type Cliente = {
  nombre_cliente: string;
  telefono_cliente: string;
  correo_cliente: string;
  rfc: string;
};


export function BtnVerHistorialDePago({ cliente }: { cliente: Cliente }) {
  const handleClick = () => {
    console.log('Ver historial de pago para el cliente:', cliente);
  };

  return (
    <button onClick={handleClick}
      className="relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-full group bg-gradient-to-br from-lime-500 to-yellow-400 group-hover:from-lime-500 group-hover:to-yellow-400 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-yellow-200 dark:focus:ring-lime-800"
    >
      <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-full group-hover:bg-transparent group-hover:dark:bg-transparent">
        Ver Historial de Pago
      </span>
    </button>
  );
}