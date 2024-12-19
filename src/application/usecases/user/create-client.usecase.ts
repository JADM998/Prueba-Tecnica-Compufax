import { Inject, Injectable } from "@nestjs/common";
import { AppTokens } from "../../common/app-tokens/app-tokens";
import { ClientRepository } from '../../../domain/repositories/client.repository.interface';
import { CreateClientDTO } from '../../../domain/dtos/clients.dto';


@Injectable()
export class CreateClientUseCase {

    constructor(
        @Inject(AppTokens.CLIENT_REPOSITORY)
        private readonly clientRepository: ClientRepository,
    ){}

    async execute(createClientDTO: CreateClientDTO) {

        return this.clientRepository.createClient(createClientDTO);

    }
}