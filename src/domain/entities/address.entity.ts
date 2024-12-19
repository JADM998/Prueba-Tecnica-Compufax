

export class AddressEntity {

    constructor(
        public id: number,
        public cliente_id?: number,
        public calle?: string,
        public ciudad?: string,
        public codigo_postal?: string
    ){}

    public static fromDatabaseRow(object: Record<string, any>): AddressEntity {

        const {id, cliente_id, calle, ciudad, codigo_postal} = object;

        return new AddressEntity(id, cliente_id, calle, ciudad ,codigo_postal);

    }

}