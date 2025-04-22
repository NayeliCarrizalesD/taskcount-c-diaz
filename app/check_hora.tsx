'use client';

import React, { useState } from "react";
import { FechaEntradaSalida } from "./protected/atributos/fecha_entrada_salida";

export const CheckHora = () => {
    //const hora = new Date().getHours() + ':' + new Date().getMinutes() ;

    const horaok = new Date();
    let horas = horaok.toLocaleTimeString() 
    
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
            <h1>Estas checando {texto} La hora actual es: {horas}</h1>
            <FechaEntradaSalida/>
            <button
            className="rounded-full border-green-300 border  transition-colors hover:bg-green-500 dark:bg-green-700 text-sm sm:text-base h-8 w-full sm:h-10 px-2 sm:px-5 m-2" 
            onClick={cambio}>
                Checar
            </button>
        </div>
    );
}