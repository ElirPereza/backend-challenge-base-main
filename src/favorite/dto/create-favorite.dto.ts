import { IsBoolean, IsString } from "class-validator";

export class CreateFavoriteDto {

    @IsString()
    itemId!:string;

    @IsBoolean()
    liked!:boolean;

}
