
export type SqlRow = Record<string, unknown>

export type SqlResult = {
    data: SqlRow[]
    rowCount: number,
    affectedRows?: number,
};

export interface SqlDatasource {

    format(sqlStatement: string, parameters: unknown[]): string;
    executeQuery(sqlStatement: string): Promise<SqlResult>;

}