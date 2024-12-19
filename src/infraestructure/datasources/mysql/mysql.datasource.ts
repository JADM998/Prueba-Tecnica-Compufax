import { Injectable } from "@nestjs/common";
import { format, Pool, ResultSetHeader, QueryResult } from "mysql2/promise";
import { SqlDatasource, SqlResult, SqlRow } from "../../../domain/datasources/sql.datasource.interface";
import { MySqlService } from "./mysql.service";

@Injectable()
export class MySqlDatasource implements SqlDatasource {
    private mySqlPool: Pool;

    constructor(
        private readonly mySqlService: MySqlService
    ){
        this.mySqlPool = this.mySqlService.getPool();
    }

    format(sqlStatement: string, parameters: unknown[]): string {
        return format(sqlStatement, parameters);
    }


    async executeQuery(sqlStatement): Promise<SqlResult> {

        let rows: QueryResult;
        let fields: unknown;

        try{
            const [rowsTemp, fieldsTemp] = await this.mySqlPool.query(sqlStatement);
            rows = rowsTemp;
            fields= fieldsTemp;
        }catch(error){
            throw error;
        }

        if(this.hasDataToReturn(rows)){
            return {
                data: (rows as unknown) as SqlRow[],
                rowCount: rows.length,
            };
        }else{
            return {
                data: [],
                rowCount: 0,
                affectedRows: (rows as ResultSetHeader).affectedRows
            };
        }
        

    }

    private hasDataToReturn(queryResult: QueryResult){
        return queryResult instanceof Array;
    }

}