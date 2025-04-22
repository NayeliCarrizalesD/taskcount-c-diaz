
export const HoraEntradaSalida = () => {
    const horaok = new Date();
    let horas = horaok.toLocaleTimeString() ;

    const hora = new Date().getHours() + ':' + new Date().getMinutes() ;


    return (
        <div>
       
        <input 
        className="mt-1 block w-full text-black rounded-full border border-gray-700 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-black focus:outline-none focus:ring-black sm:text-sm"
         id="hora_entrada_salida"
         name="hora_entrada_salida"
        value={horas}
        />

<input 
        className="mt-1 block w-full text-black rounded-full border border-gray-700 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-black focus:outline-none focus:ring-black sm:text-sm"
         id="hora_entrada_salida"
         name="hora_entrada_salida"
        value={hora}
        />
    
      
       </div>     
         
    );
}