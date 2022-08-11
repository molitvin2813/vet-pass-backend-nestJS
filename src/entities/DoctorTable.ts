import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { VisitTable } from './VisitTable';
import * as bcrypt from 'bcryptjs';
import { Exclude, instanceToPlain } from 'class-transformer';
import { IsEmail, IsString } from 'class-validator';
import { UserResponse } from 'src/models/user.model';
import { DoctorPermission } from './DoctorPermission';

@Entity('doctor_table', { schema: 'vet_pass' })
export class DoctorTable {
  @PrimaryGeneratedColumn({ type: 'int', name: 'iddoctor_table' })
  iddoctorTable: number;

  @Column('varchar', { name: 'fio', nullable: true, length: 100 })
  fio: string | null;

  @Column('varchar', { name: 'color', nullable: true, length: 10 })
  color: string | null;

  @Column('varchar', { name: 'password', nullable: true, length: 255 })
  password: string | null;

  @Column('varchar', { name: 'login', nullable: true, length: 255 })
  login: string | null;

  @OneToMany(() => VisitTable, (visitTable) => visitTable.idDoctor2)
  visitTables: VisitTable[];

  @OneToMany(
    () => DoctorPermission,
    (doctorPermission) => doctorPermission.idDoctor2,
  )
  doctorPermissions: DoctorPermission[];

  @BeforeInsert()
  @BeforeUpdate()
  async hashPassword() {
    try {
      this.password = await bcrypt.hash(this.password, 10);
    } catch (error) {
      console.log(error);
    }
  }

  async comparePassword(attempt: string) {
    return await bcrypt.compare(attempt, this.password);
  }

  toJSON(): UserResponse {
    return <UserResponse>instanceToPlain(this);
  }
}
