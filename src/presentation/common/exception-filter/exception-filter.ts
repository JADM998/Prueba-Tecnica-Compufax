import { ExceptionFilter, Catch, ArgumentsHost, HttpException, HttpStatus } from '@nestjs/common';
import { RecordNotFoundError, SqlEmptyUpdate, SqlQueryError, SqlUpdateError } from '../../../application/common/exceptions/app-exceptions';

@Catch()
export class GlobalExceptionFilter implements ExceptionFilter {

    private exceptionMap = new Map<any, Number>([
        [RecordNotFoundError, HttpStatus.NOT_FOUND],
        [SqlEmptyUpdate, HttpStatus.BAD_REQUEST],
        [SqlUpdateError, HttpStatus.INTERNAL_SERVER_ERROR],
        [SqlQueryError, HttpStatus.INTERNAL_SERVER_ERROR],
    ])
    
    fromError(error: Error): HttpException {
        const statusCode = this.exceptionMap.get(error.constructor)?.valueOf() || HttpStatus.INTERNAL_SERVER_ERROR;
        
        return new HttpException(error.message, statusCode);
    }

    catch(exception: any, host: ArgumentsHost) {

        const context = host.switchToHttp();
        const response = context.getResponse();

        if(exception instanceof HttpException){
            return response.status(exception.getStatus()).json({
                message: exception.message
            });
        }
        else if(exception instanceof Error){
            const httpError = this.fromError(exception);
            return response.status(httpError.getStatus()).json({
                message: httpError.message
            });
        }else{
            return response.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
                message: "Internal Server Error"
            });
        }
    }

    
}
