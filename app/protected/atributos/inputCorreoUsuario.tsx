"use client";
import { useEffect, useState } from "react";

export const InputCorreoUsuario = () => {
    const [correo, setCorreo] = useState("");

    useEffect(() => {
        const fetchCorreo = async () => {
            try {
                const res = await fetch("/api/correo-usuario");
                const data = await res.json();
                setCorreo(data.email);
            } catch (error) {
                setCorreo("");
            }
        };
        fetchCorreo();
    }, []);

  return ( 
    <>
    <label
        htmlFor="correo_empleado"
        className="block text-xs font-semibold text-stone-300 uppercase tracking-wider mb-1"
        >
        correo de la persona que registra:
    </label>

    <input
    id="correo_empleado"
    name="correo_empleado"
    value={correo}
    required
    readOnly
    type="email"
    className="w-full mt-1 px-3.5 py-2.5 bg-gray-700 border border-gray-600 text-white rounded-xl focus:outline-none focus:ring-2 focus:ring-[#008fcb] focus:border-transparent text-sm placeholder-gray-400"
/>
</>
   
);

};


