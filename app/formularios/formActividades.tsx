
import { HoraEntradaSalida } from "../protected/atributos/check_entrada_salida/hora_entrada_salida";
import { InputChecadorUsuario } from "../protected/atributos/check_entrada_salida/inputChecador";
import { InputCorreoUsuario } from "../protected/atributos/inputCorreoUsuario";
import { InputNombreUsuario } from "../protected/atributos/inputNombreUsuario";
import SelectCorreos from "../selectUsuarios";

export function FormRegistroActividades({
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
        <div className="">
          <label
            htmlFor="correo_empleado"
            className="block text-xs text-white uppercase"
          >
            Selecciona la persona a la que se le asignara la actividad
          </label>
          <SelectCorreos/>
        
        </div>
        <div >
          <label
            htmlFor="hora_entrada_salida"
            className="block text-xs uppercase"
          >
          </label>
          <HoraEntradaSalida
          />
        </div>
        <div>
          <label
            htmlFor="checador"
            className="block text-xs uppercase"
          >
          </label>
          <InputChecadorUsuario
          />
        </div>
        <div>
          <label
            htmlFor="nombre_empleado"
            className="block text-xs uppercase"
          >
          </label>
          <InputNombreUsuario/>
        </div>
        <div>
          
          <InputCorreoUsuario />
           
        </div>
        

        {children}
      </form>
    );
  }
  