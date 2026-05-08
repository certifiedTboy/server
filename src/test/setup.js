const mongoose = require("mongoose");
const request = require("supertest");
const app = require("../app");
const { MongoMemoryServer } = require("mongodb-memory-server");

let mongoServer;

// run before all tests in a suite
beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();

  const mongoUri = mongoServer.getUri();

  await mongoose.connect(mongoUri);
});

// run after all tests in a suite
afterAll(async () => {
  await mongoServer.stop();
  await mongoose.connection.close();
});

global.signup = async () => {
  try {
    const response = await request(app).post("/api/v1/users").send({
      firstName: "John",
      lastName: "Doe",
      email: "johndoe@gmail.com",
      password: "Password1234##",
      confirmPassword: "Password1234##",
    });

    const otp = response.body.data.otp;

    await request(app).put("/api/v1/users/verify").send({
      otp,
    });

    return response.data;
  } catch (error) {}
};

global.signin = async () => {
  const response = await request(app).post("/api/v1/auth/login").send({
    email: "johndoe@gmail.com",
    password: "Password1234##",
  });

  const cookie = response.get("Set-Cookie");
  return cookie[0].split(";")[0].split("=")[1];
};
