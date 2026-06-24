
import React from "react";

export function SelectMes({id, name}: {id: string, name: string}) {
  
  return ( 
    <>
      
      <select
      id={id}
      name={name}
      required
      className="w-full mt-1 px-3.5 py-2.5 bg-gray-700 border border-gray-600 text-white rounded-xl focus:outline-none focus:ring-2 focus:ring-[#008fcb] focus:border-transparent text-sm cursor-pointer"
      >
          <option value="">Seleccione una opción</option>
          
          <option value="1">Enero</option>   
          <option value="2">Febrero</option>   
          <option value="3">Marzo</option>   
          <option value="4">Abril</option>   
          <option value="5">Mayo</option>   
          <option value="6">Junio</option>   
          <option value="7">Julio</option>   
          <option value="8">Agosto</option>
          <option value="9">Septiembre</option>   
          <option value="10">Octubre</option>   
          <option value="11">Noviembre</option>   
          <option value="12">Diciembre</option>   

  
      </select>   
    </>
    
  );
};





