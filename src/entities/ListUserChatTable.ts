import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ChatRoom } from './ChatRoom';
import { ClientTable } from './ClientTable';

@Index('id_chat_room', ['idChatRoom'], {})
@Index('id_client', ['idClient'], {})
@Entity('list_user_chat_table', { schema: 'vet_pass' })
export class ListUserChatTable {
  @PrimaryGeneratedColumn({ type: 'int', name: 'id_list_user_chat' })
  idListUserChat: number;

  @Column('int', { name: 'id_chat_room', nullable: true })
  idChatRoom: number | null;

  @Column('int', { name: 'id_client', nullable: true })
  idClient: number | null;

  @Column('tinyint', {
    name: 'count_unread_messages',
    nullable: true,
    default: () => "'0'",
  })
  countUnreadMessages: number | null;

  @ManyToOne(() => ChatRoom, (chatRoom) => chatRoom.listUserChatTables, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn([{ name: 'id_chat_room', referencedColumnName: 'idChatRoom' }])
  idChatRoom2: ChatRoom;

  @ManyToOne(
    () => ClientTable,
    (clientTable) => clientTable.listUserChatTables,
    { onDelete: 'CASCADE', onUpdate: 'CASCADE' },
  )
  @JoinColumn([{ name: 'id_client', referencedColumnName: 'idClient' }])
  idClient2: ClientTable;
}
