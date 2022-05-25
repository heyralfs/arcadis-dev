import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { CollectPointEntity } from './collect-point.entity';

export enum ParameterName {
  ALUMINIO_DISSOLVIDO = 'Alumínio dissolvido',
  ARSENIO_TOTAL = 'Arsênio total',
  CHUMBO_TOTAL = 'Chumbo total',
  COBRE_DISSOLVIDO = 'Cobre dissolvido',
  ESCHERICHIA_COLI = 'Escherichia coli',
  CROMO_TOTAL = 'Cromo total',
  CADMIO_TOTAL = 'Cádmio total',
  DBO = 'DBO',
}

@Entity()
export class ParameterEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'enum', enum: ParameterName })
  name: ParameterName;

  @Column()
  value: number;

  @Column({ type: 'date' })
  collectionDate: string;

  @ManyToOne(
    () => CollectPointEntity,
    (collectPoint) => collectPoint.parameters,
  )
  collectPoint: CollectPointEntity;
}
