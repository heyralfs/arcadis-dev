import { Body, Controller, Get, Post } from '@nestjs/common';
import { CreateParameterDto } from './dto/create-parameter.dto';
import { ParameterEntity } from './entities/parameter.entity';
import { ParameterService } from './parameter.service';

@Controller('parameters')
export class ParameterController {
  constructor(private readonly parameterService: ParameterService) {}

  @Get()
  getAll() {
    return this.parameterService.findAll();
  }

  @Post()
  create(@Body() body: CreateParameterDto): Promise<ParameterEntity> {
    return this.parameterService.create(body);
  }
}
