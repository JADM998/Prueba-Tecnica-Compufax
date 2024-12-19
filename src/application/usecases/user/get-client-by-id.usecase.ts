import { Inject, Injectable } from "@nestjs/common";
import { AppTokens } from "../../common/app-tokens/app-tokens";
import { ClientRepository } from '../../../domain/repositories/client.repository.interface';


@Injectable()
export class GetClientByIdUseCase {

    constructor(
        @Inject(AppTokens.CLIENT_REPOSITORY)
        private readonly clientRepository: ClientRepository
    ){}

    async execute(id: number) {

        return this.clientRepository.getClientById(id);

    }

}