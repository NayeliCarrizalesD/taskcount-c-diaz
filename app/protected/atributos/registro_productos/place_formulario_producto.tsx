
import { FormRegistroProductos } from "@/app/formProducto";
import { createNewProduct, getProducto } from "@/app/schema";
import { SubmitButton } from "@/app/submit-button";
import { redirect } from "next/navigation";
import { AiOutlineTag } from "react-icons/ai";


export default function FormularioProductos() {
  
    async function CatalogoProductos(formData: FormData) {
        'use server';
        
        let marca_temporal = formData.get('marca_temporal') as string;
        let codigo_producto = formData.get('codigo_producto') as string;
        let nombre_producto = formData.get('nombre_producto') as string;
        let empresa_producto = formData.get('empresa_producto') as string;
        let categoria = formData.get('categoria') as string;
        let clave_sat = formData.get('clave_sat') as string;
        let correo_empleado = formData.get('correo_empleado') as string;
        let subcategoria = formData.get('subcategoria') as string;

        let producto = await getProducto(codigo_producto.toString());
    
        if (producto.length > 0) {
            return console.log('El producto ya existe');              
                // TODO: Handle errors with useFormStatus - return 'Costo ya existe';
        } else {
            await createNewProduct(marca_temporal, codigo_producto, nombre_producto, empresa_producto, categoria, clave_sat, correo_empleado, subcategoria);
            redirect('/protected/catalogo_productos'); // Redirigir a la página de registro de productos
        }             
    }

    return (
        <div className="lg:col-span-6 sm:col-span-12 rounded-3xl bg-zinc-800 border border-stone-500 shadow-lg h-[auto] sm:h-auto overflow-y-scroll scrollbar-thin">
            <div className="p-4">
                <h3 className="flex items-center text-lg gap-1.5 font-medium">
                    <AiOutlineTag />
                    Productos
                </h3>
                <h3 className="font-normal">
                    Registrar un producto en el catalogo de productos
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