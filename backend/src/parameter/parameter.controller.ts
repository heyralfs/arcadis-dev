import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
} from '@nestjs/common';
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

  @Delete(':id')
  delete(@Param('id', ParseIntPipe) id: number) {
    return this.parameterService.delete(id);
  }
}
