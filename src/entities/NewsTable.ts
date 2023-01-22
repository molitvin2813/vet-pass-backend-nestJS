import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ImageNewsTable } from './ImageNewsTable';
import { TypeNews } from './TypeNews';

@Index('news_table_ibfk_1', ['idNewsType'], {})
@Entity('news_table', { schema: 'vet_pass' })
export class NewsTable {
  @PrimaryGeneratedColumn({ type: 'int', name: 'id_news' })
  idNews: number;

  @Column('varchar', { name: 'title', nullable: true, length: 500 })
  title: string | null;

  @Column('varchar', { name: 'text', nullable: true, length: 5000 })
  text: string | null;

  @Column('int', { name: 'id_news_type', nullable: true })
  idNewsType: number | null;

  @OneToMany(() => ImageNewsTable, (imageNewsTable) => imageNewsTable.idNews2)
  imageNewsTables: ImageNewsTable[];

  @CreateDateColumn()
  dateCreated: Date;

  @UpdateDateColumn()
  dateUpdated: Date;

  @ManyToOne(() => TypeNews, (typeNews) => typeNews.newsTables, {
    onDelete: 'SET NULL',
    onUpdate: 'SET NULL',
  })
  @JoinColumn([{ name: 'id_news_type', referencedColumnName: 'idTypeNews' }])
  idNewsType2: TypeNews;
}
