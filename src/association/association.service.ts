import { Injectable } from '@nestjs/common';
import { ExamService } from 'src/exam/exam.service';
import { LaboratoryService } from 'src/laboratory/laboratory.service';
import { CreateAssociationDto } from './dto/create-association.dto';

@Injectable()
export class AssociationService {
  constructor(
    private readonly examService: ExamService,
    private readonly laboratoryService: LaboratoryService,
  ) {}

  async create(createAssociationDto: CreateAssociationDto) {
    const laboratory = await this.laboratoryService.findOne(
      createAssociationDto.laboratoryId,
    );

    const exam = await this.examService.findOne(createAssociationDto.examId);

    if (exam.status == true && laboratory.status == true) {
      laboratory.exam.push(exam);
      this.laboratoryService.update(
        createAssociationDto.laboratoryId,
        laboratory,
      );
      return 'Exame associado';
    } else {
      return 'Laboratorio ou exame inativo';
    }
  }

  async remove(createAssociationDto: CreateAssociationDto) {
    const laboratory = await this.laboratoryService.findOne(
      createAssociationDto.laboratoryId,
    );
    const exam = await this.examService.findOne(createAssociationDto.examId);

    if (exam.status == true && laboratory.status == true) {
      laboratory.exam = laboratory.exam.filter((exam) => {
        return exam.id !== createAssociationDto.examId;
      });

      this.laboratoryService.update(
        createAssociationDto.laboratoryId,
        laboratory,
      );

      return 'Exame desassociado';
    } else {
      return 'Laboratório ou exame inativo';
    }
  }
}
