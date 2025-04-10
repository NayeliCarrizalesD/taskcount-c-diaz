'use client';

import Swal from 'sweetalert2';

function alertCopiarValor() {
    Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Se ha copiado correctamente",
        showConfirmButton: false,
        timer: 1500,
        color: "white",
        background: "black",
        customClass: {
            popup: 'border-radius-0'
        }
    });
}

export default function CopyButton({ costo }: { costo: string }) {
    function handleCopy() {
        navigator.clipboard.writeText(costo);
        alertCopiarValor();
    }

    return (
        <button className="rounded-full border-green-300 border transition-colors hover:bg-green-500 dark:bg-green-700 text-sm sm:text-base h-8 w-32 sm:h-7 px-2 sm:px-5 m-2" onClick={handleCopy}>
            Copiar
        </button>
    );
}