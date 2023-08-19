import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
class UserEntity {
  @PrimaryGeneratedColumn('uuid')
  public id?: string;

  @Column({ unique: true })
  public username: string;

  @Column({ unique: true, nullable: true })
  public password: string;

  @Column()
  public firstName: string;

  @Column()
  public lastName: string;
}

export default UserEntity;
