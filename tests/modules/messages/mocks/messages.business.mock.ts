import { MessagesRepository } from "../../../../src/modules/messages/business/messages.Repository";
import { EditMessageDTO } from "../../../../src/modules/messages/domain/DTOs/messages.edit.dto";
import { Message } from "../../../../src/modules/messages/domain/messages.Entity";
import {mockMessage} from "./messages.database.mock"

export class MessagesBusinessMock {
    constructor(private messagesDB: MessagesRepository) {}

    public  find = jest.fn( async (): Promise<Message>=> {
      return mockMessage
    })
  
    public  edit = jest.fn( async (input: EditMessageDTO ): Promise<void> =>{ })
}