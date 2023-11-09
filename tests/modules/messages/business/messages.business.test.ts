import { MessagesBusiness } from "../../../../src/modules/messages/business/messages.Business";
import { Message } from "../../../../src/modules/messages/domain/messages.Entity";
import { MessagesDatabaseMock } from "../mocks/messages.database.mock";

const messagesDB = new MessagesDatabaseMock();
const messagesBusiness = new MessagesBusiness(messagesDB);

describe("MessagesBusiness: Find method", () => {
  test("Sucess case", async () => {
    const input = {id:"studentMessages"} 
    const result = await messagesBusiness.find(input);
    expect(result).toBeInstanceOf(Message);
    expect(messagesDB.find).toBeCalledTimes(1);
  });
});

describe("MessagesBusiness: Edit method", () => {
  test("Sucess case", async () => {
    const input = {
      id:"studentMessages",
      message: "message"
    };
    await messagesBusiness.edit(input);
    const message = Message.toModel(input);
    expect(messagesDB.edit).toBeCalledWith(input.id, message);
  });

  test("Sucess case: optional string", async () => {
    const input = {
      id:"studentMessages",
      message: null as unknown as string
    };

    await messagesBusiness.edit(input);
    const message = Message.toModel(input);
    expect(messagesDB.edit).toBeCalledWith(input.id, {content: ""} );
  });
});
