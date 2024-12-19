import { Inject, Injectable } from "@nestjs/common";
import { UpdateAddressDTO } from '../../../domain/dtos/address.dto';
import { AddressRepository } from '../../../domain/repositories/address.repository.interface';
import { AppTokens } from "./../../common/app-tokens/app-tokens";


@Injectable()
export class UpdateAddressUseCase {

    constructor(
        @Inject(AppTokens.ADDRESS_REPOSITORY)
        private readonly addressRepository: AddressRepository
    ){}

    public async execute(id: number, updateAddressDTO: UpdateAddressDTO) {

        await this.addressRepository.updateAddress(id, updateAddressDTO);

        return await this.addressRepository.getAddressById(id);
    }

}