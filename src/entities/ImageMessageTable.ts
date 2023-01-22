import {
  AfterRemove,
  AfterSoftRemove,
  BeforeRemove,
  BeforeSoftRemove,
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ChatMessage } from './ChatMessage';
import * as fs from 'fs';

@Index('id_message', ['idMessage'], {})
@Entity('image_message_table', { schema: 'vet_pass' })
export class ImageMessageTable {
  @PrimaryGeneratedColumn({ type: 'int', name: 'id_image_message' })
  idImageMessage: number;

  @Column('varchar', { name: 'path', nullable: true, length: 255 })
  path: string | null;

  @Column('int', { name: 'id_message', nullable: true })
  idMessage: number | null;

  @ManyToOne(
    () => ChatMessage,
    (chatMessage) => chatMessage.imageMessageTables,
    { onDelete: 'CASCADE', onUpdate: 'CASCADE' },
  )
  @JoinColumn([{ name: 'id_message', referencedColumnName: 'idMessage' }])
  idMessage2: ChatMessage;
}
