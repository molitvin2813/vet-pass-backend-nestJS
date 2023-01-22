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
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { Roles } from 'src/auth/role.decorator';
import { Role } from 'src/auth/userEnum';
import { DateBetween } from 'src/DTO/dateBetween-dto';
import { ListMaterialTable } from 'src/entities/ListMaterialTable';

import { ListMaterialTableService } from './list-material-table.service';

@Controller('list-material')
export class ListMaterialTableController {
  constructor(private service: ListMaterialTableService) {}

  @Get()
  getAllListMaterial() {
    return this.service.getAllMaterial();
  }

  @Post('date')
  getAllListMaterialByDate(@Body() req: DateBetween) {
    return this.service.getAllMaterialByDate(req);
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  @Roles(Role.USER, Role.ADMIN)
  getSomeListMaterial(@Param('id') id: number) {
    return this.service.getMaterialList(id);
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  @Roles(Role.USER, Role.ADMIN)
  postListMaterial(@Body() req: ListMaterialTable) {
    const newVar = plainToInstance(ListMaterialTable, req);
    return this.service.createMaterialList(newVar);
  }

  @Put(':id')
  @UseGuards(JwtAuthGuard)
  @Roles(Role.USER, Role.ADMIN)
  updateListMaterial(@Param('id') id: number, @Body() req: ListMaterialTable) {
    const newVar = plainToInstance(ListMaterialTable, req);
    return this.service.updateMaterialList(id, newVar);
  }

  @Delete(':id')
  //@UseGuards(JwtAuthGuard)
  //@Roles(Role.USER, Role.ADMIN)
  deleteListMaterial(@Param('id') id: number) {
    console.log(id);
    return this.service.deleteMaterialList(id);
  }
}
