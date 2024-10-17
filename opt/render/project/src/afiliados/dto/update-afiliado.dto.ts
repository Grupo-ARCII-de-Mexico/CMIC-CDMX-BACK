import { PartialType } from '@nestjs/swagger';
import { CreateAfiliadoDto } from './create-afiliado.dto';

export class UpdateAfiliadoDto extends PartialType(CreateAfiliadoDto) {}
