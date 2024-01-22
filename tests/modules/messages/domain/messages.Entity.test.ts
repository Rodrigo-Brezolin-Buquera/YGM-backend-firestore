import { Message } from "../../../../src/modules/messages/domain/messages.Entity";


const input = {
    message: "message",
}

describe("MessagesEntity", ()=>{
    test("Sucess case", ()=>{
        const result = Message.toModel(input)
        expect(result).toBeInstanceOf(Message)
    })

    test("Sucess case: getters", ()=>{
        const result = Message.toModel(input)
        expect(result.getContent()).toBe(input.message)
    })

    test("Sucess case: setters", ()=>{
        const result = Message.toModel(input)
        result.setContent("A")
        expect(result.getContent()).toBe("A")   
    })
})