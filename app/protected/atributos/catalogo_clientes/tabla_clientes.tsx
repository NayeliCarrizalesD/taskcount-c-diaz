"use client";
import { useEffect, useState } from "react";
import { BtnEditar } from "../BtnEditar";
import Swal from "sweetalert2";
import { BtnPagar } from "../BtnPagar";
import { BtnVerHistorialDePago } from "../BtnVerHistorialDePago";
import { Pagination } from "../../components/Pagination";

export default function TablaClientes() {
  const [clientes, setClientes] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [paginaActual, setPaginaActual] = useState(1);
  const clientesPorPagina = 10;
  const totalPaginas = Math.ceil(clientes.length / clientesPorPagina);

  const clientesActuales = clientes.slice((paginaActual - 1) * clientesPorPagina, paginaActual * clientesPorPagina);

  useEffect(() => {
    const fetchClientes = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const response = await fetch("/api/clientes");
        
        if (!response.ok) {
          throw new Error(`HTTP ${response.status}: ${response.statusText}`);
        }
        
        const contentType = response.headers.get('content-type');
        if (!contentType?.includes('application/json')) {
          throw new Error('La respuesta no es JSON válido');
        }
        
        const data = await response.json();
        setClientes(Array.isArray(data) ? data : []);
        
      } catch (error) {
        console.error('Error al cargar clientes:', error);
        setError(error instanceof Error ? error.message : 'Error desconocido');
      } finally {
        setLoading(false);
      }
    };

    fetchClientes();
  }, []);

  const handleUpdateCliente = async (clienteData: any) => {
  try {
    console.log('Sending update request for client:', clienteData);
    
    const response = await fetch(`/api/updateCliente/${clienteData.id_cliente}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        nombre_cliente: clienteData.nombre_cliente,
        telefono_cliente: clienteData.telefono_cliente,
        correo_cliente: clienteData.correo_cliente,
        rfc: clienteData.rfc
      }),
    });

    console.log('Response status:', response.status);
    console.log('Response headers:', response.headers);

    if (!response.ok) {
      let errorMessage = `HTTP ${response.status}`;
      try {
        const errorData = await response.json();
        errorMessage = errorData.error || errorData.details || errorMessage;
        console.error('Error response:', errorData);
      } catch (parseError) {
        console.error('Could not parse error response:', parseError);
        const textResponse = await response.text();
        console.error('Raw error response:', textResponse);
      }
      throw new Error(errorMessage);
    }

    const result = await response.json();
    console.log('Update successful:', result);
    
    // Actualizar el estado local
    setClientes(prevClientes =>
      prevClientes.map(cliente =>
        cliente.id_cliente === clienteData.id_cliente
          ? { ...cliente, ...clienteData }
          : cliente
      )
    );

    Swal.fire({
      icon: 'success',
      title: '¡Éxito!',
      text: 'Cliente actualizado correctamente',
      timer: 2000,
      showConfirmButton: false
    });

  } catch (error) {
    console.error('Error al actualizar cliente:', error);
    Swal.fire({
      icon: 'error',
      title: 'Error',
      text: error instanceof Error ? error.message : 'Error de conexión'
    });
  }
};

  if (loading) {
    return (
      <div className="flex flex-col justify-center items-center p-12 space-y-3">
        <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-sky-400"></div>
        <div className="text-gray-400 text-sm">Cargando clientes...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center p-8">
        <div className="text-red-500">Error: {error}</div>
      </div>
    );
  }

  return (
    <>
      <div className="custom-table-container">
        <table className="custom-table">
          <thead className="custom-table-thead">
            <tr>
              <th className="custom-table-th">ID</th>
              <th className="custom-table-th">Nombre</th>
              <th className="custom-table-th">Correo</th>
              <th className="custom-table-th">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {clientesActuales.map((cliente) => (
              <tr key={cliente.id_cliente} className="custom-table-tr">
                <td>{cliente.id_cliente}</td>
                <td>{cliente.nombre_cliente}</td>
                <td>{cliente.correo_cliente}</td>
                <td>
                  <BtnEditar onClick={handleUpdateCliente} cliente={cliente} />
                  <BtnPagar cliente={cliente} />
                  <BtnVerHistorialDePago cliente={cliente} />
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
    </>
  );
}
