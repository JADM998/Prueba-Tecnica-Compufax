import { ApiProperty } from "@nestjs/swagger";
import { IsInt, IsOptional, IsString, Length } from "class-validator";


export class UpdateAddressDTO {
    
    @ApiProperty()
    @IsOptional()
    @IsString({message: "El parámetro calle no contiene un valor string"})
    calle?: string;

    @ApiProperty()
    @IsOptional()
    // Suponiendo que el código postal solo puede estar en México.
    @IsString({message: "El parámetro código_postal debe ser un string"})
    @Length(5, 5)
    codigo_postal?: string;

    @ApiProperty()
    @IsOptional()
    @IsString({message: "El parámetro ciudad no contiene un valor string"})
    ciudad?: string;

}

export class UpdateAddressQueryDto {

    @ApiProperty()
    @IsInt()
    id: number

}