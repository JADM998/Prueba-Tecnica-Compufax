import { Body, Controller, Get, Param, ParseIntPipe, Post } from '@nestjs/common';
import { UpdateAddressDTO } from '../../../domain/dtos/address.dto';
import { GetAllAdressesUseCase } from '../../../application/usecases/address/get-all-addresses.usecase';
import { UpdateAddressUseCase } from '../../../application/usecases/address/update-address.usecase';

@Controller('direcciones')
export class AddressController {

    constructor(
        private readonly getAllAdressesUseCase: GetAllAdressesUseCase,
        private readonly updateAddressUseCase: UpdateAddressUseCase,
    ){}

    @Get()
    async getAddresses(){

        return await this.getAllAdressesUseCase.execute();

    }

    @Post("/:id")
    async updateAddress( @Param("id", ParseIntPipe) id: number, @Body() updateAddressDto: UpdateAddressDTO ){
     
        return {
            "message": "Dirección actualizada correctamente",
            "data": await this.updateAddressUseCase.execute(id, updateAddressDto),
        };
        
    }

}
