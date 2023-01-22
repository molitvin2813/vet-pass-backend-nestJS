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
import { ImageNewsService } from './image-news.service';
import * as fs from 'fs';

@Controller('image-news')
@UsePipes(
  new ValidationPipe({
    whitelist: true,
    transform: true,
  }),
)
export class ImageNewsController {
  constructor(private service: ImageNewsService) {}

  @Get()
  @UseGuards(JwtAuthGuard)
  @Roles(Role.USER, Role.ADMIN, Role.CLIENT)
  getAllClient() {
    return this.service.getAll();
  }

  @Get(':id')
  //@UseGuards(JwtAuthGuard)
  //@Roles(Role.USER, Role.ADMIN, Role.CLIENT)
  async getSomeClient(@Param('id') id: number, @Res() res) {
    const file = await this.service.getSome(id);
    return of(res.sendFile(join(process.cwd(), 'files/news/' + file.name)));
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  @Roles(Role.USER, Role.ADMIN)
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './files/news',
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
    if (!file || request.fileValidationError) {
      throw new BadRequestException(
        'Для загрузки доступны только изображения. Увы ;)',
      );
    }

    const newObj = plainToInstance(ImageNewsTable, { name: file.filename });
    return this.service.create(newObj);
    //return { name: file.originalname };
  }

  @Put(':id')
  @UseGuards(JwtAuthGuard)
  @Roles(Role.USER, Role.ADMIN)
  updateClient(@Param('id') id: number, @Body() req: string) {
    const newClient = plainToInstance(ImageNewsTable, req);
    console.log(req);
    return this.service.update(id, newClient);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  @Roles(Role.USER, Role.ADMIN)
  async deleteClient(@Param('id') id: number) {
    const file = await this.service.getSome(id);

    await fs.unlink(process.cwd() + '/files/news/' + file?.name, (err) => {
      if (err) {
        console.error(err);
        return err;
      }
    });
    return this.service.delete(id);
  }
}
