import { IsString, IsOptional, IsEmail } from "class-validator";
/* 
    Interfaz hecha una clase para que sea compatible con class-validator.
    Con el class-validator le doy una capa extra de seguridad con
    la integridad de datos. Muy utiles para recibir la data de las request.
*/
export class CreateUserDto{
    @IsEmail()
    email:string;

    @IsString()
    name: string;

    @IsString()
    lastName: string;

    @IsString()
    pass: string;

    @IsString()
    @IsOptional()
    pic?:string;

    @IsString()
    @IsOptional()
    bio?:string;
}

export class LogInDto{
    @IsEmail()
    email:string;

    @IsString()
    pass?: string;
}


export class UpdateUserDto{
    @IsString()
    @IsOptional()
    pic?:string;

    @IsString()
    @IsOptional()
    bio?:string;

    @IsString()
    id: string;
}