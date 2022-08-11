import {
  Controller,
  Post,
  Body,
  Get,
  Put,
  Delete,
  Param,
  UseGuards,
} from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { MaterialTable } from 'src/entities/MaterialTable';

import { MaterialTableService } from './material-table.service';

@Controller('material')
export class MaterialTableController {
  constructor(private service: MaterialTableService) {}

  @Get()
  getAllStorage() {
    return this.service.getMaterial();
  }

  @Get(':id')
  getSomeStorage(@Param('id') id: number) {
    return this.service.getSomeMaterial(id);
  }

  @Post()
  postSomeStorage(@Body() req: MaterialTable) {
    const newVar = plainToInstance(MaterialTable, req);
    return this.service.createStorage(newVar);
  }

  @Put(':id')
  updateAnimal(@Param('id') id: number, @Body() req: MaterialTable) {
    const newVar = plainToInstance(MaterialTable, req);
    return this.service.updateStorage(id, newVar);
  }

  @Delete(':id')
  deleteAnimal(@Param('id') id: number) {
    return this.service.deleteStorage(id);
  }
}
