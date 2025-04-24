'use client';

export const FechaEntradaSalida = async () => {
  const currentDat = new Date();
  //  Fecha completa separada por / slash
  const currentDate = currentDat.toLocaleDateString("en-US");

  return (   
      <div>
       <input 
       className="mt-1 block w-full invisible text-black rounded-full border border-gray-700 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-black focus:outline-none focus:ring-black sm:text-sm"
        id="fecha_entrada_salida"
        name="fecha_entrada_salida"
       value={currentDate}
       />
      </div>     
  );
};

export const TextoFechaEntradaSalida = async () => {
  const currentDat = new Date();
  //  Fecha completa separada por / slash
  const currentDate = currentDat.toLocaleDateString("en-US");

  return (   
      <>
        {currentDate}
      </>     
  );
};


