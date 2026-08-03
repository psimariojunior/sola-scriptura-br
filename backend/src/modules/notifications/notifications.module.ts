import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NotificationsController } from './presentation/notifications.controller';
import { NotificationsService } from './application/notifications.service';
import { PushSubscription } from './domain/push-subscription.entity';

@Module({
  imports: [TypeOrmModule.forFeature([PushSubscription])],
  controllers: [NotificationsController],
  providers: [NotificationsService],
  exports: [NotificationsService],
})
export class NotificationsModule {}
