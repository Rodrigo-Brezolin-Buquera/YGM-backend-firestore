import { Firm } from "../../../../src/modules/firm/domain/firm.Entity";


const input = {
    address: "address",
    email: "email",
    facebook: "facebook",
    instagram: "instagram",
    phone: "phone",
    website: "website",
    whatsapp: "whatsapp"
}

describe("FirmEntity", ()=>{
    test("Sucess case", ()=>{
        const result = Firm.toModel(input)
        expect(result).toBeInstanceOf(Firm)
    })

    test("Sucess case: getters", ()=>{
        const result = Firm.toModel(input)
        expect(result.getAddress()).toBe(input.address)
        expect(result.getEmail()).toBe(input.email)
        expect(result.getFacebook()).toBe(input.facebook)
        expect(result.getInstagram()).toBe(input.instagram)
        expect(result.getPhone()).toBe(input.phone)
        expect(result.getWebsite()).toBe(input.website)
        expect(result.getWhatsapp()).toBe(input.whatsapp)
    })

    test("Sucess case: setters", ()=>{
        const result = Firm.toModel(input)
        result.setAddress("A")
        result.setEmail("B")
        result.setFacebook("C")
        result.setInstagram("D")
        result.setPhone("E")
        result.setWebsite("F")
        result.setWhatsapp("G")

        expect(result.getAddress()).toBe("A")
        expect(result.getEmail()).toBe("B")
        expect(result.getFacebook()).toBe("C")
        expect(result.getInstagram()).toBe("D")
        expect(result.getPhone()).toBe("E")
        expect(result.getWebsite()).toBe("F")
        expect(result.getWhatsapp()).toBe("G")
    })

})