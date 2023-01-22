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
import { MaterialTable } from 'src/entities/MaterialTable';

import { MaterialTableService } from './material-table.service';

@Controller('material')
export class MaterialTableController {
  constructor(private service: MaterialTableService) {}

  @Get()
  @UseGuards(JwtAuthGuard)
  @Roles(Role.USER, Role.ADMIN)
  getAllStorage() {
    return this.service.getMaterial();
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  @Roles(Role.USER, Role.ADMIN)
  getSomeStorage(@Param('id') id: number) {
    return this.service.getSomeMaterial(id);
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  @Roles(Role.ADMIN)
  postSomeStorage(@Body() req: MaterialTable) {
    const newVar = plainToInstance(MaterialTable, req);
    return this.service.createStorage(newVar);
  }

  @Put(':id')
  @UseGuards(JwtAuthGuard)
  @Roles(Role.ADMIN)
  updateAnimal(@Param('id') id: number, @Body() req: MaterialTable) {
    const newVar = plainToInstance(MaterialTable, req);
    return this.service.updateStorage(id, newVar);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  @Roles(Role.ADMIN)
  deleteAnimal(@Param('id') id: number) {
    return this.service.deleteStorage(id);
  }
}
