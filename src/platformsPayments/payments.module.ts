import { Module } from '@nestjs/common';
import { StripeService } from './services/stripe.service';
import { UserModule } from 'src/user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PlatformPayment } from './entities/platform-payments.entity';
@Module({
  imports:[
    TypeOrmModule.forFeature([
      PlatformPayment
    ]),
    UserModule],
  providers: [StripeService],
  exports:[StripeService]
})
export class PaymentsModule {}
