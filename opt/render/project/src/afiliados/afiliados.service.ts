import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateAfiliadoDto } from './dto/create-afiliado.dto';
import { UpdateAfiliadoDto } from './dto/update-afiliado.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Afiliado } from './entities/afiliado.entity';
import { Repository } from 'typeorm';
import * as XLSX from 'xlsx';
import { AfiliadosSearchService } from 'src/tools/afiliados.service';
import { Cron, CronExpression } from '@nestjs/schedule';
import { EmailService } from 'src/tools/nodemailer.service';
import * as moment from 'moment';

@Injectable()
export class AfiliadosService {

  constructor(
    @InjectRepository(Afiliado) private afiliadoRepository: Repository<Afiliado>,
    private searchService : AfiliadosSearchService,
    private emailS:EmailService
  ) {}

  async create(createAfiliadoDto: CreateAfiliadoDto) {
    return await this.afiliadoRepository.save(createAfiliadoDto);
  }

  async findAll() {
    return await this.afiliadoRepository.find();
  }

  async findOne(id: number) {
    return await this.afiliadoRepository.findOneBy({id});
  }

  async search(id: string) {
    const find =  await this.afiliadoRepository.findOneBy({registro: id});
    if(!find){
      throw new NotFoundException('Afiliado no encontrado')
    }
    return find;
  }

  async update(id: number, updateAfiliadoDto: UpdateAfiliadoDto) {
    const old = await this.findOne(id);
    const fusion = this.afiliadoRepository.merge(old, updateAfiliadoDto);
    await this.afiliadoRepository.update(id, fusion);
    return  fusion
  }

  async remove(id: number) {
    return await this.afiliadoRepository.delete(id);
  }

  async masive(file: any) {
    const afiliados:any = []
    const workbook = XLSX.read(file.buffer, { type: 'buffer' });
    const sheetName = workbook.SheetNames[1];
    const sheet = workbook.Sheets[sheetName];
    const data = XLSX.utils.sheet_to_json(sheet, { header: 1 });
    const clearData = data.slice(4,data.length);
    for(let i = 0; i < clearData.length; i++){
      const afiliado = new Afiliado();
      afiliado.fechaEmision = this.convertirFechaExcelAFechaJavaScript(clearData[i][1]);
      afiliado.fechaFacturacion = this.convertirFechaExcelAFechaJavaScript(clearData[i][2]);
      afiliado.registro = String(clearData[i][3]).padStart(8, '0');
      afiliado.certificado = clearData[i][4];
      afiliado.nip = clearData[i][5];
      afiliado.inicioOperaciones = this.convertirFechaExcelAFechaJavaScript(clearData[i][6]);
      afiliado.nombre = clearData[i][7];
      afiliado.representanteLegal = clearData[i][8];
      afiliado.cumpleanos = this.convertirFechaExcelAFechaJavaScript(clearData[i][9]);
      afiliado.tamano = clearData[i][10];
      afiliado.telefono1 = clearData[i][11];
      afiliado.telefono2 = clearData[i][12];
      afiliado.correo1 = clearData[i][13];
      afiliado.correo2 = clearData[i][14];
      afiliado.anosConsecutivos = String(clearData[i][15]).includes('NUEVA')  ? 0 : clearData[i][15];
      afiliado.ultimoAno = String(clearData[i][16]).includes('NUEVA') ? new Date().getFullYear() : clearData[i][16];
      afiliado.especialidad1 = clearData[i][17];
      afiliado.especialidad2 = clearData[i][18];
      afiliado.especialidad3 = clearData[i][19];
      afiliados.push(this.afiliadoRepository.create(afiliado));
    }
    return await this.afiliadoRepository.save(afiliados);

  }

  convertirFechaExcelAFechaJavaScript(fechaNumerica: number): Date | null {
    if (!fechaNumerica) {
      return null;
    }
    const fechaBaseExcel = new Date(Date.UTC(1899, 11, 30));
    // Calcular la fecha JavaScript sumando la fecha base y el número de días desde la fecha base de Excel
    const fechaJavaScript = new Date(fechaBaseExcel.getTime() + (fechaNumerica) * 24 * 60 * 60 * 1000);
    if (isNaN(fechaJavaScript.getTime())) {
      return null; // Retorna null si la fecha convertida no es válida
    }
  
    return fechaJavaScript;
  }


  async mandarCorreoCumpleanos(id:number) {
    const afiliado = await this.afiliadoRepository.findOneBy({id});
    return  await this.emailS.CUMPLEANERO(afiliado.representanteLegal,[afiliado.correo1,afiliado.correo2]); 
  }

  async mandarCorreoAniversario(id:number) {
    const afiliado = await this.afiliadoRepository.findOneBy({id});
    return  await this.emailS.ANIVERSARIO(afiliado.nombre,[afiliado.correo1,afiliado.correo2]); 
  }

  @Cron(CronExpression.EVERY_DAY_AT_3PM)
  async Cumpleanos() {
    const afiliados = await this.afiliadoRepository.find();
    const cumpleaneros = afiliados.filter(afiliado => moment(afiliado.cumpleanos).format('DD/MM') == moment(new Date()).format('DD/MM'))
    const aniversarios = afiliados.filter(afiliado => moment(afiliado.inicioOperaciones).format('DD/MM') == moment(new Date()).format('DD/MM'))
    for(const cumpleanero of cumpleaneros){
      await this.emailS.CUMPLEANERO(cumpleanero.representanteLegal,[cumpleanero.correo1,cumpleanero.correo2]);  
    }
    for(const cumpleanero of aniversarios){
      await this.emailS.ANIVERSARIO(cumpleanero.nombre,[cumpleanero.correo1,cumpleanero.correo2]);  
    }
  }

}
