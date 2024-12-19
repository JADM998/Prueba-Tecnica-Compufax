import { Inject, Injectable } from "@nestjs/common";
import { AddressRepository } from '../../domain/repositories/address.repository.interface';
import { UpdateAddressDTO } from '../../domain/dtos/address.dto';
import { AddressEntity } from '../../domain/entities/address.entity';
import { AppTokens } from "../../application/common/app-tokens/app-tokens";
import { SqlDatasource } from "../../domain/datasources/sql.datasource.interface";
import { AppExceptionsFactory } from '../../application/common/exceptions/app-exception-factory';

@Injectable()
export class SqlAddressRepository implements AddressRepository {

    constructor(
        @Inject(AppTokens.SQL_DATASOURCE)
        private readonly sqlDatasource: SqlDatasource,
        private readonly appExceptionsFactory: AppExceptionsFactory
    ){}

    async getAllAddresses(): Promise<AddressEntity[]> {

        const sqlResult = await this.sqlDatasource.executeQuery(
            `
                SELECT * FROM direcciones;
            `
        )

        return sqlResult.data.map(client => {
            return AddressEntity.fromDatabaseRow(client);
        });
    }

    async getAddressById(id: number): Promise<AddressEntity>{

        const sqlQuery = this.sqlDatasource.format(
            "SELECT * FROM direcciones WHERE id = ?",
            [id]
        );
        const sqlResult = await this.sqlDatasource.executeQuery(sqlQuery);

        if(sqlResult.rowCount === 0){
            throw this.appExceptionsFactory.recordNotFoundError(
                `El record con id: ${id} no fue encontraod`
            );
        }


        return AddressEntity.fromDatabaseRow(sqlResult.data[0]);
    }

    async updateAddress(id: number, updateAddressDTO: UpdateAddressDTO): Promise<void> {
        
        if(Object.values(updateAddressDTO).every(value => value === undefined)){
            throw this.appExceptionsFactory.sqlEmptyUpdate(
                `No se puede actualizar con datos vacios, datos recibidos: ${updateAddressDTO}`
            )
        };

        const sqlQuery = this.sqlDatasource.format(
                "UPDATE direcciones SET ? WHERE id = ?;",
            [updateAddressDTO, id]
        )

        const sqlResult = await this.sqlDatasource.executeQuery(sqlQuery);

        if(sqlResult.affectedRows !== 1){
            throw this.appExceptionsFactory.sqlUpdateError(
                `No se pudo actualizar la dirección con id: ${id}`
            );
        }
    }

}