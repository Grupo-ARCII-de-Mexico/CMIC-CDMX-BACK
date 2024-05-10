import { PartialType } from '@nestjs/swagger';
import { CreateBoletineDto } from './create-boletine.dto';

export class UpdateBoletineDto extends PartialType(CreateBoletineDto) {}
