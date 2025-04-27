'use client';
export const HoraEntradaSalida = () => {
    const horaok = new Date();
    let horas = horaok.toLocaleTimeString() ;

    return (
        <div>
            <input 
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-full focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                id="hora_entrada_salida"
                name="hora_entrada_salida"
                value={horas}
            />
       </div>      
    );
}

export const TextoHoraEntradaSalida = () => {
    const horaok = new Date();
    let horas = horaok.toLocaleTimeString(); ;

    return (
        <>
           {horas}
       </>      
    );
}