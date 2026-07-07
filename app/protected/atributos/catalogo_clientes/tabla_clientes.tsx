"use client";
import { useEffect, useState, useMemo } from "react";
import { BtnEditar } from "../BtnEditar";
import Swal from "sweetalert2";
import { BtnPagar } from "../BtnPagar";
import { BtnVerHistorialDePago } from "../BtnVerHistorialDePago";
import { Pagination } from "../../components/Pagination";
import { FaSearch } from "react-icons/fa";

export default function TablaClientes() {
  const [clientes, setClientes] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [paginaActual, setPaginaActual] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [updatingIds, setUpdatingIds] = useState<number[]>([]);
  const clientesPorPagina = 10;

  useEffect(() => {
    setPaginaActual(1);
  }, [searchQuery]);

  const filteredClientes = useMemo(() => {
    if (!searchQuery.trim()) return clientes;
    const query = searchQuery.toLowerCase().trim();
    return clientes.filter((cliente) => {
      const idStr = String(cliente.id_cliente);
      const nombre = (cliente.nombre_cliente || "").toLowerCase();
      const correo = (cliente.correo_cliente || "").toLowerCase();
      const telefono = (cliente.telefono_cliente || "").toLowerCase();
      const rfc = (cliente.rfc || "").toLowerCase();
      return (
        idStr.includes(query) ||
        nombre.includes(query) ||
        correo.includes(query) ||
        telefono.includes(query) ||
        rfc.includes(query)
      );
    });
  }, [clientes, searchQuery]);

  const sortedClientes = useMemo(() => {
    return [...filteredClientes].sort((a, b) => {
      const estadoA = a.estado === 'baja' ? 1 : 0;
      const estadoB = b.estado === 'baja' ? 1 : 0;
      if (estadoA !== estadoB) return estadoA - estadoB;
      return (a.nombre_cliente || "").localeCompare(b.nombre_cliente || "");
    });
  }, [filteredClientes]);

  const [tabActiva, setTabActiva] = useState<'activos' | 'inactivos'>('activos');

  const tabClientes = useMemo(() => {
    return sortedClientes.filter(cliente => {
      const isBaja = cliente.estado === 'baja';
      if (tabActiva === 'activos') {
        return !isBaja;
      } else {
        return isBaja;
      }
    });
  }, [sortedClientes, tabActiva]);

  const totalPaginas = Math.ceil(tabClientes.length / clientesPorPagina);

  const clientesActuales = useMemo(() => {
    return tabClientes.slice((paginaActual - 1) * clientesPorPagina, paginaActual * clientesPorPagina);
  }, [tabClientes, paginaActual]);

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
        showConfirmButton: false,
        color: "white",
        background: "#0d0d0e",
      });

    } catch (error) {
      console.error('Error al actualizar cliente:', error);
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: error instanceof Error ? error.message : 'Error de conexión',
        color: "white",
        background: "#0d0d0e",
      });
    }
  };

  const handleToggleEstado = async (cliente: any) => {
    const nuevoEstado = cliente.estado === 'baja' ? 'activo' : 'baja';
    const accionTexto = nuevoEstado === 'baja' ? 'dar de baja' : 'reactivar';
    
    const result = await Swal.fire({
      title: `¿Estás seguro?`,
      text: `Vas a ${accionTexto} al cliente: ${cliente.nombre_cliente}`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, continuar',
      cancelButtonText: 'Cancelar',
      color: "white",
      background: "#0d0d0e",
      buttonsStyling: false,
      customClass: {
        popup: 'rounded-3xl border border-zinc-800 p-6 shadow-2xl w-[400px]',
        confirmButton: 'px-5 py-2.5 rounded-xl font-semibold bg-[#008fcb] hover:bg-[#007cb0] text-white text-sm cursor-pointer mr-2',
        cancelButton: 'px-5 py-2.5 rounded-xl font-semibold bg-zinc-800 hover:bg-zinc-700 text-stone-300 text-sm cursor-pointer',
      }
    });

    if (result.isConfirmed) {
      try {
        setUpdatingIds(prev => [...prev, cliente.id_cliente]);
        const response = await fetch(`/api/updateCliente/${cliente.id_cliente}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            estado: nuevoEstado
          }),
        });

        if (!response.ok) {
          throw new Error('Error al actualizar el estado del cliente');
        }

        // Actualizar el estado local
        setClientes(prevClientes =>
          prevClientes.map(c =>
            c.id_cliente === cliente.id_cliente
              ? { ...c, estado: nuevoEstado }
              : c
          )
        );

        Swal.fire({
          icon: 'success',
          title: '¡Éxito!',
          text: `Cliente ${nuevoEstado === 'baja' ? 'dado de baja' : 'reactivado'} correctamente`,
          timer: 2000,
          showConfirmButton: false,
          color: "white",
          background: "#0d0d0e",
        });
      } catch (error) {
        console.error('Error al cambiar estado del cliente:', error);
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: error instanceof Error ? error.message : 'Error de conexión',
          color: "white",
          background: "#0d0d0e",
        });
      } finally {
        setUpdatingIds(prev => prev.filter(id => id !== cliente.id_cliente));
      }
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
      <div className="mb-4">
        <div className="relative">
          <span className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-zinc-400">
            <FaSearch className="h-4 w-4" />
          </span>
          <input
            type="text"
            placeholder="Buscar cliente por nombre, ID, correo, teléfono o RFC..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-neutral-900/60 border border-zinc-700/60 hover:border-zinc-500/60 focus:border-sky-500 rounded-2xl text-white placeholder-zinc-500 text-sm focus:outline-none focus:ring-2 focus:ring-sky-500/20 transition-all duration-200"
          />
        </div>
      </div>
      <div className="flex border-b border-zinc-700/60 mb-4 ml-2">
        <button
          onClick={() => {
            setTabActiva('activos');
            setPaginaActual(1);
          }}
          className={`px-5 py-3 font-bold text-xs uppercase tracking-wider transition-all duration-150 relative cursor-pointer focus:outline-none ${
            tabActiva === 'activos'
              ? 'text-purple-400'
              : 'text-stone-400 hover:text-stone-300'
          }`}
        >
          Clientes Activos
          {tabActiva === 'activos' && (
            <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-purple-400 transition-all duration-300" />
          )}
        </button>
        <button
          onClick={() => {
            setTabActiva('inactivos');
            setPaginaActual(1);
          }}
          className={`px-5 py-3 font-bold text-xs uppercase tracking-wider transition-all duration-150 relative cursor-pointer focus:outline-none ${
            tabActiva === 'inactivos'
              ? 'text-purple-400'
              : 'text-stone-400 hover:text-stone-300'
          }`}
        >
          Clientes Inactivos (Baja)
          {tabActiva === 'inactivos' && (
            <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-purple-400 transition-all duration-300" />
          )}
        </button>
      </div>
      <div className="custom-table-container">
        <table className="custom-table">
          <thead className="custom-table-thead">
            <tr>
              <th className="custom-table-th">ID</th>
              <th className="custom-table-th">Nombre</th>
              <th className="custom-table-th">Correo</th>
              <th className="custom-table-th">Estado</th>
              <th className="custom-table-th">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {clientesActuales.length === 0 ? (
              <tr>
                <td colSpan={5} className="p-8 text-center text-gray-400 text-sm">
                  No se encontraron clientes coincidentes.
                </td>
              </tr>
            ) : (
              clientesActuales.map((cliente) => (
                <tr key={cliente.id_cliente} className="custom-table-tr">
                  <td>{cliente.id_cliente}</td>
                  <td>{cliente.nombre_cliente}</td>
                  <td>{cliente.correo_cliente}</td>
                  <td>
                    <span className={`px-2.5 py-1 rounded-full text-xs font-semibold ${
                      cliente.estado === 'baja' 
                        ? 'bg-red-500/20 text-red-400 border border-red-500/30' 
                        : 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                    }`}>
                      {cliente.estado === 'baja' ? 'Baja' : 'Activo'}
                    </span>
                  </td>
                  <td>
                    <BtnEditar onClick={handleUpdateCliente} cliente={cliente} />
                    <BtnPagar cliente={cliente} />
                    <BtnVerHistorialDePago cliente={cliente} />
                    <button
                      onClick={() => handleToggleEstado(cliente)}
                      disabled={updatingIds.includes(cliente.id_cliente)}
                      className={`relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium rounded-full group focus:ring-4 focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed ${
                        cliente.estado === 'baja'
                          ? 'bg-gradient-to-br from-teal-500 to-emerald-500 hover:text-white focus:ring-emerald-800 text-white'
                          : 'bg-gradient-to-br from-red-500 to-orange-500 hover:text-white focus:ring-red-800 text-white'
                      }`}
                    >
                      <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-full group-hover:bg-transparent group-hover:dark:bg-transparent">
                        {updatingIds.includes(cliente.id_cliente) ? 'Cargando...' : (cliente.estado === 'baja' ? 'Reactivar' : 'Dar de Baja')}
                      </span>
                    </button>
                  </td>
                </tr>
              ))
            )}
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
