import { Module } from '@nestjs/common';
import { PostsController } from './posts.controller';
import { PostsService } from './posts.service';
import { PostSchema, Post } from 'src/schemas/post.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { WebsocketGateway } from 'src/websocket/websocket.gateway';
@Module({
  imports: [
    MongooseModule.forFeature([
      { 
        name: Post.name, 
        schema: PostSchema 
      }
  ]),
  ],
  controllers: [PostsController],
  providers: [PostsService, WebsocketGateway]
})
export class PostsModule {}
