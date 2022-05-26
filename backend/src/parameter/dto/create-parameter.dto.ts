import { IsNotEmpty, IsNumber } from 'class-validator';

export class CreateParameterDto {
  @IsNotEmpty({ message: 'Código do parâmetro é obrigatório.' })
  readonly code: string;

  @IsNotEmpty({ message: 'Valor do parâmetro é obrigatório.' })
  @IsNumber()
  readonly value: number;

  @IsNotEmpty({ message: 'Data da coleta é obrigatória.' })
  @IsNumber()
  readonly collectionDate: number;

  @IsNotEmpty({ message: 'Ponto de coleta é obrigatório.' })
  @IsNumber()
  readonly collectPointId: number;
}
