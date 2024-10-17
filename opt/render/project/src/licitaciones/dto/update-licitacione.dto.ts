
import { PartialType } from '@nestjs/mapped-types';
import { CreateLicitacioneDto } from './create-licitacione.dto';

export class UpdateLicitacioneDto extends PartialType(CreateLicitacioneDto) {}
