import { Inject, Injectable } from "@nestjs/common";
import { AppTokens } from "../../common/app-tokens/app-tokens";
import { OrderRepository } from '../../../domain/repositories/order.repository.interface';

@Injectable()
export class GetOrderByclientIdUseCase {
    
    constructor(
        @Inject(AppTokens.ORDER_REPOSITORY)
        private readonly orderRepository: OrderRepository
    ){}

    public async execute(id: number){

        return await this.orderRepository.getOrdersByClientId(id);

    }

}