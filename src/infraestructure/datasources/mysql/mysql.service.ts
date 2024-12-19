import { Injectable } from "@nestjs/common";
import { Pool, createPool } from "mysql2/promise";
import { EnvironmentVariablesService } from '../../configuration/enviroment-variables.service';


@Injectable()
export class MySqlService {

    private pool: Pool | undefined;

    constructor(
        private readonly environmentVariablesService: EnvironmentVariablesService
    ){}

    public getPool(): Pool {

        if(!this.pool){
            this.pool = createPool({
                host: this.environmentVariablesService.getDatabaseHost(),
                port: this.environmentVariablesService.getDatabasePort(),
                user: this.environmentVariablesService.getDatabaseUser(),
                password: this.environmentVariablesService.getDatabasePassword(),
                database: this.environmentVariablesService.getDatabaseName(),
            })
        }

        return this.pool;
    }

}