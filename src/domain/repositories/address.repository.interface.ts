import { AddressEntity } from '../entities/address.entity';
import { UpdateAddressDTO } from '../dtos/address.dto';

export interface AddressRepository {
    
    getAllAddresses(): Promise<AddressEntity[]>;
    getAddressById(id: number): Promise<AddressEntity>;
    updateAddress(id: number, updateAddressDTO: UpdateAddressDTO): Promise<void>;

}