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
import { ListMaterialTable } from 'src/entities/ListMaterialTable';

import { ListMaterialTableService } from './list-material-table.service';

@Controller('list-material')
export class ListMaterialTableController {
  constructor(private service: ListMaterialTableService) {}

  @Get(':id')
  getSomeListMaterial(@Param('id') id: number) {
    return this.service.getMaterialList(id);
  }

  @Post()
  postListMaterial(@Body() req: ListMaterialTable) {
    const newVar = plainToInstance(ListMaterialTable, req);
    return this.service.createMaterialList(newVar);
  }

  @Put(':id')
  updateListMaterial(@Param('id') id: number, @Body() req: ListMaterialTable) {
    const newVar = plainToInstance(ListMaterialTable, req);
    return this.service.updateMaterialList(id, newVar);
  }

  @Delete(':id')
  deleteListMaterial(@Param('id') id: number) {
    console.log(id);
    return this.service.deleteMaterialList(id);
  }
}
