import { Module } from '@nestjs/common';
import { DelegacionService } from './delegacion.service';
import { DelegacionController } from './delegacion.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Delegacion } from './entities/delegacion.entity';

@Module({
  imports:[
    TypeOrmModule.forFeature([
      Delegacion
    ])
  ],
  controllers: [DelegacionController],
  providers: [DelegacionService],
  exports:[DelegacionService,TypeOrmModule]
})
export class DelegacionModule {}
