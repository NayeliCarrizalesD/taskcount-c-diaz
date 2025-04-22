'use client';
export const HoraEntradaSalida = () => {
    const horaok = new Date();
    let horas = horaok.toLocaleTimeString() ;



    return (
        <div>
       
        <input 
        className="mt-1 block w-full text-black rounded-full border border-gray-700 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-black focus:outline-none focus:ring-black sm:text-sm"
         id="hora_entrada_salida"
         name="hora_entrada_salida"
        value={horas}
        />

        {horas}


    
      
       </div>     
         
    );
}