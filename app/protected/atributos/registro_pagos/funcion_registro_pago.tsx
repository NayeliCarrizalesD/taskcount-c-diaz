export async function createRegistroPagoHonorarios(formData: FormData) {
    const data = Object.fromEntries(formData.entries());
    const res = await fetch("/api/registroPago", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
    });
    return await res.json();
}


/*"use server"
import { createRegistroPago, getRegistroPago } from "@/app/schema";
import { redirect } from "next/navigation";

export async function createRegistroPagoHonorarios(formData: FormData) {

    let marca_temporal  = formData.get('marca_temporal') as string;        
           let nombre_cliente = formData.get('nombre_cliente') as string;
           let concepto = formData.get('concepto') as string;
           let pago = formData.get('pago') as unknown as number;
           let mes_pago = formData.get('mes_pago') as string;
           let year_pago = formData.get('year_pago') as unknown as number;
           let correo_empleado = formData.get('correo_empleado') as string;
   
       let producto = await getRegistroPago(nombre_cliente.toString());
   
       if (producto.length > 0) {
           return console.log('La configuracion ya existe');              
       } else {
           await createRegistroPago(marca_temporal, nombre_cliente, concepto, pago,  mes_pago, year_pago, correo_empleado);
           redirect('/protected/config_clientes_honorarios'); // Redirigir a la página de registro de productos
       }             
       }
      
      */