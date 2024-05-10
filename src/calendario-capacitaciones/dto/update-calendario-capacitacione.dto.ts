import { PartialType } from '@nestjs/swagger';
import { CreateCalendarioCapacitacioneDto } from './create-calendario-capacitacione.dto';

export class UpdateCalendarioCapacitacioneDto extends PartialType(CreateCalendarioCapacitacioneDto) {}
