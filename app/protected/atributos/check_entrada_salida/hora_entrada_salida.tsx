'use client';
export const HoraEntradaSalida = () => {
    const horaok = new Date();
    let horas = horaok.toLocaleTimeString() ;

    return (
        <div>
            <input 
                className="w-full mt-1 px-3.5 py-2.5 bg-gray-700 border border-gray-600 text-white rounded-xl focus:outline-none focus:ring-2 focus:ring-[#008fcb] focus:border-transparent text-sm placeholder-gray-400"
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