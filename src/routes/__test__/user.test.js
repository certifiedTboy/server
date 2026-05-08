const request = require("supertest");
const app = require("../../app");

let otp;

describe("Post /api/v1/users", () => {
  it("should return 400 error if incorrect user data is provided", async () => {
    const response = await request(app).post("/api/v1/users").send({});

    expect(response.status).toBe(400);
    expect(response.body).toBeDefined();
    expect(response.body).toHaveProperty("error");
    expect(response.body).toHaveProperty("status");
    expect(response.body.status).toBe(400);
  });

  it("should return 201 and a success message if user is created successfully", async () => {
    const response = await request(app).post("/api/v1/users").send({
      firstName: "John",
      lastName: "Doe",
      email: "johndoe@gmail.com",
      password: "Password1234##",
      confirmPassword: "Password1234##",
    });

    expect(response.status).toBe(201);
    expect(response.body).toBeDefined();
    expect(response.body).toHaveProperty("message");
    expect(response.body).toHaveProperty("data");
    expect(response.body.message).toBe("user created successfully");
    expect(response.body.data).toHaveProperty("otp");
    expect(response.body.data.otp).toBeDefined();
    expect(typeof response.body.data.otp).toBe("string");

    otp = response.body.data.otp;
  });
});

describe("Put /api/v1/users/verify", () => {
  it("should return 200 and a success message if user is verified successfully", async () => {
    const response = await request(app).put("/api/v1/users/verify").send({
      otp,
    });

    expect(response.status).toBe(200);
    expect(response.body).toBeDefined();
    expect(response.body).toHaveProperty("message");
    expect(response.body.message).toBe("account verified successfully");
  });
});
