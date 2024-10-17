
import { PartialType } from '@nestjs/mapped-types';
import { CreateApoyosDnDto } from './create-apoyos-dn.dto';

export class UpdateApoyosDnDto extends PartialType(CreateApoyosDnDto) {}
