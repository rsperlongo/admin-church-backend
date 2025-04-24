import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('members')
export class Members {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('varchar', { length: 200 })
  public firstname: string;

  @Column('varchar', { length: 200 })
  public lastname: string;

  @Column('varchar', { length: 200 })
  public address: string;

  @Column('varchar', { length: 150 })
  public city: string;

  @Column('varchar')
  public uf: string;

  @Column('varchar', { length: 150 })
  public birthday: string;

  @Column('varchar', { length: 150 })
  public phone: string;
}

export default Members;
