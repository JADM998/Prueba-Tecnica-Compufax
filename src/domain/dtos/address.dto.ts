import { ApiProperty } from "@nestjs/swagger";
import { IsInt, IsOptional, IsString, Matches } from "class-validator";


export class UpdateAddressDTO {
    
    @ApiProperty()
    @IsOptional()
    @IsString({message: "El parámetro calle no contiene un valor string"})
    calle?: string;

    @ApiProperty()
    @IsOptional()
    @IsInt({message: "El parámetro codigo_postal no contiene un valor entero"})
    // Suponiendo que el código postal solo puede estar en México.
    @IsString({message: "El parámetro código_postal debe ser un string"})
    @Matches("^\d[1-9]\d{3}$", null, {message: "El parámetro código postal debe contener 5 dígitos y no empezar por 0"})
    
    codigo_postal?: string;

    @ApiProperty()
    @IsOptional()
    @IsString({message: "El parámetro ciudad no contiene un valor string"})
    ciudad?: string;

}