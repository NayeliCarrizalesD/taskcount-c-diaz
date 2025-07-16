'use client';

import React from "react";
import SumaTotalPagos from "../suma_de_pagos/ver_suma_de_pagos";

export const ActividadPagos = () => {
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
            <SumaTotalPagos />
        </div>
    );
}


