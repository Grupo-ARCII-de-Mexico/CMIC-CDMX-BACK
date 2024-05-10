import { PartialType } from '@nestjs/mapped-types';
import { CreateDelegacionDto } from './create-delegacion.dto';

export class UpdateDelegacionDto extends PartialType(CreateDelegacionDto) {}
