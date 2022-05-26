import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CollectPointController } from './collect-point.controller';
import { CollectPointService } from './collect-point.service';

import { CollectPointEntity } from './entities/collect-point.entity';

@Module({
  imports: [TypeOrmModule.forFeature([CollectPointEntity])],
  controllers: [CollectPointController],
  providers: [CollectPointService],
  exports: [CollectPointService],
})
export class CollectPointModule {}
