import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateExamDto } from './dto/create-exam.dto';
import { UpdateExamDto } from './dto/update-exam.dto';
import { Exam } from './entities/exam.entity';

@Injectable()
export class ExamService {
  constructor(
    @InjectRepository(Exam)
    private readonly examRepository: Repository<Exam>,
  ) {}

  create(createExamDto: CreateExamDto) {
    const exam = this.examRepository.create({
      ...createExamDto,
    });
    return this.examRepository.save(exam);
  }

  async findAll() {
    return await this.examRepository.find({ where: { status: true } });
  }

  async findOne(id: string) {
    const exam = await this.examRepository.findOne(id);

    if (!exam) {
      throw new NotFoundException(`Exam ${id} not found`);
    }

    return exam;
  }

  async update(id: string, updateExamDto: UpdateExamDto) {
    const exam = await this.examRepository.preload({
      id: id,
      ...updateExamDto,
    });

    if (!exam) {
      throw new NotFoundException(`Exam ${id} not found`);
    }
    this.examRepository.save(exam);
    return;
  }

  async remove(id: string) {
    const exam = await this.examRepository.findOne(id);

    if (!exam) {
      throw new NotFoundException(`Exam ${id} not found`);
    }
    this.examRepository.remove(exam);
    return;
  }
}
