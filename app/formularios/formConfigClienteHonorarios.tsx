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
         <label htmlFor="id_cliente">Nombre cliente</label>
  <SelectNombreClienteTodos id="id_cliente" name="id_cliente" />
      
        </div>
        <div>
          <label htmlFor="concepto">Concepto</label>
  <SelectConcepto id="concepto" name="concepto" />
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
            type="number"
            required
            className="mt-1 block w-full text-black rounded-full border border-gray-700 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-black focus:outline-none focus:ring-black sm:text-sm"
          />
        </div>  
        
        {children}
      </form>
    );
}