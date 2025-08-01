import Swal from "sweetalert2";

type Cliente = {
  nombre_cliente: string;
  telefono_cliente: string;
  correo_cliente: string;
  rfc: string;
};

export function BtnEditar({ onClick, cliente }: { onClick: (data: any) => void, cliente: any }) {
  const handleEditar = () => {
    Swal.fire({
      title: "Editar cliente",
      html: `
        <input id="swal-input3" class="swal2-input" value="${cliente.rfc}" placeholder="RFC">
        <input id="swal-input1" class="swal2-input" value="${cliente.nombre_cliente}" placeholder="Nombre">
        <input id="swal-input2" class="swal2-input" value="${cliente.telefono_cliente}" placeholder="Teléfono">
        <input id="swal-input4" class="swal2-input" value="${cliente.correo_cliente}" placeholder="Correo">
      `,
      focusConfirm: false,
      showCancelButton: true,
      preConfirm: () => {
        return {
          id_cliente: cliente.id_cliente, // <-- Incluye el id aquí
          rfc: (document.getElementById('swal-input1') as HTMLInputElement).value,
          nombre_cliente: (document.getElementById('swal-input2') as HTMLInputElement).value,
          telefono_cliente: (document.getElementById('swal-input3') as HTMLInputElement).value,
          correo_cliente: (document.getElementById('swal-input4') as HTMLInputElement).value,
        }
      }
    }).then((result) => {
      if (result.isConfirmed) {
        onClick(result.value);
      }
    });
  };

  return (
    <button
      onClick={handleEditar}
      className="relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-full group bg-gradient-to-br from-pink-500 to-orange-400 group-hover:from-pink-500 group-hover:to-orange-400 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-pink-200 dark:focus:ring-pink-800"
    >
        <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-transparent group-hover:dark:bg-transparent">
Editar
</span>
      
    </button>
  );
}


