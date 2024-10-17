
import { PartialType } from '@nestjs/mapped-types';
import { CreateUsuarioOnDto } from './create-usuario-on.dto';

export class UpdateUsuarioOnDto extends PartialType(CreateUsuarioOnDto) {}
