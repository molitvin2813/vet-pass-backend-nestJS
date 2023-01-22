import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { NewsTable } from './NewsTable';

@Index('id_news', ['idNews'], {})
@Entity('image_news_table', { schema: 'vet_pass' })
export class ImageNewsTable {
  @PrimaryGeneratedColumn({ type: 'int', name: 'id_image_news' })
  idImageNews: number;

  @Column('varchar', { name: 'name', nullable: true })
  name: string | null;

  @Column('varchar', { name: 'path', nullable: true })
  path: string | null;

  @Column('int', { name: 'id_news', nullable: true })
  idNews: number | null;

  @CreateDateColumn()
  dateCreated: Date;

  @UpdateDateColumn()
  dateUpdated: Date;

  @ManyToOne(() => NewsTable, (newsTable) => newsTable.imageNewsTables, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn([{ name: 'id_news', referencedColumnName: 'idNews' }])
  idNews2: NewsTable;
}
