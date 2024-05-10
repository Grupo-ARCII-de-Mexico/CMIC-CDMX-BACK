import { Module } from '@nestjs/common';
import { PaymentsService } from './payments.service';
import { PaymentsController } from './payments.controller';
import { OpenPayService } from 'src/platformsPayments/services/openpay.service';
import { StripeService } from 'src/platformsPayments/services/stripe.service';

@Module({
  controllers: [PaymentsController],
  providers: [PaymentsService,StripeService]
})
export class PaymentsModule {}
