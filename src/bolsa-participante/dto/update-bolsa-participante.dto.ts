import { PartialType } from '@nestjs/swagger';
import { CreateBolsaParticipanteDto } from './create-bolsa-participante.dto';

export class UpdateBolsaParticipanteDto extends PartialType(CreateBolsaParticipanteDto) {}
