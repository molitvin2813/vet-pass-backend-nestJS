import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { StorageTable } from './StorageTable';
import { ListMaterialTable } from './ListMaterialTable';
import { LogTable } from './LogTable';

@Entity('material_table', { schema: 'vet_pass' })
export class MaterialTable {
  @PrimaryGeneratedColumn({ type: 'int', name: 'idmaterial_list_table' })
  idmaterialListTable: number;

  @Column('varchar', { name: 'name', nullable: true, length: 255 })
  name: string | null;

  @Column('decimal', { name: 'cost', nullable: true, precision: 10, scale: 2 })
  cost: string | null;

  @Column('decimal', {
    name: 'count',
    nullable: true,
    precision: 10,
    scale: 3,
    default: () => "'0.000'",
    comment: 'Количесвто товара на складе',
  })
  count: number | null;

  @Column('varchar', { name: 'comment', nullable: true, length: 500 })
  comment: string | null;

  @Column('varchar', { name: 'measure', nullable: true, length: 20 })
  measure: string | null;

  @OneToMany(() => StorageTable, (storageTable) => storageTable.idMaterial2)
  storageTables: StorageTable[];

  @OneToMany(() => LogTable, (logTable) => logTable.idDoctor2)
  logTables: LogTable[];

  @OneToMany(
    () => ListMaterialTable,
    (listMaterialTable) => listMaterialTable.idMaterial2,
  )
  listMaterialTables: ListMaterialTable[];
}
