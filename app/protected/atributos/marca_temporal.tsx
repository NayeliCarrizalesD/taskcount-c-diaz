"use client";
import { useMemo } from "react";

export const MarcaTemporal = () => {
  const marca_temporal = useMemo(() => {
    const currentDat = new Date();
    const currentDate = currentDat.toLocaleDateString("en-US");
    const horas = currentDat.toLocaleTimeString();
    return currentDate + " " + horas;
  }, []);
  
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
  
  
  