import { InputCorreoUsuario } from "../protected/atributos/inputCorreoUsuario";
import { MarcaTemporal } from "../protected/atributos/marca_temporal";
import { SelectConcepto } from "../protected/atributos/selectConcepto";
import { SelectMes } from "../protected/atributos/selectMesPago";
import { SelectNombreClienteTodos } from "../protected/atributos/selectNombreCliente";

export function FormRegistroPagoCliente({
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
        <div className="invisible h-[1px]">
          <MarcaTemporal/>        
        </div>

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
            className="block text-xs uppercase"
          >
            Cantidad a pagar $
          </label>
          <input
            type="number"
            step="any"
            id="pago"
            name="pago"
            className="mt-1 block w-full text-black rounded-full border border-gray-300 px-3 py-2 placeholder-gray-700 shadow-sm focus:border-black focus:outline-none focus:ring-black sm:text-sm"
            />
        </div>

        <div>
           <label htmlFor="mes_pago">Mes a Pagar</label>
          <SelectMes id="mes_pago" name="mes_pago"/> 
        </div>

        <div>
          <label
            htmlFor="year_pago"
            className="block text-xs uppercase"
          >
            Año de Pago 
          </label>
          <select
            id="year_pago"
            name="year_pago"
            className="mt-1  bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-full focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            required>
            <option value={""}>Seleccione una opción</option>
            {Array.from({ length: 9 }, (_, i) => { 
              const year = new Date().getFullYear() - i;
              return (
                <option key={year} value={year}>
                  {year}
                </option>
              );
            })}
          </select>
        </div>
        
        <div>   
          <InputCorreoUsuario/>
        </div>

        {children}
      </form>
    );
  }
  