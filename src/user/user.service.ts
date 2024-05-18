/* eslint-disable prettier/prettier */
import { ConflictException, ForbiddenException, Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { InternalServerErrorException } from '@nestjs/common';
import { In, Repository } from 'typeorm';
import * as GENERATEPASSWORD from 'generate-password';
import { EmailService } from 'src/tools/nodemailer.service';
import { Roles } from 'src/tools/eventos.enum';

@Injectable()
export class UserService {


    constructor(
        @InjectRepository(User) private userRepository: Repository<User>,
        private jwtService: JwtService,
        private email:EmailService
    ) { 
        this.createAdminService()
    }


    async createUser(user: any): Promise<any> {

        try {
            const hash = await bcrypt.genSalt();
            if (!user.password) {
                user.password = GENERATEPASSWORD.generate({ length: 6, numbers: true })
            }
            user.password = await bcrypt.hash(user.password, hash);
            user.wallet = 0;
            const User: any = this.userRepository.create(user);
            let result: any = await this.userRepository.save(User);

            return await this.getUser(result.id)


        } catch (error) {

            if (error.errno === 1062) {
                throw new ConflictException("Email was used for created an account")
            }
            throw new InternalServerErrorException(error)

        }

    }

    async updateUser(id: number, user: any): Promise<User> {
        try {
            const newUSer = await this.userRepository.findOne({ where: { id } });

            if (user.password) {
                const hash = await bcrypt.genSalt();
                user.password = await bcrypt.hash(user.password, hash);
            }
            const fusion = this.userRepository.merge(newUSer, user);
            await this.userRepository.update(id, fusion);
            const users = await this.getUser(id);

            return users
        } catch (error) {

            throw new InternalServerErrorException(error);

        }
    }

    async logIn(userInPatch: any): Promise<{ jwt: string, user: User }> {
        const { email, password } = userInPatch;
        let user = await this.userRepository.findOne({ where: { email } });
        if (!user) {
            user = await this.userRepository.findOne({ where: { user: email } });
        }
        if (user && (await bcrypt.compare(password, user.password))) {
            const payload = { id: user.id };
            const accessToken: string = await this.jwtService.sign(payload);
            return { jwt: accessToken, user: await this.getUser(user.id) };
        }
        else {
            throw new ConflictException('Revisa tus credenciales de acceso');
        }
    }

    async logOut(id: number, token?: string): Promise<boolean> {

        try {

            if (token) {
                const user = await this.userRepository.findOne({ where: { id } });
                await this.userRepository.update(id, user);
                return true
            } else {
                return true
            }




        } catch (error) {
            throw new InternalServerErrorException()

        }

    }

    async getUser(id: number): Promise<any> {
        try {
            return await this.userRepository.findOneBy({ id })
        } catch (error) {
            throw new InternalServerErrorException(error)
        }


    }
    async getUserNotRelations(id: number): Promise<User> {

        try {
            let user: any = await this.userRepository.findOne({ where: { id } });


            return user
        } catch (error) {
            ;

            throw new ConflictException("Este usuario no existe")
        }


    }
    async getUsersById(ids: number[]): Promise<User[]> {

        try {
            return await this.userRepository.find({
                where: {
                    id: In(ids)
                }
            });
        } catch (error) {
            throw new ConflictException("Este usuario no existe")
        }


    }



    async refresh(token: string): Promise<{ refreshToken: string }> {
        try {
            const data = await this.jwtService.decode(token);
           if(data){
            const id = data['id'];
            const payload = { id }; 
            const accessToken: string = await this.jwtService.sign(payload);
            return { refreshToken: accessToken };
           }else{
            throw new UnauthorizedException()
           }

        } catch (error) {
            if(error.status ===401){
                throw new ForbiddenException()
            }
            throw new InternalServerErrorException()
        }
    }

    async getUsers(type?: string, id?: number): Promise<User[]> {
   
        return await this.userRepository.find()

    }

    async delete(id: number): Promise<boolean> {
        try {
            await this.userRepository.delete(id);
            return true
        } catch (error) {
            console.log(error);

            throw new ConflictException("Este usuario no existe")
        }
    }

    filtrarArray(arreglo: any[]): any[] {
        const unicos = arreglo.filter((valor, indice) => {
            return arreglo.indexOf(valor) === indice;
        }
        );
        return unicos
    }

    /*   async getProductsOrders (products:ProductOrder[]) {
  
      
          const result = []
          for(let product of products){
              const productAny = product as any;
              switch (product.type) {
                  case TypeProduct.ADICIONAL:
                      productAny.idProduct = await this.adicionalS.getOne(product.idProduct)
                  break;
                  case TypeProduct.OPCION:
                      productAny.idProduct = await this.optionS.getOne(product.idProduct)
                  break;
                  case TypeProduct.PRODUCT:
                      productAny.idProduct = await this.productS.getOne(product.idProduct)
                  break;
                  case TypeProduct.SIZE:
                      productAny.idProduct = await this.tamanoRepository.findOne({where:{id:product.idProduct},relations:['product']})
                  break;
              }
              result.push(productAny)
          }
      
         return  result
      } */


    async createAdminService(){
        const existAdmin = await this.userRepository.findOneBy({user:'admin'});
        if(existAdmin){
            return;
        }else{
            const hash = await bcrypt.genSalt();
            let password ='admin';
            let password2 = await bcrypt.hash(password, hash);
            const User: any = this.userRepository.create({
                user: 'admin',
                email:'luis.rodriguez@grupoarcii.com',
                password:password2,
                names:'admin',
                role:Roles.ADMIN
            });
            let result: any = await this.userRepository.save(User);
            result.password = password
            await this.email.sendEmailAdmin(result.email,"MASTER",null,JSON.stringify(result))
            return true
        }
      
    }
} 
