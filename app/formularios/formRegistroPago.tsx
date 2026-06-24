import { InputCorreoUsuario } from "../protected/atributos/inputCorreoUsuario";
import { MarcaTemporal } from "../protected/atributos/marca_temporal";
import { SelectConcepto } from "../protected/atributos/selectConcepto";
import { SelectMes } from "../protected/atributos/selectMesPago";
import { SelectNombreClienteTodos } from "../protected/atributos/selectNombreCliente";

export default function FormRegistroPagoCliente({
    action,
    children,
   
  }: {
    action: any;
    children: React.ReactNode;
  }) {
    return (
       
      <form
        action={action}
        id="registro-pago-form"
        className="flex flex-col space-y-4 bg-slate-800 px-2 py-5 sm:px-4"
      >
        <div className="invisible h-[1px]">
          <MarcaTemporal/>        
        </div>

        <div>     
          <label htmlFor="id_cliente" className="block text-xs font-semibold text-stone-300 uppercase tracking-wider mb-1">Nombre cliente</label>
          <SelectNombreClienteTodos id="id_cliente" name="id_cliente" />
        </div>
        
        <div>  
          <label htmlFor="concepto" className="block text-xs font-semibold text-stone-300 uppercase tracking-wider mb-1">Concepto</label>
          <SelectConcepto id="concepto" name="concepto" />
        </div>

        <div>
          <label
            htmlFor="pago"
            className="block text-xs font-semibold text-stone-300 uppercase tracking-wider mb-1"
          >
            Cantidad a pagar $
          </label>
          <input
            type="number"
            step="any"
            id="pago"
            name="pago"
            className="w-full mt-1 px-3.5 py-2.5 bg-gray-700 border border-gray-600 text-white rounded-xl focus:outline-none focus:ring-2 focus:ring-[#008fcb] focus:border-transparent text-sm placeholder-gray-400"
            />
        </div>

        <div>
           <label htmlFor="mes_pago" className="block text-xs font-semibold text-stone-300 uppercase tracking-wider mb-1">Mes a Pagar</label>
          <SelectMes id="mes_pago" name="mes_pago"/> 
        </div>

        <div>
          <label
            htmlFor="year_pago"
            className="block text-xs font-semibold text-stone-300 uppercase tracking-wider mb-1"
          >
            Año de Pago 
          </label>
          <select
            id="year_pago"
            name="year_pago"
            className="w-full mt-1 px-3.5 py-2.5 bg-gray-700 border border-gray-600 text-white rounded-xl focus:outline-none focus:ring-2 focus:ring-[#008fcb] focus:border-transparent text-sm cursor-pointer"
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
          <label
            htmlFor="fecha_realizacion_pago"
            className="block text-xs font-semibold text-stone-300 uppercase tracking-wider mb-1"
          >
            Fecha de realización de pago
          </label>
          <input
            type="date"
            id="fecha_realizacion_pago"
            name="fecha_realizacion_pago"
            defaultValue={new Date().toISOString().split('T')[0]}
            className="w-full mt-1 px-3.5 py-2 bg-gray-700 border border-gray-600 text-white rounded-xl focus:outline-none focus:ring-2 focus:ring-[#008fcb] focus:border-transparent text-sm cursor-pointer"
            required
          />
        </div>

        <div>   
          <InputCorreoUsuario/>
        </div>

        {children}
      </form>
    );
  }
  