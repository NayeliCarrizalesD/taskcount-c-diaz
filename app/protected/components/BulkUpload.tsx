
"use client";

import React, { useState } from 'react';

export function BulkUpload() {
    const [uploading, setUploading] = useState(false);
    const [downloading, setDownloading] = useState(false);
    const [message, setMessage] = useState<string | null>(null);

    const handleDownloadTemplate = async () => {
        setDownloading(true);
        try {
            const response = await fetch('/api/upload-csv', { method: 'GET' });
            if (!response.ok) throw new Error("Error al descargar la plantilla");

            const blob = await response.blob();
            const url = window.URL.createObjectURL(blob);
            const link = document.createElement("a");
            link.href = url;
            link.setAttribute("download", "plantilla_clientes_pagos.csv");
            document.body.appendChild(link);
            link.click();
            link.parentNode?.removeChild(link);
            window.URL.revokeObjectURL(url);
        } catch (error: any) {
            setMessage(`Error descarga: ${error.message}`);
        } finally {
            setDownloading(false);
        }
    };

    const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        setUploading(true);
        setMessage(null);

        const reader = new FileReader();
        reader.onload = async (event) => {
            try {
                const text = event.target?.result as string;
                // Basic parser handling \r\n and \n
                const lines = text.split(/\r\n|\n/).filter(line => line.trim() !== '');
                const headerLine = lines[0];

                if (!headerLine) throw new Error("Archivo vacío");

                // Parse headers, replace double quotes just in case
                const headers = headerLine.split(',').map(h => h.trim().replace(/^"|"$/g, ''));

                const data = lines.slice(1).map(line => {
                    // Simple split logic, respecting quotes somewhat simple way
                    // Regex for splitting by comma but ignoring commas inside double quotes
                    const regex = /,(?=(?:(?:[^"]*"){2})*[^"]*$)/;
                    const values = line.split(regex);

                    const entry: any = {};

                    headers.forEach((header, index) => {
                        let val = values[index]?.trim();
                        if (val === undefined) val = "";
                        // Remove surrounding quotes if present
                        val = val.replace(/^"|"$/g, '');
                        // Unescape double double quotes
                        val = val.replace(/""/g, '"');
                        entry[header] = val;
                    });

                    return entry;
                });

                const response = await fetch('/api/upload-csv', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(data),
                });

                const result = await response.json();

                if (response.ok) {
                    setMessage(`Carga completa: 
                ${result.results.clients_created} clientes nuevos, 
                ${result.results.clients_updated} clientes actualizados, 
                ${result.results.payments_created} pagos nuevos,
                ${result.results.payments_updated} pagos actualizados.`);
                } else {
                    setMessage(`Error al cargar: ${result.error || result.message}`);
                }

            } catch (error: any) {
                setMessage(`Error procesando archivo: ${error.message}`);
            } finally {
                setUploading(false);
                // Clear the input value to allow re-uploading the same file if corrected
                e.target.value = '';
            }
        };
        reader.readAsText(file);
    };

    return (
        <div className="w-full overflow-hidden rounded-3xl bg-slate-800 shadow-xl p-4 text-white">
            <h3 className="text-lg font-bold mb-4 border-b border-slate-600 pb-2">Carga Masiva y Actualización</h3>
            <p className="text-sm text-slate-300 mb-4">
                Descarga la plantilla con todos los clientes actuales. Modifica sus datos para actualizarlos, o agrega nuevos.
                Llena las columnas de pago para registrar pagos nuevos.
            </p>

            <div className="flex flex-col gap-4">
                <div className="w-full">
                    <button
                        onClick={handleDownloadTemplate}
                        disabled={downloading}
                        className={`
                    w-full px-4 py-2 rounded-xl font-bold text-white transition-colors
                    ${downloading ? 'bg-gray-500 cursor-not-allowed' : 'bg-green-600 hover:bg-green-700'}
                `}
                        type="button"
                    >
                        {downloading ? 'Descargando...' : '1. Descargar Plantilla (Clientes Actuales)'}
                    </button>
                </div>

                <div className="flex flex-col w-full">
                    <label className="text-sm font-semibold mb-1 block">2. Subir Archivo CSV</label>
                    <input
                        type="file"
                        accept=".csv"
                        onChange={handleFileUpload}
                        className="block w-full text-sm text-slate-300
                  file:mr-4 file:py-2 file:px-4
                  file:rounded-full file:border-0
                  file:text-sm file:font-semibold
                  file:bg-blue-50 file:text-blue-700
                  hover:file:bg-blue-100
                  cursor-pointer
                "
                        disabled={uploading}
                    />
                </div>
            </div>

            {uploading && (
                <div className="mt-4 p-3 bg-yellow-900/50 text-yellow-200 rounded animate-pulse">
                    Procesando archivo, por favor espere...
                </div>
            )}

            {message && (
                <div className={`mt-4 p-3 rounded ${message.startsWith('Error') ? 'bg-red-900/50 text-red-200' : 'bg-green-900/50 text-green-200'}`}>
                    <pre className="whitespace-pre-wrap font-sans">{message}</pre>
                </div>
            )}
        </div>
    );
}
