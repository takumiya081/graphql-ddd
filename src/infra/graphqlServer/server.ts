import 'module-alias/register';

import {ApolloServer} from 'apollo-server';

import {prisma} from '~/infra/prisma';

import {schema} from './schema';

export const server = new ApolloServer({schema, context: () => ({prisma})});
