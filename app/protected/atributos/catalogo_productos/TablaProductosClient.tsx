"use client";

import React, { useState } from "react";
import { Pagination } from "../../components/Pagination";

interface Producto {
  id: number;
  nombre_producto_servicio: string;
  correo_empleado: string;
}

interface TablaProductosClientProps {
  initialProductos: Producto[];
}

export default function TablaProductosClient({ initialProductos }: TablaProductosClientProps) {
  const [paginaActual, setPaginaActual] = useState(1);
  const productosPorPagina = 10;
  const totalPaginas = Math.ceil(initialProductos.length / productosPorPagina);

  const productosActuales = initialProductos.slice(
    (paginaActual - 1) * productosPorPagina,
    paginaActual * productosPorPagina
  );

  return (
    <div className="custom-table-container">
      <table className="custom-table">
        <thead className="custom-table-thead">
          <tr>
            <th className="custom-table-th">Nombre del concepto</th>
            <th className="custom-table-th">Registrado por</th>
          </tr>
        </thead>
        <tbody>
          {productosActuales.map((producto) => (
            <tr className="custom-table-tr" key={producto.id}>
              <td>{producto.nombre_producto_servicio}</td>
              <td>{producto.correo_empleado}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="px-4 pb-2">
        <Pagination
          currentPage={paginaActual}
          totalPages={totalPaginas}
          onPageChange={setPaginaActual}
        />
      </div>
    </div>
  );
}
