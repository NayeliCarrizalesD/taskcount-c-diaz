'use client';

export const FechaEntradaSalida = async () => {
  const currentDat = new Date();
  //  Fecha completa separada por / slash
  const currentDate = currentDat.toLocaleDateString("en-US");

  return (   
      <div>
       <input 
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-full focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
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


