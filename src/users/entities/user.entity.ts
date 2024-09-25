import { Favorite } from "src/favorite/entities/favorite.entity";
import { Role } from "../../common/enums/role.enum";
import { Column, DeleteDateColumn, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id!: number;  // Puedes usar `!` para decir que TypeScript no se preocupe por la inicialización inmediata

    @Column()
    name!: string;

    @Column({unique: true, nullable: false})
    email!: string;

    @Column({nullable: false, select:false})
    password!: string;

    @Column({type:'enum', default: Role.USER, enum:Role})
    rol: string = "user";  // Puedes establecer un valor predeterminado para `rol`

    @DeleteDateColumn()
    deletedAt!: Date;  // Este campo puede ser opcional


}
