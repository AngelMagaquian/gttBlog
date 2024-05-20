import { Controller, Get, Post, Patch, Put, Delete, Body, Param,ConflictException,NotFoundException, HttpCode } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto, LogInDto, UpdateUserDto} from 'src/dto/user.dto';
/*
    Ruta de request: http://localhost/users/
*/
@Controller('users')
export class UsersController {
    constructor(private UsersService: UsersService) {}

    @Post('create')
    @HttpCode(201)
    async reateUser(@Body() {email, name, lastName, pass,pic, bio}:CreateUserDto){
        try{
            const hashedPassword = await this.UsersService.hashPassword(pass);
            return this.UsersService.create({email, name, lastName, pass: hashedPassword,pic, bio})
        }catch(error){
            if (error.code === 11000) {
                throw new ConflictException('User already exists');
            }
            throw error;
        }
    }

    @Post('logIn')
    @HttpCode(200)
    async logIn(@Body() {email, pass}:LogInDto){
        
        const result = await this.UsersService.findOne({email})
        if (!result) throw new NotFoundException('User does not exist!')
        
        const passwordMatch = await this.UsersService.verifyPassword(pass, result.pass)
        if (!passwordMatch) throw new NotFoundException('Incorrect password!')

        return result
    }

    @Get('getUserById/:id')
    @HttpCode(200)
    getUserById(@Param('id') id:string){
        
        const result =  this.UsersService.findById(id)
        if (!result) throw new NotFoundException('User does not exist!')
        return result
    }

    /*
        Este end point es mas que todo para poder hacer pruebas y ver los datos de los usuarios
    */
    @Get('all')
    @HttpCode(200)
    getAllUsers(){
        const result= this.UsersService.findAll()
        if (!result) throw new NotFoundException('User does not exist!')
        return result
    }

    @Patch('newBio')
    @HttpCode(200)
    async newBio(@Body() {bio, id} : UpdateUserDto){
        //primero busco el usuario
        const user = await this.UsersService.findById(id)
        if (!user) {throw new NotFoundException('Post not found')}

        // reemplazo el contenido de bio
        user.bio = bio

        const result = await this.UsersService.updateUser(id, user)
        const fullUser = await this.UsersService.findById(result._id.toString())
        return fullUser
    }

    @Patch('newAvatar')
    @HttpCode(200)
    async newAvatar(@Body() {pic, id} : UpdateUserDto){
        //primero busco el usuario
        const user = await this.UsersService.findById(id)
        if (!user) {throw new NotFoundException('Post not found')}

        // reemplazo el contenido de pic
        user.pic = pic

        const result = await this.UsersService.updateUser(id, user)
        const fullUser = await this.UsersService.findById(result._id.toString())
        return fullUser
    }
}
