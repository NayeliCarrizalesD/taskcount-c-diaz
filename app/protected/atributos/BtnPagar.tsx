import { useState } from 'react';
import Swal from 'sweetalert2';
import { useEffect } from 'react';
import withReactContent from 'sweetalert2-react-content';
import { InputCorreoUsuarioModal } from './InputCorreoUsuarioModal';

const MySwal = withReactContent(Swal);

export function BtnPagar({ cliente, onPagoRealizado }: {
  cliente: any;
  onPagoRealizado?: () => void;
}) {
const [loading, setLoading] = useState(false);
const [correoEmpleado, setCorreoEmpleado] = useState("");

// Fetch correoUsuario on mount

useEffect(() => {
  const fetchCorreoUsuario = async () => {
    try {
      const usuarioRes = await fetch('/api/usuario-actual');
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
            confirmButtonText: 'Entendido'
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
      const yearActual = fechaActual.getFullYear();
      // Mostrar modal con información
      const result = await MySwal.fire({
        title: 'Registrar Pago de Honorarios',
        html: `
          <div class="text-left space-y-4">
            <div class="bg-cyan-900 p-3 rounded-xl">
              <strong>Cliente:</strong> ${cliente.nombre_cliente || 'Sin nombre'}<br>
              <strong>Concepto:</strong> ${configData.concepto}<br>
              <strong>Monto configurado:</strong> $${configData.pago}<br>
              <strong>Último mes pagado:</strong> ${ultimoMesPagado}
            </div>
            
            <div>
              <label class="block text-sm font-medium mb-2">Mes a pagar:</label>
              <select id="mes-pago" class="swal2-input bg-black">
                <option value="">Seleccionar mes</option>
                ${meses.slice(1).map((mes, index) =>
          `<option value="${index + 1}" ${index + 1 === mesActual ? 'selected' : ''}>${mes}</option>`
        ).join('')}
              </select>
            </div>
            
            <div>
              <label class="block text-sm font-medium mb-2">Año:</label>
              <input id="year-pago" type="number" class="swal2-input" value="${yearActual}" min="2020" max="2030">
            </div>
            
            <div>
              <label class="block text-sm font-medium mb-2">Monto:</label>
              <input id="monto-pago" type="number" class="swal2-input" value="${configData.pago}" step="0.01">
            </div>
            
            <div>
              <label class="block text-sm font-medium mb-2" for="correo-empleado">Correo empleado:</label>
              <input id="correo-empleado" type="email" class="swal2-input" value="${correoEmpleado}" />
            </div>
          </div>
        `,
        width: '500px',
        showCancelButton: true,
        color: "white",
        background: "black",
        customClass: {
          popup: 'border-radius-0',
          confirmButton: 'border-radius-0',
          cancelButton: 'border-radius-0'
        },
        confirmButtonText: 'Registrar Pago',
        confirmButtonColor: '#3085d6',
        cancelButtonText: 'Cancelar',
        cancelButtonColor: '#d33',
        preConfirm: () => {
          const mes = (document.getElementById('mes-pago') as HTMLSelectElement).value;
          const year = (document.getElementById('year-pago') as HTMLInputElement).value;
          const monto = (document.getElementById('monto-pago') as HTMLInputElement).value;
          const correoEmpleado = (document.getElementById('correo-empleado') as HTMLInputElement).value;

          if (!mes || !year || !monto || !correoEmpleado) {
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
            correo_empleado: correoEmpleado
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
        background: "black",
        customClass: {
          popup: 'border-radius-0'
        },
        text: error instanceof Error ? error.message : 'Error al cargar datos del cliente'
      });
    } finally {
      setLoading(false);
    }
  };

  const registrarPago = async (datosPago: any) => {
    try {
      const response = await fetch('/api/pago-honorarios', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          marca_temporal: new Date().toISOString(),
          id_cliente: datosPago.id_cliente.toString(),
          concepto: datosPago.concepto,
          pago: datosPago.pago,
          mes_pago: datosPago.mes_pago,
          year_pago: datosPago.year_pago,
          correo_empleado: datosPago.correo_empleado
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
          background: "black",
          customClass: {
            popup: 'border-radius-0'
          }
        });

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
        background: "black",
        customClass: {
          popup: 'border-radius-0'
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