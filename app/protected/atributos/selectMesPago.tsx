


import React from "react";

export function SelectMes({id, name}: {id: string, name: string}) {
  
  return ( 
    <>
      
      <select
      id={id}
      name={name}
      required
      className="mt-1  bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-full focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
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





