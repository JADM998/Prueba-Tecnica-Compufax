import { Module } from '@nestjs/common';
import { AddressController } from './address.controller';
import { GetAllAdressesUseCase } from '../../../application/usecases/address/get-all-addresses.usecase';
import { UpdateAddressUseCase } from '../../../application/usecases/address/update-address.usecase';
import { SqlRepositoryModule } from '../../../infraestructure/repositories/sql.repository.module';

@Module({
  imports: [SqlRepositoryModule],
  providers: [
    GetAllAdressesUseCase,
    UpdateAddressUseCase,
  ],
  controllers: [AddressController],
})
export class AddressModule {}
