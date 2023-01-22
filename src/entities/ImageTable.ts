import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { AnimalTable } from './AnimalTable';

@Index('id_animal', ['idAnimal'], {})
@Entity('image_table', { schema: 'vet_pass' })
export class ImageTable {
  @PrimaryGeneratedColumn({ type: 'int', name: 'id_image' })
  idImage: number;

  @Column('longblob', { name: 'image', nullable: true })
  image: Buffer | null;

  @Column('int', { name: 'id_animal', nullable: true })
  idAnimal: number | null;

  @ManyToOne(() => AnimalTable, (animalTable) => animalTable.imageTables, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn([{ name: 'id_animal', referencedColumnName: 'idAnimal' }])
  idAnimal2: AnimalTable;
}
