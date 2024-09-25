import { User } from "../../users/entities/user.entity";
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from "typeorm";

@Entity()
export class Favorite {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  itemId!: string; // Aquí puedes guardar el ID del elemento de la API externa.

  @Column({ default: true })
  liked!: boolean; // Indica si le gusta o no.

  @ManyToOne(() => User)
  @JoinColumn({ name: "userEmail", referencedColumnName: "email" })
  user!: User; // Relación con el usuario.

  @Column()
  userEmail!: string;
}
