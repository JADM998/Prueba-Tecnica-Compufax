import { Injectable } from "@nestjs/common";
import { RecordNotFoundError, SqlEmptyUpdate, SqlQueryError, SqlUpdateError } from "./app-exceptions";


@Injectable()
export class AppExceptionsFactory {

    recordNotFoundError(message: string): RecordNotFoundError {
        return new RecordNotFoundError(message);
    }

    sqlEmptyUpdate(message: string): SqlEmptyUpdate {
        return new SqlEmptyUpdate(message);
    }

    sqlQueryError(message: string): SqlQueryError {
        return new SqlQueryError(message);
    }

    sqlUpdateError(message: string): SqlUpdateError {
        return new SqlUpdateError(message);
    }

}