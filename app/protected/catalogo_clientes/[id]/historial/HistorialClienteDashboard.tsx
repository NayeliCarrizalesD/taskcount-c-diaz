"use client";

import { useState, useMemo, useTransition, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import dynamic from "next/dynamic";
import { FaArrowLeft, FaCalendarAlt, FaUser, FaPlus } from "react-icons/fa";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const PaymentChart = dynamic(() => import("./PaymentChart"), { ssr: false });
const PaymentTable = dynamic(() => import("./PaymentTable"), { ssr: false });

interface Cliente {
  id_cliente: number;
  nombre_cliente: string | null;
  telefono_cliente: string | null;
  correo_cliente: string | null;
  rfc: string | null;
  fecha_alta: string | null;
  marca_temporal?: string | null;
  correo_empleado?: string | null;
}

interface Pago {
  id_pago: number;
  marca_temporal: string | null;
  id_cliente: string | null;
  concepto: string | null;
  pago: string | null;
  mes_pago: number | null;
  year_pago: string | null;
  correo_empleado: string | null;
  fecha_realizacion_pago?: string | null;
  estatus?: string | null;
}

interface HistorialClienteDashboardProps {
  cliente: Cliente | null;
  inicialPagos: Pago[];
}

export default function HistorialClienteDashboard({
  cliente,
  inicialPagos,
}: HistorialClienteDashboardProps) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (!isPending) {
      setIsSubmitting(false);
    }
  }, [isPending]);

  const handleAgregarPago = async () => {
    if (!cliente) return;
    try {
      setIsSubmitting(true);

      // Obtener datos del usuario actual y configuración de honorarios en paralelo
      const [usuarioRes, configRes] = await Promise.all([
        fetch('/api/usuario-actual'),
        fetch(`/api/config-cliente-honorarios/${cliente.id_cliente}`)
      ]);

      if (!configRes.ok) {
        setIsSubmitting(false);
        if (configRes.status === 404) {
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

      const configData = await configRes.json();
      
      let correoEmpleado = "";
      if (usuarioRes.ok) {
        const usuario = await usuarioRes.json();
        correoEmpleado = usuario.correo || "";
      }

      let ultimoPago = null;
      try {
        const ultimoPagoResponse = await fetch(`/api/ultimo-pago/${cliente.id_cliente}`);
        if (ultimoPagoResponse.ok) {
          ultimoPago = await ultimoPagoResponse.json();
        }
      } catch (error) {
        console.log('No hay pagos anteriores para este cliente');
      }

      setIsSubmitting(false);

      const meses = [
        "", "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
        "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"
      ];

      const ultimoMesPagado = ultimoPago
        ? `${meses[parseInt(ultimoPago.mes_pago)]} ${ultimoPago.year_pago}`
        : 'No hay pagos registrados';

      const fechaActual = new Date();
      const mesActual = fechaActual.getMonth() + 1;
      const currentYear = new Date().getFullYear();
      const yearOptions = Array.from({ length: 9 }, (_, i) => {
        const year = currentYear - i;
        return `<option value="${year}">${year}</option>`;
      }).join('');

      const MySwal = withReactContent(Swal);
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
          const correoEmpleadoInput = input ? input.value : "";
          const fechaRealizacionInput = document.getElementById('fecha_realizacion_pago') as HTMLInputElement;
          const fechaRealizacion = fechaRealizacionInput ? fechaRealizacionInput.value : "";

          if (!mes || !year || !monto || !correoEmpleadoInput || !fechaRealizacion) {
            Swal.showValidationMessage('Todos los campos son obligatorios');
            return false;
          }

          if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(correoEmpleadoInput)) {
            Swal.showValidationMessage('El formato del correo no es válido');
            return false;
          }

          return {
            id_cliente: cliente.id_cliente,
            concepto: configData.concepto,
            mes_pago: parseInt(mes),
            year_pago: parseInt(year),
            pago: parseFloat(monto),
            correo_empleado: correoEmpleadoInput,
            fecha_realizacion_pago: fechaRealizacion
          };
        }
      });

      if (result.isConfirmed && result.value) {
        setIsSubmitting(true);

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
            id_cliente: result.value.id_cliente.toString(),
            concepto: result.value.concepto,
            pago: result.value.pago,
            mes_pago: result.value.mes_pago,
            year_pago: result.value.year_pago,
            correo_empleado: result.value.correo_empleado,
            fecha_realizacion_pago: result.value.fecha_realizacion_pago
          }),
        });

        if (response.ok) {
          startTransition(() => {
            router.refresh();
          });

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
        } else {
          const errorData = await response.json();
          throw new Error(errorData.error || 'Error al registrar el pago');
        }
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
        text: error instanceof Error ? error.message : 'Error al procesar el pago'
      });
      setIsSubmitting(false);
    }
  };

  // Obtener los años disponibles a partir de los pagos registrados (excluyendo cancelados)
  const availableYears = useMemo(() => {
    const years = new Set<string>();
    if (Array.isArray(inicialPagos)) {
      inicialPagos.forEach((pago) => {
        if (pago.year_pago && pago.estatus !== 'cancelado') {
          years.add(pago.year_pago);
        }
      });
    }
    // Añadir el año actual por si acaso no hay pagos
    years.add(new Date().getFullYear().toString());
    return Array.from(years).sort((a, b) => b.localeCompare(a));
  }, [inicialPagos]);

  // Año seleccionado para filtrar (por defecto el más reciente con transacciones activas, o el año actual)
  const [selectedYear, setSelectedYear] = useState<string>(() => {
    if (Array.isArray(inicialPagos) && inicialPagos.length > 0) {
      // Intentar obtener el año del pago más reciente que no esté cancelado
      const yearsWithPayments = inicialPagos
        .filter((p) => p.estatus !== 'cancelado')
        .map((p) => p.year_pago)
        .filter((y): y is string => !!y);
      if (yearsWithPayments.length > 0) {
        return yearsWithPayments.sort((a, b) => b.localeCompare(a))[0];
      }
    }
    return new Date().getFullYear().toString();
  });

  // Filtrar los pagos por el año seleccionado
  const filteredPagos = useMemo(() => {
    if (!Array.isArray(inicialPagos)) return [];
    return inicialPagos.filter((pago) => pago.year_pago === selectedYear);
  }, [inicialPagos, selectedYear]);

  if (!cliente) {
    return (
      <div className="bg-zinc-800 rounded-3xl p-8 text-center shadow-xl my-5">
        <h2 className="text-xl font-bold text-red-400">Cliente no encontrado</h2>
        <p className="text-gray-300 mt-2">
          El cliente solicitado no existe o fue eliminado del catálogo.
        </p>
        <Link href="/protected/catalogo_clientes" className="mt-4 inline-flex items-center gap-2 text-sm bg-zinc-900 px-4 py-2 rounded-full hover:bg-black transition-colors">
          <FaArrowLeft /> Regresar al catálogo
        </Link>
      </div>
    );
  }

  return (
    <div className="my-3 space-y-6">
      {/* Spinner a pantalla completa */}
      {(isSubmitting || isPending) && (
        <div className="fixed inset-0 bg-black/75 backdrop-blur-sm z-[99999] flex flex-col items-center justify-center space-y-4 pointer-events-auto select-none">
          <div className="w-16 h-16 border-4 border-sky-400 border-t-transparent rounded-full animate-spin"></div>
          <h2 className="text-xl font-semibold text-white">Procesando pago...</h2>
          <p className="text-sm text-stone-400">Por favor espere, estamos actualizando la información.</p>
        </div>
      )}

      {/* Breadcrumb & Navigation */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <span className="text-xs text-stone-300 tracking-wider uppercase">
            Módulo Administrativo / Clientes
          </span>
          <h1 className="text-2xl font-bold tracking-tight text-white flex items-center gap-2">
            <FaUser className="text-sky-400 text-xl" /> Historial de Pagos:{" "}
            <span className="text-sky-300">{cliente.nombre_cliente}</span>
          </h1>
        </div>

        <div className="flex items-center gap-3">
          {/* Selector de Año */}
          <div className="flex items-center gap-2 bg-neutral-900 border border-neutral-700 rounded-full px-3 py-1.5 text-sm">
            <FaCalendarAlt className="text-sky-400" />
            <span className="text-stone-300 font-medium">Año:</span>
            <select
              value={selectedYear}
              onChange={(e) => setSelectedYear(e.target.value)}
              className="bg-transparent border-none text-white font-bold focus:ring-0 cursor-pointer pr-4"
            >
              {availableYears.map((year) => (
                <option key={year} value={year} className="bg-neutral-900 text-white">
                  {year}
                </option>
              ))}
            </select>
          </div>

          {/* Botón Agregar Pago de Honorarios */}
          <button
            onClick={handleAgregarPago}
            className="inline-flex items-center gap-2 text-sm bg-[#008fcb] hover:bg-[#007cb0] text-white px-4 py-2 rounded-full transition-colors font-semibold shadow-md cursor-pointer"
          >
            <FaPlus /> Agregar Pago de Honorarios
          </button>

          {/* Regresar */}
          <Link
            href="/protected/catalogo_clientes"
            className="inline-flex items-center gap-2 text-sm bg-neutral-900 border border-neutral-700 px-4 py-2 rounded-full hover:bg-black transition-colors font-medium text-stone-300 hover:text-white"
          >
            <FaArrowLeft /> Regresar
          </Link>
        </div>
      </div>

      {/* Info Tarjeta del Cliente */}
      <div className="bg-zinc-800 rounded-3xl p-6 shadow-xl border border-zinc-700/50">
        <h2 className="text-xs font-bold text-sky-400 uppercase tracking-wider mb-3">
          Datos de Facturación del Cliente
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-sm">
          <div>
            <span className="text-stone-400 block text-xs">ID Cliente:</span>
            <span className="font-semibold text-white block mt-0.5">
              {cliente.id_cliente}
            </span>
          </div>
          <div>
            <span className="text-stone-400 block text-xs">RFC:</span>
            <span className="font-semibold text-white block mt-0.5 uppercase">
              {cliente.rfc || "N/A"}
            </span>
          </div>
          <div>
            <span className="text-stone-400 block text-xs">Teléfono:</span>
            <span className="font-semibold text-white block mt-0.5">
              {cliente.telefono_cliente || "N/A"}
            </span>
          </div>
          <div>
            <span className="text-stone-400 block text-xs">Correo Electrónico:</span>
            <span className="font-semibold text-white block mt-0.5 truncate">
              {cliente.correo_cliente || "N/A"}
            </span>
          </div>
        </div>
      </div>

      {/* Bloque de Gráficas */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        <PaymentChart pagos={filteredPagos} year={selectedYear} />
      </div>

      {/* Bloque de Tabla */}
      <div className="bg-zinc-800 rounded-3xl p-6 shadow-xl border border-zinc-700/50">
        <h2 className="text-lg font-semibold text-white mb-3">
          Detalle de Transacciones ({selectedYear})
        </h2>
        <PaymentTable pagos={filteredPagos} />
      </div>
    </div>
  );
}
