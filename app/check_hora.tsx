'use client';

import React from "react";
import { FechaEntradaSalida } from "./protected/atributos/fecha_entrada_salida";

export const CheckHora = () => {
    //const hora = new Date().getHours() + ':' + new Date().getMinutes() ;

   /* const horaok = new Date();
    let horas = horaok.toLocaleTimeString() 
    
    const [texto, setTexto] = useState('Entrada');

    const cambio = () => {
        if (texto === 'Entrada') {
            setTexto('Salida');
        } else {
            setTexto('Entrada');
        }
    }*/

    return (
        <div>
            <h1>Estas checando La hora actual es: </h1>
            <FechaEntradaSalida/>
            
        </div>
    );
}


