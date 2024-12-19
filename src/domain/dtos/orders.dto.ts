import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { ArrayMinSize, IsArray, IsInt, IsString, ValidateNested } from "class-validator";

class OrderItem {
    @IsString({message: "producto debe contener una descripción del producto como string"})
    readonly producto: string

    @IsInt({message: "cantidad debe contener la cantidad a ordenar como entero"})
    readonly cantidad: number
}

export class CreateOrderDTO {

    @ApiProperty()
    @IsInt({message: "El parámetro cliente_id no contiene un valor entero"})
    readonly cliente_id: number

    @ApiProperty()
    @IsArray({message: "El parámetro items no es un arreglo de productos a ordenar"})
    @ArrayMinSize(1, {message: "El parámetro items debe conter al menos un objeto"})
    @ValidateNested({each: true})
    @Type(() => OrderItem)
    readonly items: OrderItem[]

}