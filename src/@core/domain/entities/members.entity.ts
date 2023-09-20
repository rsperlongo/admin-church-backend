import { Column, Entity, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Members {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    firstname: string;

    @Column()
    address: string;

    @Column()
    city: string;

    @Column()
    uf: string;

    @Column()
    birthday: Date;

    @Column()
    Phone: number;
}