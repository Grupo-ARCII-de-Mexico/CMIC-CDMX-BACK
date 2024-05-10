import { Module } from '@nestjs/common';
import { AfiliadosService } from './afiliados.service';
import { AfiliadosController } from './afiliados.controller';
import { AfiliadosSearchService } from 'src/tools/afiliados.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Afiliado } from './entities/afiliado.entity';
import { EmailService } from 'src/tools/nodemailer.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Afiliado])
  ],
  controllers: [AfiliadosController],
  providers: [AfiliadosService, AfiliadosSearchService,EmailService]
})
export class AfiliadosModule {}
