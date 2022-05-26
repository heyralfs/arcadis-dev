import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CollectPointModule } from 'src/collect-point/collect-point.module';
import { ParameterEntity } from './entities/parameter.entity';
import { ParameterController } from './parameter.controller';
import { ParameterService } from './parameter.service';

@Module({
  imports: [CollectPointModule, TypeOrmModule.forFeature([ParameterEntity])],
  controllers: [ParameterController],
  providers: [ParameterService],
})
export class ParameterModule {}
