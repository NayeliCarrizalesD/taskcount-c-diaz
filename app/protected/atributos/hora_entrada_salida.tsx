
export const HoraEntradaSalida = () => {
    const hora = new Date().toLocaleTimeString([], { hour: '2-digit', hour12: false });  

    const minutes = new Date().toLocaleTimeString([], {  minute: '2-digit', hour12: false  });;
    let horas = hora + ':' + minutes; 
    



    return (
        <div>
       
        <input 
        className="mt-1 block w-full text-black rounded-full border border-gray-700 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-black focus:outline-none focus:ring-black sm:text-sm"
         id="hora_entrada_salida"
         name="hora_entrada_salida"
        value={horas}
        />
    
      
       </div>     
         
    );
}