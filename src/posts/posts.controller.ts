import { Controller, Get, Post, Put, Delete, Body, Param, HttpCode,NotFoundException, Patch} from '@nestjs/common'
import { PostsService } from './posts.service'
import { CreatePostDto, CreateCommentDto, LikePostDto } from 'src/dto/post.dto'
import { WebsocketGateway } from 'src/websocket/websocket.gateway';
/*
    Ruta de request: http://localhost/posts/
*/
@Controller('posts')
export class PostsController{
    constructor(private PostsService: PostsService, private readonly websocketGateway: WebsocketGateway) {}

    @Get(':limit')
    @HttpCode(200)
    async getPosts(@Param('limit') limit: number) {
        const result = await this.PostsService.getPosts(limit);
        if (!result) throw new NotFoundException('Posts do not exist!');
        return result;
    }

    @Get('getPostByUser/:id')
    @HttpCode(200)
    async getPostsByUser(@Param('id') id: string) {
        const result = await this.PostsService.getPostByUser(id);
        if (!result) throw new NotFoundException('Posts do not exist!')
        return result;
    }

    @Post('createPost')
    @HttpCode(201)
    async createPost(@Body() createPostDto: CreatePostDto) {
        const newPost = {
            ...createPostDto,
            comments: [],
            likes: []
        }
        const result = await this.PostsService.create(newPost)
        const fullPost = await this.PostsService.getPostById(result._id.toString())
        this.websocketGateway.notifyNewPost(fullPost)
        if (!result) throw new NotFoundException('Post does not exist!')
        return result
    }

    @Post('addComment')
    @HttpCode(200)
    async addComment(@Body() {postId, content, user} : CreateCommentDto){
        const result = await this.PostsService.addComment({postId, content, user})
        if (!result) throw new NotFoundException('Post does not exist!')
        return result
    }

    @Patch('likePost')
    @HttpCode(200)
    async likePost(@Body() {postId, userId} : LikePostDto){
        //primero busco el post
        const post = await this.PostsService.getPostById(postId)
        if (!post) {throw new NotFoundException('Post not found')}

        const userLikedPost = post.likes.includes(userId)
        if (userLikedPost) {
            // Si el usuario ya le dio like al posteo, se quita su id del array de likes
            post.likes = post.likes.filter((e) => e !== userId);
          } else {
            // Si el usuario no ha dado like al posteo, se agrega su id al array de likes
            post.likes.push(userId);
          }

        const result = await this.PostsService.updatePost(postId, post)
        const fullPost = await this.PostsService.getPostById(result._id.toString())
        this.websocketGateway.notifyPostUpdated(fullPost)
        return fullPost
    }


    @Delete('deletePost/:id')
    @HttpCode(204)
    async deletePost(@Param('id') id: string){
        const result = await this.PostsService.deletePost(id)
        if (!result) throw new NotFoundException('Post does not exist!')
        this.websocketGateway.notifyPostDeleted(id);
        return result
    }
}
