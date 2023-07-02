import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { PrismaClientExceptionFilter, PrismaService } from 'nestjs-prisma';
import { AppModule } from './apps/app.module';
import type {
  ApolloServerConfig,
  CorsConfig,
  NestConfig,
  SwaggerConfig,
} from 'src/common/configs/config.interface';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Validation
  app.useGlobalPipes(new ValidationPipe());

  // enable shutdown hook
  const prismaService: PrismaService = app.get(PrismaService);
  await prismaService.enableShutdownHooks(app);

  // Prisma Client Exception Filter for unhandled exceptions
  const { httpAdapter } = app.get(HttpAdapterHost);
  app.useGlobalFilters(new PrismaClientExceptionFilter(httpAdapter));

  const configService = app.get(ConfigService);
  const nestConfig = configService.get<NestConfig>('nest');
  const corsConfig = configService.get<CorsConfig>('cors');
  const swaggerConfig = configService.get<SwaggerConfig>('swagger');
  const apolloConfig = configService.get<ApolloServerConfig>('apollo');

  // Swagger Api
  // if (swaggerConfig.enabled) {
  //   const options = new DocumentBuilder()
  //     .setTitle(swaggerConfig.title || 'Nestjs')
  //     .setDescription(swaggerConfig.description || 'The nestjs API description')
  //     .setVersion(swaggerConfig.version || '1.0')
  //     .build();
  //   const document = SwaggerModule.createDocument(app, options);

  //   SwaggerModule.setup(swaggerConfig.path || 'api', app, document);
  // }

  const corsOptions = {
    origin: process.env.DEVELOPMENT_MODE? process.env.DEV_FRONT_END_URL : process.env.FRONT_END_URL,
    credentials: true
  }
  if (corsConfig.enabled) {
    app.enableCors(corsOptions);
  }

  await app.listen(process.env.PORT || nestConfig.port || 9000);
  console.log('listening on port', nestConfig.port);
}
bootstrap();
