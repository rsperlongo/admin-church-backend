import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
class UserEntity {
  @PrimaryGeneratedColumn()
  public id?: string;

  @Column({ unique: true })
  public username: string;

  @Column()
  public password: string;

  @Column()
  public firstName: string;

  @Column()
  public lastName: string;
}

export default UserEntity;
