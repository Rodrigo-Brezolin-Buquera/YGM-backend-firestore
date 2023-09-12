import { BookingBusiness } from "../../../../src/modules/booking/business/booking.Business";
import { BookingController } from "../../../../src/modules/booking/controller/booking.Controller";
import { BookingBusinessMock } from "../mocks/bookin.business.mock";
import { BookingDatabaseMock } from "../mocks/booking.database.mock";

const bookingBusiness = new BookingBusinessMock(
  new BookingDatabaseMock()
) as unknown as BookingBusiness;

const bookingController = new BookingController(bookingBusiness);

const res: any = {
  status: jest.fn().mockReturnThis(),
  send: jest.fn().mockReturnThis(),
};

describe("BookingController: FindUserCheckin method", () => {
  const req: any = { query: {}, body: {} };
  test("Sucess case: without limit", async () => {
    req.body.tokenId = "id";
    await bookingController.findUserCheckin(req, res);

    expect(bookingBusiness.findByEntity).toBeCalledWith({ id: "id" });
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.send).toHaveBeenCalledWith({ result: [] });
  });

  test("Sucess case: with limit", async () => {
    req.body.tokenId = "id";
    req.query.limit = 20;
    await bookingController.findUserCheckin(req, res);

    expect(bookingBusiness.findByEntity).toBeCalledWith({
      id: "id",
      limit: 20,
    });
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.send).toHaveBeenCalledWith({ result: [] });
  });
});

describe("BookingController: FindCheckin method", () => {
    const req: any = { params: {}};
    test("Sucess case", async () => {
      req.params.id = "id";
      await bookingController.findCheckin(req, res);
  
      expect(bookingBusiness.findCheckin).toBeCalledWith({ id: "id" });
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.send).toHaveBeenCalledWith({ result: [] });
    });
  
  });

  describe("BookingController: FindCheckinByEntity method", () => {
    const req: any = { params: {}, query: {}};
    test("Sucess case: without limit", async () => {
      req.params.id = "id";
      req.params.entity = "contract"
      await bookingController.findByEntity(req, res);
  
      expect(bookingBusiness.findByEntity).toBeCalledWith({ id: "id", entity: "contract"});
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.send).toHaveBeenCalledWith({ result: [] });
    });

    test("Sucess case: with limit", async () => {
        req.params.id = "id";
        req.params.entity = "contract"
        req.query.limit  = 10
        await bookingController.findByEntity(req, res);
    
        expect(bookingBusiness.findByEntity).toBeCalledWith({ id: "id", entity: "contract", limit:10});
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.send).toHaveBeenCalledWith({ result: [] });
      });
    
  
  });  
  

  describe("BookingController: CreateCheckin method", () => {
    const req: any = { params: {}};
    test("Sucess case: without limit", async () => {
      req.params.classId = "classId";
      req.body ={
        tokenId:  "contractId",
        date: "date",
        name: "name",
        time: "time"
      }
      
      await bookingController.createCheckin(req, res);
  
      expect(bookingBusiness.createCheckin).toBeCalledWith({ 
        contractId: "contractId",
        yogaClassId: "classId",
        date: "date",
        name: "name",
        time: "time"
      });
      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.send).toHaveBeenCalledWith({ message: "Checkin realizado criado"  });
    });

  });  

  describe("BookingController: CreateSingleCheckin method", () => {
    const req: any = { params: {}};
    test("Sucess case: without limit", async () => {
      req.params.classId = "classId";
      req.body ={
        date: "date",
        name: "name",
        time: "time"
      }
      
      await bookingController.createSingleCheckin(req, res);
  
      expect(bookingBusiness.createSingleCheckin).toBeCalledWith({ 
        yogaClassId: "classId",
        date: "date",
        name: "name",
        time: "time"
      });
      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.send).toHaveBeenCalledWith({ message: "Checkin realizado criado"  });
    });

  });  

  describe("BookingController: DeleteCheckin method", () => {
    const req: any = { params: {}, query:{}};
    test("Sucess case", async () => {
      req.params.id = "id";
      req.query.type = "contract"
    
      await bookingController.deleteCheckin(req, res);
  
      expect(bookingBusiness.deleteCheckin).toBeCalledWith({ 
        id: "id",
        type: "contract"
      });
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.send).toHaveBeenCalledWith({ message: "Check-in deletado"  });
    });

  });    