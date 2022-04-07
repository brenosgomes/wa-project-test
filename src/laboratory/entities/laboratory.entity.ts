import { Exam } from 'src/exam/entities/exam.entity';
import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Laboratory {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  address: string;

  @Column({ default: true })
  status: boolean;

  @JoinTable()
  @ManyToMany(() => Exam, (exam: Exam) => exam.laboratory)
  exam: Array<Exam>;
}
