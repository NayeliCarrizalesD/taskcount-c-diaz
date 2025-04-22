"use client";

import React, { useState, useEffect } from "react";
import { auth } from "app/auth";
import { getEntradaSalida } from "@/app/schema";

export const InputChecadorUsuario = () => {
  const [checadorValue, setChecadorValue] = useState<string>("Entrada");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const session = await auth();
        const correo = session?.user?.email;

        if (correo) {
          const usuarios = await getEntradaSalida(correo);

          if (usuarios.length > 0) {
            const checador = usuarios[0].checador;

            // Actualiza el estado basado en el valor de "checador"
            if (checador === "Entrada") {
              setChecadorValue("Salida");
            } else if (checador === "Salida") {
              setChecadorValue("Entrada");
            }
          }
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []); // Ejecuta solo una vez al montar el componente

  return (
    <input
      id="checador"
      name="checador"
      value={checadorValue} // Asigna el valor del estado al input
      required
      readOnly
      type="text"
      className="mt-1 block w-full text-black rounded-full border border-gray-700 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-black focus:outline-none focus:ring-black sm:text-sm"
    />
  );
};