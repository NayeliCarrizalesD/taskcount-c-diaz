import { SelectConcepto } from "../protected/atributos/selectConcepto";
import { SelectNombreClienteTodos } from "../protected/atributos/selectNombreCliente";


export function FormConfigClienteHonorarios({
    action,
    children,
  }: {
    action: any;
    children: React.ReactNode;
  }) {
    return (
      <form
        action={action}
        className="flex flex-col space-y-4 bg-slate-800 px-2 py-5 sm:px-4"
      >
        <div>
          <label
            htmlFor="nombre_cliente"
            className="block text-xs text-white uppercase"
          >
            nombre cliente
          </label>
          <SelectNombreClienteTodos/>
      
        </div>
        <div>
          <label
            htmlFor="concepto"
            className="block text-xs text-white uppercase"
          >
            concepto
          </label>
          <SelectConcepto/>
        </div>  
        
        <div>
          <label
            htmlFor="pago"
            className="block text-xs text-white uppercase"
          >
            cantidad
          </label>
          <input
            id="pago"
            name="pago"
            required
            className="mt-1 block w-full text-black rounded-full border border-gray-700 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-black focus:outline-none focus:ring-black sm:text-sm"
          />
        </div>  
        
        {children}
      </form>
    );
}