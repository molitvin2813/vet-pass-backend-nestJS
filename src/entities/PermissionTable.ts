import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { DoctorPermission } from './DoctorPermission';

@Entity('permission_table', { schema: 'vet_pass' })
export class PermissionTable {
  @PrimaryGeneratedColumn({ type: 'int', name: 'id_permission' })
  idPermission: number;

  @Column('varchar', { name: 'permission', nullable: true, length: 100 })
  permission: string | null;

  @OneToMany(
    () => DoctorPermission,
    (doctorPermission) => doctorPermission.idPermission2,
  )
  doctorPermissions: DoctorPermission[];
}
