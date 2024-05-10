import { PartialType } from '@nestjs/swagger';
import { CreateContactoDto } from './create-contacto.dto';

export class UpdateContactoDto extends PartialType(CreateContactoDto) {}
