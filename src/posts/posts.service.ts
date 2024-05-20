import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Post } from 'src/schemas/post.schema';
import { Model } from 'mongoose';
import { CreatePostDto, CreateCommentDto } from 'src/dto/post.dto'

@Injectable()
export class PostsService {
    constructor(@InjectModel(Post.name)
    private postModel: Model<Post>) {}

    async create( createPost: CreatePostDto){
        return await this.postModel.create(createPost)
    }

    /*
        Obtener los ultimos posteos con un parametro de limite    
    */
    async getPosts(limit: number){
        return await this.postModel.find().sort({ createdAt: -1 }).limit(limit).populate('user')
    }

    async getPostByUser(id: string){
        return await this.postModel.find({user: id}).populate('user').sort({ createdAt: -1 })
    }

    async getPostById(id: string){
        return await this.postModel.findById(id).populate('user')
    }

    async updatePost(postId: string, updatedPost: Post){
        return await this.postModel.findByIdAndUpdate(postId, updatedPost)
    }

    async addComment({postId, content, user}:CreateCommentDto ){
        return await this.postModel.findByIdAndUpdate(postId, { $push: { comments: {user, content} } })
    }

    async deletePost(id:string){
        return this.postModel.findByIdAndDelete(id);
    }
}
