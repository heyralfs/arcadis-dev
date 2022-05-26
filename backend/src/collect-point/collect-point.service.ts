import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateCollectPointDto } from './dto/create-collect-point.dto';
import { CollectPointEntity } from './entities/collect-point.entity';

@Injectable()
export class CollectPointService {
  constructor(
    @InjectRepository(CollectPointEntity)
    private collectPointRepository: Repository<CollectPointEntity>,
  ) {}

  async findAll(): Promise<CollectPointEntity[]> {
    return this.collectPointRepository.find();
  }

  async create(
    collectPointData: CreateCollectPointDto,
  ): Promise<CollectPointEntity> {
    const isNameAlreadyInUse = await this.collectPointRepository.findOneBy({
      name: collectPointData.name,
    });

    if (isNameAlreadyInUse) {
      throw new BadRequestException([
        'Já existe um ponto de coleta com este nome. Tente outro.',
      ]);
    }

    return this.collectPointRepository.save(collectPointData);
  }

  async update(
    collectPointId: number,
    collectPointData: CreateCollectPointDto,
  ): Promise<CollectPointEntity> {
    const collectPoint = await this.collectPointRepository.findOneBy({
      id: collectPointId,
    });

    if (!collectPoint) {
      throw new NotFoundException([
        `Ponto de coleta com id ${collectPointId} não encontrado.`,
      ]);
    }

    await this.collectPointRepository.update(
      { id: collectPointId },
      collectPointData,
    );

    return { ...collectPoint, ...collectPointData };
  }

  async detele(collectPointId: number): Promise<CollectPointEntity> {
    const collectPoint = await this.collectPointRepository.findOneBy({
      id: collectPointId,
    });

    if (!collectPoint) {
      throw new NotFoundException([
        `Ponto de coleta com id ${collectPointId} não encontrado.`,
      ]);
    }

    await this.collectPointRepository.delete({ id: collectPointId });

    return collectPoint;
  }
}
