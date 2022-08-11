import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import * as bcrypt from 'bcryptjs';
import { AnimalTable } from './AnimalTable';
import { UserResponse } from 'src/models/user.model';
import { instanceToPlain } from 'class-transformer';

@Entity('client_table', { schema: 'vet_pass' })
export class ClientTable {
  @PrimaryGeneratedColumn({ type: 'int', name: 'id_client' })
  idClient: number;

  @Column('varchar', { name: 'fio', nullable: true, length: 100 })
  fio: string | null;

  @Column('varchar', { name: 'phone', nullable: true, length: 20 })
  phone: string | null;

  @Column('varchar', { name: 'email', nullable: true, length: 100 })
  email: string | null;

  @Column('varchar', { name: 'comment', nullable: true, length: 500 })
  comment: string | null;

  @Column('varchar', { name: 'login', nullable: true, length: 100 })
  login: string | null;

  @Column('varchar', { name: 'password', nullable: true, length: 100 })
  password: string | null;

  @OneToMany(() => AnimalTable, (animalTable) => animalTable.idClient2)
  animalTables: AnimalTable[];

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
