import { Injectable } from "@nestjs/common";
import { PlatformPayment } from "../entities/platform-payments.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { UserService } from "src/user/user.service";
import { Repository } from "typeorm";


@Injectable()
export class PlatformsPaymentsService {

    constructor(
        @InjectRepository(PlatformPayment) private repo: Repository<PlatformPayment>,
        private userService:UserService
    ){
    }

    create(){
        
    }
}