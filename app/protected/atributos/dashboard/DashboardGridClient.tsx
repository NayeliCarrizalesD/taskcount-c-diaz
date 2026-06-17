"use client";

import React, { useMemo } from "react";
import { 
  ResponsiveContainer, 
  LineChart, 
  Line, 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  AreaChart, 
  Area, 
  PieChart, 
  Pie, 
  Cell 
} from "recharts";
import { 
  FaCoins, 
  FaFileInvoiceDollar, 
  FaUserFriends, 
  FaBoxOpen, 
  FaChartLine, 
  FaCalendarAlt, 
  FaChartPie 
} from "react-icons/fa";

interface Pago {
  id_pago: number;
  pago: string | null;
  concepto: string | null;
  mes_pago: number | null;
  year_pago: string | null;
}

interface Cliente {
  id_cliente: number;
  nombre_cliente: string | null;
  fecha_alta: string | null;
}

interface Concepto {
  id_producto: number;
  nombre_producto_servicio: string | null;
}

interface DashboardGridClientProps {
  clientes: Cliente[];
  pagos: Pago[];
  conceptos: Concepto[];
  checadorForm: React.ReactNode;
}

const COLORS = ["#a78bfa", "#22d3ee", "#34d399", "#fbbf24", "#f43f5e"];

export default function DashboardGridClient({ 
  clientes, 
  pagos, 
  conceptos,
  checadorForm 
}: DashboardGridClientProps) {

  // 1. Estadísticas Generales
  const stats = useMemo(() => {
    const totalGanancias = pagos.reduce((sum, p) => sum + (Number(p.pago) || 0), 0);
    return {
      ganancias: totalGanancias,
      cantidadPagos: pagos.length,
      cantidadClientes: clientes.length,
      cantidadConceptos: conceptos.length
    };
  }, [pagos, clientes, conceptos]);

  // 2. Ganancias Mensuales (Año Actual)
  const gananciasMensuales = useMemo(() => {
    const yearActual = new Date().getFullYear().toString();
    const meses = ["Ene", "Feb", "Mar", "Abr", "May", "Jun", "Jul", "Ago", "Sep", "Oct", "Nov", "Dic"];
    const ganancias = meses.map(m => ({ name: m, Ganancias: 0 }));

    pagos.forEach(p => {
      if (p.year_pago === yearActual && p.mes_pago && p.mes_pago >= 1 && p.mes_pago <= 12) {
        ganancias[p.mes_pago - 1].Ganancias += Number(p.pago) || 0;
      }
    });

    return ganancias;
  }, [pagos]);

  // 3. Clientes Registrados por Año
  const clientesPorAno = useMemo(() => {
    const conteo: Record<string, number> = {};
    
    clientes.forEach(c => {
      const year = c.fecha_alta?.match(/\d{4}/)?.[0] || "Desconocido";
      conteo[year] = (conteo[year] || 0) + 1;
    });

    return Object.keys(conteo)
      .map(year => ({ name: year, Clientes: conteo[year] }))
      .sort((a, b) => a.name.localeCompare(b.name));
  }, [clientes]);

  // 4. Ganancias Totales por Año (Crecimiento)
  const gananciasPorAno = useMemo(() => {
    const conteo: Record<string, number> = {};
    
    pagos.forEach(p => {
      const year = p.year_pago || "Desconocido";
      conteo[year] = (conteo[year] || 0) + (Number(p.pago) || 0);
    });

    return Object.keys(conteo)
      .map(year => ({ name: year, Ganancias: conteo[year] }))
      .sort((a, b) => a.name.localeCompare(b.name));
  }, [pagos]);

  // 5. Top Conceptos / Productos Vendidos
  const topConceptos = useMemo(() => {
    const conteo: Record<string, number> = {};
    let totalPagoConceptos = 0;

    pagos.forEach(p => {
      const concepto = p.concepto || "Pago Honorarios";
      const monto = Number(p.pago) || 0;
      conteo[concepto] = (conteo[concepto] || 0) + monto;
      totalPagoConceptos += monto;
    });

    const items = Object.keys(conteo).map(name => ({
      name,
      value: conteo[name],
      percentage: totalPagoConceptos > 0 ? Math.round((conteo[name] / totalPagoConceptos) * 100) : 0
    }));

    return items.sort((a, b) => b.value - a.value).slice(0, 4);
  }, [pagos]);

  return (
    <div className="w-full flex flex-col gap-6 py-2">
      {/* Tarjetas de Métricas Principales */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Card 1: Ventas Totales */}
        <div className="bg-slate-800 border border-slate-700/40 rounded-3xl p-6 shadow-lg flex items-center gap-4 hover:border-purple-500/50 transition-all duration-300">
          <div className="p-4 rounded-2xl bg-purple-500/10 text-purple-400 text-2xl">
            <FaCoins />
          </div>
          <div>
            <span className="text-xs text-slate-400 font-medium uppercase tracking-wider block">Ganancias Totales</span>
            <span className="text-2xl font-bold text-white mt-1 block">
              ${stats.ganancias.toLocaleString("es-MX", { minimumFractionDigits: 2 })}
            </span>
          </div>
        </div>

        {/* Card 2: Cantidad de Pagos */}
        <div className="bg-slate-800 border border-slate-700/40 rounded-3xl p-6 shadow-lg flex items-center gap-4 hover:border-cyan-500/50 transition-all duration-300">
          <div className="p-4 rounded-2xl bg-cyan-500/10 text-cyan-400 text-2xl">
            <FaFileInvoiceDollar />
          </div>
          <div>
            <span className="text-xs text-slate-400 font-medium uppercase tracking-wider block">Transacciones</span>
            <span className="text-2xl font-bold text-white mt-1 block">{stats.cantidadPagos}</span>
          </div>
        </div>

        {/* Card 3: Clientes */}
        <div className="bg-slate-800 border border-slate-700/40 rounded-3xl p-6 shadow-lg flex items-center gap-4 hover:border-emerald-500/50 transition-all duration-300">
          <div className="p-4 rounded-2xl bg-emerald-500/10 text-emerald-400 text-2xl">
            <FaUserFriends />
          </div>
          <div>
            <span className="text-xs text-slate-400 font-medium uppercase tracking-wider block">Clientes Registrados</span>
            <span className="text-2xl font-bold text-white mt-1 block">{stats.cantidadClientes}</span>
          </div>
        </div>

        {/* Card 4: Conceptos */}
        <div className="bg-slate-800 border border-slate-700/40 rounded-3xl p-6 shadow-lg flex items-center gap-4 hover:border-amber-500/50 transition-all duration-300">
          <div className="p-4 rounded-2xl bg-amber-500/10 text-amber-400 text-2xl">
            <FaBoxOpen />
          </div>
          <div>
            <span className="text-xs text-slate-400 font-medium uppercase tracking-wider block">Conceptos</span>
            <span className="text-2xl font-bold text-white mt-1 block">{stats.cantidadConceptos}</span>
          </div>
        </div>
      </div>

      {/* Grid de Reportes y Gráficos */}
      <div className="grid grid-cols-12 gap-4">
        {/* Panel Izquierdo Principal (col-span-8) */}
        <div className="col-span-12 lg:col-span-8 flex flex-col gap-4">
          
          {/* Fila 1: Checador Form (Para conservar la entrada del checador del usuario en el dashboard) */}
          <div className="w-full">
            {checadorForm}
          </div>

          {/* Fila 2: Ganancias Mensuales (LineChart) */}
          <div className="bg-slate-800 border border-slate-700/40 rounded-3xl p-6 shadow-lg">
            <div className="flex items-center gap-2 mb-4 border-b border-slate-700 pb-2">
              <FaChartLine className="text-cyan-400 text-lg" />
              <h3 className="text-base font-bold text-white">Flujo Mensual de Ganancias ({new Date().getFullYear()})</h3>
            </div>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={gananciasMensuales} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <defs>
                    <linearGradient id="colorGanancias" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#22d3ee" stopOpacity={0.4} />
                      <stop offset="95%" stopColor="#22d3ee" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#334155" opacity={0.3} />
                  <XAxis dataKey="name" stroke="#94a3b8" fontSize={11} tickLine={false} />
                  <YAxis stroke="#94a3b8" fontSize={11} tickLine={false} />
                  <Tooltip 
                    contentStyle={{ backgroundColor: "#0f172a", borderColor: "#334155", borderRadius: "12px", color: "white" }} 
                    formatter={(value) => [`$${value.toLocaleString()}`, "Ganancias"]}
                  />
                  <Area type="monotone" dataKey="Ganancias" stroke="#22d3ee" strokeWidth={2.5} fillOpacity={1} fill="url(#colorGanancias)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Fila 3: Top Productos / Conceptos */}
          <div className="bg-slate-800 border border-slate-700/40 rounded-3xl p-6 shadow-lg">
            <h3 className="text-base font-bold text-white border-b border-slate-700 pb-2 mb-4">
              Conceptos más Vendidos (Popularidad)
            </h3>
            <div className="flex flex-col gap-4">
              {topConceptos.length === 0 ? (
                <p className="text-sm text-slate-400">No hay transacciones registradas.</p>
              ) : (
                topConceptos.map((item, index) => (
                  <div key={item.name} className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <div className="flex items-center gap-3 min-w-[150px]">
                      <span className="text-xs font-mono font-bold text-slate-500">0{index + 1}</span>
                      <span className="text-sm font-medium text-slate-200">{item.name}</span>
                    </div>
                    {/* Progress Bar */}
                    <div className="flex-1 h-2 bg-slate-700/60 rounded-full overflow-hidden mx-2 max-w-md">
                      <div 
                        className="h-full rounded-full transition-all duration-500"
                        style={{ 
                          width: `${item.percentage}%`,
                          backgroundColor: COLORS[index % COLORS.length]
                        }}
                      />
                    </div>
                    <div className="flex items-center gap-4">
                      <span className="text-xs text-slate-400 font-mono">${item.value.toLocaleString("es-MX")}</span>
                      <span className="text-xs px-2 py-0.5 rounded-full font-bold bg-slate-900 border border-slate-700 text-slate-300 font-mono">
                        {item.percentage}%
                      </span>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

        </div>

        {/* Panel Derecho de Resúmenes (col-span-4) */}
        <div className="col-span-12 lg:col-span-4 flex flex-col gap-4">
          
          {/* Tarjeta de Nivel: Clientes por Año (BarChart) */}
          <div className="bg-slate-800 border border-slate-700/40 rounded-3xl p-6 shadow-lg">
            <div className="flex items-center gap-2 mb-4 border-b border-slate-700 pb-2">
              <FaCalendarAlt className="text-purple-400 text-lg" />
              <h3 className="text-base font-bold text-white">Clientes Nuevos por Año</h3>
            </div>
            <div className="h-60">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={clientesPorAno} margin={{ top: 10, right: 10, left: -25, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#334155" opacity={0.2} />
                  <XAxis dataKey="name" stroke="#94a3b8" fontSize={11} tickLine={false} />
                  <YAxis stroke="#94a3b8" fontSize={11} tickLine={false} allowDecimals={false} />
                  <Tooltip 
                    contentStyle={{ backgroundColor: "#0f172a", borderColor: "#334155", borderRadius: "12px", color: "white" }}
                    formatter={(value) => [value, "Clientes Nuevos"]}
                  />
                  <Bar dataKey="Clientes" fill="#a78bfa" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Tarjeta de Ganancias por Año (Crecimiento Histórico) */}
          <div className="bg-slate-800 border border-slate-700/40 rounded-3xl p-6 shadow-lg">
            <div className="flex items-center gap-2 mb-4 border-b border-slate-700 pb-2">
              <FaChartPie className="text-emerald-400 text-lg" />
              <h3 className="text-base font-bold text-white">Distribución por Concepto</h3>
            </div>
            <div className="h-44 flex items-center justify-center">
              {topConceptos.length === 0 ? (
                <p className="text-sm text-slate-400">Sin datos de ingresos</p>
              ) : (
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={topConceptos}
                      cx="50%"
                      cy="50%"
                      innerRadius={50}
                      outerRadius={70}
                      paddingAngle={3}
                      dataKey="value"
                    >
                      {topConceptos.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip 
                      contentStyle={{ backgroundColor: "#0f172a", borderColor: "#334155", borderRadius: "12px", color: "white" }}
                      formatter={(value) => `$${value.toLocaleString()}`}
                    />
                  </PieChart>
                </ResponsiveContainer>
              )}
            </div>
            <div className="flex flex-wrap gap-x-4 gap-y-2 justify-center mt-3">
              {topConceptos.map((item, index) => (
                <div key={item.name} className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: COLORS[index % COLORS.length] }} />
                  <span className="text-xs text-slate-300 font-medium truncate max-w-[80px]" title={item.name}>
                    {item.name}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Tarjeta de Ingresos Anuales (Crecimiento Histórico) */}
          <div className="bg-slate-800 border border-slate-700/40 rounded-3xl p-6 shadow-lg">
            <h3 className="text-base font-bold text-white border-b border-slate-700 pb-2 mb-4">
              Crecimiento Anual ($)
            </h3>
            <div className="h-48">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={gananciasPorAno} margin={{ top: 10, right: 10, left: -25, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#334155" opacity={0.2} />
                  <XAxis dataKey="name" stroke="#94a3b8" fontSize={11} tickLine={false} />
                  <YAxis stroke="#94a3b8" fontSize={11} tickLine={false} />
                  <Tooltip 
                    contentStyle={{ backgroundColor: "#0f172a", borderColor: "#334155", borderRadius: "12px", color: "white" }}
                    formatter={(value) => [`$${value.toLocaleString()}`, "Ingresos"]}
                  />
                  <Bar dataKey="Ganancias" fill="#34d399" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
