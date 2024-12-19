import { Inject, Injectable } from "@nestjs/common";
import { AppTokens } from "../../application/common/app-tokens/app-tokens";
import { SqlDatasource } from '../../domain/datasources/sql.datasource.interface';
import { ClientRepository, ClientWithAddress } from '../../domain/repositories/client.repository.interface';
import { AddressEntity, ClientEntity } from "../../domain/entities";
import { CreateClientDTO } from "../../domain/dtos/clients.dto";
import { AppExceptionsFactory } from "../../application/common/exceptions/app-exception-factory";


@Injectable()
export class SqlClientRepository implements ClientRepository{

    constructor(
        @Inject(AppTokens.SQL_DATASOURCE)
        private readonly sqlDatasource: SqlDatasource,
        private readonly appExceptionFactory: AppExceptionsFactory
    ){}
    

    async getAllClients(): Promise<ClientEntity[]> {
        
        const sqlQuery = "SELECT * FROM clientes;";

        const sqlResult = await this.sqlDatasource.executeQuery(sqlQuery);

        return sqlResult.data.map(row => ClientEntity.fromDatabaseRow(row));

    }
    async getClientById(id: number): Promise<ClientWithAddress> {

        const sqlQuery = this.sqlDatasource.format(
            "SELECT c.*, d.id as direccion_id, d.cliente_id, d.calle, d.ciudad, d.codigo_postal" + 
            " FROM clientes c LEFT JOIN direcciones d ON c.id = d.cliente_id WHERE c.id = ?",
            [id]
        )

        const sqlResult = await this.sqlDatasource.executeQuery(sqlQuery);

        if(sqlResult.rowCount === 0){
            throw this.appExceptionFactory.recordNotFoundError(`El record con id: ${id} no fue encontrado`);
        }

        const data = sqlResult.data[0];

        return {
            "address": AddressEntity.fromDatabaseRow({
                id: data.direccion_id,
                ...data
            }),
            "client": ClientEntity.fromDatabaseRow(data),
        };
    }
    
    async createClient(createClientDTO: CreateClientDTO): Promise<void> {
        const sqlQuery = this.sqlDatasource.format(
            "INSERT INTO clientes (nombre, apellido, edad, email, fecha_registro) VALUES (?, ?, ?, ?, ?)",
            [
                createClientDTO.nombre, 
                createClientDTO.apellido, 
                createClientDTO.edad, 
                createClientDTO.email,
                new Date(),
            ]
        );

        const sqlResult = await this.sqlDatasource.executeQuery(sqlQuery);

        if(sqlResult.affectedRows !== 1){
            throw this.appExceptionFactory.sqlQueryError(
                `No se pudo crear el cliente, detalles: \n${createClientDTO}`
            );
        }
    }

}