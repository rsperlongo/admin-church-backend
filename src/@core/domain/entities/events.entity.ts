import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { CategoryEnum } from "../enum/category.enum";

@Entity()
export class EventsEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column()
    title: string

    @Column({ nullable: true})
    description: string;

    @Column({type: 'enum', enum: CategoryEnum, default: CategoryEnum[0] })
    category: CategoryEnum[];

    @Column()
    initialDate: Date;

    @Column()
    finishDate: Date;
}