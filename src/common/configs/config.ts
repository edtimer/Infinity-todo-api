import { ApolloDriver } from '@nestjs/apollo';
import type { Config } from './config.interface';

const config: Config = {
  nest: {
    port: 9000,
  },
  cors: {
    enabled: true,
  },
  swagger: {
    enabled: true,
    title: 'Infinity API',
    description: 'The nestjs API description',
    version: '1.5',
    path: 'api',
  },
  graphql: {
    playgroundEnabled: true,
    debug: true,
    schemaDestination: './src/schema.graphql',
    sortSchema: true,
  },
  security: {
    expiresIn: '1d',
    refreshIn: '7d',
    bcryptSaltOrRound: 10,
  },
  apollo:{
    driver:ApolloDriver
  },
  sentry:{
    dsn: process.env.SENTRY_KEY,
    debug: true,

  }
};

export default (): Config => config;
