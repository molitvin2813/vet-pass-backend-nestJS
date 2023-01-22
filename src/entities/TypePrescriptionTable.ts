import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { PrescriptionTable } from './PrescriptionTable';

@Entity('type_prescription_table', { schema: 'vet_pass' })
export class TypePrescriptionTable {
  @PrimaryGeneratedColumn({ type: 'int', name: 'id_type_prescription' })
  idTypePrescription: number;

  @Column('varchar', { name: 'type', nullable: true, length: 255 })
  type: string | null;

  @Column('varchar', { name: 'color', nullable: true, length: 10 })
  color: string | null;

  @OneToMany(
    () => PrescriptionTable,
    (prescriptionTable) => prescriptionTable.idTypePrescription2,
  )
  prescriptionTables: PrescriptionTable[];
}
