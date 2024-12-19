export class RecordNotFoundError extends Error {
    constructor(message: string){
        super(message);
    }
}

export class SqlEmptyUpdate extends Error {
    constructor(message: string) {
        super(message)
    }
}

export class SqlQueryError extends Error {
    constructor(message: string){
        super(message);
    }
}

export class SqlUpdateError extends Error {
    constructor(message: string){
        super(message);
    }
}