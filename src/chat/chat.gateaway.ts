import {
    SubscribeMessage,
    WebSocketGateway,
    WebSocketServer,
    MessageBody,
    ConnectedSocket
} from '@nestjs/websockets';
import { Logger } from '@nestjs/common';


@WebSocketGateway({
    cors: {
        origin: '*'
    }
})
export class ChatGateaway {

    constructor() {}

    private logger: Logger = new Logger;

    @WebSocketServer()
    server: any;

    @SubscribeMessage('connection')
    public connection() {
        const message = 'Connected to socket'

        this.logger.log(message);
    }

    @SubscribeMessage('sendMessage')
    public sendMessage(@MessageBody() message: string) {

        this.server.emit('message', message);
    }

}