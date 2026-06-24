import { useMemo, useState } from 'react';
import Swal from 'sweetalert2';
import { useEffect } from 'react';
import withReactContent from 'sweetalert2-react-content';
import { InputCorreoUsuarioModal } from './InputCorreoUsuarioModal';
import { useRouter } from 'next/navigation';

const MySwal = withReactContent(Swal);

export function BtnPagar({ cliente, onPagoRealizado }: {
  cliente: any;
  onPagoRealizado?: () => void;
}) {
const [loading, setLoading] = useState(false);
const [correoEmpleado, setCorreoEmpleado] = useState("");
const router = useRouter();

// Fetch correoUsuario on mount

useEffect(() => {
  const fetchCorreoUsuario = async () => {
    try {
      const usuarioRes = await fetch('/api/usuario-actual', {
      credentials: 'include'
      });
      if (usuarioRes.ok) {
        const usuario = await usuarioRes.json();
        setCorreoEmpleado(usuario.correo || "");
      } else {
        setCorreoEmpleado("");
      }
    } catch (e) {
      setCorreoEmpleado("");
    }
  };
  fetchCorreoUsuario();
}, []);

  const handlePagar = async () => {
    try {
      setLoading(true);

      // Verificar si existe configuración de honorarios
      const configResponse = await fetch(`/api/config-cliente-honorarios/${cliente.id_cliente}`);

      if (!configResponse.ok) {
        if (configResponse.status === 404) {
          Swal.fire({
            icon: 'warning',
            title: 'Configuración faltante',
            text: 'Este cliente no tiene configuración de honorarios. Por favor, configúrala primero en "Config Honorarios".',
            confirmButtonText: 'Entendido',
            color: "white",
            background: "#0d0d0e",
            buttonsStyling: false,
            customClass: {
              popup: 'rounded-3xl border border-zinc-800 p-6',
              title: 'text-xl font-bold tracking-tight text-white pt-2',
              confirmButton: 'px-5 py-2.5 rounded-xl font-semibold bg-[#008fcb] hover:bg-[#007cb0] text-white transition-colors duration-150 text-sm cursor-pointer'
            }
          });
          return;
        }
        throw new Error('Error al obtener configuración de honorarios');
      }

      const configData = await configResponse.json();

      // Obtener último pago (opcional)
      let ultimoPago = null;
      try {
        const ultimoPagoResponse = await fetch(`/api/ultimo-pago/${cliente.id_cliente}`);
        if (ultimoPagoResponse.ok) {
          ultimoPago = await ultimoPagoResponse.json();
        }
      } catch (error) {
        console.log('No hay pagos anteriores para este cliente');
      }

      // Preparar datos para el modal
      const meses = [
        "", "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
        "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"
      ];

      const ultimoMesPagado = ultimoPago
        ? `${meses[parseInt(ultimoPago.mes_pago)]} ${ultimoPago.year_pago}`
        : 'No hay pagos registrados';

      // Calcular próximo mes
      const fechaActual = new Date();
      const mesActual = fechaActual.getMonth() + 1;
      const currentYear = new Date().getFullYear();
      const yearOptions = Array.from({ length: 9 }, (_, i) => {
      const year = currentYear - i;
      return `<option value="${year}">${year}</option>`;
        }).join('');
        
      // Mostrar modal con información
      const result = await MySwal.fire({
        title: 'Registrar Pago de Honorarios',
        html: `
          <div class="text-left space-y-4">
            <div class="bg-sky-950/30 border border-sky-900/40 p-4 rounded-2xl text-sm space-y-1.5 text-stone-300">
              <div>
                <span class="text-stone-500 text-xs uppercase tracking-wider font-semibold">Cliente</span>
                <div class="font-bold text-white text-base mt-0.5">${cliente.nombre_cliente || 'Sin nombre'}</div>
              </div>
              <div class="grid grid-cols-2 gap-3 mt-1.5 pt-2 border-t border-sky-900/20">
                <div>
                  <span class="text-stone-500 text-xs uppercase tracking-wider font-semibold block">Concepto</span>
                  <span class="font-medium text-white text-sm mt-0.5 block">${configData.concepto}</span>
                </div>
                <div>
                  <span class="text-stone-500 text-xs uppercase tracking-wider font-semibold block">Monto Config.</span>
                  <span class="font-bold text-emerald-400 text-sm mt-0.5 block">$${Number(configData.pago).toLocaleString('es-MX', { minimumFractionDigits: 2 })}</span>
                </div>
              </div>
              <div class="mt-2 text-xs text-sky-300 flex items-center gap-1.5 pt-1">
                <span class="inline-block w-1.5 h-1.5 rounded-full bg-sky-400 animate-pulse"></span>
                Último mes pagado: <strong>${ultimoMesPagado}</strong>
              </div>
            </div>
            
            <div class="grid grid-cols-2 gap-4">
              <div>
                <label class="block text-xs font-semibold text-stone-400 uppercase tracking-wider mb-1">Mes a pagar</label>
                <select id="mes-pago" class="w-full px-3 py-2 bg-neutral-900 border border-zinc-700 text-white rounded-xl focus:outline-none focus:ring-2 focus:ring-[#008fcb] focus:border-transparent text-sm cursor-pointer">
                  <option value="">Seleccionar mes</option>
                  ${meses.slice(1).map((mes, index) =>
            `<option value="${index + 1}" ${index + 1 === mesActual ? 'selected' : ''}>${mes}</option>`
          ).join('')}
                </select>
              </div>
              <div>
                <label class="block text-xs font-semibold text-stone-400 uppercase tracking-wider mb-1">Año</label>
                <select id="year_pago" class="w-full px-3 py-2 bg-neutral-900 border border-zinc-700 text-white rounded-xl focus:outline-none focus:ring-2 focus:ring-[#008fcb] focus:border-transparent text-sm cursor-pointer">
                  <option value="">Año</option>
                  ${yearOptions}
                </select>        
              </div>
            </div>
            
            <div>
              <label class="block text-xs font-semibold text-stone-400 uppercase tracking-wider mb-1">Monto a pagar</label>
              <div class="relative rounded-xl shadow-sm">
                <div class="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                  <span class="text-stone-500 sm:text-sm">$</span>
                </div>
                <input id="monto-pago" type="number" class="w-full pl-7 pr-3 py-2 bg-neutral-900 border border-zinc-700 text-white rounded-xl focus:outline-none focus:ring-2 focus:ring-[#008fcb] focus:border-transparent text-sm" value="${configData.pago}" step="0.01">
              </div>
            </div>

            <div>
              <label class="block text-xs font-semibold text-stone-400 uppercase tracking-wider mb-1" for="fecha_realizacion_pago">Fecha de pago en oficina</label>
              <input id="fecha_realizacion_pago" type="date" class="w-full px-3 py-2 bg-neutral-900 border border-zinc-700 text-white rounded-xl focus:outline-none focus:ring-2 focus:ring-[#008fcb] focus:border-transparent text-sm" value="${new Date().toISOString().split('T')[0]}">
            </div>
            
            <div>
              <label class="block text-xs font-semibold text-stone-400 uppercase tracking-wider mb-1" for="correo_empleado">Correo empleado</label>
              <input id="correo_empleado" name="correo_empleado" type="email" class="w-full px-3 py-2 bg-neutral-900 border border-zinc-700 text-white rounded-xl focus:outline-none focus:ring-2 focus:ring-[#008fcb] focus:border-transparent text-sm" value="${correoEmpleado}" />
            </div>
          </div>
        `,
        width: '460px',
        showCancelButton: true,
        color: "white",
        background: "#0d0d0e",
        buttonsStyling: false,
        customClass: {
          popup: 'rounded-3xl border border-zinc-800 p-6 shadow-2xl',
          title: 'text-xl font-bold tracking-tight text-white pt-2 px-2 text-left w-full',
          htmlContainer: 'text-left mx-2 my-0',
          actions: 'flex justify-end gap-3 mt-6 px-2 w-full',
          confirmButton: 'px-5 py-2.5 rounded-xl font-semibold bg-[#008fcb] hover:bg-[#007cb0] text-white transition-colors duration-150 text-sm cursor-pointer',
          cancelButton: 'px-5 py-2.5 rounded-xl font-semibold bg-zinc-800 hover:bg-zinc-700 text-stone-300 transition-colors duration-150 text-sm cursor-pointer',
          validationMessage: 'bg-red-950/40 border border-red-900/40 text-red-200 rounded-xl p-3 my-2 text-xs flex items-center gap-2'
        },
        confirmButtonText: 'Registrar Pago',
        cancelButtonText: 'Cancelar',
        preConfirm: () => {
          const mes = (document.getElementById('mes-pago') as HTMLSelectElement).value;
          const year = (document.getElementById('year_pago') as HTMLInputElement).value;
          const monto = (document.getElementById('monto-pago') as HTMLInputElement).value;
          const input = document.getElementById('correo_empleado') as HTMLInputElement;
          const correoEmpleado = input ? input.value : "";
          const fechaRealizacionInput = document.getElementById('fecha_realizacion_pago') as HTMLInputElement;
          const fechaRealizacion = fechaRealizacionInput ? fechaRealizacionInput.value : "";

          if (!mes || !year || !monto || !correoEmpleado || !fechaRealizacion) {
            Swal.showValidationMessage('Todos los campos son obligatorios');
            return false;
          }

          if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(correoEmpleado)) {
            Swal.showValidationMessage('El formato del correo no es válido');
            return false;
          }
          if (!correoEmpleado) {
            Swal.showValidationMessage('El correo del empleado es obligatorio');
            return false;
          }

          return {
            id_cliente: cliente.id_cliente,
            concepto: configData.concepto,
            mes_pago: parseInt(mes),
            year_pago: parseInt(year),
            pago: parseFloat(monto),
            correo_empleado: correoEmpleado,
            fecha_realizacion_pago: fechaRealizacion
          };
        }
      });

      if (result.isConfirmed && result.value) {
        await registrarPago(result.value);
      }

    } catch (error) {
      console.error('Error:', error);
      Swal.fire({
        icon: 'error',
        title: 'Error',
        color: "white",
        background: "#0d0d0e",
        buttonsStyling: false,
        customClass: {
          popup: 'rounded-3xl border border-zinc-800 p-6',
          title: 'text-xl font-bold tracking-tight text-white pt-2',
          confirmButton: 'px-5 py-2.5 rounded-xl font-semibold bg-[#008fcb] hover:bg-[#007cb0] text-white transition-colors duration-150 text-sm cursor-pointer'
        },
        text: error instanceof Error ? error.message : 'Error al cargar datos del cliente'
      });
    } finally {
      setLoading(false);
    }
  };

  const registrarPago = async (datosPago: any) => {
    try {
      const currentDat = new Date();
      const currentDate = currentDat.toLocaleDateString("en-US");
      const horas = currentDat.toLocaleTimeString();
      const marca_temporal1 = currentDate + " " + horas;
      const response = await fetch('/api/pago-honorarios', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          marca_temporal: marca_temporal1.toString(),
          id_cliente: datosPago.id_cliente.toString(),
          concepto: datosPago.concepto,
          pago: datosPago.pago,
          mes_pago: datosPago.mes_pago,
          year_pago: datosPago.year_pago,
          correo_empleado: datosPago.correo_empleado,
          fecha_realizacion_pago: datosPago.fecha_realizacion_pago
        }),
      });

      if (response.ok) {
        Swal.fire({
          icon: 'success',
          title: '¡Éxito!',
          text: 'Pago registrado correctamente',
          timer: 2000,
          showConfirmButton: false,
          color: "white",
          background: "#0d0d0e",
          customClass: {
            popup: 'rounded-3xl border border-zinc-800 p-6'
          }
        });

        router.refresh();
        if (onPagoRealizado) {
          onPagoRealizado();
        }
      } else {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Error al registrar el pago');
      }
    } catch (error) {
      console.error('Error al registrar pago:', error);
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: error instanceof Error ? error.message : 'Error al registrar el pago',
        color: "white",
        background: "#0d0d0e",
        buttonsStyling: false,
        customClass: {
          popup: 'rounded-3xl border border-zinc-800 p-6',
          title: 'text-xl font-bold tracking-tight text-white pt-2',
          confirmButton: 'px-5 py-2.5 rounded-xl font-semibold bg-[#008fcb] hover:bg-[#007cb0] text-white transition-colors duration-150 text-sm cursor-pointer'
        }
      });
    }
  };

  return (
    <button
      onClick={handlePagar}
      disabled={loading}
      className="relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-full group bg-gradient-to-br from-green-400 to-blue-600 group-hover:from-green-400 group-hover:to-blue-600 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-green-200 dark:focus:ring-green-800"
    >
      <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-full group-hover:bg-transparent">
        {loading ? 'Cargando...' : 'Pagar Honorarios'}
      </span>
    </button>
  );
}