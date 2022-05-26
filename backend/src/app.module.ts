import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CollectPointModule } from './collect-point/collect-point.module';

@Module({
  imports: [CollectPointModule, TypeOrmModule.forRoot()],
})
export class AppModule {}
