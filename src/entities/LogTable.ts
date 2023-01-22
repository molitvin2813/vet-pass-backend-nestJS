import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { DoctorTable } from './DoctorTable';
import { MaterialTable } from './MaterialTable';
import { ReceiptTable } from './ReceiptTable';

@Index('id_doctor', ['idDoctor'], {})
@Index('id_material', ['idMaterial'], {})
@Index('id_receipt', ['idReceipt'], {})
@Entity('log_table', { schema: 'vet_pass' })
export class LogTable {
  @PrimaryGeneratedColumn({ type: 'int', name: 'id_log' })
  idLog: number;

  @Column('varchar', { name: 'message', nullable: true, length: 255 })
  message: string | null;

  @Column('datetime', { name: 'date', nullable: true })
  date: Date | null;

  @Column('int', { name: 'id_doctor', nullable: true })
  idDoctor: number | null;

  @Column('int', { name: 'id_material', nullable: true })
  idMaterial: number | null;

  @Column('int', { name: 'id_receipt', nullable: true })
  idReceipt: number | null;

  @ManyToOne(() => DoctorTable, (doctorTable) => doctorTable.logTables, {
    onDelete: 'NO ACTION',
    onUpdate: 'NO ACTION',
  })
  @JoinColumn([{ name: 'id_doctor', referencedColumnName: 'iddoctorTable' }])
  idDoctor2: DoctorTable;

  @ManyToOne(() => MaterialTable, (materialTable) => materialTable.logTables, {
    onDelete: 'NO ACTION',
    onUpdate: 'NO ACTION',
  })
  @JoinColumn([
    { name: 'id_material', referencedColumnName: 'idmaterialListTable' },
  ])
  idMaterial2: MaterialTable;

  @ManyToOne(() => ReceiptTable, (receiptTable) => receiptTable.logTables, {
    onDelete: 'NO ACTION',
    onUpdate: 'NO ACTION',
  })
  @JoinColumn([{ name: 'id_receipt', referencedColumnName: 'idReceipt' }])
  idReceipt2: ReceiptTable;
}
