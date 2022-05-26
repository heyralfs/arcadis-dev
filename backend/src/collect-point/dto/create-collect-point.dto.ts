import { IsNotEmpty, IsNumber, MaxLength } from 'class-validator';

export class CreateCollectPointDto {
  @IsNotEmpty({ message: 'Nome do ponto de coleta é obrigatório.' })
  @MaxLength(120, {
    message: 'O nome do ponto de coleta deve ter no máximo 120 caracteres.',
  })
  readonly name: string;

  @IsNotEmpty({ message: 'Coordenada X é obrigatória.' })
  @IsNumber()
  readonly xCoord: number;

  @IsNotEmpty({ message: 'Coordenada Y é obrigatória.' })
  @IsNumber()
  readonly yCoord: number;
}
