import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateLaboratoryDto } from './dto/create-laboratory.dto';
import { UpdateLaboratoryDto } from './dto/update-laboratory.dto';
import { Laboratory } from './entities/laboratory.entity';

@Injectable()
export class LaboratoryService {
  constructor(
    @InjectRepository(Laboratory)
    private readonly laboratoryRepository: Repository<Laboratory>,
  ) {}

  create(createLaboratoryDto: CreateLaboratoryDto) {
    const laboratory = this.laboratoryRepository.create({
      ...createLaboratoryDto,
    });
    return this.laboratoryRepository.save(laboratory);
  }

  async findAll() {
    return await this.laboratoryRepository.find({ where: { status: true } });
  }

  async findOne(id: string) {
    const laboratory = await this.laboratoryRepository.findOne(id, {
      relations: ['exam'],
    });

    if (!laboratory) {
      throw new NotFoundException(`Laboratory ${id} not found`);
    }

    return laboratory;
  }

  async update(id: string, updateLaboratoryDto: UpdateLaboratoryDto) {
    const laboratory = await this.laboratoryRepository.preload({
      id: id,
      ...updateLaboratoryDto,
    });

    if (!laboratory) {
      throw new NotFoundException(`Laboratory ${id} not found`);
    }
    this.laboratoryRepository.save(laboratory);
    return;
  }

  async remove(id: string) {
    const laboratory = await this.laboratoryRepository.findOne(id);

    if (!laboratory) {
      throw new NotFoundException(`Laboratory ${id} not found`);
    }
    this.laboratoryRepository.remove(laboratory);
    return;
  }
}
