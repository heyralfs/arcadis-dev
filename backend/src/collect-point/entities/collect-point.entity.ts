import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { ParameterEntity } from '../../parameter/entities/parameter.entity';

@Entity()
export class CollectPointEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 120 })
  name: string;

  @Column()
  xCoord: number;

  @Column()
  yCoord: number;

  @OneToMany(() => ParameterEntity, (parameter) => parameter.collectPoint)
  parameters: ParameterEntity[];
}
