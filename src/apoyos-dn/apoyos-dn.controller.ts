import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ApoyosDnService } from './apoyos-dn.service';
import { CreateApoyosDnDto } from './dto/create-apoyos-dn.dto';
import { UpdateApoyosDnDto } from './dto/update-apoyos-dn.dto';

@Controller('apoyos-dn')
export class ApoyosDnController {
  constructor(private readonly apoyosDnService: ApoyosDnService) {}

  @Post()
  create(@Body() createApoyosDnDto: CreateApoyosDnDto) {
    return this.apoyosDnService.create(createApoyosDnDto);
  }

  @Get()
  findAll() {
    return this.apoyosDnService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.apoyosDnService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateApoyosDnDto: UpdateApoyosDnDto) {
    return this.apoyosDnService.update(+id, updateApoyosDnDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.apoyosDnService.remove(+id);
  }
}
