
import { FormRegistroProductos } from "@/app/formularios/formProducto";
import { createNewProduct, getProducto } from "@/app/schema";
import { SubmitButton } from "@/app/submit-button";
import { redirect } from "next/navigation";
import { AiOutlineTag } from "react-icons/ai";


export default function FormularioProductos() {
  
    async function CatalogoProductos(formData: FormData) {
        'use server';
        
        let marca_temporal = formData.get('marca_temporal') as string;
        let nombre_producto_servicio = formData.get('nombre_producto_servicio') as string;
        let correo_empleado = formData.get('correo_empleado') as string;
       

        let producto = await getProducto(nombre_producto_servicio.toString());
    
        if (producto.length > 0) {
            return console.log('El producto ya existe');              
                // TODO: Handle errors with useFormStatus - return 'Costo ya existe';
        } else {
            await createNewProduct(marca_temporal, nombre_producto_servicio, correo_empleado);
            redirect('/protected/catalogo_productos'); // Redirigir a la página de registro de productos
        }             
    }

    return (
        <div className="lg:col-span-8 sm:col-span-12 overflow-hidden rounded-3xl bg-slate-800 border border-stone-500 shadow-lg h-[auto] sm:h-auto overflow-y-scroll scrollbar-thin">
            <div className="p-4">
                <h3 className="flex items-center text-lg gap-1.5 font-medium">
                    <AiOutlineTag />
                    Conceptos
                </h3>
                <h3 className="font-normal">
                    Registrar un concepto en el catalogo de productos y servicios
                </h3>
            </div>
            <div className="h-[auto] sm:h-auto px-4 flex-row items-center ">
                <FormRegistroProductos action={CatalogoProductos}>
                    <SubmitButton>Registrar</SubmitButton>
                </FormRegistroProductos>
                
            </div>
        </div>
    );
}