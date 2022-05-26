import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CollectPointService } from 'src/collect-point/collect-point.service';
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

    parameter.code = parameterData.code;
    parameter.name = paramConstants.name;
    parameter.value = parameterData.value;
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
}
