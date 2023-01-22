import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { MaterialTable } from './MaterialTable';
import { ReceiptTable } from './ReceiptTable';

@Index('id_material', ['idMaterial'], {})
@Index('list_material_table_ibfk_2', ['idReceipt'], {})
@Entity('list_material_table', { schema: 'vet_pass' })
export class ListMaterialTable {
  @PrimaryGeneratedColumn({ type: 'int', name: 'id_list_material' })
  idListMaterial: number;

  @Column('int', { name: 'id_material', nullable: true })
  idMaterial: number | null;

  @Column('int', { name: 'id_receipt', nullable: true })
  idReceipt: number | null;

  @Column('decimal', {
    name: 'count',
    nullable: true,
    precision: 10,
    scale: 3,
    default: () => "'0.000'",
  })
  count: string | null;

  @Column('decimal', {
    name: 'sum',
    nullable: true,
    precision: 10,
    scale: 2,
    default: () => "'0.00'",
  })
  sum: number | null;

  @ManyToOne(
    () => MaterialTable,
    (materialTable) => materialTable.listMaterialTables,
    { onDelete: 'NO ACTION', onUpdate: 'NO ACTION' },
  )
  @JoinColumn([
    { name: 'id_material', referencedColumnName: 'idmaterialListTable' },
  ])
  idMaterial2: MaterialTable;

  @ManyToOne(
    () => ReceiptTable,
    (receiptTable) => receiptTable.listMaterialTables,
    { onDelete: 'CASCADE', onUpdate: 'CASCADE' },
  )
  @JoinColumn([{ name: 'id_receipt', referencedColumnName: 'idReceipt' }])
  idReceipt2: ReceiptTable;
}
