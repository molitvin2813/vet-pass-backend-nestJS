import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { AnimalTable } from './AnimalTable';

@Entity('animal_type_table', { schema: 'vet_pass' })
export class AnimalTypeTable {
  @PrimaryGeneratedColumn({ type: 'int', name: 'id_type' })
  idType: number;

  @Column('varchar', { name: 'type', nullable: true, length: 100 })
  type: string | null;

  @OneToMany(() => AnimalTable, (animalTable) => animalTable.idType2)
  animalTables: AnimalTable[];
}
