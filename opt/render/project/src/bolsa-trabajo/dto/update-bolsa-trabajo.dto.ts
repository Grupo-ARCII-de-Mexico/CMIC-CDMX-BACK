import { PartialType } from '@nestjs/swagger';
import { CreateBolsaTrabajoDto } from './create-bolsa-trabajo.dto';

export class UpdateBolsaTrabajoDto extends PartialType(CreateBolsaTrabajoDto) {}
