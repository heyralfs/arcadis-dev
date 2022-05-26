import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
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
}
