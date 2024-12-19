import { Inject, Injectable } from "@nestjs/common";
import { AddressEntity } from "../../../domain/entities";
import { AddressRepository } from '../../../domain/repositories/address.repository.interface';
import { AppTokens } from "../../common/app-tokens/app-tokens";


@Injectable()
export class GetAllAdressesUseCase {

    constructor(
        @Inject(AppTokens.ADDRESS_REPOSITORY)
        private readonly addressRepository: AddressRepository
    ){}

    public async execute(): Promise<AddressEntity[]> {

        const addresses = await this.addressRepository.getAllAddresses();

        return addresses;
    }


}