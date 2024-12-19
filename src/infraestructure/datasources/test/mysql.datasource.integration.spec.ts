import { Test } from '@nestjs/testing';
import { MySqlDatasource } from '../mysql/mysql.datasource';
import { MySqlModule } from "../mysql/mysql.module";
import { AppTokens } from '../../../application/common/app-tokens/app-tokens';
import { EnvironmentConfigModule } from '../../configuration/enviroment-variables.module';

describe("MySqlDatasource integration test", () => {

    let datasource: MySqlDatasource;

    beforeAll(async () => {
        const testingModule = await Test.createTestingModule({
            imports: [MySqlModule, EnvironmentConfigModule]
        }).compile();

        datasource = testingModule.get<MySqlDatasource>(AppTokens.SQL_DATASOURCE);
    })

    test("Test simple query", async () =>{

        const result = await datasource.executeQuery("SELECT now() as time;");

        expect(result.data).toBeInstanceOf(Array);
        expect(result.data[0]).toEqual(expect.objectContaining({
            time: expect.any(Date)
        }));

    })

})