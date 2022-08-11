import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { DoctorTable } from './DoctorTable';
import { PermissionTable } from './PermissionTable';

@Index('id_doctor', ['idDoctor'], {})
@Index('id_permission', ['idPermission'], {})
@Entity('doctor_permission', { schema: 'vet_pass' })
export class DoctorPermission {
  @PrimaryGeneratedColumn({ type: 'int', name: 'id' })
  id: number;

  @Column('int', { name: 'id_doctor', nullable: true })
  idDoctor: number | null;

  @Column('int', { name: 'id_permission', nullable: true })
  idPermission: number | null;

  @ManyToOne(
    () => DoctorTable,
    (doctorTable) => doctorTable.doctorPermissions,
    { onDelete: 'CASCADE', onUpdate: 'CASCADE' },
  )
  @JoinColumn([{ name: 'id_doctor', referencedColumnName: 'iddoctorTable' }])
  idDoctor2: DoctorTable;

  @ManyToOne(
    () => PermissionTable,
    (permissionTable) => permissionTable.doctorPermissions,
    { onDelete: 'NO ACTION', onUpdate: 'CASCADE' },
  )
  @JoinColumn([{ name: 'id_permission', referencedColumnName: 'idPermission' }])
  idPermission2: PermissionTable;
}
