import { Schema, Prop, SchemaFactory } from "@nestjs/mongoose";
import { Types } from "mongoose";

/*
Esquema para los distintos psoteos que realicen los usuarios.
Se va a almacenar:
    *createAt de la fecha de creacion del posteo.
    *La cantidad de likes que van a empezar en 0 por defecto.
    *El usuario que lo creo.
    *El texto del posteo con sus maximos y minimos para evitar almacenar vacios o que superen los 255 caracteres.
    *Los comentarios que son de tipo Comment (del schema de Comment)
*/
@Schema({
    timestamps: true,
})

export class Post {
    @Prop({
        required: true,
        trim: true,
        minlength: 1,
        maxlength: 255,
    })
    content: string;

    @Prop({ default:[] })
    likes: string[];

    @Prop({ type: Types.ObjectId, ref: 'User', select: '_id email name lastName pic bio'  }) //Evito la contraseña del usuario
    user: Types.ObjectId;

    @Prop({ default:[] })
    comments: { _id: Types.ObjectId; content: string; user: Types.ObjectId }[];
}

export const PostSchema = SchemaFactory.createForClass(Post)