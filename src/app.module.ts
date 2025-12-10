import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './app/users/users.module';
import { TracksModule } from './app/tracks/tracks.module';
import { ArtistsModule } from './app/artists/artists.module';
import { AlbumsModule } from './app/albums/albums.module';
import { FavoritesModule } from './app/favorites/favorites.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { LoggerMiddleware } from './app/logging/logger.middleware';
import cors from 'cors';
import helmet from 'helmet';
import { LoggerModule } from 'pino-nestjs';

@Module({
  imports: [
    UsersModule,
    ConfigModule.forRoot(),
    TracksModule,
    ArtistsModule,
    AlbumsModule,
    FavoritesModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.POSTGRES_HOST,
      port: Number(process.env.POSTGRES_PORT),
      username: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_DB,
      migrations: [__dirname + '/database/migrations/*{.ts,.js}'],
      migrationsTableName: '_migrations',
      migrationsRun: true,
      entities: [__dirname + '/app/**/*.entity{.ts,.js}'],
      autoLoadEntities: true,
      synchronize: false,
    }),
    LoggerModule.forRoot({
      pinoHttp: {
        customProps: (req, res) => ({
          context: 'HTTP',
        }),
        transport: {
          target: 'pino-pretty',
        },
      },
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
