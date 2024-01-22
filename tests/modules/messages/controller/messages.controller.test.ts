import { MessagesBusiness } from "../../../../src/modules/messages/business/messages.Business";
import { MesssagesController } from "../../../../src/modules/messages/controller/messages.Controller";
import { MessagesBusinessMock } from "../mocks/messages.business.mock";
import { MessagesDatabaseMock, mockMessage } from "../mocks/messages.database.mock";

const messagesBusiness = new MessagesBusinessMock(
  new MessagesDatabaseMock()
) as unknown as MessagesBusiness;

const messagesController = new MesssagesController(messagesBusiness);

const res: any = {
  status: jest.fn().mockReturnThis(),
  send: jest.fn().mockReturnThis(),
};
const req: any = {};

describe("MessagesController: Find method", () => {
  test("Sucess case", async () => {
    req.params = {
      id: "test"
    }
    await messagesController.find(req, res);
    expect(res.status).toBeCalledWith(200);
    expect(res.send).toBeCalledWith({ result: mockMessage });
    expect(messagesBusiness.find).toBeCalledTimes(1);
  });
});

describe("MessagesController: Edit method", () => {
  test("Sucess case", async () => {
    req.body = {
      message: "message",
    };
    req.params = {
      id: "test"
    }
    await messagesController.edit(req, res);
    expect(res.status).toBeCalledWith(200);
    expect(res.send).toBeCalledWith({ message: "Messagem alterada" });
    expect(messagesBusiness.edit).toBeCalledTimes(1);
  });
});
