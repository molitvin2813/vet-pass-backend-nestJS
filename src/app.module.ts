import { AnimalTableModule } from './animal-table/animal-table.module';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';

import { ClientTable } from './entities/ClientTable';
import { AnimalTable } from './entities/AnimalTable';
import { DoctorTable } from './entities/DoctorTable';
import { MaterialTable } from './entities/MaterialTable';
import { ServiceTable } from './entities/ServiceTable';
import { StorageTable } from './entities/StorageTable';
import { VisitTable } from './entities/VisitTable';
import { ListMaterialTable } from './entities/ListMaterialTable';
import { ListServiceTable } from './entities/ListServiceTable';
import { ReceiptTable } from './entities/ReceiptTable';

import { ClientTableModule } from './client-table/client-table.module';
import { DoctorTableModule } from './doctor-table/doctor-table.module';
import { StorageTableModule } from './storage-table/storage-table.module';
import { VisitTableModule } from './visit-table/visit-table.module';
import { ReceiptTableModule } from './receipt-table/receipt-table.module';
import { ListMaterialTableModule } from './list-material-table/list-material-table.module';
import { ListServiceTableModule } from './list-service-table/list-service-table.module';
import { ServiceTableModule } from './service-table/service-table.module';
import { MaterialTableModule } from './material-table/material-table.module';
import { AuthModule } from './auth/auth.module';
import { DoctorPermission } from './entities/DoctorPermission';
import { PermissionTable } from './entities/PermissionTable';
import { AnimalTypeTable } from './entities/AnimalTypeTable';
import { AnimalTypeTableModule } from './animal-type-table/animal-type-table.module';
import { LogTableModule } from './log-table/log-table.module';
import { LogTable } from './entities/LogTable';
import { DiagnosTableModule } from './diagnos-table/diagnos-table.module';
import { DiagnosTable } from './entities/DiagnosTable';
import { ImageTableModule } from './image-table/image-table.module';
import { ImageTable } from './entities/ImageTable';
import { ChatMessage } from './entities/ChatMessage';
import { ChatRoom } from './entities/ChatRoom';
import { ChatMessageModule } from './chat-message/chat-message.module';
import { ChatRoomModule } from './chat-room/chat-room.module';
import { NewsModule } from './news/news.module';
import { TypeNewsModule } from './type-news/type-news.module';
import { ImageNewsModule } from './image-news/image-news.module';
import { NewsTable } from './entities/NewsTable';
import { TypeNews } from './entities/TypeNews';
import { ImageNewsTable } from './entities/ImageNewsTable';

import { MulterModule } from '@nestjs/platform-express';
import { ImageMessageModule } from './image-message/image-message.module';
import { ImageMessageTable } from './entities/ImageMessageTable';
import { TypePrescriptionModule } from './type-prescription/type-prescription.module';
import { PrescriptionTableModule } from './prescription-table/prescription-table.module';
import { PrescriptionTable } from './entities/PrescriptionTable';
import { TypePrescriptionTable } from './entities/TypePrescriptionTable';
import { ListDoctorChatTableModule } from './list-doctor-chat-table/list-doctor-chat-table.module';
import { ListUserChatTableModule } from './list-user-chat-table/list-user-chat-table.module';
import { ListUserChatTable } from './entities/ListUserChatTable';
import { ListDoctorChatTable } from './entities/ListDoctorChatTable';

@Module({
  imports: [
    AnimalTableModule,
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '1234',
      database: 'vet_pass',
      timezone: 'Z',
      entities: [
        AnimalTable,
        AnimalTypeTable,
        ClientTable,
        DoctorTable,
        MaterialTable,
        ServiceTable,
        StorageTable,
        VisitTable,
        ListMaterialTable,
        ListServiceTable,
        ReceiptTable,
        DoctorPermission,
        PermissionTable,
        LogTable,
        DiagnosTable,
        ImageTable,
        ChatMessage,
        ChatRoom,
        NewsTable,
        TypeNews,
        ImageNewsTable,
        ImageMessageTable,
        PrescriptionTable,
        TypePrescriptionTable,
        ListUserChatTable,
        ListMaterialTable,
        ListDoctorChatTable,
      ],
      synchronize: true,
      logging: true,
      logger: 'file',
    }),
    DoctorTableModule,
    ClientTableModule,
    AnimalTableModule,

    ServiceTableModule,
    StorageTableModule,
    MaterialTableModule,
    ListServiceTableModule,

    ListMaterialTableModule,
    ReceiptTableModule,

    VisitTableModule,
    AuthModule,
    AnimalTypeTableModule,
    LogTableModule,
    DiagnosTableModule,
    ImageTableModule,
    ChatMessageModule,
    ChatRoomModule,
    NewsModule,
    TypeNewsModule,
    ImageNewsModule,
    ImageMessageModule,
    TypePrescriptionModule,
    PrescriptionTableModule,

    MulterModule.register({
      dest: './files',
    }),

    ListDoctorChatTableModule,

    ListUserChatTableModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
