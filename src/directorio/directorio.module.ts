import { Module } from '@nestjs/common';
import { DirectorioService } from './directorio.service';
import { DirectorioController } from './directorio.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Directorio } from './entities/directorio.entity';
import { DepartamentoModule } from 'src/departamento/departamento.module';

@Module({
  imports:[
    TypeOrmModule.forFeature([Directorio]),
    DepartamentoModule
  ],
  controllers: [DirectorioController],
  providers: [DirectorioService]
})
export class DirectorioModule {}
