import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { CollectPointEntity } from '../../collect-point/entities/collect-point.entity';

@Entity()
export class ParameterEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  code: string;

  @Column()
  name: string;

  @Column()
  value: number;

  @Column()
  unit: string;

  @Column()
  overLimit: boolean;

  @Column()
  collectionDate: number;

  @ManyToOne(
    () => CollectPointEntity,
    (collectPoint) => collectPoint.parameters,
  )
  collectPoint: CollectPointEntity;
}
