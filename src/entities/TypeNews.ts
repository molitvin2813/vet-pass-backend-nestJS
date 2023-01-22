import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { NewsTable } from './NewsTable';

@Entity('type_news', { schema: 'vet_pass' })
export class TypeNews {
  @PrimaryGeneratedColumn({ type: 'int', name: 'id_type_news' })
  idTypeNews: number;

  @Column('varchar', { name: 'type', nullable: true, length: 300 })
  type: string | null;

  @Column('varchar', { name: 'color', nullable: true, length: 10 })
  color: string | null;

  @OneToMany(() => NewsTable, (newsTable) => newsTable.idNewsType2)
  newsTables: NewsTable[];
}
