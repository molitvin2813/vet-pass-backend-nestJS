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
    
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
