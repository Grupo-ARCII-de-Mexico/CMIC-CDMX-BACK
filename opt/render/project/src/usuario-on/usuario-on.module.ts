import { Module } from '@nestjs/common';
import { UsuarioOnService } from './usuario-on.service';
import { UsuarioOnController } from './usuario-on.controller';

@Module({
  controllers: [UsuarioOnController],
  providers: [UsuarioOnService]
})
export class UsuarioOnModule {}
