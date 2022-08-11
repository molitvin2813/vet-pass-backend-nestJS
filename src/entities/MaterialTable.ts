import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { StorageTable } from './StorageTable';
import { ListMaterialTable } from './ListMaterialTable';

@Entity('material_table', { schema: 'vet_pass' })
export class MaterialTable {
  @PrimaryGeneratedColumn({ type: 'int', name: 'idmaterial_list_table' })
  idmaterialListTable: number;

  @Column('varchar', { name: 'name', nullable: true, length: 255 })
  name: string | null;

  @Column('decimal', { name: 'cost', nullable: true, precision: 10, scale: 2 })
  cost: string | null;

  @Column('int', {
    name: 'expiration_date',
    nullable: true,
    comment: 'Срок годности',
  })
  expirationDate: number | null;

  @Column('decimal', {
    name: 'dosage',
    nullable: true,
    precision: 10,
    scale: 2,
  })
  dosage: string | null;

  @OneToMany(() => StorageTable, (storageTable) => storageTable.idMaterial2)
  storageTables: StorageTable[];

  @OneToMany(
    () => ListMaterialTable,
    (listMaterialTable) => listMaterialTable.idMaterial2,
  )
  listMaterialTables: ListMaterialTable[];
}
