import { Module } from '@nestjs/common';
import { AssociationService } from './association.service';
import { AssociationController } from './association.controller';
import { LaboratoryModule } from 'src/laboratory/laboratory.module';
import { ExamModule } from 'src/exam/exam.module';

@Module({
  imports: [LaboratoryModule, ExamModule],
  controllers: [AssociationController],
  providers: [AssociationService],
})
export class AssociationModule {}
