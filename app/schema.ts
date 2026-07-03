import { pgTable, numeric, serial, text, integer, varchar } from "drizzle-orm/pg-core";
import { drizzle } from 'drizzle-orm/postgres-js';
import { eq, desc, and, sum, sql, ne } from 'drizzle-orm';
import postgres from 'postgres';


const dbUrl = process.env.POSTGRES_URL ? `${process.env.POSTGRES_URL}?sslmode=require` : "postgres://localhost/db";
let client = postgres(dbUrl);
let db = drizzle(client);

export const dbTablas = drizzle(client);

// Registro de usuarios

export async function getUsuario(correo: string) {
  const datosUsuario = await ensureTableDatosUsuarioExists();
  return await db.select().from(datosUsuario).where(eq(datosUsuario.correo, correo));
}

export async function getUsuarioPorCorreo(correo: string) {
  const datosUsuarioTable = await ensureTableDatosUsuarioExists(); // Si usas una función para asegurar la tabla
  const result = await db
    .select()
    .from(datosUsuarioTable)
    .where(eq(datosUsuarioTable.correo, correo));

  // Devuelve el primer usuario encontrado o null
  return result[0] || null;
}

export async function createDatosUsuario(fecha_alta: string, telefono_usuario: string, correo: string, nivel: string) {
  const datosUsuario = await ensureTableDatosUsuarioExists();
  return await db.insert(datosUsuario).values([{ fecha_alta, telefono_usuario, correo, nivel }]);
}

async function ensureTableDatosUsuarioExists() {
  const result = await client`
    SELECT EXISTS (
      SELECT FROM information_schema.tables 
      WHERE table_schema = 'public' 
      AND table_name = 'datosUsuario'
    );`;

  if (!result[0].exists) {
    await client`
      CREATE TABLE "datosUsuario" (
        id_usuario SERIAL PRIMARY KEY,
        fecha_alta TEXT,
        telefono_usuario TEXT,
        correo TEXT,
        nivel TEXT
      );`;
  }

  const tableDatosUsuario = pgTable('datosUsuario', {
    id_usuario: serial('id_usuario').primaryKey(),
    fecha_alta: text('fecha_alta'),
    telefono_usuario: text('telefono_usuario'),
    correo: text('correo'),
    nivel: text('nivel')
  });

  return tableDatosUsuario;
}

export const datosUsuario = pgTable('datosUsuario', {
  id_usuario: serial('id_usuario').primaryKey(),
  fecha_alta: text('fecha_alta'),
  telefono_usuario: text('telefono_usuario'),
  correo: text('correo'),
  nivel: text('nivel')
  
});

// REgistro de clientes 

export async function getClientes(id_cliente: string) {
  const catalogoClientes = await ensureTableCatalogoClientesExists();
  return await db.select().from(catalogoClientes).where(eq(catalogoClientes.id_cliente, Number(id_cliente)));
}
export async function getTodosClientes() {
  const catalogoClientes = await ensureTableCatalogoClientesExists();
  return await db.select().from(catalogoClientes).orderBy(catalogoClientes.nombre_cliente);
}

// ...existing code...
export async function updateCliente(
  id_cliente: number, 
  nombre_cliente: string, 
  telefono_cliente: string, 
  correo_cliente: string, 
  rfc: string, 
  correo_empleado?: string, 
  fecha_alta?: string
) {
  console.log('updateCliente called with:', { id_cliente, nombre_cliente, telefono_cliente, correo_cliente, rfc });
  
  const catalogoClientes = await ensureTableCatalogoClientesExists();

  try {
    // Construir objeto de actualización solo con campos no vacíos
    const updateData: any = {};
    
    if (nombre_cliente?.trim()) updateData.nombre_cliente = nombre_cliente.trim();
    if (telefono_cliente?.trim()) updateData.telefono_cliente = telefono_cliente.trim();
    if (correo_cliente?.trim()) updateData.correo_cliente = correo_cliente.trim();
    if (rfc?.trim()) updateData.rfc = rfc.trim();
    if (correo_empleado?.trim()) updateData.correo_empleado = correo_empleado.trim();
    if (fecha_alta?.trim()) updateData.fecha_alta = fecha_alta.trim();

    console.log('Update data:', updateData);

    // Verificar que hay datos para actualizar
    if (Object.keys(updateData).length === 0) {
      throw new Error('No hay datos válidos para actualizar');
    }

    const result = await db.update(catalogoClientes)
      .set(updateData)
      .where(eq(catalogoClientes.id_cliente, id_cliente))
      .returning();

    console.log('Database update result:', result);

    if (result.length === 0) {
      throw new Error('Cliente no encontrado');
    }

    return result[0];
  } catch (error) {
    console.error('Error en updateCliente:', error);
    throw error;
  }
}
// ...existing code...

export async function createNewClient(marca_temporal: string, nombre_cliente: string, telefono_cliente: string, correo_cliente: string, rfc: string, correo_empleado: string,fecha_alta: string) {
  const catalogoClientes = await ensureTableCatalogoClientesExists();
  return await db.insert(catalogoClientes).values([{ marca_temporal, nombre_cliente, telefono_cliente, correo_cliente, rfc,  correo_empleado, fecha_alta }]);
}

async function ensureTableCatalogoClientesExists() {
  const result = await client`
    SELECT EXISTS (
      SELECT FROM information_schema.tables 
      WHERE table_schema = 'public' 
      AND table_name = 'catalogo_clientes'
    );`;

  if (!result[0].exists) {
    await client`
      CREATE TABLE "catalogo_clientes" (
        id_cliente SERIAL PRIMARY KEY,
        marca_temporal TEXT,
        nombre_cliente TEXT,
        telefono_cliente TEXT,
        correo_cliente TEXT,
        rfc TEXT,
        correo_empleado TEXT,
        fecha_alta TEXT
      );`;
  }

  const tableCatalogo_clientes = pgTable('catalogo_clientes', {
    id_cliente: serial('id_cliente').primaryKey(),
    marca_temporal: text('marca_temporal'),
    nombre_cliente: text('nombre_cliente'),
    telefono_cliente: text('telefono_cliente'),
    correo_cliente: text('correo_cliente'),
    rfc: text('rfc'),
    correo_empleado: text('correo_empleado'),
    fecha_alta: text('fecha_alta')
  });

  return tableCatalogo_clientes;
}

export const catalogo_clientes = pgTable('catalogo_clientes', {
  id_cliente: serial('id_cliente').primaryKey(),
    marca_temporal: text('marca_temporal'),
    nombre_cliente: text('nombre_cliente'),
    telefono_cliente: text('telefono_cliente'),
    correo_cliente: text('correo_cliente'),
    rfc: text('rfc'),
    correo_empleado: text('correo_empleado'),
    fecha_alta: text('fecha_alta')
});


// Registrar la hora de entrada 

export async function getEntradaSalida(hora_entrada_salida: string) {
  const entrada_salida = await ensureTableEntradaSalida();
  return await db.select().from(entrada_salida).where(eq(entrada_salida.hora_entrada_salida,hora_entrada_salida));
}

export async function getEntradaSalidaUnUsuario(correo_empleado: string) {
  const entrada_salida = await ensureTableEntradaSalida();
  return await db.select().from(entrada_salida).where(eq(entrada_salida.correo_empleado,correo_empleado)).orderBy(desc(entrada_salida.id_entrada)).limit(5);
}

export async function getLastEntradaSalida(correo_empleado: string) {
  const entrada_salida = await ensureTableEntradaSalida();
  return (await db.select().from(entrada_salida).where(eq(entrada_salida.correo_empleado, correo_empleado)).orderBy(desc(entrada_salida.id_entrada)).limit(1))[0];
}

export async function createNewEntradaSalida(fecha_entrada_salida: string, hora_entrada_salida: string, checador: string, nombre_empleado: string, correo_empleado: string, ) {
  const entrada_salida = await ensureTableEntradaSalida();
  return await db.insert(entrada_salida).values([{ fecha_entrada_salida, hora_entrada_salida , checador, nombre_empleado, correo_empleado }]);
}

async function ensureTableEntradaSalida() {
  const result = await client`
    SELECT EXISTS (
      SELECT FROM information_schema.tables 
      WHERE table_schema = 'public' 
      AND table_name = 'entrada_salida'
    );`;

  if (!result[0].exists) {
    await client`
      CREATE TABLE "entrada_salida" (
        id_entrada SERIAL PRIMARY KEY,
        fecha_entrada_salida TEXT,
        hora_entrada_salida TEXT,
        checador TEXT,
        nombre_empleado TEXT,
        correo_empleado TEXT
      );`;
  }

  const table_entrada_salida = pgTable('entrada_salida', {
    id_entrada: serial('id_entrada').primaryKey(),
    fecha_entrada_salida: text('fecha_entrada_salida'),
    hora_entrada_salida: text('hora_entrada_salida'),
    checador: text('checador'),
    nombre_empleado: text('nombre_empleado'),
    correo_empleado: text('correo_empleado')
  });

  return table_entrada_salida;
}

export const entrada_salida = pgTable('entrada_salida', {
  id_entrada: serial('id_entrada').primaryKey(),
  fecha_entrada_salida: text('fecha_entrada_salida'),
  hora_entrada_salida: text('hora_entrada_salida'),
  checador: text('checador'),
  nombre_empleado: text('nombre_empleado'),
  correo_empleado: text('correo_empleado')
});

// Registro de productos
export async function getProducto(nombre_producto_servicio: string) {
  const catalogoProductos = await ensureTableCatalogoProductosExists();
  return await db.select().from(catalogoProductos).where(eq(catalogoProductos.nombre_producto_servicio, nombre_producto_servicio));
}

export async function getTodosProducto() {
  const catalogoProductos = await ensureTableCatalogoProductosExists();
  return await db.select().from(catalogoProductos);
}

export async function getProductosPaginados(limit: number, offset: number) {
  return await dbTablas
      .select()
      .from(catalogo_productos)
      .orderBy(catalogo_productos.nombre_producto_servicio)
      .limit(limit)
      .offset(offset);
}

export async function createNewProduct(marca_temporal: string, nombre_producto_servicio: string, correo_empleado: string ) {
  const catalogoProductos = await ensureTableCatalogoProductosExists();
  return await db.insert(catalogoProductos).values([{ marca_temporal, nombre_producto_servicio, correo_empleado }]);
}

async function ensureTableCatalogoProductosExists() {
  const result = await client`
    SELECT EXISTS (
      SELECT FROM information_schema.tables 
      WHERE table_schema = 'public' 
      AND table_name = 'catalogo_productos'
    );`;

  if (!result[0].exists) {
    await client`
      CREATE TABLE "catalogo_productos" (
        id_producto SERIAL PRIMARY KEY,
        marca_temporal TEXT,
        nombre_producto_servicio TEXT,
        correo_empleado TEXT
      );`;
  }

  const tableCatalogo_productos = pgTable('catalogo_productos', {
    id_producto: serial('id_producto').primaryKey(),
    marca_temporal: text('marca_temporal'),
    nombre_producto_servicio: text('nombre_producto_servicio'),
    correo_empleado: text('correo_empleado')
  });

  return tableCatalogo_productos;
}

export const catalogo_productos = pgTable('catalogo_productos', {
  id_producto: serial('id_producto').primaryKey(),
    marca_temporal: text('marca_temporal'),
    nombre_producto_servicio: text('nombre_producto_servicio'),
    correo_empleado: text('correo_empleado')
});

// Registro del costo de configuracion de clientes honorarios


export async function getClienteHonorarios(id_cliente: string) {
  const configClienteHonorario = await ensureTableConfigClienteHonorarioExists();
  return await db.select().from(configClienteHonorario).where(eq(configClienteHonorario.id_cliente, id_cliente));
}

export async function getClienteHonorariosPorId(id_cliente: string) {
  const configClienteHonorario = await ensureTableConfigClienteHonorarioExists();
  const catalogoClientes = await ensureTableCatalogoClientesExists();

  return await dbTablas
    .select({
      id_cliente_honorario: configClienteHonorario.id_cliente_honorario,
      id_cliente: configClienteHonorario.id_cliente,
      concepto: configClienteHonorario.concepto,
      pago: configClienteHonorario.pago,
      nombre_cliente: catalogoClientes.nombre_cliente
    })
    .from(configClienteHonorario)
    .leftJoin(catalogoClientes, eq(configClienteHonorario.id_cliente, sql`${catalogoClientes.id_cliente}::text`))
    .where(eq(configClienteHonorario.id_cliente, id_cliente));
}

export async function getClienteHonorariosTodos() {
  const configClienteHonorario = await ensureTableConfigClienteHonorarioExists();
  return await db.select().from(configClienteHonorario);
}


export async function getClienteHonorariosTodosConNombre() {
  const configClienteHonorario = await ensureTableConfigClienteHonorarioExists();
  const catalogoClientes = await ensureTableCatalogoClientesExists();
  
  // Obtener todos los datos de ambas tablas
  const honorarios = await db.select().from(configClienteHonorario);
  const clientes = await db.select().from(catalogoClientes);
  
  // Crear un mapa de clientes por ID
  const clientesMap = clientes.reduce((acc, cliente) => {
    acc[cliente.id_cliente.toString()] = cliente.nombre_cliente ?? '';
    return acc;
  }, {} as Record<string, string>);
  
  // Combinar los datos
  const resultado = honorarios.map(honorario => ({
    id_cliente_honorario: honorario.id_cliente_honorario,
    nombre_cliente: clientesMap[(honorario.id_cliente ?? '').toString()] || `Cliente ID: ${honorario.id_cliente ?? ''}`,
    concepto: honorario.concepto,
    pago: honorario.pago
  }));
  
  // Ordenar por nombre de cliente
  return resultado.sort((a, b) => a.nombre_cliente.localeCompare(b.nombre_cliente));
}



export async function createCosto(id_cliente: string, concepto: string, pago1: number) {
  const configClienteHonorario = await ensureTableConfigClienteHonorarioExists();
  const pago = pago1.toString();
  return await db.insert(configClienteHonorario).values([{ id_cliente: id_cliente, concepto, pago}]);
}


async function ensureTableConfigClienteHonorarioExists() {
  const result = await client`
    SELECT EXISTS (
      SELECT FROM information_schema.tables 
      WHERE table_schema = 'public' 
      AND table_name = 'configClienteHonorario'
    );`;

  if (!result[0].exists) {
    await client`
      CREATE TABLE "configClienteHonorario" (
        id_cliente_honorario SERIAL PRIMARY KEY,
        id_cliente TEXT,
        concepto TEXT,
        pago numeric
      );`;
  }

  const configClienteHonorario = pgTable('configClienteHonorario', {
    id_cliente_honorario: serial('id_cliente_honorario').primaryKey(),
    id_cliente: text('id_cliente'),
    concepto: text('concepto'),
    pago: numeric('pago')
  });

  return configClienteHonorario;
}

export const configClienteHonorario = pgTable('configClienteHonorario', {
  id_cliente_honorario: serial('id_cliente_honorario').primaryKey(),
    id_cliente: text('id_cliente'),
    concepto: text('concepto'),
    pago: numeric('pago')
});

// Registro del pago que se le hace a los clientes 

export async function getRegistroPago(marca_temporal: string) {
  const registroPago = await ensureTableRegistroPagoExists();
  return await db.select().from(registroPago).where(eq(registroPago.marca_temporal, marca_temporal));
}

export async function getUltimoPagoCliente(id_cliente: string) {
  const registroPago = await ensureTableRegistroPagoExists();

  return await dbTablas
    .select()
    .from(registroPago)
    .where(and(eq(registroPago.id_cliente, id_cliente), ne(registroPago.estatus, 'cancelado')))
    .orderBy(desc(registroPago.year_pago), desc(registroPago.mes_pago))
    .limit(1);
}

export async function getPagosTodos() {
  const registroPago = await ensureTableRegistroPagoExists();
  return await db.select().from(registroPago).orderBy(desc(registroPago.year_pago), desc(registroPago.mes_pago));
}

export async function getPagosPorCliente(id_cliente: string) {
  const registroPago = await ensureTableRegistroPagoExists();
  return await db.select().from(registroPago).where(eq(registroPago.id_cliente, id_cliente));
}
export async function getSumaPagosPorCliente(id_cliente: string) {
  const registroPago = await ensureTableRegistroPagoExists();
  return await db.select({value: sum(registroPago.pago)}).from(registroPago).where(and(eq(registroPago.id_cliente, id_cliente), ne(registroPago.estatus, 'cancelado')));
}

export async function createRegistroPago( marca_temporal: string, id_cliente: string, concepto: string, pago: number, mes_pago: number,  year_pago: number, correo_empleado: string, fecha_realizacion_pago?: string) {
  const registroPago = await ensureTableRegistroPagoExists();
  const pagoStr = pago.toString();
  const year_pagoStr = year_pago.toString();
  return await db.insert(registroPago).values([{ marca_temporal, id_cliente, concepto, pago: pagoStr, mes_pago, year_pago: year_pagoStr, correo_empleado, fecha_realizacion_pago, estatus: 'activo' }]);
}

export async function updateRegistroPago(id_pago: number, concepto: string, pago: number, mes_pago: number, year_pago: number, correo_empleado: string, fecha_realizacion_pago?: string, estatus?: string) {
  const registroPago = await ensureTableRegistroPagoExists();
  const pagoStr = pago.toString();
  const year_pagoStr = year_pago.toString();
  const updateData: any = {
    concepto,
    pago: pagoStr,
    mes_pago,
    year_pago: year_pagoStr,
    correo_empleado,
    fecha_realizacion_pago
  };
  if (estatus) {
    updateData.estatus = estatus;
  }
  return await db.update(registroPago)
    .set(updateData)
    .where(eq(registroPago.id_pago, id_pago))
    .returning();
}

export async function updateEstatusPago(id_pago: number, estatus: string) {
  const registroPago = await ensureTableRegistroPagoExists();
  return await db.update(registroPago)
    .set({ estatus })
    .where(eq(registroPago.id_pago, id_pago))
    .returning();
}

export async function getPagosTodosConNombres() {
  try {
    const result = await dbTablas
      .select({
        id_pago: registroPago.id_pago,
        marca_temporal: registroPago.marca_temporal,
        id_cliente: registroPago.id_cliente,
        nombre_cliente: catalogo_clientes.nombre_cliente,
        concepto: registroPago.concepto,
        pago: registroPago.pago,
        mes_pago: registroPago.mes_pago,
        year_pago: registroPago.year_pago,
        correo_empleado: registroPago.correo_empleado,
        fecha_realizacion_pago: registroPago.fecha_realizacion_pago,
        estatus: registroPago.estatus
      })
      .from(registroPago)
      .leftJoin(catalogo_clientes, eq(registroPago.id_cliente, sql`${catalogo_clientes.id_cliente}::text`))
      .orderBy(desc(registroPago.year_pago), desc(registroPago.mes_pago));

    return result;
  } catch (error) {
    console.error('Error en getPagosTodosConNombres:', error);
    throw error;
  }
}



async function ensureTableRegistroPagoExists() {
  const result = await client`
    SELECT EXISTS (
      SELECT FROM information_schema.tables 
      WHERE table_schema = 'public' 
      AND table_name = 'registroPago'
    );`;

  if (!result[0].exists) {
    await client`
      CREATE TABLE "registroPago" (
        id_pago SERIAL PRIMARY KEY,
        marca_temporal TEXT,
        id_cliente TEXT,
        concepto TEXT,
        pago numeric,
        mes_pago INTEGER,
        year_pago TEXT,
        correo_empleado TEXT,
        fecha_realizacion_pago TEXT,
        estatus TEXT DEFAULT 'activo'
      );`;
  } else {
    // Migración automática para agregar la columna estatus si no existe
    await client`
      ALTER TABLE "registroPago" ADD COLUMN IF NOT EXISTS "estatus" TEXT DEFAULT 'activo';
    `;
    await client`
      UPDATE "registroPago" SET "estatus" = 'activo' WHERE "estatus" IS NULL;
    `;
  }

  const registroPago = pgTable('registroPago', {
    id_pago: serial('id_pago').primaryKey(),
    marca_temporal: text('marca_temporal'),
    id_cliente: text('id_cliente'),
    concepto: text('concepto'),
    pago: numeric('pago'),
    mes_pago : integer('mes_pago'),
    year_pago : text('year_pago'),
    correo_empleado: text('correo_empleado'),
    fecha_realizacion_pago: text('fecha_realizacion_pago'),
    estatus: text('estatus').default('activo')
  });

  return registroPago;
}

export const registroPago = pgTable('registroPago', {
  id_pago: serial('id_pago').primaryKey(),
  marca_temporal: text('marca_temporal'),
  id_cliente: text('id_cliente'),
  concepto: text('concepto'),
  pago: numeric('pago'),
  mes_pago : integer('mes_pago'),
  year_pago : text('year_pago'),
  correo_empleado: text('correo_empleado'),
  fecha_realizacion_pago: text('fecha_realizacion_pago'),
  estatus: text('estatus').default('activo')
});


/*export const users = pgTable('costofletes', {
    id: serial('id').primaryKey(),
    origen: text('origen'),
    destino: text('destino'),
    tallaenvio: text('tallaenvio'),
    costo: numeric('costo'),
    paqueteria: numeric('paqueteria'),
  });*/


// esto quedo aqui por si se ocupa para el registro de usuarios

export const datosUsuario1 = pgTable('datosUsuario', {
  id: serial('id').primaryKey(),
  nombre: text('nombre'),
  apellido: text('apellido'),
  nivel: text('nivel'),
  correo: text('correo'),
});

// Esquema y tabla para historial de actividades del staff/admin
export const activity_history = pgTable('activity_history', {
  id: serial('id').primaryKey(),
  fecha: text('fecha'),                      // Fecha completa: YYYY-MM-DD
  hora: text('hora'),                        // Hora: HH:mm:ss
  usuario: text('usuario'),                  // Nombre o correo del usuario
  tipo_usuario: text('tipo_usuario'),        // "admin" o "staff"
  accion: text('accion'),                    // Qué hizo (ej: "creó cliente", "modificó producto")
  detalles: text('detalles')                 // Detalles adicionales (opcional)
});

// Función para asegurar la existencia de la tabla
async function ensureTableActivityHistoryExists() {
  const result = await client`
    SELECT EXISTS (
      SELECT FROM information_schema.tables 
      WHERE table_schema = 'public' 
      AND table_name = 'activity_history'
    );`;

  if (!result[0].exists) {
    await client`
      CREATE TABLE "activity_history" (
        id SERIAL PRIMARY KEY,
        fecha TEXT,
        hora TEXT,
        usuario TEXT,
        tipo_usuario TEXT,
        accion TEXT,
        detalles TEXT
      );`;
  }

  const tableActivityHistory = pgTable('activity_history', {
    id: serial('id').primaryKey(),
    fecha: text('fecha'),
    hora: text('hora'),
    usuario: text('usuario'),
    tipo_usuario: text('tipo_usuario'),
    accion: text('accion'),
    detalles: text('detalles')
  });

  return tableActivityHistory;
}

// Función para crear un registro en el historial de actividades
export async function createActivityHistory(
  fecha: string,
  hora: string,
  usuario: string,
  tipo_usuario: string,
  accion: string,
  detalles?: string
) {
  const activityHistory = await ensureTableActivityHistoryExists();
  return await db.insert(activityHistory).values([{ fecha, hora, usuario, tipo_usuario, accion, detalles }]);
}

// Función para consultar el historial de actividades (ordenado por más reciente)
export async function getActivityHistory() {
  const activityHistory = await ensureTableActivityHistoryExists();
  return await db.select().from(activityHistory).orderBy(desc(activityHistory.id));
}

// ==========================================
// Módulo de Creación y Asignación de Tareas
// ==========================================

export const tareas = pgTable('tareas', {
  id_tarea: serial('id_tarea').primaryKey(),
  titulo: text('titulo').notNull(),
  descripcion: text('descripcion'),
  prioridad: varchar('prioridad', { length: 16 }).default('media'),
  estado: varchar('estado', { length: 24 }).default('pendiente'),
  fecha_limite: text('fecha_limite'),
  fecha_creacion: text('fecha_creacion'),
  fecha_completada: text('fecha_completada'),
  creado_por: text('creado_por'), // Correo o ID del admin
  asignado_a: text('asignado_a'), // Correo o ID del staff
});

export const comentarios_tarea = pgTable('comentarios_tarea', {
  id_comentario: serial('id_comentario').primaryKey(),
  id_tarea: integer('id_tarea').references(() => tareas.id_tarea, { onDelete: 'cascade' }),
  usuario: text('usuario'),
  comentario: text('comentario').notNull(),
  fecha_registro: text('fecha_registro'),
});

// Funciones para asegurar la existencia de las tablas
export async function ensureTableTareasExists() {
  const result = await client`
    SELECT EXISTS (
      SELECT FROM information_schema.tables 
      WHERE table_schema = 'public' 
      AND table_name = 'tareas'
    );`;

  if (!result[0].exists) {
    await client`
      CREATE TABLE "tareas" (
        id_tarea SERIAL PRIMARY KEY,
        titulo TEXT NOT NULL,
        descripcion TEXT,
        prioridad VARCHAR(16) DEFAULT 'media',
        estado VARCHAR(24) DEFAULT 'pendiente',
        fecha_limite TEXT,
        fecha_creacion TEXT,
        fecha_completada TEXT,
        creado_por TEXT,
        asignado_a TEXT
      );`;
  }

  return tareas;
}

export async function ensureTableComentariosTareaExists() {
  const result = await client`
    SELECT EXISTS (
      SELECT FROM information_schema.tables 
      WHERE table_schema = 'public' 
      AND table_name = 'comentarios_tarea'
    );`;

  if (!result[0].exists) {
    // Primero nos aseguramos de que exista la tabla de tareas padre
    await ensureTableTareasExists();
    await client`
      CREATE TABLE "comentarios_tarea" (
        id_comentario SERIAL PRIMARY KEY,
        id_tarea INTEGER REFERENCES tareas(id_tarea) ON DELETE CASCADE,
        usuario TEXT,
        comentario TEXT NOT NULL,
        fecha_registro TEXT
      );`;
  }

  return comentarios_tarea;
}

// Funciones de consulta y creación (CRUD) para el módulo de tareas
export async function getTodasTareas() {
  const table = await ensureTableTareasExists();
  return await db.select().from(table).orderBy(desc(table.id_tarea));
}

export async function getTareasAsignadas(correo: string) {
  const table = await ensureTableTareasExists();
  return await db.select().from(table).where(eq(table.asignado_a, correo)).orderBy(desc(table.id_tarea));
}

export async function getTareasCreadas(correo: string) {
  const table = await ensureTableTareasExists();
  return await db.select().from(table).where(eq(table.creado_por, correo)).orderBy(desc(table.id_tarea));
}

export async function createTarea(
  titulo: string,
  descripcion: string,
  prioridad: string,
  fecha_limite: string,
  fecha_creacion: string,
  creado_por: string,
  asignado_a: string
) {
  const table = await ensureTableTareasExists();
  return await db.insert(table).values([{
    titulo,
    descripcion,
    prioridad,
    fecha_limite,
    fecha_creacion,
    creado_por,
    asignado_a
  }]).returning();
}

export async function updateEstadoTarea(id_tarea: number, estado: string, fecha_completada?: string) {
  const table = await ensureTableTareasExists();
  const updateData: any = { estado };
  if (fecha_completada !== undefined) {
    updateData.fecha_completada = fecha_completada;
  }
  return await db.update(table).set(updateData).where(eq(table.id_tarea, id_tarea)).returning();
}

export async function updateTarea(
  id_tarea: number,
  updateFields: {
    titulo?: string;
    descripcion?: string;
    prioridad?: string;
    estado?: string;
    fecha_limite?: string;
    fecha_completada?: string | null;
    asignado_a?: string | null;
  }
) {
  const table = await ensureTableTareasExists();
  return await db.update(table).set(updateFields).where(eq(table.id_tarea, id_tarea)).returning();
}

export async function deleteTarea(id_tarea: number) {
  const table = await ensureTableTareasExists();
  return await db.delete(table).where(eq(table.id_tarea, id_tarea)).returning();
}

export async function createComentarioTarea(
  id_tarea: number,
  usuario: string,
  comentario: string,
  fecha_registro: string
) {
  const table = await ensureTableComentariosTareaExists();
  return await db.insert(table).values([{
    id_tarea,
    usuario,
    comentario,
    fecha_registro
  }]).returning();
}

export async function getComentariosTarea(id_tarea: number) {
  const table = await ensureTableComentariosTareaExists();
  return await db.select().from(table).where(eq(table.id_tarea, id_tarea)).orderBy(table.id_comentario);
}





