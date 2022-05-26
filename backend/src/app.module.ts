import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CollectPointModule } from './collect-point/collect-point.module';
import { ParameterModule } from './parameter/parameter.module';

@Module({
  imports: [CollectPointModule, ParameterModule, TypeOrmModule.forRoot()],
})
export class AppModule {}
