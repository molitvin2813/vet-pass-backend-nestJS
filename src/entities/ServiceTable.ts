import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { ListServiceTable } from './ListServiceTable';

@Entity('service_table', { schema: 'vet_pass' })
export class ServiceTable {
  @PrimaryGeneratedColumn({ type: 'int', name: 'idservice_list_table' })
  idserviceListTable: number;

  @Column('varchar', { name: 'name', nullable: true, length: 255 })
  name: string | null;

  @Column('decimal', { name: 'cost', nullable: true, precision: 10, scale: 2 })
  cost: string | null;

  @Column('varchar', { name: 'comment', nullable: true, length: 500 })
  comment: string | null;

  @OneToMany(
    () => ListServiceTable,
    (listServiceTable) => listServiceTable.idService2,
  )
  listServiceTables: ListServiceTable[];
}
