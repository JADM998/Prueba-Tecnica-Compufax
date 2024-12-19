import { Body, Controller, Get, HttpStatus, Param, ParseIntPipe, Post, Res } from '@nestjs/common';
import { Response } from 'express';
import { CreateClientDTO } from '../../../domain/dtos/clients.dto';
import { GetAllClientsUseCase } from '../../../application/usecases/user/get-all-clientes.usecase';
import { GetClientByIdUseCase } from '../../../application/usecases/user/get-client-by-id.usecase';
import { CreateClientUseCase } from '../../../application/usecases/user/create-client.usecase';

@Controller('clientes')
export class ClientsController {

    constructor(
        private readonly getAllClientsUseCase: GetAllClientsUseCase,
        private readonly getClientByIdUseCase: GetClientByIdUseCase,
        private readonly createClientUseCase: CreateClientUseCase,
    ){}

    @Get("/:id")
    async getClient(@Param("id", ParseIntPipe) id: number){

        const clientWithAddress = await this.getClientByIdUseCase.execute(id);
        const {id : address_id, ...address} = clientWithAddress.address;

        return {
            ...clientWithAddress.client,
            ...address
        };
    }

    @Get()
    async getClients(){
        return await this.getAllClientsUseCase.execute();
    }

    @Post()
    async createClient(@Res() response: Response, @Body() createClientDto: CreateClientDTO){

        this.createClientUseCase.execute(createClientDto)
            .then(() => {
                return response.status(HttpStatus.CREATED)
                    .json({"mensaje": "cliente creado"});
            })

    }

}
