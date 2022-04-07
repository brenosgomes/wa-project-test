import { Laboratory } from 'src/laboratory/entities/laboratory.entity';
import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Exam {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  type: string;

  @Column()
  status: boolean;

  @ManyToMany(() => Laboratory, (laboratory: Laboratory) => laboratory.exam)
  laboratory: Array<Laboratory>;
}
