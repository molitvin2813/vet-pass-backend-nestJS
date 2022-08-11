import {
  AfterInsert,
  BeforeInsert,
  Column,
  Entity,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ListMaterialTable } from './ListMaterialTable';
import { ListServiceTable } from './ListServiceTable';
import { VisitTable } from './VisitTable';

@Entity('receipt_table', { schema: 'vet_pass' })
export class ReceiptTable {
  @PrimaryGeneratedColumn({ type: 'int', name: 'id_receipt' })
  idReceipt: number;

  @Column('varchar', { name: 'comment', nullable: true, length: 200 })
  comment: string | null;

  @Column('decimal', {
    name: 'sum',
    nullable: true,
    precision: 10,
    scale: 2,
    default: () => "'0.00'",
  })
  sum: string | null;

  @Column('datetime', { name: 'date', nullable: true })
  date: Date | null;

  @Column('decimal', {
    name: 'discount',
    nullable: true,
    precision: 10,
    scale: 2,
    default: () => "'0.00'",
  })
  discount: string | null;

  @OneToMany(
    () => ListMaterialTable,
    (listMaterialTable) => listMaterialTable.idReceipt2,
  )
  listMaterialTables: ListMaterialTable[];

  @OneToMany(
    () => ListServiceTable,
    (listServiceTable) => listServiceTable.idReceipt2,
  )
  listServiceTables: ListServiceTable[];

  @OneToOne(() => VisitTable, (visitTable) => visitTable.idReceipt2)
  visitTable: VisitTable;
}
