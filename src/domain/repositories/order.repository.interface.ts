import { OrderEntity } from '../entities/order.entity';
import { CreateOrderDTO } from '../dtos/orders.dto';
export interface OrderRepository {

    getAllOrders(): Promise<OrderEntity[]>;
    getOrdersByClientId(client_id: number): Promise<OrderEntity[]>;
    getOrderByOrderCode(orderCode: string): Promise<OrderEntity[]>
    createOrder(createOrderDTO: CreateOrderDTO): Promise<string>

}