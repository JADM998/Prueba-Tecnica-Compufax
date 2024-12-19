import { Inject, Injectable } from "@nestjs/common";
import { OrderRepository } from "../../domain/repositories/order.repository.interface";
import { CreateOrderDTO } from "../../domain/dtos/orders.dto";
import { OrderEntity } from "../../domain/entities";
import { SqlDatasource } from "../../domain/datasources/sql.datasource.interface";
import { AppTokens } from "../../application/common/app-tokens/app-tokens";
import { AppExceptionsFactory } from '../../application/common/exceptions/app-exception-factory';


@Injectable()
export class SqlOrderRepository implements OrderRepository {

    constructor(
        @Inject(AppTokens.SQL_DATASOURCE)
        private readonly sqlDatasource: SqlDatasource,
        private readonly appExceptionsFactory: AppExceptionsFactory
    ){}
    
    async getAllOrders(): Promise<OrderEntity[]> {
        
        const sqlResult = await this.sqlDatasource.executeQuery(
            "SELECT * FROM ordenes;"
        )

        return sqlResult.data.map(order => OrderEntity.fromDatabaseRow(order));
    }
    async getOrdersByClientId(client_id: number): Promise<OrderEntity[]> {
        
        const sqlQuery = this.sqlDatasource.format(
            "SELECT * FROM ordenes WHERE cliente_id = ?", [client_id]
        );

        const sqlResult = await this.sqlDatasource.executeQuery(sqlQuery);

        if(sqlResult.rowCount === 0){
            throw this.appExceptionsFactory.recordNotFoundError(
                `No se encontró una orden con cliente_id: ${client_id}`
            );
        }

        return sqlResult.data.map(row => OrderEntity.fromDatabaseRow(row));
    }
    async getOrderByOrderCode(orderCode: string): Promise<OrderEntity[]> {
        
        const sqlQuery = this.sqlDatasource.format(
            "SELECT * from ordenes WHERE folio = ?", [orderCode]
        );

        const sqlResult = await this.sqlDatasource.executeQuery(sqlQuery);

        if(sqlResult.rowCount === 0){
            throw this.appExceptionsFactory.recordNotFoundError(
                `No se encontró una orden con folio: ${orderCode}`
            );
        }

        return sqlResult.data.map(row => OrderEntity.fromDatabaseRow(row));

    }
    async createOrder(createOrderDTO: CreateOrderDTO): Promise<string> {
        const currentDate = new Date();
        const orderCode = "TEST" + Math.random().toString(36).substring(2, 5).toUpperCase();

        const sqlQuery = this.sqlDatasource.format(
            "INSERT INTO ordenes (cliente_id, producto, cantidad, fecha_pedido, folio) VALUES ?",
            [
                createOrderDTO.items.map((item) => {
                    return [
                        createOrderDTO.cliente_id,
                        item.producto,
                        item.cantidad,
                        currentDate,
                        orderCode,
                    ]}
                )
            ]
        )

        const sqlResult = await this.sqlDatasource.executeQuery(sqlQuery);

        if(sqlResult.affectedRows === 0){
            throw this.appExceptionsFactory.sqlQueryError(
                `No se pudo insertar la orden`
            );
        }

        return orderCode;

    }


}