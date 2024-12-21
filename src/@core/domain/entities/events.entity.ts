import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { CategoryEnum } from "../enum/category.enum";

@Entity('events')
export class EventsEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column("varchar", { length: 200 })
    public title: string

    @Column("varchar", { length: 200 })
    public description: string;

    @Column({type: 'enum', enum: CategoryEnum, default: CategoryEnum[0] })
    public category: CategoryEnum[];

    @Column("varchar", { length: 200 })
    public initialDate: Date;

    @Column("varchar", { length: 200 })
    public finishDate: Date;
}