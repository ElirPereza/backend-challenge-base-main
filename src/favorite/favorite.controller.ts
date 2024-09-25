import { Controller, Get, Post, Body, Patch, Param, Delete, Req, UseGuards } from "@nestjs/common";
import { FavoriteService } from "./favorite.service";
import { CreateFavoriteDto } from "./dto/create-favorite.dto";
import { ActiveUser } from "src/common/decorators/active-user.decorator";
import { Role } from "src/common/enums/role.enum";
import { Roles } from "src/auth/decorators/roles.decorator";
import { AuthGuard } from "src/auth/guard/auth.guard";
import { RolesGuard } from "src/auth/guard/roles.guard";
import { UserActiveInterface } from "src/common/interface/user-active.interface";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";


@ApiTags('Favorite')
@ApiBearerAuth()
@Roles(Role.USER)
@UseGuards(AuthGuard, RolesGuard)
@Controller("favorite")
export class FavoriteController {
  constructor(private readonly favoriteService: FavoriteService) {}

  @Roles(Role.USER)
  @UseGuards(AuthGuard, RolesGuard)
  @Post()
  async createFavorite(
    @ActiveUser() user: UserActiveInterface,
    @Body() CreateFavorite: CreateFavoriteDto,
  ) {
    return await this.favoriteService.createFavorite(CreateFavorite, user);
  }

  @Get()
  async getUserFavorites(@ActiveUser() user: UserActiveInterface) {
    return await this.favoriteService.getUserFavorites(user);
  }

  @Delete(":itemId")
  async removeFavorite(@ActiveUser() user: UserActiveInterface, @Param("itemId") itemId: string) {
    await this.favoriteService.removeFavorite(user, itemId);
    return { message: "Favorite removed successfully" };
  }
}
