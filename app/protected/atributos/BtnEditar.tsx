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
        <input id="swal-input1" class="swal2-input" value="${cliente.nombre_cliente || ''}" placeholder="Nombre">
        <input id="swal-input2" class="swal2-input" value="${cliente.telefono_cliente || ''}" placeholder="Teléfono">
        <input id="swal-input3" class="swal2-input" value="${cliente.correo_cliente || ''}" placeholder="Correo">
        <input id="swal-input4" class="swal2-input" value="${cliente.rfc || ''}" placeholder="RFC">
      `,
      focusConfirm: false,
      color: "white",
      background: "black",
      customClass: {
        popup: 'border-radius-0'
      },
      showCancelButton: true,
      confirmButtonText: 'Guardar',
      cancelButtonText: 'Cancelar',
      preConfirm: () => {
        const nombre = (document.getElementById('swal-input1') as HTMLInputElement).value.trim();
        const telefono = (document.getElementById('swal-input2') as HTMLInputElement).value.trim();
        const correo = (document.getElementById('swal-input3') as HTMLInputElement).value.trim();
        const rfc = (document.getElementById('swal-input4') as HTMLInputElement).value.trim();

        if (!nombre) {
          Swal.showValidationMessage('El nombre es obligatorio');
          return false;
        }

        // Validación básica de email
        if (correo && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(correo)) {
          Swal.showValidationMessage('El formato del correo no es válido');
          return false;
        }

        return {
          id_cliente: cliente.id_cliente,
          nombre_cliente: nombre,
          telefono_cliente: telefono,
          correo_cliente: correo,
          rfc: rfc,
          correo_empleado: cliente.correo_empleado,
          fecha_alta: cliente.fecha_alta
        }
      }
    }).then((result) => {
      if (result.isConfirmed && result.value) {
        onClick(result.value);
      }
    });
  };

  return (
    <button
      onClick={handleEditar}
      className="relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-full group bg-gradient-to-br from-pink-500 to-orange-400 group-hover:from-pink-500 group-hover:to-orange-400 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-pink-200 dark:focus:ring-pink-800"
    >
      <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-full group-hover:bg-transparent group-hover:dark:bg-transparent">
        Editar
      </span>
    </button>
  );
}