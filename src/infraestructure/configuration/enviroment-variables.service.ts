import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { DatabaseConfig } from './database-config.interface';


@Injectable()
export class EnvironmentVariablesService implements DatabaseConfig {

    constructor(
        private readonly configService: ConfigService
    ){}

    getPort(): number {
        return this.configService.get<number>("PORT", 3000);
    }

    getDatabasePort(): number {
        return this.configService.get<number>("DATABASE_PORT", 3306);
    }
    getDatabaseHost(): string {
        return this.configService.get<string>("DATABASE_HOST", "localhost");
    }
    getDatabaseName(): string {
        return this.configService.get<string>("DATABASE_NAME", "mysql")
    }
    getDatabaseUser(): string {
        return this.configService.get<string>("DATABASE_", "root")
    }
    getDatabasePassword(): string | undefined {
        return this.configService.get<string>("DATABASE_");
    }

}