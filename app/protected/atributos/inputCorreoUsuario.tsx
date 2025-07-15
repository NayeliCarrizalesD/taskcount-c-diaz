"use client";
import { useEffect, useState } from "react";

export const InputCorreoUsuario = () => {
    const [correo, setCorreo] = useState("");

    useEffect(() => {
        const fetchCorreo = async () => {
            try {
                const res = await fetch("/api/correoUsuario");
                const data = await res.json();
                setCorreo(data.email);
            } catch (error) {
                setCorreo("");
            }
        };
        fetchCorreo();
    }, []);

  return ( 

    <input
    id="correo_empleado"
    name="correo_empleado"
    value={correo}
    required
    readOnly
    type="email"
    className="bg-gray-800 border border-gray-600 text-white text-sm rounded-full focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
/>
   
);

};


