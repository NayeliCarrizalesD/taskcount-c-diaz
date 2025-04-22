import { drizzle } from 'drizzle-orm/postgres-js';
import { pgTable, serial, varchar } from 'drizzle-orm/pg-core';
import { eq } from 'drizzle-orm';
import postgres from 'postgres';
import { genSaltSync, hashSync } from 'bcrypt-ts';

// Optionally, if not using email/pass login, you can
// use the Drizzle adapter for Auth.js / NextAuth
// https://authjs.dev/reference/adapter/drizzle
let client = postgres(`${process.env.POSTGRES_URL!}?sslmode=require`);
let db = drizzle(client);

export async function getUser(email: string) {
  const users = await ensureTableExists();
  return await db.select().from(users).where(eq(users.email, email));
}

export async function createUser( name: string, last_name: string, email: string, password: string, ) {
  const users = await ensureTableExists();
  let salt = genSaltSync(10);
  let hash = hashSync(password, salt);

  return await db.insert(users).values({ name, last_name, email, password: hash });
}

async function ensureTableExists() {
  const result = await client`
    SELECT EXISTS (
      SELECT FROM information_schema.tables 
      WHERE table_schema = 'public' 
      AND table_name = 'User'
    );`;

  if (!result[0].exists) {
    await client`
      CREATE TABLE "User" (
        id SERIAL PRIMARY KEY,
        name VARCHAR(64),
        last_name VARCHAR(64),
        email VARCHAR(64),
        password VARCHAR(64)
      );`;
  }

  const table = pgTable('User', {
    id: serial('id').primaryKey(),
    name: varchar('name', { length: 64 }),
    last_name: varchar('last_name', { length: 64 }),
    email: varchar('email', { length: 64 }),
    password: varchar('password', { length: 64 }),
  });

  return table;
}

export const tableLogin = pgTable('User', {
  id: serial('id').primaryKey(),
  email: varchar('email', { length: 64 }),
  password: varchar('password', { length: 64 }),
  
});

export const dbLogin = drizzle(client);
