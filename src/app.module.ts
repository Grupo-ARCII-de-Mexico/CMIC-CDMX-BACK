import { MiddlewareConsumer, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EventoModule } from './evento/evento.module';
import { BoletoModule } from './boleto/boleto.module';
import { UploadsController } from './uploads/uploads.controller';
import { UserModule } from './user/user.module';
import { DelegacionModule } from './delegacion/delegacion.module';
import { Delegacion } from './delegacion/entities/delegacion.entity';
import { Boleto } from './boleto/entities/boleto.entity';
import { Evento } from './evento/entities/evento.entity';
import { User } from './user/user.entity';
import { ParticipanteModule } from './participante/participante.module';
import { EstadosModule } from './estados/estados.module';
import { Estado } from './estados/entities/estado.entity';
import { Participante } from './participante/entities/participante.entity';
import { ScheduleModule } from '@nestjs/schedule';
import { HttpModule } from '@nestjs/axios';
import { PaymentsModule } from './payments/payments.module';
import { NegocioModule } from './negocio/negocio.module';
import { ThrottlerModule } from '@nestjs/throttler';
import { Negocio } from './negocio/entities/negocio.entity';
import { OportunidadNegocio } from './negocio/entities/oportunidad-negocio.entity';
import { ContactoNegocio } from './negocio/entities/contacto-negocio.entity';
import { UsuarioOnModule } from './usuario-on/usuario-on.module';
import { ApoyosDnModule } from './apoyos-dn/apoyos-dn.module';
import { DesastresModule } from './desastres/desastres.module';
import { Desastre } from './desastres/entities/desastre.entity';
import { ApoyosDn } from './apoyos-dn/entities/apoyos-dn.entity';
import { LicitacionesModule } from './licitaciones/licitaciones.module';
import { Licitacione } from './licitaciones/entities/licitacione.entity';
import { SlidersModule } from './sliders/sliders.module';
import { BoletinesModule } from './boletines/boletines.module';
import { CursosModule } from './cursos/cursos.module';
import { Slider } from './sliders/entities/slider.entity';
import { Boletin } from './boletines/entities/boletine.entity';
import { Curso } from './cursos/entities/curso.entity';
import { ComentariosModule } from './comentarios/comentarios.module';
import { ComisionesModule } from './comisiones/comisiones.module';
import { Comentario } from './comentarios/entities/comentario.entity';
import { Comision } from './comisiones/entities/comisione.entity';
import { ContactoModule } from './contacto/contacto.module';
import { AfiliadosModule } from './afiliados/afiliados.module';
import { BolsaTrabajoModule } from './bolsa-trabajo/bolsa-trabajo.module';
import { BolsaParticipanteModule } from './bolsa-participante/bolsa-participante.module';
import { BolsaTrabajo } from './bolsa-trabajo/entities/bolsa-trabajo.entity';
import { BolsaParticipante } from './bolsa-participante/entities/bolsa-participante.entity';
import { DirectorioModule } from './directorio/directorio.module';
import { DepartamentoModule } from './departamento/departamento.module';
import { Departamento } from './departamento/entities/departamento.entity';
import { Directorio } from './directorio/entities/directorio.entity';
import { CalendarioCapacitacionesModule } from './calendario-capacitaciones/calendario-capacitaciones.module';
import { CalendarioCapacitacione } from './calendario-capacitaciones/entities/calendario-capacitacione.entity';
import { Afiliado } from './afiliados/entities/afiliado.entity';


@Module({
  imports: [
    ConfigModule.forRoot({isGlobal:true}),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get('DB_HOST'),
        port: +configService.get<number>('DB_PORT'),
        username: configService.get('DB_USERNAME'),
        password: configService.get('DB_PASSWORD'),
        database: configService.get('DB_NAME'),
        entities: [
          Evento,
          User,
          Estado,
          Delegacion,
          Boleto,
          Participante,
          Negocio,
          OportunidadNegocio,
          ContactoNegocio,
          Desastre,
          ApoyosDn,
          Licitacione,
          Slider,
          Boletin,
          Curso,
          Comentario,
          Comision,
          BolsaTrabajo,
          BolsaParticipante,
          Departamento,
          Directorio,
          CalendarioCapacitacione,
          Afiliado
        ],
        synchronize: true,
        ssl: false
      }),
      inject: [ConfigService],
    }),
    EventoModule,
    UserModule,
    ParticipanteModule,
    EstadosModule,
    DelegacionModule,
    BoletoModule,
    PaymentsModule,
    ScheduleModule.forRoot(),
    HttpModule,
    NegocioModule,
    ThrottlerModule.forRoot([{
      ttl: 60000,
      limit: 10,
    }]),
    UsuarioOnModule,
    ApoyosDnModule,
    DesastresModule,
    LicitacionesModule,
    SlidersModule,
    BoletinesModule,
    CursosModule,
    ComentariosModule,
    ComisionesModule,
    ContactoModule,
    AfiliadosModule,
    BolsaTrabajoModule,
    BolsaParticipanteModule,
    DirectorioModule,
    DepartamentoModule,
    CalendarioCapacitacionesModule,
  ], 
  controllers: [UploadsController],
  providers: [],
})
export class AppModule {

} 