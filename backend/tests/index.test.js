require("dotenv").config();
const mongoose = require("mongoose");
const request = require("supertest");

const app = require("../index");

beforeEach(async () => {
    await mongoose.connect(process.env.MONGO_URL);
});

afterEach(async () => {
    await mongoose.connection.close();
})

describe("Sign Up User", () => {
    it("Should return User created succesfully", async () => {
        const response = await request(app)
            .post("/sign-up")
            .set("Content-Type", "application/json")
            .send({
                email: "unittest@gmail.com",
                password: "testing123",
            });
        expect(response.statusCode).toBe(201);
        expect(response.body.message).toBe("User created succesfully");
    });

    it("Should return sign up failed", async () => {
        const response = await request(app)
            .post("/sign-up")
            .set("Content-Type", "application/json")
            .send({
                email: "",
                password: "",
            });
        expect(response.statusCode).toBe(400);
        expect(response.body.message).toBe("Email and password are required");
    });

    it("Should return sign up failed", async () => {
        const response = await request(app)
            .post("/sign-up")
            .set("Content-Type", "application/json")
            .send({
                email: "unittest@gmail.com",
                password: "testing123",
            });
        expect(response.statusCode).toBe(409);
        expect(response.body.message).toBe("Email already exists");
    });
});

describe("Sign In User", () => {
    it("should return sign in success", async () => {
        const response = await request(app)
            .post("/sign-in")
            .set("Content-Type", "application/json")
            .send({
                email: "unittest@gmail.com",
                password: "testing123",
                token: "zxcvbnm"
            });
        expect(response.statusCode).toBe(200);
        expect(response.body.message).toBe("Success signing in token");
    });

    it("should return sign in failed", async () => {
        const response = await request(app)
            .post("/sign-in")
            .set("Content-Type", "application/json")
            .send({
                email: "mario@gmail.com",
                password: "testing123",
                token: "zxcvbnm"
            });
        expect(response.statusCode).toBe(404);
        expect(response.body.message).toBe("User not found");
    });

    it("should return sign in failed", async () => {
        const response = await request(app)
            .post("/sign-in")
            .set("Content-Type", "application/json")
            .send({
                email: "unittest@gmail.com",
                password: "testing",
                token: "zxcvbnm"
            });
        expect(response.statusCode).toBe(401);
        expect(response.body.message).toBe("Invalid password");
    });
});

describe("Sign Out User", () => {
    it("should return sign out success", async () => {
        const response = await request(app)
            .delete("/sign-in")
            .set("Content-Type", "application/json")
            .send({
                email: "unittest@gmail.com",
                token: "zxcvbnm"
            });
        expect(response.statusCode).toBe(204);
        expect(response.body.message).toBe(undefined);
    });

    it("should return sign out failed", async () => {
        const response = await request(app)
            .delete("/sign-in")
            .set("Content-Type", "application/json")
            .send({
                email: "",
                token: ""
            });
        expect(response.statusCode).toBe(400);
        expect(response.body.message).toBe("Error, No Data Provided");
    });

    it("should return sign out failed", async () => {
        const response = await request(app)
            .delete("/sign-in")
            .set("Content-Type", "application/json")
            .send({
                email: "mario@gmail.com", 
                token: "qwertyuiop"
            });
        expect(response.statusCode).toBe(401);
        expect(response.body.message).toBe("Error, Unauthorized");
    });
});