import { Controller, Get } from '@nestjs/common';
import { CollectPointService } from './collect-point.service';

@Controller('collect-points')
export class CollectPointController {
  constructor(private readonly collectPointService: CollectPointService) {}

  @Get()
  getAll() {
    return this.collectPointService.findAll();
  }
}
