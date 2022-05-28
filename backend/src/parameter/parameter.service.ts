import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CollectPointService } from '../collect-point/collect-point.service';
import { Repository } from 'typeorm';
import { CreateParameterDto } from './dto/create-parameter.dto';
import { ParameterEntity } from './entities/parameter.entity';
import { parameterConstants } from './parameter.constants';

@Injectable()
export class ParameterService {
  constructor(
    @InjectRepository(ParameterEntity)
    private parameterRepository: Repository<ParameterEntity>,

    private collectPointService: CollectPointService,
  ) {}

  async findAll(): Promise<ParameterEntity[]> {
    return this.parameterRepository.find({ relations: ['collectPoint'] });
  }

  async create(parameterData: CreateParameterDto): Promise<ParameterEntity> {
    const parameter = new ParameterEntity();
    const paramConstants = parameterConstants.filter(
      (param) => param.code === parameterData.code,
    )[0];

    if (!paramConstants) {
      throw new NotFoundException([
        `Não foi encontrado nenhum parâmetro com o código ${parameterData.code}`,
      ]);
    }

    const parameterAlreadyRegistred = await this.parameterRepository
      .createQueryBuilder('param')
      .leftJoinAndSelect('param.collectPoint', 'collectPoint')
      .where('collectPoint.id = :id', { id: parameterData.collectPointId })
      .andWhere('param.code = :code', { code: parameterData.code })
      .andWhere('param.collectionDate = :date', {
        date: parameterData.collectionDate,
      })
      .getOne();

    if (parameterAlreadyRegistred) {
      throw new BadRequestException([
        'Este parâmetro, com esta data, já foi cadastrado para o ponto de coleta em questão.',
      ]);
    }

    parameter.code = parameterData.code;
    parameter.name = paramConstants.name;
    parameter.value = parameterData.value;
    parameter.unit = paramConstants.unit;
    parameter.overLimit = parameterData.value > paramConstants.limit;
    parameter.collectionDate = parameterData.collectionDate;
    parameter.collectPoint = await this.collectPointService.findById(
      parameterData.collectPointId,
    );

    if (!parameter.collectPoint) {
      throw new NotFoundException([
        `Não foi encontrado nenhum ponto de coleta com id ${parameterData.collectPointId}`,
      ]);
    }

    return this.parameterRepository.save(parameter);
  }

  async delete(id: number): Promise<ParameterEntity> {
    const parameter = await this.parameterRepository.findOneBy({ id });

    if (!parameter) {
      throw new NotFoundException([`Parâmetro com id ${id} não encontrado.`]);
    }

    await this.parameterRepository.delete({ id });

    return parameter;
  }
}
