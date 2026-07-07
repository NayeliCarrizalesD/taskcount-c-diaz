"use client";

import React, { useMemo, useState } from "react";
import { 
  ResponsiveContainer, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  AreaChart, 
  Area, 
  BarChart, 
  Bar,
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
  FaChartPie,
  FaFilter
} from "react-icons/fa";

interface Pago {
  id_pago: number;
  pago: string | null;
  concepto: string | null;
  mes_pago: number | null;
  year_pago: string | null;
  fecha_realizacion_pago?: string | null;
  estatus?: string | null;
}

interface Cliente {
  id_cliente: number;
  nombre_cliente: string | null;
  fecha_alta: string | null;
  estado?: string | null;
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

// Helper para extraer el día de una fecha en formato YYYY-MM-DD o DD/MM/YYYY
const getDayFromDate = (dateStr: string | null | undefined): number | null => {
  if (!dateStr) return null;
  const dashParts = dateStr.split('-');
  if (dashParts.length === 3) {
    if (dashParts[0].length === 4) {
      return Number(dashParts[2]); // YYYY-MM-DD
    } else {
      return Number(dashParts[0]); // DD-MM-YYYY
    }
  }
  const slashParts = dateStr.split('/');
  if (slashParts.length === 3) {
    if (slashParts[2].length === 4) {
      return Number(slashParts[0]); // DD/MM/YYYY
    } else {
      return Number(slashParts[2]); // YYYY/MM/DD
    }
  }
  return null;
};

// Helper para parsear la fecha de alta del cliente de forma robusta
const parseClientDate = (dateStr: string | null | undefined) => {
  if (!dateStr) return { year: null, month: null, day: null };
  
  const dashParts = dateStr.split('-');
  if (dashParts.length === 3) {
    if (dashParts[0].length === 4) {
      return { year: Number(dashParts[0]), month: Number(dashParts[1]), day: Number(dashParts[2]) };
    } else {
      return { year: Number(dashParts[2]), month: Number(dashParts[1]), day: Number(dashParts[0]) };
    }
  }
  
  const slashParts = dateStr.split('/');
  if (slashParts.length === 3) {
    if (slashParts[2].length === 4) {
      return { year: Number(slashParts[2]), month: Number(slashParts[1]), day: Number(slashParts[0]) };
    } else {
      return { year: Number(slashParts[0]), month: Number(slashParts[1]), day: Number(slashParts[2]) };
    }
  }
  
  const yearMatch = dateStr.match(/\d{4}/);
  const year = yearMatch ? Number(yearMatch[0]) : null;
  return { year, month: null, day: null };
};

export default function DashboardGridClient({ 
  clientes, 
  pagos, 
  conceptos,
  checadorForm 
}: DashboardGridClientProps) {

  // Estados de filtros
  const [selectedYear, setSelectedYear] = useState<string>("Todos");
  const [selectedMonth, setSelectedMonth] = useState<string>("Todos");

  // Obtener listado dinámico de años disponibles en los datos
  const availableYears = useMemo(() => {
    const years = new Set<string>();
    
    pagos.forEach(p => {
      if (p.year_pago && p.estatus !== 'cancelado') years.add(p.year_pago);
    });
    
    clientes.forEach(c => {
      const { year } = parseClientDate(c.fecha_alta);
      if (year) years.add(year.toString());
    });
    
    return Array.from(years).sort((a, b) => b.localeCompare(a));
  }, [pagos, clientes]);

  // Filtrar Pagos
  const filteredPagos = useMemo(() => {
    return pagos.filter(p => {
      if (p.estatus === 'cancelado') return false;
      const matchYear = selectedYear === "Todos" || p.year_pago === selectedYear;
      const matchMonth = selectedMonth === "Todos" || p.mes_pago?.toString() === selectedMonth;
      return matchYear && matchMonth;
    });
  }, [pagos, selectedYear, selectedMonth]);

  // Filtrar Clientes
  const filteredClientes = useMemo(() => {
    return clientes.filter(c => {
      const { year, month } = parseClientDate(c.fecha_alta);
      const matchYear = selectedYear === "Todos" || year?.toString() === selectedYear;
      const matchMonth = selectedMonth === "Todos" || month?.toString() === selectedMonth;
      return matchYear && matchMonth;
    });
  }, [clientes, selectedYear, selectedMonth]);

  // 1. Estadísticas Generales (Filtradas)
  const stats = useMemo(() => {
    const totalGanancias = filteredPagos.reduce((sum, p) => sum + (Number(p.pago) || 0), 0);
    return {
      ganancias: totalGanancias,
      cantidadPagos: filteredPagos.length,
      cantidadClientes: filteredClientes.filter(c => c.estado !== 'baja').length,
      cantidadConceptos: conceptos.length
    };
  }, [filteredPagos, filteredClientes, conceptos]);

  // 2. Gráfico de Ganancias Mensuales o Diarias
  const gananciasChartData = useMemo(() => {
    // Si no se selecciona un mes específico, mostrar desglose por meses del año seleccionado (o todos)
    if (selectedMonth === "Todos") {
      const meses = ["Ene", "Feb", "Mar", "Abr", "May", "Jun", "Jul", "Ago", "Sep", "Oct", "Nov", "Dic"];
      return meses.map((m, idx) => {
        const sum = filteredPagos
          .filter(p => p.mes_pago === idx + 1)
          .reduce((acc, p) => acc + (Number(p.pago) || 0), 0);
        return { name: m, Ganancias: sum };
      });
    } else {
      // Si se selecciona un mes específico, mostrar desglose día a día (1 al 31)
      const yearNum = selectedYear === "Todos" ? new Date().getFullYear() : Number(selectedYear);
      const monthNum = Number(selectedMonth);
      const daysInMonth = new Date(yearNum, monthNum, 0).getDate();
      
      const data = [];
      for (let d = 1; d <= daysInMonth; d++) {
        const sum = filteredPagos
          .filter(p => {
            const day = getDayFromDate(p.fecha_realizacion_pago);
            return day === d;
          })
          .reduce((acc, p) => acc + (Number(p.pago) || 0), 0);
        data.push({ name: d.toString(), Ganancias: sum });
      }
      return data;
    }
  }, [filteredPagos, selectedYear, selectedMonth]);

  // 3. Clientes Registrados (Año, Mes o Día)
  const clientesChartData = useMemo(() => {
    if (selectedYear === "Todos") {
      // Agrupar clientes por año
      const conteo: Record<string, number> = {};
      filteredClientes.forEach(c => {
        const { year } = parseClientDate(c.fecha_alta);
        const yStr = year?.toString() || "Desconocido";
        conteo[yStr] = (conteo[yStr] || 0) + 1;
      });
      return Object.keys(conteo)
        .map(year => ({ name: year, Clientes: conteo[year] }))
        .sort((a, b) => a.name.localeCompare(b.name));
    } else if (selectedMonth === "Todos") {
      // Agrupar clientes por mes del año seleccionado
      const meses = ["Ene", "Feb", "Mar", "Abr", "May", "Jun", "Jul", "Ago", "Sep", "Oct", "Nov", "Dic"];
      return meses.map((m, idx) => {
        const count = filteredClientes.filter(c => {
          const { month } = parseClientDate(c.fecha_alta);
          return month === idx + 1;
        }).length;
        return { name: m, Clientes: count };
      });
    } else {
      // Agrupar clientes por día del mes seleccionado
      const yearNum = Number(selectedYear);
      const monthNum = Number(selectedMonth);
      const daysInMonth = new Date(yearNum, monthNum, 0).getDate();
      
      const data = [];
      for (let d = 1; d <= daysInMonth; d++) {
        const count = filteredClientes.filter(c => {
          const { day } = parseClientDate(c.fecha_alta);
          return day === d;
        }).length;
        data.push({ name: d.toString(), Clientes: count });
      }
      return data;
    }
  }, [filteredClientes, selectedYear, selectedMonth]);

  // 4. Ganancias Históricas por Año (Ignora el filtro de año para mostrar crecimiento)
  const gananciasPorAno = useMemo(() => {
    const conteo: Record<string, number> = {};
    
    // Solo respeta el filtro de mes si está activo y excluye cancelados
    const pagosFiltradosPorMes = selectedMonth === "Todos" 
      ? pagos.filter(p => p.estatus !== 'cancelado') 
      : pagos.filter(p => p.mes_pago?.toString() === selectedMonth && p.estatus !== 'cancelado');

    pagosFiltradosPorMes.forEach(p => {
      const year = p.year_pago || "Desconocido";
      conteo[year] = (conteo[year] || 0) + (Number(p.pago) || 0);
    });

    return Object.keys(conteo)
      .map(year => ({ name: year, Ganancias: conteo[year] }))
      .sort((a, b) => a.name.localeCompare(b.name));
  }, [pagos, selectedMonth]);

  // 5. Top Conceptos
  const topConceptos = useMemo(() => {
    const conteo: Record<string, number> = {};
    let totalPagoConceptos = 0;

    filteredPagos.forEach(p => {
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
  }, [filteredPagos]);

  return (
    <div className="w-full flex flex-col gap-6 py-2 select-none">
      
      {/* Barra de Filtros del Dashboard */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-slate-800 border border-slate-700/40 rounded-3xl p-6 shadow-lg">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-purple-500/10 text-purple-400 rounded-2xl text-lg">
            <FaFilter />
          </div>
          <div>
            <h2 className="text-lg font-bold text-white">Filtros de Analíticas</h2>
            <p className="text-xs text-slate-400">Filtra gráficos y métricas por año fiscal y mes</p>
          </div>
        </div>
        
        <div className="flex flex-wrap items-center gap-4">
          {/* Año */}
          <div className="flex flex-col gap-1">
            <label className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Filtrar Año</label>
            <select
              value={selectedYear}
              onChange={(e) => setSelectedYear(e.target.value)}
              className="bg-slate-900/80 border border-slate-700 text-slate-200 text-xs rounded-xl p-2.5 min-w-[130px] focus:border-purple-500 focus:outline-none transition-colors cursor-pointer"
            >
              <option value="Todos">Todos los años</option>
              {availableYears.map(y => (
                <option key={y} value={y}>{y}</option>
              ))}
            </select>
          </div>

          {/* Mes */}
          <div className="flex flex-col gap-1">
            <label className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Filtrar Mes</label>
            <select
              value={selectedMonth}
              onChange={(e) => setSelectedMonth(e.target.value)}
              className="bg-slate-900/80 border border-slate-700 text-slate-200 text-xs rounded-xl p-2.5 min-w-[130px] focus:border-purple-500 focus:outline-none transition-colors cursor-pointer"
            >
              <option value="Todos">Todos los meses</option>
              <option value="1">Enero</option>
              <option value="2">Febrero</option>
              <option value="3">Marzo</option>
              <option value="4">Abril</option>
              <option value="5">Mayo</option>
              <option value="6">Junio</option>
              <option value="7">Julio</option>
              <option value="8">Agosto</option>
              <option value="9">Septiembre</option>
              <option value="10">Octubre</option>
              <option value="11">Noviembre</option>
              <option value="12">Diciembre</option>
            </select>
          </div>
        </div>
      </div>

      {/* Tarjetas de Métricas Principales */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Card 1: Ventas Totales */}
        <div className="bg-slate-800 border border-slate-700/40 rounded-3xl p-6 shadow-lg flex items-center gap-4 hover:border-purple-500/50 transition-all duration-300">
          <div className="p-4 rounded-2xl bg-purple-500/10 text-purple-400 text-2xl">
            <FaCoins />
          </div>
          <div>
            <span className="text-xs text-slate-400 font-medium uppercase tracking-wider block">Ganancias</span>
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
            <span className="text-xs text-slate-400 font-medium uppercase tracking-wider block">Clientes Activos</span>
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
          
          {/* Fila 1: Clientes Nuevos por Año/Mes (BarChart) */}
          <div className="bg-slate-800 border border-slate-700/40 rounded-3xl p-6 shadow-lg">
            <div className="flex items-center gap-2 mb-4 border-b border-slate-700 pb-2">
              <FaCalendarAlt className="text-purple-400 text-lg" />
              <h3 className="text-base font-bold text-white">
                {selectedYear === "Todos" 
                  ? "Clientes Nuevos por Año" 
                  : selectedMonth === "Todos" 
                    ? `Clientes Nuevos en ${selectedYear}`
                    : `Clientes Nuevos Registrados (Día a Día)`
                }
              </h3>
            </div>
            <div className="h-60">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={clientesChartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
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

          {/* Fila 2: Ganancias Mensuales o Diarias (LineChart) */}
          <div className="bg-slate-800 border border-slate-700/40 rounded-3xl p-6 shadow-lg">
            <div className="flex items-center gap-2 mb-4 border-b border-slate-700 pb-2">
              <FaChartLine className="text-cyan-400 text-lg" />
              <h3 className="text-base font-bold text-white">
                {selectedMonth === "Todos"
                  ? `Flujo Mensual de Ganancias (${selectedYear === "Todos" ? "Todos los Años" : selectedYear})`
                  : `Flujo Diario de Ganancias (Mes: ${selectedMonth}, Año: ${selectedYear === "Todos" ? new Date().getFullYear() : selectedYear})`
                }
              </h3>
            </div>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={gananciasChartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
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
                <p className="text-sm text-slate-400">No hay transacciones registradas para este periodo.</p>
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
          
          {/* Fila 1: Checador Form (Para conservar la entrada del checador del usuario en el dashboard) */}
          <div className="w-full">
            {checadorForm}
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
