export interface DatabaseConfig {

    getDatabasePort(): number,
    getDatabaseHost(): string,
    getDatabaseName(): string,
    getDatabaseUser(): string,
    getDatabasePassword(): string

}