import { Inject, Injectable } from "@nestjs/common";
import { AppTokens } from "../../../application/common/app-tokens/app-tokens";
import { OrderRepository } from '../../../domain/repositories/order.repository.interface';
import { CreateOrderDTO } from '../../../domain/dtos/orders.dto';


@Injectable()
export class CreateOrderUseCase {

    constructor(
        @Inject(AppTokens.ORDER_REPOSITORY)
        private readonly orderRepository: OrderRepository
    ){}

    public async execute(createOrderDTO: CreateOrderDTO) {

        return await this.orderRepository.createOrder(createOrderDTO);

    }

}