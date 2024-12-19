import { ClientEntity } from '../entities/client.entity';
import { AddressEntity } from '../entities/address.entity';
import { CreateClientDTO } from '..//dtos/clients.dto';

export interface ClientWithAddress {
    client: ClientEntity,
    address: AddressEntity
}

export interface ClientRepository {

    getAllClients(): Promise<ClientEntity[]>;
    getClientById(id: number): Promise<ClientWithAddress>;
    createClient(createClientDTO: CreateClientDTO): Promise<void>;

}