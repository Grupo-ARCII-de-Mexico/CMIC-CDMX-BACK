
import { PartialType } from '@nestjs/mapped-types';
import { CreateNegocioDto } from './create-negocio.dto';

export class UpdateNegocioDto extends PartialType(CreateNegocioDto) {}
