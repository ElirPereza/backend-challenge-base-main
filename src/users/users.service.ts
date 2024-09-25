import { Injectable, NotFoundException } from "@nestjs/common";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "./entities/user.entity";
import { Repository } from "typeorm";

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  create(createUserDto: CreateUserDto) {
    return this.userRepository.save(createUserDto);
  }

  findOneByEmail(email: string) {
    return this.userRepository.findOneBy({ email });
  }

  findByEmailWithPassword(email: string) {
    return this.userRepository.findOne({
      where: { email },
      select: ['id', 'password','email', 'password', 'rol'],
    });
  }

  findAll() {
    return this.userRepository.find();
  }

  async findOne(email: string) {
    const user = await this.userRepository.findOne({ where: { email } });
    if (!user) {
      throw new NotFoundException(`User with email ${email} not found`);
    }
    return user;
  }

  // Método para actualizar un usuario por email
  async update(email: string, updateUserDto: UpdateUserDto) {
    const user = await this.findOne(email); // Verifica si el usuario existe
    Object.assign(user, updateUserDto); // Asigna los nuevos valores al usuario
    return this.userRepository.save(user); // Guarda el usuario actualizado
  }

  // Método para eliminar un usuario por email
  async remove(email: string) {
    const user = await this.findOne(email); // Verifica si el usuario existe
    await this.userRepository.remove(user); // Elimina el usuario
    return { message: `User with email ${email} removed successfully` }; // Mensaje de éxito
  }
}

