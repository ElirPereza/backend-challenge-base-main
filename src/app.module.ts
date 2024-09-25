import { Module } from "@nestjs/common";
import { AuthModule } from "./auth/auth.module";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UsersModule } from './users/users.module';
import { FavoriteModule } from './favorite/favorite.module';

@Module({
  imports: [AuthModule,
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3307,
      username: 'jeuzmaldo',
      password: 'root',
      database: 'inlaze-backend',
      autoLoadEntities: true, //,
      synchronize: true,
    }),
    UsersModule,
    FavoriteModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
