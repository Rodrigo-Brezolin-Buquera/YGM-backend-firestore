export class Message {
  constructor(
    private content: string,
  ) {}

  public getContent(): string {
    return this.content;
  }

  public setContent(message: string): void {
    this.content = message;
  }

  public static toModel(obj: MessageObject): Message {
    return new Message(
      obj.message
    );
  }
}

export interface MessageObject {
  message: string;
 
}




