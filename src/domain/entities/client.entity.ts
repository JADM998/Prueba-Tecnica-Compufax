

export class ClientEntity {

    constructor(
        public id: number,
        public nombre?: string,
        public apellido?: string,
        public email?: string,
        public edad?: number,
        public fecha_registro?: Date,
    ) {}

    public static fromDatabaseRow(object: Record<string, any>): ClientEntity {

        const {id, nombre, apellido, email, edad, fecha_registro} = object;

        return new ClientEntity(id, nombre, apellido, email, edad, fecha_registro);

    }
}