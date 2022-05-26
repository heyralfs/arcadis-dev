import { Body, Controller, Get, Post } from '@nestjs/common';
import { CollectPointService } from './collect-point.service';
import { CreateCollectPointDto } from './dto/create-collect-point.dto';
import { CollectPointEntity } from './entities/collect-point.entity';

@Controller('collect-points')
export class CollectPointController {
  constructor(private readonly collectPointService: CollectPointService) {}

  @Get()
  getAll() {
    return this.collectPointService.findAll();
  }

  @Post()
  create(@Body() body: CreateCollectPointDto): Promise<CollectPointEntity> {
    return this.collectPointService.create(body);
  }
}
