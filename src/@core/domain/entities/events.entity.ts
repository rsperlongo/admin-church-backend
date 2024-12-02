import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class EventsEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column()
    title: string

    @Column({ nullable: true})
    description: string;

    @Column({ nullable: true })
    category: string;

    @Column()
    initialDate: Date;

    @Column()
    finishDate: Date;
}