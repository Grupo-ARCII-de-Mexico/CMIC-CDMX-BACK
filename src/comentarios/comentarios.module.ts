import { Module } from '@nestjs/common';
import { ComentariosService } from './comentarios.service';
import { ComentariosController } from './comentarios.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Comentario } from './entities/comentario.entity';

@Module({
  imports:[
    TypeOrmModule.forFeature([
      Comentario
    ])
  ],
  controllers: [ComentariosController],
  providers: [ComentariosService]
})
export class ComentariosModule {}
