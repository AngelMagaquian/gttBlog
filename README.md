# App server

Este proyecto pretende ser un blog con temática de Rick and Morty, cumpliendo con los requerimientos de la prueba técnica tanto a nivel tecnológico como con un poco de mi estilo.

### Teconologias empleadas:
* NestJs.
* TypeScript.
* MongoDb.
* WebSocket.
* Bcryptjs.

# Set up

El proyecto corre en el puerto por defecto de NestJS `localhost://3000`. Es importante respetar este detalle ya que la API del lado del cliente esta configurada para esa URL.

### Requisitos Previos
- Node.js
- npm

### Instalación

1. Clonar el repositorio:
    ```sh
    git clone https://github.com/AngelMagaquian/gttBlogApi
    ```
2. Navegar al directorio del proyecto:
    ```sh
    cd gttBlogApi
    ```
3. Instalar las dependencias:
    ```sh
    npm install
    ```

### Ejecución
1. Ejecutar el comando para iniciar el servidor de desarrollo:
    ```sh
    npm run start:dev
    ```

## Organización

- Se divide en dos modulos principales con sus respectivos services y controllers: `users` y `posts`, sumado al modulo de `websocket`.
- En la carpeta `schemas` se encuentran los esquemas para las colecciones de usuarios y posteos con los requerimientos para cada campo.
- En la carpeta `dto` se encuentran los dto de user y post con sus interfaces basadas en clases para el uso de los decorators de class-validator.
- El archivo `main` ya cuenta con la autorización de CORS.
- La base de datos es una local de mongoDb importada en `app.module.ts` `mongodb://localhost/blogDb`


Se pueden realizar pruebas con Postman o cualquier programa similar con los siguientes enrutamientos:
- `http://localhost:3000/users/`
- - `create` con el metodo `POST` JSON de ejemplo 
    ````
    {
        "name":"Rick",
        "lastName": "Sanchez",
        "email": "ricksanchez@gmail.com",
        "pass": "Rick&MortyC137",
        "pic": "",
        "bio": ""
    }
    ````
- - `logIn` con el metodo `POST` JSON de ejemplo 
    ````
    {
        "email": "ricksanchez@gmail.com",
        "pass": "Rick&MortyC137"
    }
    ````
- `http://localhost:3000/posts/`
- - `:limit` con el metodo `GET` donde limit es un número para obtener los ultimos posteos.
- - `getPostByUser/:id` con el metodo `GET` donde :id es referente a un usuario para traer todas sus publicaciones.
- - `createPost`con el metodo `POST` JSON de ejemplo
    ````
    {
        "content":"¡Wubba lubba dub dub!",
        "user":<idDeUsuario>
    }
    ````

