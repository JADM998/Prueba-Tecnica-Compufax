import { Global, Module } from "@nestjs/common";
import { AppExceptionsFactory } from "./app-exception-factory";


@Global()
@Module({
    providers: [AppExceptionsFactory],
    exports: [AppExceptionsFactory],
})
export class AppExcepionFactoryModule {}