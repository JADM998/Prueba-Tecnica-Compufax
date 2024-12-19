import { Global, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { validate } from './environment-validation';
import { EnvironmentVariablesService } from './enviroment-variables.service';

@Global()
@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
      validate,
    }),
  ],
  providers: [EnvironmentVariablesService],
  exports: [EnvironmentVariablesService],
})
export class EnvironmentConfigModule {}