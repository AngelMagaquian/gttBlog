import { OnGatewayConnection, OnGatewayDisconnect, WebSocketGateway, WebSocketServer} from "@nestjs/websockets";
import { Server, Socket } from "socket.io";

@WebSocketGateway({ cors: true })
export class WebsocketGateway implements OnGatewayConnection, OnGatewayDisconnect{
    @WebSocketServer()
    server: Server

    handleConnection(client: Socket) {
        console.log('New client connected', client.id);
    }
    
    handleDisconnect(client: Socket) {
        console.log('Client disconnected', client.id);
    }

    notifyNewPost(newPost: any) {
        this.server.emit('newPost', newPost);
    }

    notifyPostDeleted(deletedPost: any) {
        this.server.emit('deletedPost', deletedPost);
    }

    notifyPostUpdated(updatedPost: any) {
        this.server.emit('updatedPost', updatedPost);
    }
}