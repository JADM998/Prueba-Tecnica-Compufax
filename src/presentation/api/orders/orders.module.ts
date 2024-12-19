import { Module } from '@nestjs/common';
import { OrdersController } from './orders.controller';
import { SqlRepositoryModule } from '../../../infraestructure/repositories/sql.repository.module';
import { GetAllOrdersUseCase } from '../../../application/usecases/order/get-all-orders.usecase';
import { GetOrderByclientIdUseCase } from '../../../application/usecases/order/get-order-by-client-id.usecase';
import { GetOrdersByOrderCodeUseCase } from '../../../application/usecases/order/get-orders-by-order-code.usecase';
import { CreateOrderUseCase } from '../../../application/usecases/order/create-order.usecase';

@Module({
  imports: [SqlRepositoryModule],
  providers: [
    GetAllOrdersUseCase,
    GetOrderByclientIdUseCase,
    GetOrdersByOrderCodeUseCase,
    CreateOrderUseCase,
  ],
  controllers: [OrdersController]
})
export class OrdersModule {}
