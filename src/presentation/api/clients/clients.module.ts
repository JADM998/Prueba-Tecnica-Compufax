import { Module } from "@nestjs/common";
import { ClientsController } from './clients.controller';
import { SqlRepositoryModule } from "../../../infraestructure/repositories/sql.repository.module";
import { GetAllClientsUseCase } from "../../../application/usecases/user/get-all-clientes.usecase";
import { GetClientByIdUseCase } from "../../../application/usecases/user/get-client-by-id.usecase";
import { CreateClientUseCase } from "../../../application/usecases/user/create-client.usecase";


@Module({
    imports: [
        SqlRepositoryModule,
    ],
    controllers: [ClientsController],
    providers: [
        GetAllClientsUseCase,
        GetClientByIdUseCase,
        CreateClientUseCase,
    ]
})
export class ClientsModule {}
