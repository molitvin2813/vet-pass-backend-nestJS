import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ChatRoom } from './ChatRoom';
import { DoctorTable } from './DoctorTable';

@Index('id_chat_room', ['idChatRoom'], {})
@Index('id_doctor', ['idDoctor'], {})
@Entity('list_doctor_chat_table', { schema: 'vet_pass' })
export class ListDoctorChatTable {
  @PrimaryGeneratedColumn({ type: 'int', name: 'id_list_doctor_chat' })
  idListDoctorChat: number;

  @Column('int', { name: 'id_chat_room', nullable: true })
  idChatRoom: number | null;

  @Column('int', { name: 'id_doctor', nullable: true })
  idDoctor: number | null;

  @Column('tinyint', { name: 'count_unread_messages', nullable: true })
  countUnreadMessages: number | null;

  @ManyToOne(() => ChatRoom, (chatRoom) => chatRoom.listDoctorChatTables, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn([{ name: 'id_chat_room', referencedColumnName: 'idChatRoom' }])
  idChatRoom2: ChatRoom;

  @ManyToOne(
    () => DoctorTable,
    (doctorTable) => doctorTable.listDoctorChatTables,
    { onDelete: 'CASCADE', onUpdate: 'CASCADE' },
  )
  @JoinColumn([{ name: 'id_doctor', referencedColumnName: 'iddoctorTable' }])
  idDoctor2: DoctorTable;
}
