import { PartialType } from '@nestjs/swagger';
import { CreateComisioneDto } from './create-comisione.dto';

export class UpdateComisioneDto extends PartialType(CreateComisioneDto) {}
