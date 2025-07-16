import React, { useEffect, useState } from "react";

export default function SumaTotalPagos() {
  const [total, setTotal] = useState(0);
  const [year, setYear] = useState(new Date().getFullYear());
  const [yearsDisponibles, setYearsDisponibles] = useState<number[]>([]);

  useEffect(() => {
    async function fetchPagos() {
      const res = await fetch("/api/pagos");
      const datos = await res.json();
      // Obtiene los años únicos disponibles en los datos
      const years = Array.from(new Set(datos.map((item: any) => Number(item.year_pago)))) as number[];
      years.sort((a, b) => b - a);
      setYearsDisponibles(years);
      // Filtra y suma solo los pagos del año seleccionado
      const suma = datos
        .filter((item: any) => Number(item.year_pago) === Number(year))
        .reduce((acc: number, item: any) => acc + Number(item.pago || 0), 0);
      setTotal(suma);
    }
    fetchPagos();
  }, [year]);


  return (
   <div className="p-4 bg-zinc-900 rounded-full text-white font-bold text-lg">
      <label htmlFor="year_pago" className="block mb-2 text-sm font-medium">Filtrar por año:</label>
      <select
        id="year_pago"
        value={year}
        onChange={e => setYear(Number(e.target.value))}
        className="mb-4 p-2 rounded text-black"
      >
        {yearsDisponibles.map(y => (
          <option key={y} value={y}>{y}</option>
        ))}
      </select>
      <div>
        Total de pagos en {year}: ${total.toLocaleString("es-MX")}
      </div>
    </div>
  );
}