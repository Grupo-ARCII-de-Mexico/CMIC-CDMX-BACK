
import { PartialType } from '@nestjs/mapped-types';
import { CreateDesastreDto } from './create-desastre.dto';

export class UpdateDesastreDto extends PartialType(CreateDesastreDto) {}
