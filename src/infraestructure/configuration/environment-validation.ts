import { plainToClass } from "class-transformer";
import { IsNumber, IsOptional, IsString, validateSync } from "class-validator";


class EnvironmentVariables {

    @IsNumber()
    PORT: number

    @IsNumber()
    DATABASE_PORT: number

    @IsString()
    DATABASE_HOST: string

    @IsString()
    DATABASE_NAME: string

    @IsString()
    DATABASE_USER: string

    @IsOptional()
    @IsString()
    DATABASE_PASSWORD: string | undefined

}

export function validate(config: Record<string, unknown>) {
    const validatedConfig = plainToClass(EnvironmentVariables, config, {
        enableImplicitConversion: true,
    });
    const errors = validateSync(validatedConfig, { skipMissingProperties: false });

    if (errors.length > 0) {
        throw new Error(errors.toString());
    }
    return validatedConfig;
}