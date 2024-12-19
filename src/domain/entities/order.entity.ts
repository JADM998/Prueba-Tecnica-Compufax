

export class OrderEntity {

    constructor( 
        public id: number,
        public cliente_id?: number,
        public producto?: string,
        public cantidad?: number,
        public fecha_pedido?: Date,
        public folio?: string,
    ){}

    public static fromDatabaseRow(object: Record<string, any>): OrderEntity {

        const {id, cliente_id, producto, cantidad, fecha_pedido, folio} = object;

        return new OrderEntity(id, cliente_id, producto, cantidad, fecha_pedido, folio);

    }

}