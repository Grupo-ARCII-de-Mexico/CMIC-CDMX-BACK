import { Injectable } from '@nestjs/common';
import { CreateSliderDto } from './dto/create-slider.dto';
import { UpdateSliderDto } from './dto/update-slider.dto';
import { Slider } from './entities/slider.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class SlidersService {
  constructor(
    @InjectRepository(Slider) private repo: Repository<Slider>
  ){}
  async create(createBoletineDto: CreateSliderDto) {
    return await this.repo.save(this.repo.create(createBoletineDto))
  }

  async findAll() {
    return (await this.repo.find()).sort((a,b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime());
  }

  async findOne(id: number) {
    return await this.repo.findOneBy({id});
  }

  async update(id: number, updateBoletineDto: UpdateSliderDto) {
    const old = await this.repo.findOneBy({id});
    const fusion = this.repo.merge(old,updateBoletineDto);
    await this.repo.update(id,fusion);
    return  await this.repo.findOneBy({id}) ;
  }

  async remove(id: number) {
    return await this.repo.delete(id)
  }
}
