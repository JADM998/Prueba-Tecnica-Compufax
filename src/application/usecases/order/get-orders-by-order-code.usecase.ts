import { Inject, Injectable } from "@nestjs/common";
import { AppTokens } from "../../common/app-tokens/app-tokens";
import { OrderEntity } from "../../../domain/entities";
import { OrderRepository } from "../../../domain/repositories/order.repository.interface";


@Injectable()
export class GetOrdersByOrderCodeUseCase {

    constructor(
        @Inject(AppTokens.ORDER_REPOSITORY)
        private readonly orderRepository: OrderRepository
    ){}

    public async execute(orderCode: string): Promise<OrderEntity[]>{
        return await this.orderRepository.getOrderByOrderCode(orderCode);
    }

}