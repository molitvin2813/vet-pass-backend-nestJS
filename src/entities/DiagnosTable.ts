import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { VisitTable } from './VisitTable';

@Entity('diagnos_table', { schema: 'vet_pass' })
export class DiagnosTable {
  @PrimaryGeneratedColumn({ type: 'int', name: 'id_diagnos' })
  idDiagnos: number;

  @Column('varchar', { name: 'diagnos', nullable: true, length: 500 })
  diagnos: string | null;

  @OneToMany(() => VisitTable, (visitTable) => visitTable.idDiagnosis2)
  visitTables: VisitTable[];
}
