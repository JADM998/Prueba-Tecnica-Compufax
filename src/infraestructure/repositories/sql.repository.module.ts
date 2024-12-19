import { Module } from "@nestjs/common";
import { MySqlModule } from "../datasources/mysql/mysql.module";
import { AppTokens } from "../../application/common/app-tokens/app-tokens";
import { SqlAddressRepository } from "./sql-address.repository";
// import { SqlClientRepository } from "./sql-client.repository";
// import { SqlOrderRepository } from "./sql-orders.repository";


@Module({
    imports:[
        MySqlModule
    ],
    providers:[
        {provide: AppTokens.ADDRESS_REPOSITORY, useClass: SqlAddressRepository},
        // {provide: AppTokens.ORDER_REPOSITORY, useClass: SqlOrderRepository},
        // {provide: AppTokens.CLIENT_REPOSITORY, useClass: SqlClientRepository}
    ],
    exports: [
        AppTokens.ADDRESS_REPOSITORY,
        // AppTokens.ORDER_REPOSITORY,
        // AppTokens.CLIENT_REPOSITORY,
    ]
})
export class SqlRepositoryModule{}