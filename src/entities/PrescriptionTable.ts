import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { TypePrescriptionTable } from './TypePrescriptionTable';
import { VisitTable } from './VisitTable';

@Index('id_type_prescription', ['idTypePrescription'], {})
@Index('id_visit', ['idVisit'], {})
@Entity('prescription_table', { schema: 'vet_pass' })
export class PrescriptionTable {
  @PrimaryGeneratedColumn({ type: 'int', name: 'id_prescription' })
  idPrescription: number;

  @Column('varchar', { name: 'title', nullable: true, length: 255 })
  title: string | null;

  @Column('varchar', { name: 'description', nullable: true, length: 500 })
  description: string | null;

  @Column('int', { name: 'id_type_prescription', nullable: true })
  idTypePrescription: number | null;

  @Column('int', { name: 'id_visit', nullable: true })
  idVisit: number | null;

  @ManyToOne(
    () => TypePrescriptionTable,
    (typePrescriptionTable) => typePrescriptionTable.prescriptionTables,
    { onDelete: 'CASCADE', onUpdate: 'CASCADE' },
  )
  @JoinColumn([
    {
      name: 'id_type_prescription',
      referencedColumnName: 'idTypePrescription',
    },
  ])
  idTypePrescription2: TypePrescriptionTable;

  @ManyToOne(() => VisitTable, (visitTable) => visitTable.prescriptionTables, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn([{ name: 'id_visit', referencedColumnName: 'idvisitTable' }])
  idVisit2: VisitTable;
}
