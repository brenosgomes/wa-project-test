import { Controller, Post, Body, Delete } from '@nestjs/common';
import { AssociationService } from './association.service';
import { CreateAssociationDto } from './dto/create-association.dto';

@Controller('association')
export class AssociationController {
  constructor(private readonly associationService: AssociationService) {}

  @Post()
  create(@Body() createAssociationDto: CreateAssociationDto) {
    return this.associationService.create(createAssociationDto);
  }

  @Delete()
  remove(@Body() createAssociationDto: CreateAssociationDto) {
    return this.associationService.remove(createAssociationDto);
  }
}
