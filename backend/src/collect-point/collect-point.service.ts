import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Brackets, Repository } from 'typeorm';
import { CreateCollectPointDto } from './dto/create-collect-point.dto';
import { CollectPointEntity } from './entities/collect-point.entity';

@Injectable()
export class CollectPointService {
  constructor(
    @InjectRepository(CollectPointEntity)
    private collectPointRepository: Repository<CollectPointEntity>,
  ) {}

  async findAll(): Promise<CollectPointEntity[]> {
    return this.collectPointRepository.find({ relations: ['parameters'] });
  }

  async findById(id: number): Promise<CollectPointEntity> {
    return this.collectPointRepository.findOneBy({ id });
  }

  async create(
    collectPointData: CreateCollectPointDto,
  ): Promise<CollectPointEntity> {
    const isNameAlreadyInUse = await this.collectPointRepository.findOneBy({
      name: collectPointData.name.toLowerCase(),
    });

    if (isNameAlreadyInUse) {
      throw new BadRequestException([
        'Já existe um ponto de coleta com este nome. Tente outro.',
      ]);
    }

    const coordinatesAlreadyRegistered = await this.collectPointRepository
      .createQueryBuilder('collectPoint')
      .where('collectPoint.xCoord = :x', { x: collectPointData.xCoord })
      .andWhere('collectPoint.yCoord = :y', { y: collectPointData.yCoord })
      .getOne();

    if (coordinatesAlreadyRegistered) {
      throw new BadRequestException([
        'Já existe um ponto de coleta cadastrado com estas coordenadas.',
      ]);
    }

    return this.collectPointRepository.save({
      ...collectPointData,
      name: collectPointData.name.toLowerCase(),
    });
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

    const updateData = {
      ...collectPointData,
      name: collectPointData.name.toLowerCase(),
    };

    const nameOrCoordinatesAlreadyRegistered = await this.collectPointRepository
      .createQueryBuilder('collectPoint')
      .where(
        new Brackets((qb) => {
          qb.where('collectPoint.name = :name', {
            name: updateData.name.toLowerCase(),
          }).andWhere('collectPoint.id != :id', {
            id: collectPointId,
          });
        }),
      )
      .orWhere(
        new Brackets((qb) => {
          qb.where('collectPoint.xCoord = :x', {
            x: updateData.xCoord,
          })
            .andWhere('collectPoint.yCoord = :y', {
              y: updateData.yCoord,
            })
            .andWhere('collectPoint.id != :id', {
              id: collectPointId,
            });
        }),
      )
      .getOne();

    if (nameOrCoordinatesAlreadyRegistered) {
      throw new BadRequestException([
        'Já existe um ponto de coleta cadastrado com este nome e/ou coordenadas.',
      ]);
    }

    await this.collectPointRepository.update(
      { id: collectPointId },
      updateData,
    );

    return {
      ...collectPoint,
      ...updateData,
    };
  }

  async delete(collectPointId: number): Promise<CollectPointEntity> {
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
