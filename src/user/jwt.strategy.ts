/* eslint-disable prettier/prettier */
import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { User } from './user.entity';
import { UserService } from "./user.service";
import { ConfigService } from "@nestjs/config";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy){

    constructor(
        private userS:UserService,
        private config:ConfigService
    ){

        super({
            secretOrKey:'cmiC_%#@!sds!1313',
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        });

    }

    async validate( payload:{id:number}):Promise<User>{
      
        const {id} = payload;
        const user = await this.userS.getUser(id);
        if(!user || !user.active){
            throw new UnauthorizedException();
        }else{
            return user;
        }

    }



}