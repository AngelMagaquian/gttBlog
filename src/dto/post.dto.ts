import { IsString, IsNumber, IsArray } from "class-validator";
import { Types } from "mongoose";
/* 
    Interfaz hecha una clase para que sea compatible con class-validator.
    Con el class-validator le doy una capa extra de seguridad con
    la integridad de datos. Muy utiles para recibir la data de las request.
*/
export class CreatePostDto {
    @IsString()
    content: string;

    @IsString()
    user: string;
    
}

export class CreateCommentDto {
    @IsString()
    postId: string;
    
    @IsString()
    content: string;

    @IsString()
    user: string;
}

export class LikePostDto {
    @IsString()
    postId: string;

    @IsString()
    userId: string;
}

export class BioDto {
    @IsString()
    postId: string;

    @IsString()
    userId: string;
}
