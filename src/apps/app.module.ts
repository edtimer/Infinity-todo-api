import { GraphQLModule } from '@nestjs/graphql';
import { Logger, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { PrismaModule } from 'nestjs-prisma';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AppResolver } from './app.resolver';
import { AuthModule } from '../auth/auth.module';
import { UsersModule } from '../users/users.module';

import config from '../common/configs/config';
import { loggingMiddleware } from '../common/middleware/logging.middleware';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { GqlConfigService } from '../graphql/gql-config.service';

import { MailerModule } from '@nestjs-modules/mailer';
import { CommunicationModule } from 'src/communication/communication.module';

import { EventEmitterModule } from '@nestjs/event-emitter';
import { GraphqlInterceptor, SentryModule } from '@ntegral/nestjs-sentry';
import { SentryConfig } from 'src/common/configs/config.interface';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { TodosModule } from 'src/todos/todos.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, load: [config] }),
    PrismaModule.forRoot({
      isGlobal: true,
      prismaServiceOptions: {
        middlewares: [loggingMiddleware(new Logger('PrismaMiddleware'))], // configure prisma middleware
      },
    }),    SentryModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (config: ConfigService) => {
        const loggerConfig = config.get<SentryConfig>('sentry');
        const nest = config.get('nest');
        return {
          dsn: loggerConfig.dsn,
          debug: true,
        };
      },
      inject: [ConfigService],
    }),

    GraphQLModule.forRootAsync<ApolloDriverConfig>({
      driver: ApolloDriver,
      useClass: GqlConfigService,
    }),

    AuthModule,
    UsersModule,
    TodosModule,
    CommunicationModule,

    PrismaModule,
    MailerModule.forRoot({
      transport:{
        host:process.env.SMTP_SERVER,
        auth:{
          user:process.env.SMTP_USER,
          pass:process.env.SMTP_PASS
        }
      }
    }),
    EventEmitterModule.forRoot()

  ],
  controllers: [AppController],
  //due to difficulty in getting errors, the interceptor catches the errors
  providers: [AppService, AppResolver,    {
    provide: APP_INTERCEPTOR,
    useFactory: () => new GraphqlInterceptor(),
  },],
})
export class AppModule {}
