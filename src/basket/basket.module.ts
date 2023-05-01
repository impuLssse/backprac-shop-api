import { Module } from '@nestjs/common';
import { BasketService } from './basket.service';
import { BasketController } from './basket.controller';
import { DatabaseModule } from 'src/database/database.module';
import { BasketRepository } from './basket.repository';

@Module({
  imports: [DatabaseModule],
  controllers: [BasketController],
  providers: [BasketService, BasketRepository],
  exports: [BasketRepository]
})
export class BasketModule {}
