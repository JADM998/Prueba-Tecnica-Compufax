import { Inject, Injectable } from "@nestjs/common";
import { AppTokens } from "../../common/app-tokens/app-tokens";
import { ClientRepository } from '../../../domain/repositories/client.repository.interface';


@Injectable()
export class GetAllClientsUseCase {

    constructor(
        @Inject(AppTokens.CLIENT_REPOSITORY)
        private readonly clientRepository: ClientRepository
    ){}

    async execute(){
        return await this.clientRepository.getAllClients();
    }

}