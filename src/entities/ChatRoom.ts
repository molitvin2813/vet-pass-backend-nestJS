import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ChatMessage } from './ChatMessage';
import { ClientTable } from './ClientTable';
import { DoctorTable } from './DoctorTable';
import { ListDoctorChatTable } from './ListDoctorChatTable';
import { ListUserChatTable } from './ListUserChatTable';

@Entity('chat_room', { schema: 'vet_pass' })
export class ChatRoom {
  @PrimaryGeneratedColumn({ type: 'int', name: 'id_chat_room' })
  idChatRoom: number;

  @CreateDateColumn()
  dateCreated: Date;

  @Column('datetime', { name: 'last_message_date', nullable: true })
  lastMessageDate: Date | null;

  @Column('varchar', { name: 'name', length: 500, default: () => "'0'" })
  name: string;

  @OneToMany(() => ChatMessage, (chatMessage) => chatMessage.idChatRoom2)
  chatMessages: ChatMessage[];

  @OneToMany(
    () => ListDoctorChatTable,
    (listDoctorChatTable) => listDoctorChatTable.idChatRoom2,
  )
  listDoctorChatTables: ListDoctorChatTable[];

  @OneToMany(
    () => ListUserChatTable,
    (listUserChatTable) => listUserChatTable.idChatRoom2,
  )
  listUserChatTables: ListUserChatTable[];
}
