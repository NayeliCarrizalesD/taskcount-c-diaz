'use client';

export const FechaEntradaSalida = async () => {
  const currentDat = new Date();
  //  Fecha completa separada por / slash
  const currentDate = currentDat.toLocaleDateString("en-US");

  return (   
      <div>
        <input 
          className="w-full mt-1 px-3.5 py-2.5 bg-gray-700 border border-gray-600 text-white rounded-xl focus:outline-none focus:ring-2 focus:ring-[#008fcb] focus:border-transparent text-sm placeholder-gray-400"
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


