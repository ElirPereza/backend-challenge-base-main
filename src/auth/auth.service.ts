import { BadRequestException, Injectable, UnauthorizedException } from "@nestjs/common";
import { UsersService } from "src/users/users.service";
import type { RegisterDto } from "./dto/register.dto";
import * as bcryptjs from "bcryptjs";
import type { LoginDto } from "./dto/login.dto";
import { JwtService } from "@nestjs/jwt";
import { response } from "express";

@Injectable()
export class AuthService {
  private readonly blacklistedTokens: string[] = []; // Lista negra de tokens
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}
  async register({ email, name, password }: RegisterDto) {
    const user = await this.usersService.findOneByEmail(email);

    if (user) {
      throw new BadRequestException("Email already exists");
    }

    await this.usersService.create({
      email,
      name,
      password: await bcryptjs.hash(password, 10), // Hashing the password before storing it in the database.
    });
    return { message: "User registered successfully: ", email };
  }
  async login({ email, password }: LoginDto) {
    const user = await this.usersService.findByEmailWithPassword(email);
    if (!user) {
      throw new UnauthorizedException("Email or password is wrong");
    }

    const isPasswordValid = await bcryptjs.compare(password, user.password);

    if (!isPasswordValid) {
      throw new UnauthorizedException("Email or password is wrong");
    }

    const payload = { email: user.email, name: user.name, role: user.rol };

    const token = await this.jwtService.signAsync(payload);

    // response.cookie("jwt", token, { httpOnly: true });

    return {
      token,
      email,
    };
  }

  async profile({ email, rol }: { email: string; rol: string }) {
    const user = await this.usersService.findOneByEmail(email);

    return user;
  }

  logout(token: string) {
    this.blacklistedTokens.push(token); // Agregar el token a la lista negra
    console.log("Token blacklisted:", token); // Verifica aquí
  }
  // Método para verificar si un token es válido
  isTokenBlacklisted(token: string): boolean {
    return this.blacklistedTokens.includes(token);
  }
}
