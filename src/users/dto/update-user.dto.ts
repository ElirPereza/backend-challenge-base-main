import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';
import { IsNotEmpty, IsOptional } from 'class-validator';

export class UpdateUserDto  {


    @IsOptional() 
    @IsNotEmpty() 
    name?: string;
  
    @IsOptional() 
    @IsNotEmpty() 
    password?: string;
}
