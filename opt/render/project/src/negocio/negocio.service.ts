import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreateNegocioDto } from './dto/create-negocio.dto';
import { UpdateNegocioDto } from './dto/update-negocio.dto';
import { ContactoNegocio } from './entities/contacto-negocio.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Negocio } from './entities/negocio.entity';
import { Repository } from 'typeorm';
import { OportunidadNegocio } from './entities/oportunidad-negocio.entity';
import { CreateContactoNegocioDto, UpdateContactoNegocioDto } from './dto/create-contacto-negocio';
import { CreateOportunidadNegocioDto, UpdateOportunidadNegocioDto } from './dto/create-oportunidad-negocio';
import { v4 as uuidv4 } from 'uuid';
import { EmailService } from 'src/tools/nodemailer.service';
import { Confirmacion } from 'src/tools/emails/confirmacion.email';
import { EventoVirtualFree } from 'src/tools/emails/eventoVirtual.email';
import { FacturaMail } from 'src/tools/emails/factura.email';
import { ONE1 } from 'src/tools/emails/ON-Etapa1.email';
import { TransferenciaEmail } from 'src/tools/emails/preregistro.email';
import * as bcrypt from 'bcrypt';
import * as GENERATEPASSWORD from 'generate-password';
@Injectable()
export class NegocioService {
  constructor(
    @InjectRepository(Negocio) private negocioRepo:Repository<Negocio>,
    @InjectRepository(ContactoNegocio) private contactoRepo:Repository<ContactoNegocio>,
    @InjectRepository(OportunidadNegocio) private oportunidadRepo:Repository<OportunidadNegocio>,
    private emailS:EmailService,
  ){ 

  }
  async create(createNegocioDto: UpdateNegocioDto) {

    const saved = this.negocioRepo.create(createNegocioDto);
    saved.identificador = uuidv4();
    return await this.negocioRepo.save(saved);
  }

  async createContacto({email,materno,oportunidad,nombre,paterno,telefono,telefonoOficina}: CreateContactoNegocioDto) {
    try {
      const saved = this.contactoRepo.create({
        email,materno,
        telefonoOficina,
        oportunidad:await this.oportunidadRepo.findOne({where:{id:oportunidad},relations:['negocio']})
        ,nombre,paterno,telefono
      })
      const contacto = await this.contactoRepo.save(saved);
      await this.emailS.sendOportunidadNegocioE1(contacto);
      return {folio:contacto.oportunidad.folio}
    } catch (error) {
      throw new InternalServerErrorException()
    }
  }

  async createOportunidad({afiliado,calle,colonia,cp,denominacion,documentos,empresa,especialidades,estado,municipio,negocio,rfc,web}: UpdateOportunidadNegocioDto) {
    
    const saved = this.oportunidadRepo.create({
      negocio: await this.negocioRepo.findOneBy({id:Number(negocio)}),
      afiliado,
      calle,
      colonia,
      cp,denominacion,documentos,empresa,especialidades,estado,municipio,rfc,web
    })
    const s = await this.oportunidadRepo.save(saved);
      
    s.folio = this.createFolio(negocio,s.id);
    await this.oportunidadRepo.update(s.id,s);
  
    return s
  }


  async findAll() {
    return await this.negocioRepo.find({relations:['oportunidadNegocio','oportunidadNegocio','oportunidadNegocio.contacto']});
  }

  async findAllOPO() {
    return await this.oportunidadRepo.find({relations:['contacto']});
  }

  async findOne(identificador: string) {
    return await this.negocioRepo.findOneBy({identificador});
  }

  async update(id: number, updateNegocioDto: UpdateNegocioDto) {
    const old = await this.negocioRepo.findOneBy({id});
    const fusion = this.negocioRepo.merge(old,updateNegocioDto);
    await this.negocioRepo.update(id,fusion);
    return await this.negocioRepo.findOneBy({id}) ;
  }

  async updateContacto(id: number, {email,materno,nombre,paterno,telefono}: UpdateContactoNegocioDto) {
    const old = await this.contactoRepo.findOneBy({id});
    const fusion = this.contactoRepo.merge(old,{email,materno,nombre,paterno,telefono});
    await this.contactoRepo.update(id,fusion);
    return await this.contactoRepo.findOneBy({id}) ;
  }
  async updateOportunidad(id: number, {afiliado,calle,colonia,cp,denominacion,documentos,empresa,especialidades,estado,municipio,rfc,web}: UpdateOportunidadNegocioDto) {
    const old = await this.oportunidadRepo.findOneBy({id});
    const fusion = this.oportunidadRepo.merge(old,{afiliado,calle,colonia,cp,denominacion,documentos,empresa,especialidades,estado,municipio,rfc,web});
    await this.oportunidadRepo.update(id,fusion);
    return await this.oportunidadRepo.findOneBy({id}) ;
  }

  async remove(id: number) {
    await this.negocioRepo.delete(id)
    return true
  }
  async removeOP(id: number) {
    await this.oportunidadRepo.delete(id)
    return true
  }

  createFolio(evento:number,idBoleto:number){
    return `CMIC-ON${evento}${idBoleto.toString().padStart(4, '0')}`
  }


  async sendMail(identificador:string,email:string[]){
    const negocio = await this.negocioRepo.findOneBy({identificador})
    const hash = await bcrypt.genSalt();
    const pass = GENERATEPASSWORD.generate({ length: 8, numbers: true })
    negocio.password = await bcrypt.hash(pass, hash);
    await this.negocioRepo.update(negocio.id,negocio);
    await this.emailS.sendOportunidadNegocioE1EXTERNOPASS({
      empresa:negocio.empresa,
      password:pass,
      email:email,
      liga:'https://afiliados.cmiccdmx.org/externos/ON/'+identificador
    })
    return true
  }

  async login({password,identificador}:UpdateNegocioDto){
 
      const search = await this.negocioRepo.findOne({where:{identificador},relations:['oportunidadNegocio','oportunidadNegocio','oportunidadNegocio.contacto']});
   
      if(!search){
        throw new NotFoundException('ON no encontrada')
      }
      if(!await bcrypt.compare(password, search.password)){
        throw new BadRequestException('Revise Sus Credenciales')
      }
      return search;
  }



}
