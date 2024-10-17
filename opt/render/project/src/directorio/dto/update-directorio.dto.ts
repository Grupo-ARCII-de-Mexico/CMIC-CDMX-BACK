import { PartialType } from '@nestjs/swagger';
import { CreateDirectorioDto } from './create-directorio.dto';

export class UpdateDirectorioDto extends PartialType(CreateDirectorioDto) {}
