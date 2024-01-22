import { Message } from "../domain/messages.Entity";

export interface MessagesRepository {
  find(id:string): Promise<Message>;
  edit(id:string, message: Message): Promise<void>;
}
