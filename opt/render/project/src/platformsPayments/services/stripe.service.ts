import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import {Stripe as StripeSDK} from 'stripe';
import { User } from 'src/user/user.entity';
import { PlatformPaymentType } from '../enums/plaform.payment';
@Injectable()
export class StripeService {
  private stripeClient: StripeSDK;
  constructor(
  ){
    this.stripeClient = new StripeSDK(process.env.STRIPE,{
      apiVersion: '2023-08-16', // Usa la última versión de la API de Stripe
    });
  }//


  async createUser(user:Partial<User>){
    try {
      const userStripe = await this.stripeClient.customers.create({email:user.email,name:user.names + ' ' +user.lastname});
      return {customerId:userStripe.id, type:PlatformPaymentType.STRIPE};
    } catch (error) {
      console.error('Error al hacer la devolución en Stripe:', error);
      throw new InternalServerErrorException("Internal Server Error")
    }
  }
  async getUser(customerId:string){
    try {
      const stripeUser = await this.stripeClient.customers.retrieve(customerId)
      return stripeUser;
    } catch (error) {
      console.error('Error al hacer la devolución en Stripe:', error);
      throw new InternalServerErrorException("Internal Server Error")
    }
  }

  async deleteUser(customerId:string){
    try {
      await this.stripeClient.customers.del(customerId);
      return true
    } catch (error) {
      console.error('Error al hacer la devolución en Stripe:', error);
      throw new InternalServerErrorException("Internal Server Error")
    }
  }


  async AddCard(customerId:string,token:string){
    const paymentMethod = await this.stripeClient.paymentMethods.create({
      type: 'card',
      card: {
        token,
      },
    });
  
    await this.stripeClient.paymentMethods.attach(paymentMethod.id, { customer: customerId });
  
    return true;
  }

  async deleteCard(customerId:string, cardId:string){
    try {
      await this.stripeClient.customers.deleteSource(customerId, cardId);
      return true;
    } catch (error) {
      console.error('Error al hacer la devolución en Stripe:', error);
      throw new InternalServerErrorException("Internal Server Error")
    }
  }

  async payment(token:string,folio:string){
  
    try {
      const paymentIntent = await this.stripeClient.paymentMethods.create({
        type: 'card',
        payment_method:token
      });
      
      return paymentIntent.id;
    } catch (error) {
      console.error('Error al hacer el proceso de pago en Stripe:', error);
      throw new InternalServerErrorException("Internal Server Error")
    }
  }

  async getCards(customerId:string){
 
    try {
      const cards = await this.stripeClient.paymentMethods.list({customer:customerId,type:'card'});
      return cards.data;
    } catch (error) {
      console.error('Error al hacer la devolución en Stripe:', error);
      throw new InternalServerErrorException("Internal Server Error")
    }
  }

  async refound(idPayment:string, amount:number,currency:string = process.env.CURRENCY){
    try {
      const refund = await this.stripeClient.refunds.create({
        amount,
        currency,
        payment_intent:idPayment,
      });
      return refund;
    } catch (error) {
      console.error('Error al hacer la devolución en Stripe:', error);
      throw new InternalServerErrorException("Internal Server Error")
    }
  }


  async generatePaymentIntent(token:string,amount:number,folio:string){
    const respPaymentIntent = await this.stripeClient.charges.create({
        amount,
        currency: 'MXN',
        source:token,
       description: `CMIC PAGO Folio: ${folio}`
    })
  
    return respPaymentIntent;
}

  async setDescriptionPayment(idPayment:string,folio:string){
     await this.stripeClient.paymentIntents.update(idPayment, {
      description: `CMIC PAGO Folio: ${folio}`
    });
    return true
  }

  async getPayment(idPayment:string) {
    try {
      const pago = await this.stripeClient.charges.retrieve(idPayment);

      return pago;
    } catch (error) {
      console.error('Error al obtener el pago de Stripe:');
      return null;
    }
  }


}
