import {
  AfterInsert,
  AfterUpdate,
  BeforeInsert,
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ServiceTable } from './ServiceTable';
import { ReceiptTable } from './ReceiptTable';

@Index('id_service', ['idService'], {})
@Index('list_service_table_ibfk_2', ['idReceipt'], {})
@Entity('list_service_table', { schema: 'vet_pass' })
export class ListServiceTable {
  @PrimaryGeneratedColumn({ type: 'int', name: 'id_list_service' })
  idListService: number;

  @Column('int', { name: 'id_service', nullable: true })
  idService: number | null;

  @Column('int', { name: 'id_receipt', nullable: true })
  idReceipt: number | null;

  @ManyToOne(
    () => ServiceTable,
    (serviceTable) => serviceTable.listServiceTables,
    { onDelete: 'NO ACTION', onUpdate: 'NO ACTION' },
  )
  @JoinColumn([
    { name: 'id_service', referencedColumnName: 'idserviceListTable' },
  ])
  idService2: ServiceTable;

  @ManyToOne(
    () => ReceiptTable,
    (receiptTable) => receiptTable.listServiceTables,
    { onDelete: 'CASCADE', onUpdate: 'CASCADE' },
  )
  @JoinColumn([{ name: 'id_receipt', referencedColumnName: 'idReceipt' }])
  idReceipt2: ReceiptTable;
}
