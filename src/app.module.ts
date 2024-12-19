import { Module } from '@nestjs/common';
import { EnvironmentConfigModule } from './infraestructure/configuration/enviroment-variables.module';
// import { AddressModule } from './presentation/api/address/address.module';
// import { OrdersModule } from './presentation/api/orders/orders.module';
// import { ClientsModule } from './presentation/api/clients/clients.module';
import { AppExcepionFactoryModule } from './application/common/exceptions/app-exceptions-factory.module';

@Module({
  imports: [
    EnvironmentConfigModule,
    AppExcepionFactoryModule,
    // AddressModule,
    // OrdersModule,
    // ClientsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
