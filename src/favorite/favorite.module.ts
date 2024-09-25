import { Module } from '@nestjs/common';
import { FavoriteService } from './favorite.service';
import { FavoriteController } from './favorite.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Favorite } from './entities/favorite.entity';
import { UsersModule } from 'src/users/users.module';

@Module({
  imports:[
    TypeOrmModule.forFeature([Favorite]),
    UsersModule, 
  ], // Importa el repositorio aquí
  controllers: [FavoriteController],
  providers: [FavoriteService],
  exports: [FavoriteService],  // Exporta el servicio para usarlo en otros módulos  // Importa el módulo de usuarios aquí para usarlo en el repositorio  // Importa el módulo de favoritos aquí para usarlo en los controladores  // Importa el módulo de usuarios aquí para usarlo en los servicios  // Importa el módulo de favoritos aquí para usarlo en
})
export class FavoriteModule {}
