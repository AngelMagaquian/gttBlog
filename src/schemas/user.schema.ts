import { Schema, Prop, SchemaFactory } from "@nestjs/mongoose";

/*
Esquema para los usuarios.
Se va a almacenar:
    *createAt de la fecha de creacion de cuenta.
    *El email siendo el identificador unico para el logueo.
    *Nombre y apellido en campos separados.
    *Contraseña.
    *Foto para el avatar. Es una URL de la API de rick and morty
    *Biografia que es opcional hasta el momento pero con un limite de 255 caracteres.
*/


@Schema({
  timestamps: true,
})

export class User {
  @Prop({
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
  })
  email: string;

  @Prop({
    required: true,
    trim: true,
  })
  name: string;

  @Prop({
    required: true,
    trim: true,
  })
  lastName: string;

  @Prop({
    required: true,
  })
  pass: string;

  @Prop({})
  pic?: string;

  @Prop({ 
    trim: true, 
    maxlength:255,
  })
  bio?: string;
}

export const UserSchema = SchemaFactory.createForClass(User)