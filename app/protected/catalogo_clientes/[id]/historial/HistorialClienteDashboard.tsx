"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import dynamic from "next/dynamic";
import { FaArrowLeft, FaCalendarAlt, FaUser } from "react-icons/fa";

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
