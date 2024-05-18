import { Module } from '@nestjs/common';
import { CursosService } from './cursos.service';
import { CursosController } from './cursos.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Curso } from './entities/curso.entity';
import { S3Service } from 'src/tools/s3.service';

@Module({
  imports:[
    TypeOrmModule.forFeature([Curso])
  ],
  controllers: [CursosController],
  providers: [CursosService, S3Service]
})
export class CursosModule {}
