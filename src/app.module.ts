import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PostsModule } from './posts/posts.module';

import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from './users/users.module';
import { GatewayModule } from './websocket/websocket.module';
@Module({
  imports: [
    PostsModule,
    MongooseModule.forRoot('mongodb://localhost/blogDb'),
    UsersModule,
    GatewayModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
