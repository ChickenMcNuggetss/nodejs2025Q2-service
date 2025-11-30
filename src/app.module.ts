import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './app/users/users.module';
import { TracksModule } from './app/tracks/tracks.module';
import { ArtistsModule } from './app/artists/artists.module';
import { AlbumsModule } from './app/albums/albums.module';

@Module({
  imports: [UsersModule, TracksModule, ArtistsModule, AlbumsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
