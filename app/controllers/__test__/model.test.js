const request = require("supertest")
const app = require("../../app")

// test("Returns 200 upon sucessfull registration", () => {
//     return request(app).post("/users/register").send({
//         email: "test2@test.com",
//         username: "test2",
//         password: "Senha123#"
//     }).expect(201)
// })


test("Register company with non-unique email", () => {
    return request(app).post("/companies/register/").send(
        {
            name: "Void Tecnologias e Comunicação",
            email: "void@void.co.mz",
            facturationEmail: "void@void.co.mz",
            address: "Mozarte",
            created_by: "60228f2ed2b402103c303ac2",
            contact: 123456789,
            category: "602292dfc427b20374792002",
            province: "60228e261029e52a10125fb9",
            city: "60228e8aba24a22c9839f8b4",
            country: "60228bbf9f5079064cec33fd"
        }
    ).set('Accept', 'application/json')
    .expect('Content-Type', /json/)
    .expect(201)
})

