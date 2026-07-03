"use client";

import { useMemo } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  ChartOptions,
} from "chart.js";
import { Bar, Doughnut } from "react-chartjs-2";

// Registrar componentes de Chart.js
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

interface Pago {
  id_pago: number;
  marca_temporal: string | null;
  concepto: string | null;
  pago: string | null;
  mes_pago: number | null;
  year_pago: string | null;
  correo_empleado: string | null;
  fecha_realizacion_pago?: string | null;
  estatus?: string | null;
}

interface PaymentChartProps {
  pagos: Pago[];
  year: string;
}

export default function PaymentChart({ pagos, year }: PaymentChartProps) {
  // 1. Procesamiento para la gráfica de Dona (Doughnut): Distribución por Concepto
  const doughnutData = useMemo(() => {
    const conceptsMap: Record<string, number> = {};
    let totalCount = 0;

    const activePagos = pagos.filter(p => p.estatus !== 'cancelado');

    activePagos.forEach((pago) => {
      const rawConcept = pago.concepto || "Pago Honorarios";
      conceptsMap[rawConcept] = (conceptsMap[rawConcept] || 0) + 1;
      totalCount++;
    });

    const labels = Object.keys(conceptsMap);
    const data = Object.values(conceptsMap);

    // Paleta de colores atractiva para el modo oscuro
    const backgroundColors = [
      "rgba(14, 165, 233, 0.8)",  // sky-500
      "rgba(16, 185, 129, 0.8)",  // emerald-500
      "rgba(245, 158, 11, 0.8)",  // amber-500
      "rgba(236, 72, 153, 0.8)",  // pink-500
      "rgba(139, 92, 246, 0.8)",  // violet-500
    ];

    const borderColors = [
      "rgb(14, 165, 233)",
      "rgb(16, 185, 129)",
      "rgb(245, 158, 11)",
      "rgb(236, 72, 153)",
      "rgb(139, 92, 246)",
    ];

    return {
      totalCount,
      chartData: {
        labels: labels.length > 0 ? labels : ["Sin Pagos"],
        datasets: [
          {
            data: data.length > 0 ? data : [0],
            backgroundColor: labels.length > 0 ? backgroundColors.slice(0, labels.length) : ["rgba(156, 163, 175, 0.2)"],
            borderColor: labels.length > 0 ? borderColors.slice(0, labels.length) : ["rgb(156, 163, 175)"],
            borderWidth: 2,
          },
        ],
      },
    };
  }, [pagos]);

  // 2. Procesamiento para la gráfica de Barras: Sumatorias Mensuales
  const barData = useMemo(() => {
    const monthlySums = Array(12).fill(0);

    const activePagos = pagos.filter(p => p.estatus !== 'cancelado');

    activePagos.forEach((pago) => {
      const mesIndex = pago.mes_pago !== null && pago.mes_pago !== undefined ? pago.mes_pago - 1 : -1; // 1-12 a 0-11
      if (mesIndex >= 0 && mesIndex < 12) {
        monthlySums[mesIndex] += Number(pago.pago) || 0;
      }
    });

    return {
      labels: [
        "Ene",
        "Feb",
        "Mar",
        "Abr",
        "May",
        "Jun",
        "Jul",
        "Ago",
        "Sep",
        "Oct",
        "Nov",
        "Dic",
      ],
      datasets: [
        {
          label: "Monto Pagado ($)",
          data: monthlySums,
          backgroundColor: "rgba(14, 165, 233, 0.75)", // Celeste sky-500 con opacidad
          borderColor: "rgb(14, 165, 233)",
          borderWidth: 1.5,
          borderRadius: 8, // Barras redondeadas premium
          hoverBackgroundColor: "rgba(14, 165, 233, 0.95)",
        },
      ],
    };
  }, [pagos]);

  // Configuración de Opciones de la Gráfica de Dona
  const doughnutOptions: ChartOptions<"doughnut"> = {
    responsive: true,
    maintainAspectRatio: false,
    cutout: "70%",
    plugins: {
      legend: {
        display: true,
        position: "bottom",
        labels: {
          color: "#d1d5db", // gray-300
          boxWidth: 12,
          font: {
            size: 11,
          },
        },
      },
      tooltip: {
        backgroundColor: "#18181b", // zinc-900
        titleColor: "#ffffff",
        bodyColor: "#e4e4e7",
        borderColor: "#3f3f46", // zinc-700
        borderWidth: 1,
      },
    },
  };

  // Configuración de Opciones de la Gráfica de Barras
  const barOptions: ChartOptions<"bar"> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false, // Ocultar leyenda para verse más limpio
      },
      tooltip: {
        backgroundColor: "#18181b",
        titleColor: "#ffffff",
        bodyColor: "#e4e4e7",
        borderColor: "#3f3f46",
        borderWidth: 1,
        callbacks: {
          label: (context) => {
            const val = context.raw as number;
            return ` Total: $${val.toLocaleString("es-MX", { minimumFractionDigits: 2 })}`;
          },
        },
      },
    },
    scales: {
      x: {
        grid: {
          display: false,
        },
        ticks: {
          color: "#9ca3af", // gray-400
          font: {
            size: 11,
          },
        },
      },
      y: {
        grid: {
          color: "rgba(63, 63, 70, 0.3)", // zinc-700 con baja opacidad
        },
        ticks: {
          color: "#9ca3af",
          font: {
            size: 10,
          },
          callback: (value) => `$${Number(value).toLocaleString("es-MX")}`,
        },
      },
    },
  };

  return (
    <>
      {/* Gráfica Circular (Dona) */}
      <div className="lg:col-span-4 bg-zinc-800 rounded-3xl p-5 shadow-xl border border-zinc-700/50 flex flex-col items-center">
        <h3 className="text-sm font-semibold text-stone-300 self-start mb-4">
          Resumen de Pagos
        </h3>
        <div className="relative w-full h-56 flex items-center justify-center">
          <Doughnut data={doughnutData.chartData} options={doughnutOptions} />
          {/* Texto dinámico en el centro de la Dona */}
          <div className="absolute flex flex-col items-center justify-center">
            <span className="text-stone-400 text-xs font-semibold uppercase tracking-wider">
              Pagados
            </span>
            <span className="text-3xl font-extrabold text-white">
              {doughnutData.totalCount}
            </span>
          </div>
        </div>
      </div>

      {/* Gráfica de Barras */}
      <div className="lg:col-span-8 bg-zinc-800 rounded-3xl p-5 shadow-xl border border-zinc-700/50">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-sm font-semibold text-stone-300">
            Distribución Mensual de Pagos ({year})
          </h3>
          <span className="text-xs text-sky-400 font-medium">
            Total Anual: $
            {pagos
              .filter(p => p.estatus !== 'cancelado')
              .reduce((acc, curr) => acc + (Number(curr.pago) || 0), 0)
              .toLocaleString("es-MX", {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}
          </span>
        </div>
        <div className="h-56">
          <Bar data={barData} options={barOptions} />
        </div>
      </div>
    </>
  );
}
