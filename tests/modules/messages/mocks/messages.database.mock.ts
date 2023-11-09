import { MessagesRepository } from "../../../../src/modules/messages/business/messages.Repository";
import { Message } from "../../../../src/modules/messages/domain/messages.Entity";

export const mockMessage = Message.toModel ({
    message: "message"
})


export class MessagesDatabaseMock implements MessagesRepository  {
    public find = jest.fn( async (id: string): Promise<Message>  =>{
        return mockMessage
    })

    public edit = jest.fn( async(id: string, message: Message): Promise<void>  => {
    })
    
}