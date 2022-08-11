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

  @Column('datetime', { name: 'receipt_date', nullable: true })
  receiptDate: Date | null;

  @Column('int', { name: 'id_material', nullable: true })
  idMaterial: number | null;

  @Column('int', { name: 'count', nullable: true })
  count: number | null;

  @ManyToOne(
    () => MaterialTable,
    (materialListTable) => materialListTable.storageTables,
    { onDelete: 'NO ACTION', onUpdate: 'CASCADE' },
  )
  @JoinColumn([
    { name: 'id_material', referencedColumnName: 'idmaterialListTable' },
  ])
  idMaterial2: MaterialTable;
}
