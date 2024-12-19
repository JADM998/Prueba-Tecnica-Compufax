import { ApiProperty } from '@nestjs/swagger'
import { IsEmail, IsInt, IsNumber, IsOptional, IsString } from 'class-validator'

export class CreateClientDTO {

    @ApiProperty()
    @IsOptional()
    @IsString({message: "El parámetro nombre no tuvo un valor string"})
    readonly nombre?: string

    @ApiProperty()
    @IsOptional()
    @IsString({message: "El parámetro apellido no tuvo un valor string"})
    readonly apellido?: string

    @ApiProperty()
    @IsOptional()
    @IsNumber({}, {message: "El parámetro edad no tuvo un valor numérico"})
    @IsInt({message: "El parámetro edad no era un entero"})
    readonly edad?: number

    @ApiProperty()
    @IsOptional()
    @IsString({message: "El parámetro email no tuvo un valor string"})
    @IsEmail({}, {message: "El parámetro email no corresponde a un email válido."})
    readonly email: string

}