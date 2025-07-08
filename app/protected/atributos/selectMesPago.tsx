


import React from "react";

export const SelectMes: React.FC = () => {
  
  return ( 
    <select
    id="mes_pago"
    name="mes_pago"
    required
    className="mt-1  bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-full focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
    >
        <option value="">Seleccione una opción</option>
        
        <option value="Enero">Enero</option>   
        <option value="Febrero">Febrero</option>   
        <option value="Marzo">Marzo</option>   
        <option value="Abril">Abril</option>   
        <option value="Mayo">Mayo</option>   
        <option value="Junio">Junio</option>   
        <option value="Julio">Julio</option>   
        <option value="Agosto">Agosto</option>
        <option value="Septiembre">Septiembre</option>   
        <option value="Octubre">Octubre</option>   
        <option value="Noviembre">Noviembre</option>   
        <option value="Diciembre">Diciembre</option>   

 
    </select>   
  );
};





