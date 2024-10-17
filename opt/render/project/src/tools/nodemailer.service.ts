import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as nodemailer from 'nodemailer';
import { Boleto } from 'src/boleto/entities/boleto.entity';
import { Confirmacion } from './emails/confirmacion.email';
import { Direccion, facturaFragment, zoomFragment } from './emails/fragments.mail';
import * as moment from 'moment';

import { TransferenciaEmail } from './emails/preregistro.email';
import { FacturaMail } from './emails/factura.email';
import { EventoVirtualFree } from './emails/eventoVirtual.email';
import { TipoEvento } from './enums/tipoEvento.enum';
import { ContactoNegocio } from 'src/negocio/entities/contacto-negocio.entity';
import { OportunidadNegocio } from 'src/negocio/entities/oportunidad-negocio.entity';
import { ONE1 } from './emails/ON-Etapa1.email';
import { ApoyosDn } from 'src/apoyos-dn/entities/apoyos-dn.entity';
import { EXTONEMAIL } from './emails/externo-email-on';
import { CreateContactoDto } from 'src/contacto/dto/create-contacto.dto';
import { ContactoEmail } from './emails/contacto.email';
import { BolsaParticipante } from 'src/bolsa-participante/entities/bolsa-participante.entity';
import { PostulanteEmail } from './emails/postulante.email';
import { CUMPLEANOS } from './emails/cumpleanos';
import { Aniversario } from './emails/aniversario';
moment.locale('es');

@Injectable()
export class EmailService {
  private readonly transporter;

  constructor(
    private configS: ConfigService
  ) {
    this.transporter = nodemailer.createTransport({
      host: 'mail.cmiccdmx.org', // Cambia esto por el servidor SMTP de tu proveedor
      secure: true, // true para SSL; false para otros protocolos
      auth: {
        user: 'no-reply@cmiccdmx.org', // Cambia por tu dirección de correo electrónico
        pass: 'no-reply', // Cambia por tu contraseña
      },
    });
  }


  /// PREREGISTRO
  async sendEmailPreregistro(boleto: Boleto) {
    let html;
    html = TransferenciaEmail.replace('$nombre', boleto?.participante?.nombre)
    html = html.replace('$evento', boleto.evento.titulo);
    if (boleto.qr) {
      html = html.replace('$qr', process.env.DOMAIN + boleto.qr);
    }
    else {
      html = html.replace('$qr', '');
    }
    if (boleto?.evento?.zoom) {
      html = html.replace('$zoom', zoomFragment);
      html = html.replace(/\$zoom/g, boleto?.evento?.zoom);
      html = html.replace('$Password', boleto?.evento?.zoomPassword ?? 'N/A');
    } else {
      html = html.replace('$zoom', '');
    }
    let mailOptions;
    if (boleto.qr) {
      mailOptions = {
        from: 'CMIC Ciudad de Mexico <no-reply@cmiccdmx.org>', // Cambia por tu nombre y dirección de correo electrónico
        to: boleto.participante.email,
        subject: 'Pre-registro Recibido',
        html,
      };
    } else {
      mailOptions = {
        from: 'CMIC Ciudad de Mexico <no-reply@cmiccdmx.org>', // Cambia por tu nombre y dirección de correo electrónico
        to: boleto.participante.email,
        subject: 'Pre-registro Recibido',
        html,
      };
    }
    try {
      const info = await this.transporter.sendMail(mailOptions);
      console.log('Correo electrónico enviado:', info.response);
      return true;
    } catch (error) {
      console.error('Error al enviar el correo electrónico:', error);
      return true
    }
  }
  //Confirmacion Fisica Gratis
  async sendEventoGratis(boleto: Boleto) { 
    let html;
    html = Confirmacion.replace('$nombre', boleto.participante.nombre);
    html = html.replace('$evento', boleto.evento.titulo)
    html = html.replace('$evento', boleto.evento.titulo)
    html = html.replace('$direccion', Direccion);
    html = html.replace('$factura', '');
    html = html.replace('$direccion', boleto?.evento?.lugar);
    html = html.replace('$fecha', moment(boleto.evento.fechaInicio).locale('es').format('LL') + ' a las ' + moment(boleto.evento.fechaInicio).locale('es').format('LT'));
    if (boleto?.evento?.zoom && Number(boleto.evento.tipoEvento) === TipoEvento.HIBRIDO) {
      html = html.replace('$zoom', zoomFragment);
      html = html.replace(/\$zoom/g, boleto?.evento?.zoom);
      html = html.replace('$Password', boleto?.evento?.zoomPassword ?? 'N/A');
    } else {
      html = html.replace('$zoom', '');
    }
    html = html.replace('$qr', process.env.DOMAIN + boleto.qr);
    const mailOptions = {
      from: 'CMIC Ciudad de Mexico <no-reply@cmiccdmx.org>', // Cambia por tu nombre y dirección de correo electrónico
      to: boleto.participante.email,
      subject: 'Acceso al evento',
      html,
    };
    try {
      const info = await this.transporter.sendMail(mailOptions);
      console.log('Correo electrónico enviado:', info.response);
      return true;
    } catch (error) {
      console.error('Error al enviar el correo electrónico:', error);
      return true
    }
  }
  //Confirmacion Fisica
  async sendEmailConfirmacion(boleto: Boleto) {
    let html;
    html = Confirmacion.replace('$nombre', boleto?.participante?.nombre)
    html = html.replace('$evento', boleto.evento.titulo)
    html = html.replace('$evento', boleto.evento.titulo)
    html = html.replace('$direccion', Direccion);
    html = html.replace('$factura', facturaFragment);
    html = html.replace('$direccion', boleto?.evento?.lugar);
    html = html.replace('$fecha', moment(boleto.evento.fechaInicio).locale('es').format('LL') + ' a las ' + moment(boleto.evento.fechaInicio).locale('es').format('LT'));
    if (boleto?.evento?.zoom && Number(boleto.evento.tipoEvento) === TipoEvento.HIBRIDO) {
      html = html.replace('$zoom', zoomFragment);
      html = html.replace(/\$zoom/g, boleto?.evento?.zoom);
      html = html.replace('$Password', boleto?.evento?.zoomPassword ?? 'N/A');
    } else {
      console.log('entree');
      
      html = html.replace('$zoom', '');
    }
    html = html.replace('$qr', process.env.DOMAIN + boleto.qr);
    let mailOptions;
      mailOptions = {
        from: 'CMIC Ciudad de Mexico <no-reply@cmiccdmx.org>', // Cambia por tu nombre y dirección de correo electrónico
        to: boleto.participante.email,
        subject: 'Confirmación de pago y acceso al evento',
        html,
      };

    try {
      const info = await this.transporter.sendMail(mailOptions);
      console.log('Correo electrónico enviado:', info.response);
      return true;
    } catch (error) {
      console.error('Error al enviar el correo electrónico:', error);
      return true
    }
  }
  //Confirmacion Virtual
  async sendEmailConfirmacionVirtual(boleto: Boleto) {
    let html;
    html = EventoVirtualFree.replace('$nombre', boleto?.participante?.nombre)
    html = html.replace('$evento', boleto.evento.titulo);
    html = html.replace('$evento', boleto.evento.titulo);
    html = html.replace('$qr', '');
    html = html.replace('$zoom', boleto?.evento?.zoom);
    html = html.replace('$zoomPassword', boleto?.evento?.zoomPassword ?? 'N/A');

    let mailOptions;
    if (boleto.qr) {
      mailOptions = {
        from: 'CMIC Ciudad de Mexico <no-reply@cmiccdmx.org>', // Cambia por tu nombre y dirección de correo electrónico
        to: boleto.participante.email,
        subject: 'Confirmación de pago y acceso al evento',
        attachments: [
          {
            filename: 'qr-code.png', // Nombre del archivo en el correo
            path: this.configS.get('DOMAIN') + boleto.qr, // Ruta completa del archivo en el sistema de archivos
          },
        ],
        html,
      };
    } else {
      mailOptions = {
        from: 'CMIC Ciudad de Mexico <no-reply@cmiccdmx.org>', // Cambia por tu nombre y dirección de correo electrónico
        to: boleto.participante.email,
        subject: 'Confirmación de pago y acceso al evento',
        html,
      };
    }
    try {
      const info = await this.transporter.sendMail(mailOptions);
      console.log('Correo electrónico enviado:', info.response);
      return true;
    } catch (error) {
      console.error('Error al enviar el correo electrónico:', error);
      return true
    }
  }

  //Factura Mail
  async sendEmailFactura(boleto: Boleto) {
    let html;
    html = Confirmacion.replace('$nombre', boleto?.participante?.nombre)
    html = html.replace('$evento', boleto.evento.titulo);
    html = html.replace('$qr', '');
    html = html.replace('$zoom', zoomFragment);
    html = html.replace(/\$zoom/g, boleto?.evento?.zoom);
    html = html.replace('$Password', boleto?.evento?.zoomPassword ?? 'N/A');

    let mailOptions;
    if (boleto.qr) {
      mailOptions = {
        from: 'CMIC Ciudad de Mexico <no-reply@cmiccdmx.org>', // Cambia por tu nombre y dirección de correo electrónico
        to: boleto.participante.email,
        subject: 'Confirmación de pago y acceso al evento',
        attachments: [
          {
            filename: 'qr-code.png', // Nombre del archivo en el correo
            path: this.configS.get('DOMAIN') + boleto.qr, // Ruta completa del archivo en el sistema de archivos
          },
        ],
        html,
      };
    } else {
      mailOptions = {
        from: 'CMIC Ciudad de Mexico <no-reply@cmiccdmx.org>', // Cambia por tu nombre y dirección de correo electrónico
        to: boleto.participante.email,
        subject: 'Confirmación de pago y acceso al evento',
        html,
      };
    }
    try {
      const info = await this.transporter.sendMail(mailOptions);
      console.log('Correo electrónico enviado:', info.response);
      return true;
    } catch (error) {
      console.error('Error al enviar el correo electrónico:', error);
      return true
    }
  }

  //sendNatalia
  async sendEmailNatalia(boleto: Boleto) {
    let html;
    html = FacturaMail.replace('$nombre', boleto?.participante?.nombre);
    html = html.replace('$telefono', boleto?.participante?.telefono);
    html = html.replace('$correo', boleto?.participante?.email);
    html = html.replace('$evento', boleto?.evento?.titulo);
    html = html.replace('$costo', '$' + boleto.costo);
    html = html.replace('$plataforma', boleto?.plataformaPago == 0 ? 'Tarjeta de Crédito' : 'Transferencia');
    const mailOptions = {
      from: 'CMIC Ciudad de Mexico <no-reply@cmiccdmx.org>', // Cambia por tu nombre y dirección de correo electrónico
      to: 'natalia.vega@cmic.org',
      subject: 'Confirmación de pago y acceso al evento',
      html,
    };
    try {
      const info = await this.transporter.sendMail(mailOptions);
      console.log('Correo electrónico enviado:', info.response);
      return true;
    } catch (error) {
      console.error('Error al enviar el correo electrónico:', error);
      return true
    }
  }

  //sendAdmin
  async sendEmailAdmin(to: string, subject: string, attach:any, html: string, ) {
    const mailOptions = {
      from:'CMIC Ciudad de Mexico <no-reply@cmiccdmx.org>', // Cambia por tu nombre y dirección de correo electrónico
      to,
      subject,
      html,
    };

  try {
    const info = await this.transporter.sendMail(mailOptions);
    console.log('Correo electrónico enviado:', info.response);
    return info.response;
  } catch (error) {
    console.error('Error al enviar el correo electrónico:', error);
    return true
  }
}

//ONE1

async sendOportunidadNegocioE1(contacto:ContactoNegocio){
  let html = ONE1.replace('$nombre',`${contacto.nombre} ${contacto.paterno} ${contacto?.materno ?? ''}`);
  html = html.replace('$empresa',contacto.oportunidad.negocio.empresa)
  const mailOptions = {
    from:'CMIC Ciudad de Mexico <no-reply@cmiccdmx.org>', // Cambia por tu nombre y dirección de correo electrónico
    to:contacto.email,
    subject:'Registro Oportunidad de Negocio '+ contacto.oportunidad.negocio.empresa,
    html,
  };

try {
  const info = await this.transporter.sendMail(mailOptions);
  console.log('Correo electrónico enviado:', info.response);
  return info.response;
} catch (error) {
  console.error('Error al enviar el correo electrónico:', error);
  return true
}
}

//ONE1PasswordUSER-EXTERNO

async sendOportunidadNegocioE1EXTERNOPASS({empresa,password,email,liga}:any){
  let html = EXTONEMAIL.replace('$empresa',`${empresa}`);
  html = html.replace('$liga',liga)
  html = html.replace('$liga',liga)
  html = html.replace('$password',password)
  const mailOptions = {
    from:'CMIC Ciudad de Mexico <no-reply@cmiccdmx.org>', // Cambia por tu nombre y dirección de correo electrónico
    to:email,
    subject:'Entrega de registros de oportunidad de negocio '+ empresa,
    html,
  };

try {
  const info = await this.transporter.sendMail(mailOptions);
  console.log('Correo electrónico enviado:', info.response);
  return info.response;
} catch (error) {
  console.error('Error al enviar el correo electrónico:', error);
  return true
}
}

async sendEmailPostulante(postulante:BolsaParticipante){
  let html = PostulanteEmail.replace('$empleo',`${postulante.trabajo.titulo}`);
  html = html.replace('$nombre',postulante.nombre)
  html = html.replace('$telefono',postulante.telefono)
  html = html.replace('$correo',postulante.correo)
  const mailOptions = {
    from:'CMIC Ciudad de Mexico <no-reply@cmiccdmx.org>', // Cambia por tu nombre y dirección de correo electrónico
    to:['afiliacion@cmiccdmx.org','comunicacioncmic.cdmx@cmic.org'],
    subject:'Alguien se postuló a ' + postulante.trabajo.titulo,
    attachments: [
      {
        filename: postulante.nombre+'.pdf', // Nombre del archivo en el correo
        path: this.configS.get('DOMAIN') + postulante.curriculum, // Ruta completa del archivo en el sistema de archivos
      },
    ],
    html,
  };

try {
  const info = await this.transporter.sendMail(mailOptions);
  console.log('Correo electrónico enviado:', info.response);
  return info.response;
} catch (error) {
  console.error('Error al enviar el correo electrónico:', error);
  return true
}
}

  //sendAdmin
  async sendEmailAdminTEST( algo: any[]) {
    for( let correo of algo){
      const mailOptions = {
        from:'CMIC Ciudad de Mexico <no-reply@cmiccdmx.org>', // Cambia por tu nombre y dirección de correo electrónico
        to:'luisgbo@grupoarcii.com',
        subject:'PRUEBA CORREO',
        html:correo,
      };
      const info = await this.transporter.sendMail(mailOptions);
      console.log('Correo electrónico enviado:', info.response);
    }
  try {
    //console.log('Correo electrónico enviado:', info.response);
    return true;
  } catch (error) {
    console.error('Error al enviar el correo electrónico:', error);
    return true
  }
}


  //EmailService
  async APOYO( apoyo:ApoyosDn,titutlo:string,html:any) {
      const mailOptions = {
        from:'CMIC Ciudad de Mexico <no-reply@cmiccdmx.org>', // Cambia por tu nombre y dirección de correo electrónico
        to:apoyo.email,
        subject:'Registro a Apoyo ' + titutlo,
        html,
      };
  
  try {
    const info = await this.transporter.sendMail(mailOptions);
      console.log('Correo electrónico enviado:', info.response);
    return true;
  } catch (error) {
    console.error('Error al enviar el correo electrónico:', error);
    return true
  }
}

  //EmailService
  async CONTACTO( create:CreateContactoDto) {
    let html = ContactoEmail.replace('$nombre',create.name)
    html = html.replace('$correo',create.correo)
    html = html.replace('$telefono',create.tel)
    html = html.replace('$mensaje',create.mensaje)
    const mailOptions = {
      from:'CMIC Ciudad de Mexico <no-reply@cmiccdmx.org>', // Cambia por tu nombre y dirección de correo electrónico
      to:['afiliacion@cmiccdmx.org','comunicacioncmic.cdmx@cmic.org'],
      subject:'Alguien quiere hablar con nosotros',
      html,
    };

try {
  const info = await this.transporter.sendMail(mailOptions);
    console.log('Correo electrónico enviado:', info.response);
  return true;
} catch (error) {
  console.error('Error al enviar el correo electrónico:', error);
  return true
}
}

  //EmailService
  async CUMPLEANERO( nombre:string, correo:string[] ) {
    let html = CUMPLEANOS.replace('$Nombre',nombre)
    const mailOptions = {
      from:'CMIC Ciudad de Mexico <no-reply@cmiccdmx.org>', // Cambia por tu nombre y dirección de correo electrónico
      to:correo,
      subject:'¡Feliz cumpleaños! le desea la CMIC CDMX',
      html,
    };

try {
  const info = await this.transporter.sendMail(mailOptions);
    console.log('Correo electrónico enviado:', info.response);
  return true;
} catch (error) {
  console.error('Error al enviar el correo electrónico:', error);
  return true
}
}


  //EmailService
  async ANIVERSARIO( nombre:string, correo:string[] ) {
    let html = Aniversario.replace('$Nombre',nombre)
    const mailOptions = {
      from:'CMIC Ciudad de Mexico <no-reply@cmiccdmx.org>', // Cambia por tu nombre y dirección de correo electrónico
      to:correo,
      subject:'¡Feliz Aniversario de fundación! les desea la CMIC CDMX',
      html,
    };

try {
  const info = await this.transporter.sendMail(mailOptions);
    console.log('Correo electrónico enviado:', info.response);
  return true;
} catch (error) {
  console.error('Error al enviar el correo electrónico:', error);
  return true
}
}
}
