"use client";

import React, { useState } from "react";
import { Pagination } from "../../components/Pagination";

interface Usuario {
  id_usuario: number;
  fecha_alta: string;
  telefono_usuario: string;
  correo: string;
  nivel: string;
}

interface TablaDatosUsuariosClientProps {
  initialUsuarios: Usuario[];
}

export default function TablaDatosUsuariosClient({ initialUsuarios }: TablaDatosUsuariosClientProps) {
  const [paginaActual, setPaginaActual] = useState(1);
  const itemsPorPagina = 5; // Keep 5 per page as it was originally limited to 5
  const totalPaginas = Math.ceil(initialUsuarios.length / itemsPorPagina);

  const usuariosActuales = initialUsuarios.slice(
    (paginaActual - 1) * itemsPorPagina,
    paginaActual * itemsPorPagina
  );

  return (
    <div className="custom-table-container">
      <table className="custom-table">
        <thead className="custom-table-thead">
          <tr>
            <th className="custom-table-th">Alta</th>
            <th className="custom-table-th">Telefono</th>
            <th className="custom-table-th">Correo</th>
            <th className="custom-table-th">Nivel</th>
          </tr>
        </thead>
        <tbody>
          {usuariosActuales.map((usuario) => (
            <tr className="custom-table-tr" key={usuario.id_usuario}>
              <td>{usuario.fecha_alta}</td>
              <td>{usuario.telefono_usuario}</td>
              <td>{usuario.correo}</td>
              <td>
                {usuario.nivel === "na1" ? "Administrador" : ""}
                {usuario.nivel === "n1" ? "Nivel 1" : ""}
                {usuario.nivel === "n2" ? "Nivel 2" : ""}
                {usuario.nivel === "n3" ? "Nivel 3" : ""}
              </td>
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
