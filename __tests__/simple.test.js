process.env.NODE_ENV = "test";
//const db = require("../db");
const request = require("supertest");
const app = require("../app");

describe("GET / ", () => {
    test("It should respond with an array of students", async () => {
        const response = await request(app).get("/");
        expect(response.body). .toEqual(["Elie", "Matt", "Joel", "Michael"]);
        expect(response.statusCode).toBe(200);
    });
});

describe("GET /testAPI", () => {
    test("It should respond with ...", async () => {
        const response = await request(app).get("/testAPI");
        //expect(response.body.length).toBe(2);
        //expect(response.body[0]).toHaveProperty("id");
        //expect(response.body[0]).toHaveProperty("name");
        expect(response.statusCode).toBe(200);
    });
});

describe("POST /test", () => {
    test("It should respond with ...", async () => {
        const newStudent = await request(app)
            .post("/test")
            .send({
                name: "New Student"
            });
        //expect(newStudent.body.name).toBe("New Student");
        //expect(newStudent.body).toHaveProperty("id");
        //expect(newStudent.body).toHaveProperty("name");
        expect(newStudent.statusCode).toBe(200);

        // make sure we have 3 students
        //const response = await request(app).get("/students");
        //expect(response.body.length).toBe(3);
    });
});

describe("Test a 404", () => {
    test("It should respond with a 404 status", async () => {
        const response = await request(app).get("/nowhere");
        expect(response.statusCode).toBe(404);
    });
});
