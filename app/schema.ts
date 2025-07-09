import { pgTable, numeric, serial, text } from "drizzle-orm/pg-core";
import { drizzle } from 'drizzle-orm/postgres-js';
import { eq, desc } from 'drizzle-orm';
import postgres from 'postgres';


let client = postgres(`${process.env.POSTGRES_URL!}?sslmode=require`);
let db = drizzle(client);

export const dbTablas = drizzle(client)

// Registro de usuarios

export async function getUsuario(correo: string) {
  const datosUsuario = await ensureTableDatosUsuarioExists();
  return await db.select().from(datosUsuario).where(eq(datosUsuario.correo, correo));
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
        nivelTEXT
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

export async function getClientes(nombre_cliente: string) {
  const catalogoClientes = await ensureTableCatalogoClientesExists();
  return await db.select().from(catalogoClientes).where(eq(catalogoClientes.nombre_cliente, nombre_cliente));
}
export async function getTodosClientes() {
  const catalogoClientes = await ensureTableCatalogoClientesExists();
  return await db.select().from(catalogoClientes).orderBy(catalogoClientes.nombre_cliente);
}

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
    id_producto: serial('id_cliente').primaryKey(),
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
  id_producto: serial('id_cliente').primaryKey(),
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

export async function getClienteHonorarios(nombre_cliente: string) {
  const configClienteHonorario = await ensureTableConfigClienteHonorarioExists();
  return await db.select().from(configClienteHonorario).where(eq(configClienteHonorario.nombre_cliente, nombre_cliente));
}


export async function getClienteHonorariosTodos() {
  const configClienteHonorario = await ensureTableConfigClienteHonorarioExists();
  return await db.select().from(configClienteHonorario);
}


export async function createCosto(nombre_cliente: string, concepto: string, pago1: number) {
  const configClienteHonorario = await ensureTableConfigClienteHonorarioExists();
  const pago = pago1.toString();
  return await db.insert(configClienteHonorario).values([{ nombre_cliente, concepto, pago}]);
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
        nombre_cliente TEXT,
        concepto TEXT,
        pago numeric
      );`;
  }

  const configClienteHonorario = pgTable('configClienteHonorario', {
    id_cliente_honorario: serial('id_cliente_honorario').primaryKey(),
    nombre_cliente: text('nombre_cliente'),
    concepto: text('concepto'),
    pago: numeric('pago')
  });

  return configClienteHonorario;
}

export const configClienteHonorario = pgTable('configClienteHonorario', {
  id_cliente_honorario: serial('id_cliente_honorario').primaryKey(),
    nombre_cliente: text('nombre_cliente'),
    concepto: text('concepto'),
    pago: numeric('pago')
});

// Registro del pago que se le hace a los clientes 

export async function getRegistroPago(marca_temporal: string) {
  const registroPago = await ensureTableRegistroPagoExists();
  return await db.select().from(registroPago).where(eq(registroPago.marca_temporal, marca_temporal));
}

export async function getPagosTodos() {
  const registroPago = await ensureTableRegistroPagoExists();
  return await db.select().from(registroPago);
}

export async function createRegistroPago( marca_temporal: string, nombre_cliente: string, concepto: string, pago: number, mes_pago: string,  year_pago: number, correo_empleado: string) {
  const registroPago = await ensureTableRegistroPagoExists();
  const pagoStr = pago.toString();
  const year_pagoStr = year_pago.toString();
  return await db.insert(registroPago).values([{ marca_temporal, nombre_cliente, concepto, pago: pagoStr, mes_pago, year_pago: year_pagoStr, correo_empleado }]);
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
        nombre_cliente TEXT,
        concepto TEXT,
        pago numeric,
        mes_pago TEXT,
        year_pago TEXT,
        correo_empleado TEXT
      );`;
  }

  const registroPago = pgTable('registroPago', {
    id_pago: serial('id_pago').primaryKey(),
    marca_temporal: text('marca_temporal'),
    nombre_cliente: text('nombre_cliente'),
    concepto: text('concepto'),
    pago: numeric('pago'),
    mes_pago : text('mes_pago'),
    year_pago : text('year_pago'),
    correo_empleado: text('correo_empleado') 
  });

  return registroPago;
}

export const registroPago = pgTable('registroPago', {
  id_pago: serial('id_pago').primaryKey(),
    marca_temporal: text('marca_temporal'),
    nombre_cliente: text('nombre_cliente'),
    concepto: text('concepto'),
    pago: numeric('pago'),
    mes_pago : text('mes_pago'),
    year_pago : text('year_pago'),
    correo_empleado: text('correo_empleado') 
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





