/* eslint-disable jest/no-hooks */
/* eslint-disable jest/require-top-level-describe */
import {PrismaClient} from '@prisma/client';
import {ApolloServer} from 'apollo-server';
import {ApolloServerTestClient, createTestClient} from 'apollo-server-testing';
import dedent from 'dedent';
import mysql from 'mysql2/promise';
import {nanoid} from 'nanoid';

import {schema} from '~/infra/graphqlServer/schema';

type TestContext = {
  client: ApolloServerTestClient;
  prisma: PrismaClient;
};

function serverTestClientContext() {
  return {
    before: (prisma: PrismaClient) => {
      const apolloServer = new ApolloServer({schema, context: () => ({prisma})});
      return createTestClient(apolloServer as any);
    },
  };
}

function prismaTestConnection() {
  let databaseName = '';
  let databaseUrl = '';
  let prismaClient: null | PrismaClient = null;

  return {
    before: async () => {
      databaseName = `test_${nanoid().replace('-', '_')}`;
      console.log('databaseName', databaseName);
      databaseUrl = `mysql://root:password@localhost:3306/${databaseName}`;

      const connection = await mysql.createConnection({
        password: 'password',
        user: 'root',
        host: 'localhost',
        port: 3306,
      });
      await connection.connect();
      await connection.query(`CREATE DATABASE IF NOT EXISTS ${databaseName}`);
      await connection.query(`USE ${databaseName};`);
      await connection.query(
        dedent(`
      CREATE TABLE Customer (
        id VARCHAR(255) PRIMARY KEY NOT NULL,
        name VARCHAR(255) NOT NULL,
        paymentId VARCHAR(255) UNIQUE
      );
      `),
      );
      await connection.query(
        dedent(`
      CREATE TABLE Owner (
        id VARCHAR(255) PRIMARY KEY NOT NULL,
        name VARCHAR(255) NOT NULL,
        paymentDestinationId VARCHAR(255) UNIQUE
      );
      `),
      );

      process.env.DATABASE_URL = databaseUrl;
      await connection.end();

      prismaClient = new PrismaClient();

      return prismaClient;
    },
    after: async () => {
      const connection = await mysql.createConnection(databaseUrl);
      await connection.connect();
      await connection.query(`DROP DATABASE IF EXISTS ${databaseName}`);
      await connection.end();

      await prismaClient?.$disconnect();
    },
  };
}

export function createTestContext(): TestContext {
  const ctx = {} as TestContext;
  const prismaCtx = prismaTestConnection();
  const serverCtx = serverTestClientContext();

  beforeEach(async () => {
    const prisma = await prismaCtx.before();
    const client = serverCtx.before(prisma);
    Object.assign(ctx, {
      client,
      prisma,
    });
  });

  afterEach(async () => {
    await prismaCtx.after();
  });

  return ctx;
}
