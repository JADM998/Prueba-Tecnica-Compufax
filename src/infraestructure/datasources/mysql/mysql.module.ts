import { Module } from "@nestjs/common";
import { MySqlDatasource } from "./mysql.datasource";
import { MySqlService } from "./mysql.service";
import { AppTokens } from "../../../application/common/app-tokens/app-tokens";

@Module({
    imports: [],
    providers: [
        {provide: AppTokens.SQL_DATASOURCE, useClass: MySqlDatasource},
        MySqlService
    ],
    exports: [AppTokens.SQL_DATASOURCE]
})
export class MySqlModule{}