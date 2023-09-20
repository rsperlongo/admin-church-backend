import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class UserEntity {
  @PrimaryGeneratedColumn('uuid')
  public id: string;

  @Column({ unique: true })
  public email: string;

  @Column({ unique: true, nullable: true })
  public password: string;
}

export default UserEntity;
