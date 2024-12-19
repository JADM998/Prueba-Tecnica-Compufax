import { Body, Controller, Get, ParseIntPipe, Post, Query } from '@nestjs/common';
import { UpdateAddressDTO, UpdateAddressQueryDto } from '../../../domain/dtos/address.dto';
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

    @Post()
    async updateAddress( 
        @Query() updateAddressQueryDto: UpdateAddressQueryDto,
        @Body() updateAddressDto: UpdateAddressDTO 
    ){
     
        return {
            "message": "Dirección actualizada correctamente",
            "data": await this.updateAddressUseCase.execute(
                updateAddressQueryDto.id,
                updateAddressDto
            ),
        };
        
    }

}
