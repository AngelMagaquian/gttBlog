import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from 'src/schemas/user.schema';
import { Model } from 'mongoose';
import { CreateUserDto,LogInDto } from 'src/dto/user.dto';
import * as bcrypt from 'bcryptjs'

@Injectable()
export class UsersService {
    constructor(@InjectModel(User.name) private userModel: Model<User>) {}

    async create( createUser: CreateUserDto){
        try {
            const result = await this.userModel.create(createUser)
            return result
        } catch (error) {
            throw error
        }
    }

    async findOne({email}: LogInDto){
        return await this.userModel.findOne({email}) 
    }

    async findById(id: string) {
        return await this.userModel.findById(id)
    }

    async findAll(){
        return await this.userModel.find()
    }

    async updateUser(userId: string, updatedUser:CreateUserDto){
        return await this.userModel.findByIdAndUpdate(userId, updatedUser)
    }

    async hashPassword(password: string): Promise<string> {
        const saltRounds = 10
        const hashedPassword = await bcrypt.hash(password, saltRounds)
        return hashedPassword
    }

    async verifyPassword(password: string, hashedPassword: string): Promise<boolean> {
        return await bcrypt.compare(password, hashedPassword)
    }
}
