import React, { useEffect, useState } from "react";

export default function SumaTotalPagos() {
  const [total, setTotal] = useState(0);

  useEffect(() => {
    async function fetchPagos() {
      const res = await fetch("/api/pagos");
      const datos = await res.json();
      // Suma todos los pagos (asegúrate que el campo sea numérico)
      const suma = datos.reduce((acc: number, item: any) => acc + Number(item.pago || 0), 0);
      setTotal(suma);
    }
    fetchPagos();
  }, []);

  return (
    <div className="p-4 bg-zinc-900 rounded-xl text-white font-bold text-lg">
      Total de pagos: ${total.toLocaleString("es-MX")}
    </div>
  );
}