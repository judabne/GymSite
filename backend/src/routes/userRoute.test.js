const rewire = require("rewire")
const userRoute = rewire("./userRoute")
const sendUserJson = userRoute.__get__("sendUserJson")
// @ponicode
describe("sendUserJson", () => {
    test("0", () => {
        let result = sendUserJson({ id: "7289708e-b17a-477c-8a77-9ab575c4b4d8", firstname: "George", lastname: "Baziz", email: "bed-free@tutanota.de", isAdmin: false, plans: 0.0 }, { send: () => 429 })
        expect(result).toMatchSnapshot()
    })

    test("1", () => {
        let result = sendUserJson({ id: "7289708e-b17a-477c-8a77-9ab575c4b4d8", firstname: "Jean-Philippe", lastname: "Dupont", email: "ponicode.com", isAdmin: true, plans: 10.23 }, { send: () => 429 })
        expect(result).toMatchSnapshot()
    })

    test("2", () => {
        let result = sendUserJson({ id: "03ea49f8-1d96-4cd0-b279-0684e3eec3a9", firstname: "Edmond", lastname: "Dupont", email: "something.example.com", isAdmin: true, plans: 0.0 }, { send: () => 500 })
        expect(result).toMatchSnapshot()
    })

    test("3", () => {
        let result = sendUserJson({ id: "a85a8e6b-348b-4011-a1ec-1e78e9620782", firstname: "George", lastname: "Murray-Kynynmound", email: "TestUpperCase@Example.com", isAdmin: false, plans: 10.23 }, { send: () => 404 })
        expect(result).toMatchSnapshot()
    })

    test("4", () => {
        let result = sendUserJson({ id: "a85a8e6b-348b-4011-a1ec-1e78e9620782", firstname: "George", lastname: "Dupont", email: "email@Google.com", isAdmin: true, plans: 0.0 }, { send: () => 429 })
        expect(result).toMatchSnapshot()
    })

    test("5", () => {
        let result = sendUserJson({ id: "", firstname: "", lastname: "", email: "", isAdmin: true, plans: Infinity }, { send: () => Infinity })
        expect(result).toMatchSnapshot()
    })
})
