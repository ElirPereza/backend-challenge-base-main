import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Post,
  Req,
  Res,
  UseGuards,
} from "@nestjs/common";
import { AuthService } from "./auth.service";
import { RegisterDto } from "./dto/register.dto";
import { LoginDto } from "./dto/login.dto";
import { AuthGuard } from "./guard/auth.guard";
import { Roles } from "./decorators/roles.decorator";
import { RolesGuard } from "./guard/roles.guard";
import { Role } from "../common/enums/role.enum";
import { ActiveUser } from "src/common/decorators/active-user.decorator";
import { Response, response } from "express";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";

interface RequestWithUser extends Request {
  user: { email: string; rol: string; name: string };
}

@ApiTags('Auth')
@Controller("auth")
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post("login")
  login(@Body() loginDto: LoginDto) {


    return this.authService.login(loginDto);
    
  }

  @Post("register")
  register(@Body() registerDto: RegisterDto) {
    return this.authService.register(registerDto);
  }

  @ApiBearerAuth()
  @Get("profile")
  @Roles(Role.USER)
  @UseGuards(AuthGuard, RolesGuard)
  profile(@ActiveUser() user) {
    return this.authService.profile(user);
  }



  @Post("logout")
  async logout(@Res({ passthrough: true }) response: Response) {
    response.clearCookie("jwt");

    return {
      message: "Logout",
    };
  }
}
