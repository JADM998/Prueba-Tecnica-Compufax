import { Inject, Injectable } from "@nestjs/common";
import { OrderEntity } from "../../../domain/entities";
import { AppTokens } from '../../common/app-tokens/app-tokens';
import { OrderRepository } from "domain/repositories/order.repository.interface";

@Injectable()
export class GetAllOrdersUseCase {
    
    constructor(
        @Inject(AppTokens.ORDER_REPOSITORY)
        private readonly orderRepository: OrderRepository
    ){}

    public async execute(): Promise<OrderEntity[]> {

        return await this.orderRepository.getAllOrders();

    }

}