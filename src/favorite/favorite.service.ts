import { Injectable, NotFoundException } from "@nestjs/common";
import { CreateFavoriteDto } from "./dto/create-favorite.dto";
import { UpdateFavoriteDto } from "./dto/update-favorite.dto";
import { Favorite } from "./entities/favorite.entity";
import { UsersService } from "src/users/users.service";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { UserActiveInterface } from "src/common/interface/user-active.interface";

@Injectable()
export class FavoriteService {
 
  constructor(
    private readonly usersService:UsersService,
    @InjectRepository(Favorite)
    private readonly favoriteRepository: Repository<Favorite>,
){}



  async createFavorite(CreateFavorite:CreateFavoriteDto, user:UserActiveInterface): Promise<Favorite> {

    
    if (!user) {
      throw new NotFoundException(`User with email  not found`);
    }
    const favorite = await this.favoriteRepository.save({
      ...CreateFavorite,
      userEmail: user.email

    });
    return favorite;
  }

  async getUserFavorites(user:UserActiveInterface): Promise<Favorite[]> {
    return await this.favoriteRepository.find({
      where: { user: { email: user.email } },
      relations: ["user"], // Incluye la relación con el usuario
    });
  }

  async removeFavorite(user:UserActiveInterface, itemId: string): Promise<void> {
    // Verifica que el usuario existe
    const userVerify = await this.usersService.findOneByEmail(user.email);
    if (!userVerify) {
      throw new NotFoundException(`User with email  not found`);
    }

    // Intenta eliminar el favorito
    const result = await this.favoriteRepository.delete({
      itemId,
      userEmail: user.email, // Asegúrate de que userEmail se refiere al usuario correcto
    });

    if (result.affected === 0) {
      throw new NotFoundException(`Favorite with itemId ${itemId} not found for user`);
    }
  }


}
