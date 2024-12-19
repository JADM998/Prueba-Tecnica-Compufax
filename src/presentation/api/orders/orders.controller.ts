import { Body, Controller, Get, Param, ParseIntPipe, Post } from '@nestjs/common';
import { CreateOrderDTO } from '../../../domain/dtos/orders.dto';
import { GetAllOrdersUseCase } from '../../../application/usecases/order/get-all-orders.usecase';
import { GetOrderByclientIdUseCase } from '../../../application/usecases/order/get-order-by-client-id.usecase';
import { GetOrdersByOrderCodeUseCase } from '../../../application/usecases/order/get-orders-by-order-code.usecase';
import { CreateOrderUseCase } from 'application/usecases/order/create-order.usecase';

@Controller('ordenes')
export class OrdersController {

    constructor(
        private readonly getAllOrdersUseCase: GetAllOrdersUseCase,
        private readonly getOrderByclientIdUseCase: GetOrderByclientIdUseCase,
        private readonly getOrdersByOrderCodeUseCase: GetOrdersByOrderCodeUseCase,
        private readonly createOrderUseCase: CreateOrderUseCase,
    ){}

    @Get()
    async getOrders(){
        return await this.getAllOrdersUseCase.execute();
    }

    @Get("/:id")
    async getOrderByClientId(@Param("id", ParseIntPipe) id: number){
        return await this.getOrderByclientIdUseCase.execute(id);
    }

    @Get("/folio/:folio")
    async getOrderByOrderCode(@Param("folio") orderCode: string){
        return await this.getOrdersByOrderCodeUseCase.execute(orderCode);
    }

    @Post()
    async createOrder(@Body() createOrderDTO: CreateOrderDTO){
        
        return {
            "folio": await this.createOrderUseCase.execute(createOrderDTO)
        };
    }
}
