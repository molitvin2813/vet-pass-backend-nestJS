import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { DoctorTable } from './DoctorTable';
import { AnimalTable } from './AnimalTable';
import { ReceiptTable } from './ReceiptTable';

@Index('id_receipt_UNIQUE', ['idReceipt'], { unique: true })
@Index('id_doctor', ['idDoctor'], {})
@Index('id_animal', ['idAnimal'], {})
@Entity('visit_table', { schema: 'vet_pass' })
export class VisitTable {
  @PrimaryGeneratedColumn({ type: 'int', name: 'idvisit_table' })
  idvisitTable: number;

  @Column('varchar', { name: 'name', nullable: true, length: 255 })
  name: string | null;

  @Column('varchar', { name: 'diagnosis', nullable: true, length: 255 })
  diagnosis: string | null;

  @Column('varchar', { name: 'anamnesis', nullable: true, length: 500 })
  anamnesis: string | null;

  @Column('date', { name: 'visit_time', nullable: true })
  visitTime: string | null;

  @Column('time', { name: 'time', nullable: true })
  time: string | null;

  @Column('tinyint', {
    name: 'is_completed',
    nullable: true,
    default: () => "'0'",
  })
  isCompleted: number | null;

  @Column('int', { name: 'id_doctor', nullable: true })
  idDoctor: number | null;

  @Column('int', { name: 'id_animal', nullable: true })
  idAnimal: number | null;

  @Column('int', { name: 'id_receipt', unique: true, nullable: true })
  idReceipt: number;

  @ManyToOne(() => DoctorTable, (doctorTable) => doctorTable.visitTables, {
    onDelete: 'NO ACTION',
    onUpdate: 'CASCADE',
  })
  @JoinColumn([{ name: 'id_doctor', referencedColumnName: 'iddoctorTable' }])
  idDoctor2: DoctorTable;

  @ManyToOne(() => AnimalTable, (animalTable) => animalTable.visitTables, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn([{ name: 'id_animal', referencedColumnName: 'idAnimal' }])
  idAnimal2: AnimalTable;

  @OneToOne(() => ReceiptTable, (receiptTable) => receiptTable.visitTable, {
    onDelete: 'RESTRICT',
    onUpdate: 'RESTRICT',
  })
  @JoinColumn([{ name: 'id_receipt', referencedColumnName: 'idReceipt' }])
  idReceipt2: ReceiptTable;
}
