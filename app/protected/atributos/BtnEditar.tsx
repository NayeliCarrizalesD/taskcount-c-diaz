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
        <div class="text-left space-y-4">
          <div>
            <label class="block text-xs font-semibold text-stone-400 uppercase tracking-wider mb-1">Nombre</label>
            <input id="swal-input1" type="text" class="w-full px-3 py-2 bg-neutral-900 border border-zinc-700 text-white rounded-xl focus:outline-none focus:ring-2 focus:ring-[#008fcb] focus:border-transparent text-sm" value="${cliente.nombre_cliente || ''}">
          </div>
          <div>
            <label class="block text-xs font-semibold text-stone-400 uppercase tracking-wider mb-1">Teléfono</label>
            <input id="swal-input2" type="text" class="w-full px-3 py-2 bg-neutral-900 border border-zinc-700 text-white rounded-xl focus:outline-none focus:ring-2 focus:ring-[#008fcb] focus:border-transparent text-sm" value="${cliente.telefono_cliente || ''}">
          </div>
          <div>
            <label class="block text-xs font-semibold text-stone-400 uppercase tracking-wider mb-1">Correo</label>
            <input id="swal-input3" type="email" class="w-full px-3 py-2 bg-neutral-900 border border-zinc-700 text-white rounded-xl focus:outline-none focus:ring-2 focus:ring-[#008fcb] focus:border-transparent text-sm" value="${cliente.correo_cliente || ''}">
          </div>
          <div>
            <label class="block text-xs font-semibold text-stone-400 uppercase tracking-wider mb-1">RFC</label>
            <input id="swal-input4" type="text" class="w-full px-3 py-2 bg-neutral-900 border border-zinc-700 text-white rounded-xl focus:outline-none focus:ring-2 focus:ring-[#008fcb] focus:border-transparent text-sm" value="${cliente.rfc || ''}">
          </div>
        </div>
      `,
      focusConfirm: false,
      color: "white",
      background: "#0d0d0e",
      showCancelButton: true,
      confirmButtonText: 'Guardar',
      cancelButtonText: 'Cancelar',
      buttonsStyling: false,
      customClass: {
        popup: 'rounded-3xl border border-zinc-800 p-6 shadow-2xl w-[400px]',
        confirmButton: 'px-5 py-2.5 rounded-xl font-semibold bg-[#008fcb] hover:bg-[#007cb0] text-white text-sm cursor-pointer mr-2',
        cancelButton: 'px-5 py-2.5 rounded-xl font-semibold bg-zinc-800 hover:bg-zinc-700 text-stone-300 text-sm cursor-pointer',
      },
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