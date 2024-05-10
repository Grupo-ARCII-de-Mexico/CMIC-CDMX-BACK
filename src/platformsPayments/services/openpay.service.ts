import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from "@nestjs/common";
import * as Openpay from 'openpay'
import { PlatformPaymentType } from "../enums/plaform.payment";
import { User } from "src/user/user.entity";
@Injectable()
export class OpenPayService {
	private OpenpayClient: Openpay;

	constructor(
	) {
		this.OpenpayClient = new Openpay('m9gebq2wqqu5hsrszs2f', 'sk_36e858d86071401587e36fa71993a0d2')
	}

	async createUser(user: Partial<User>) {
		try {
			const Customer = {
				'name': user.names,
				'last_name': user.lastname,
				'email': user.email,
				'requires_account': false
			};
			let openPayCustomer: any = await new Promise((resolve,reject) =>
				this.OpenpayClient.customers.create(Customer, (error, customer) => {
					if (error) {
						reject(error)
					}
					resolve(customer)
				}));

			return { customerId: openPayCustomer.id, type: PlatformPaymentType.OPENPAY };

		} catch (error) {
			console.error('Error al hacer la devolución en Openpay:', error);
			throw new InternalServerErrorException("Internal Server Error")
		}
	}
	async getUser(customerId: string) {
		try {
			const OpenpayUser = await new Promise((resolve, reject) =>
				this.OpenpayClient.customers.get(customerId, (error, customer) => {
					if (error) {
						reject (error)
					}
					resolve(customer)
				}));
			return OpenpayUser;
		} catch (error) {
			console.error('Error al hacer la devolución en Openpay:', error);
			if(error.http_code ===404){
				throw new NotFoundException("User Not Found")
			}
			throw new InternalServerErrorException("Internal Server Error")
		}
	}

	async deleteUser(customerId: string) {
		try {
			const result = await new Promise ( (resolve) => 
			 this.OpenpayClient.customers.delete(customerId, (res) => resolve(res))
			);
			return {ok:true}
		} catch (error) {
			console.error('Error al hacer la devolución en Openpay:', error);
			throw new InternalServerErrorException("Internal Server Error")
		}
	}

	async saveCard(customerId: string,card:OpenPayCard) {
		try {
			const cardSaved: any  = await new Promise( (resolve,reject) =>
			this.OpenpayClient.customers.cards.create(customerId,card,(error,card) => {
				if(error){
					reject(error)
				}
				resolve(card)
			}));
			return cardSaved.id;
		} catch (error) {
			console.error('Error al hacer la devolución en Openpay:', error);
			throw new InternalServerErrorException("Internal Server Error");
		}
	}


	async getCard(customerId:string,cardId:string){
		try {
			const cardSaved: any  = await new Promise( (resolve,reject) =>
			this.OpenpayClient.customers.cards.get(customerId,cardId,(error,card) => {
				if(error){
					reject(error)
				}
				resolve(card)
			}));
			return cardSaved;
		} catch (error) {
			console.error('Error al hacer la devolución en Openpay:', error);
			throw new InternalServerErrorException("Internal Server Error");
		}
	}
	async getUserCards(customerId:string){
		try {
			const cardsSaved: any  = await new Promise( (resolve,reject) =>
			this.OpenpayClient.customers.cards.list(customerId,{limit:3},(error,card) => {
				if(error){
					reject(error)
				}
				resolve(card)
			}));
			return cardsSaved;
		} catch (error) {
			console.error('Error al hacer la devolución en Openpay:', error);
			throw new InternalServerErrorException("Internal Server Error");
		}
	}

	async createPayment(customerId:string, chargeRequest:OpenPayChargeRequest){
		try {
			if(!chargeRequest.method){
				chargeRequest.method = OpenPayMethodsPays.CARD;
			}
			if(!chargeRequest.currency){
				chargeRequest.currency = OpenPayMonedaCambio.MEXICO;
			}
			const cardsSaved: any  = await new Promise( (resolve,reject) =>
			this.OpenpayClient.customers.charges.create(customerId,chargeRequest,(error,charge) => {
				if(error){
					reject(error)
				}
				resolve(charge)
			}));
			return cardsSaved;
		} catch (error) {
			console.error('Error al hacer la devolución en Openpay:', error);
			throw new InternalServerErrorException("Internal Server Error");
		}
	}

	async refound(customerId:string, transactionId:string,RefundRequest:OpenPayRefundRequest){
		try {
			const refound: any  = await new Promise( (resolve,reject) =>
			this.OpenpayClient.customers.charges.refund(customerId,transactionId,RefundRequest,(error,charge) => {
				if(error){
					reject(error)
				}
				resolve(charge)
			}));
			return refound;
		} catch (error) {
			console.error('Error al hacer la devolución en Openpay:', error);
			throw new InternalServerErrorException("Internal Server Error");
		}
	}


}


export interface OpenPayCard {
	token_id:string;

	device_session:string;
}

export interface OpenPayChargeRequest {
	source_id? : string,
	method : string,
	amount? : number,
	currency? : string,
	description : string,
	order_id : string,
	device_session_id :string,
	customer? : any
}

export enum OpenPayMethodsPays{
	CARD = 'card',
	STORE = 'store',
	BANK = 'bank_account'
}

export enum OpenPayMonedaCambio {
	MEXICO = 'MXN',
	USA = 'usd',
	EUROPA = 'euro'
}

export interface OpenPayRefundRequest {
	description : string,
	amount : number
 };
