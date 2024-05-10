import { Module } from '@nestjs/common';
import { EstadosService } from './estados.service';
import { EstadosController } from './estados.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Estado } from './entities/estado.entity';

@Module({
  imports:[
    TypeOrmModule.forFeature([
      Estado
    ])
  ],
  controllers: [EstadosController],
  providers: [EstadosService],
  exports: [TypeOrmModule,EstadosService]
})
export class EstadosModule {}
