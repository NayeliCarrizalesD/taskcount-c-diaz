"use client";

export const MarcaTemporal = async () => {
  const currentDat = new Date();
  // Fecha completa separada por / slash
  const currentDate = currentDat.toLocaleDateString("en-US");
  const horaok = new Date();
  let horas = horaok.toLocaleTimeString() ;

  let  marca_temporal = currentDate + " " + horas;
  // Formato de fecha y hora: "MM/DD/YYYY HH:mm:ss AM/PM"
  
  return ( 
    <div>
      <input 
        className="block w-full text-sm text-black rounded-full border border-gray-700 placeholder-gray-400 shadow-sm focus:border-black focus:outline-none focus:ring-black sm:text-sm"
        id="marca_temporal"
        name="marca_temporal"
        type="text"
        readOnly
        value={marca_temporal}
      />
    </div>     
  );  
};
  
  
  