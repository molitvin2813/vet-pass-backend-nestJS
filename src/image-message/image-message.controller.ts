import {
  Controller,
  Post,
  Body,
  Get,
  Put,
  Delete,
  Param,
  UseGuards,
  UseInterceptors,
  UploadedFile,
  ValidationPipe,
  UsePipes,
  Res,
  Req,
  BadRequestException,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { plainToInstance } from 'class-transformer';
import { diskStorage } from 'multer';
import { extname, join } from 'path';
import { of } from 'rxjs';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { Roles } from 'src/auth/role.decorator';
import { Role } from 'src/auth/userEnum';
import { ImageNewsTable } from 'src/entities/ImageNewsTable';
import { imageFileFilter } from '../other/helper';
import { ImageMessageService } from './image-message.service';
import * as fs from 'fs';
import { ImageMessageTable } from 'src/entities/ImageMessageTable';

@Controller('image-message')
export class ImageMessageController {
  constructor(private service: ImageMessageService) {}

  @Get()
  @UseGuards(JwtAuthGuard)
  @Roles(Role.USER, Role.ADMIN, Role.CLIENT)
  getAllClient() {
    return this.service.getAll();
  }

  @Get(':id')
 
  async getSomeClient(@Param('id') id: number, @Res() res) {
    const file = await this.service.getSome(id);
    return of(res.sendFile(join(process.cwd(), 'files/message/' + file.path)));
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  @Roles(Role.USER, Role.ADMIN, Role.CLIENT)
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './files/message',
        filename: (req, file, cb) => {
          // Generating a 32 random chars long string
          const randomName = Array(32)
            .fill(null)
            .map(() => Math.round(Math.random() * 16).toString(16))
            .join('');
          //Calling the callback passing the random name generated with the original extension name
          cb(null, `${randomName}${extname(file.originalname)}`);
        },
      }),
      fileFilter: imageFileFilter,
    }),
  )
  createClient(
    @Body() req: ImageNewsTable,
    @UploadedFile() file: Express.Multer.File,
    @Req() request,
  ) {
    console.log('sersereresreres');
    if (!file || request.fileValidationError) {
      throw new BadRequestException(
        'Для загрузки доступны только изображения. Увы ;)',
      );
    }
    const newObj = plainToInstance(ImageMessageTable, {
      path: file.filename,
    });
    return this.service.create(newObj);
    //return { name: file.originalname };
  }

  @Put(':id')
  @UseGuards(JwtAuthGuard)
  @Roles(Role.USER, Role.ADMIN, Role.CLIENT)
  updateClient(@Param('id') id: number, @Body() req: ImageMessageTable) {
    console.log('eblo');
    console.log(id);
    const newClient = plainToInstance(ImageMessageTable, req);
    return this.service.update(id, newClient);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  @Roles(Role.USER, Role.ADMIN)
  async deleteClient(@Param('id') id: number) {
    const file = await this.service.getSome(id);
    console.log('file.path');
    console.log(file.path);
    await fs.unlink(process.cwd() + '/files/message/' + file?.path, (err) => {
      if (err) {
        console.error(err);
        return err;
      }
    });

    return this.service.delete(id);
  }
}
