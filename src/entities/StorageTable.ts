import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { MaterialTable } from './MaterialTable';

@Index('id_material', ['idMaterial'], {})
@Entity('storage_table', { schema: 'vet_pass' })
export class StorageTable {
  @PrimaryGeneratedColumn({ type: 'int', name: 'id_storage_table' })
  idStorageTable: number;

  @Column('int', { name: 'id_material', nullable: true })
  idMaterial: number | null;

  @Column('varchar', { name: 'comment', nullable: true, length: 500 })
  comment: string | null;

  @Column('decimal', {
    name: 'count',
    nullable: true,
    precision: 10,
    scale: 3,
    default: () => "'0.000'",
    comment: 'Количесвто товара на складе',
  })
  count: number | null;

  @Column('decimal', {
    name: 'sum',
    nullable: true,
    precision: 10,
    scale: 2,
    default: () => "'0.00'",
    comment: 'Сумма, которую отдали за товар',
  })
  sum: number | null;

  @Column('date', {
    name: 'date',
    nullable: true,
    comment: 'Дата поступления товара на склад',
  })
  date: string | null;

  @ManyToOne(
    () => MaterialTable,
    (materialListTable) => materialListTable.storageTables,
    { onDelete: 'CASCADE', onUpdate: 'NO ACTION' },
  )
  @JoinColumn([
    { name: 'id_material', referencedColumnName: 'idmaterialListTable' },
  ])
  idMaterial2: MaterialTable;
}
