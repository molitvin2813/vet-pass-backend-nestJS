import {
  AfterInsert,
  AfterLoad,
  BeforeInsert,
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
import { ChatRoom } from './ChatRoom';
import { ClientTable } from './ClientTable';
import { DoctorTable } from './DoctorTable';
import { ImageMessageTable } from './ImageMessageTable';

@Index('id_chat_room', ['idChatRoom'], {})
@Index('id_client', ['idClient'], {})
@Index('id_doctor', ['idDoctor'], {})
@Entity('chat_message', { schema: 'vet_pass' })
export class ChatMessage {
  @PrimaryGeneratedColumn({ type: 'int', name: 'id_message' })
  idMessage: number;

  @Column('varchar', { name: 'message', nullable: true, length: 500 })
  message: string | null;

  @Column('int', { name: 'id_chat_room', nullable: true })
  idChatRoom: number | null;

  @CreateDateColumn()
  dateCreated: Date;

  @UpdateDateColumn()
  dateUpdated: Date;

  @Column('int', { name: 'id_doctor', nullable: true })
  idDoctor: number | null;

  @Column('int', { name: 'id_client', nullable: true })
  idClient: number | null;

  @ManyToOne(() => DoctorTable, (doctorTable) => doctorTable.chatMessages, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn([{ name: 'id_doctor', referencedColumnName: 'iddoctorTable' }])
  idDoctor2: DoctorTable;

  @ManyToOne(() => ClientTable, (clientTable) => clientTable.chatMessages, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn([{ name: 'id_client', referencedColumnName: 'idClient' }])
  idClient2: ClientTable;

  @ManyToOne(() => ChatRoom, (chatRoom) => chatRoom.chatMessages, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn([{ name: 'id_chat_room', referencedColumnName: 'idChatRoom' }])
  idChatRoom2: ChatRoom;

  @OneToMany(
    () => ImageMessageTable,
    (imageMessageTable) => imageMessageTable.idMessage2,
  )
  imageMessageTables: ImageMessageTable[];
}
