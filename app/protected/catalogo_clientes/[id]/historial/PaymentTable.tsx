"use client";

import { useMemo } from "react";
import { FaFileInvoiceDollar, FaCheckCircle, FaExclamationTriangle } from "react-icons/fa";

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
}

interface PaymentTableProps {
  pagos: Pago[];
}

export default function PaymentTable({ pagos }: PaymentTableProps) {
  // Función auxiliar para formatear la fecha de realización de YYYY-MM-DD a DD/MM/YYYY
  const formatFechaRealizacion = (fecha: string | null | undefined) => {
    if (!fecha) return "No registrada";
    try {
      const parts = fecha.split("-");
      if (parts.length === 3) {
        return `${parts[2]}/${parts[1]}/${parts[0]}`;
      }
      return fecha;
    } catch {
      return fecha;
    }
  };

  // Función auxiliar para extraer fecha y hora legibles de la marca temporal
  const formatMarcaTemporal = (marca: string | null) => {
    if (!marca) return { fecha: "N/A", hora: "--:--:--" };
    try {
      const d = new Date(marca);
      if (isNaN(d.getTime())) {
        // Fallback en caso de que sea un string plano no-ISO
        return { fecha: marca, hora: "--:--:--" };
      }
      const fecha = d.toLocaleDateString("es-MX", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
      });
      const hora = d.toLocaleTimeString("es-MX", {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: false,
      });
      return { fecha, hora };
    } catch {
      return { fecha: marca, hora: "--:--:--" };
    }
  };

  const formattedPagos = useMemo(() => {
    return pagos.map((pago) => {
      const { fecha, hora } = formatMarcaTemporal(pago.marca_temporal);
      return {
        ...pago,
        fecha,
        hora,
      };
    });
  }, [pagos]);

  if (formattedPagos.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center p-8 bg-neutral-950/40 rounded-xl border border-zinc-700/50 text-stone-400">
        <FaExclamationTriangle className="text-amber-500 text-3xl mb-2" />
        <p className="text-sm font-medium">No se encontraron pagos registrados para este año.</p>
      </div>
    );
  }

  return (
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg w-full h-full max-h-[400px] overflow-y-auto rounded-lg bg-clip-border bg-zinc-900 my-2 scrollbar-thin">
      <table className="w-full text-sm text-left text-gray-200 bg-neutral-950 table-auto min-w-max">
        <thead className="text-xs text-gray-400 uppercase bg-zinc-900 sticky top-0 z-10">
          <tr>
            <th className="p-4 border-b border-neutral-700 text-slate-100 bg-zinc-900">ID Pago</th>
            <th className="p-4 border-b border-neutral-700 text-slate-100 bg-zinc-900">Concepto</th>
            <th className="p-4 border-b border-neutral-700 text-slate-100 bg-zinc-900">Fecha Sistema</th>
            <th className="p-4 border-b border-neutral-700 text-slate-100 bg-zinc-900">Hora</th>
            <th className="p-4 border-b border-neutral-700 text-slate-100 bg-zinc-900">F. Realización</th>
            <th className="p-4 border-b border-neutral-700 text-slate-100 bg-zinc-900">Cobrado</th>
            <th className="p-4 border-b border-neutral-700 text-slate-100 bg-zinc-900">Importe</th>
            <th className="p-4 border-b border-neutral-700 text-slate-100 bg-zinc-900">Registrado Por</th>
          </tr>
        </thead>
        <tbody>
          {formattedPagos.map((pago, index) => (
            <tr
              key={pago.id_pago}
              className={`border-b border-neutral-800 transition-colors duration-150 text-sm hover:bg-sky-950/70 hover:text-white ${
                index % 2 === 0 ? "bg-zinc-900" : "bg-zinc-900/60"
              }`}
            >
              <td className="p-4 font-semibold">
                <span className="inline-flex items-center gap-1.5 bg-neutral-900 text-sky-400 border border-neutral-700 text-xs px-2.5 py-1 rounded-md">
                  <FaFileInvoiceDollar /> #{pago.id_pago}
                </span>
              </td>
              <td className="p-4 font-medium text-stone-200">{pago.concepto || "Pago Honorarios"}</td>
              <td className="p-4 text-stone-300">{pago.fecha}</td>
              <td className="p-4 text-stone-400 font-mono text-xs">{pago.hora}</td>
              <td className="p-4 text-sky-300 font-medium">{formatFechaRealizacion(pago.fecha_realizacion_pago)}</td>
              <td className="p-4">
                <span className="inline-flex items-center gap-1 text-emerald-400 font-semibold text-xs bg-emerald-950/50 border border-emerald-800 px-2 py-0.5 rounded-full">
                  <FaCheckCircle className="text-xs" /> Sí
                </span>
              </td>
              <td className="p-4 font-bold text-white">
                $
                {(Number(pago.pago) || 0).toLocaleString("es-MX", {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}{" "}
                MXN
              </td>
              <td className="p-4 text-stone-400 text-xs truncate max-w-[180px]" title={pago.correo_empleado || undefined}>
                {pago.correo_empleado || "Sistema"}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
