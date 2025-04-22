"use client";

import { auth } from 'app/auth';
import { getEntradaSalida } from '@/app/schema';
import React, { useState } from 'react';

export function InputChecadorUsuario(): JSX.Element {
  const [texto, setTexto] = useState('Entrada'); // Estado para el texto del botón
  const [checadorValue, setChecadorValue] = useState<string | undefined>(undefined);

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        let session = await auth();
        let correo = session?.user?.email;

        if (correo) {
          const usuarioResponse = await getEntradaSalida(correo);
          const usuarios = usuarioResponse;

          if (usuarios.length > 0) {
            const checador = usuarios[0].checador;
            setChecadorValue(checador ?? undefined);

            if (checador === '') {
              setTexto('Entrada');
            } else if (checador === 'Entrada') {
              setTexto('Salida');
            }else if (checador === 'Salida') {
                setTexto('Entrada');
              }
          }
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

 
  
  return ( 

    <input
    id="checador"
    name="checador"
    value={checadorValue}
    required
    readOnly
    type="email"
    className="mt-1 block w-full text-black rounded-full border border-gray-700 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-black focus:outline-none focus:ring-black sm:text-sm"
/>
   
);

};


