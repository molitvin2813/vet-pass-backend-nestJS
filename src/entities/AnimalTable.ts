import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { AnimalTypeTable } from './AnimalTypeTable';
import { ClientTable } from './ClientTable';
import { ImageTable } from './ImageTable';
import { VisitTable } from './VisitTable';

@Index('id_client', ['idClient'], {})
@Entity('animal_table', { schema: 'vet_pass' })
export class AnimalTable {
  @PrimaryGeneratedColumn({ type: 'int', name: 'id_animal' })
  idAnimal: number;

  @Column('varchar', { name: 'name', nullable: true, length: 100 })
  name: string | null;

  @Column('varchar', { name: 'gender', nullable: true, length: 20 })
  gender: string | null;

  @Column('tinyint', {
    name: 'is_castrated',
    nullable: true,
    default: () => "'0'",
  })
  isCastrated: number | null;

  @Column('float', { name: 'weight', nullable: true, precision: 12 })
  weight: number | null;

  @Column('int', { name: 'age', nullable: true })
  age: number | null;

  @Column('int', { name: 'id_type', nullable: true })
  idType: number | null;

  @ManyToOne(
    () => AnimalTypeTable,
    (animalTypeTable) => animalTypeTable.animalTables,
    { onDelete: 'NO ACTION', onUpdate: 'NO ACTION' },
  )
  @JoinColumn([{ name: 'id_type', referencedColumnName: 'idType' }])
  idType2: AnimalTypeTable;

  @Column('int', { name: 'id_client', nullable: true })
  idClient: number | null;

  @ManyToOne(() => ClientTable, (clientTable) => clientTable.animalTables, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn([{ name: 'id_client', referencedColumnName: 'idClient' }])
  idClient2: ClientTable;

  @OneToMany(() => VisitTable, (visitTable) => visitTable.idAnimal2)
  visitTables: VisitTable[];

  @OneToMany(() => ImageTable, (imageTable) => imageTable.idAnimal2)
  imageTables: ImageTable[];

}
