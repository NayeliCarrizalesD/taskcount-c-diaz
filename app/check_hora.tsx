'use client';

import React, { useState } from "react";

export const CheckHora = () => {
    const hora = new Date().getHours() + ':' + new Date().getMinutes() ;
    
    const [texto, setTexto] = useState('Entrada');

    const cambio = () => {
        if (texto === 'Entrada') {
            setTexto('Salida');
        } else {
            setTexto('Entrada');
        }
    }

    return (
        <div>
            <h1>La hora actual es: {hora}</h1>
            <button
            className="rounded-full border-green-300 border  transition-colors hover:bg-green-500 dark:bg-green-700 text-sm sm:text-base h-8 w-full sm:h-10 px-2 sm:px-5 m-2" 
            onClick={cambio}>
                {texto}
            </button>
        </div>
    );
}