const request = require("supertest");
const app = require("../../app");

let refreshToken;

describe("Post /api/v1/auth/login", () => {
  it("should return 200 and cookie header if login is successful", async () => {
    await global.signup();

    const response = await request(app).post("/api/v1/auth/login").send({
      email: "johndoe@gmail.com",
      password: "Password1234##",
    });

    expect(response.status).toBe(200);
    expect(response.body).toBeDefined();
    expect(response.body).toHaveProperty("message");
    expect(response.body).toHaveProperty("refreshToken");
    expect(response.body.message).toBe("login successful");
    expect(response.get("Set-Cookie")).toBeDefined();
    refreshToken = response.body.refreshToken;
  });
});

describe("GET /api/v1/auth/new-access-token", () => {
  it("should return new cookie header and a 200 ok response", async () => {
    const response = await request(app)
      .get("/api/v1/auth/new-access-token")
      .set("Authorization", `Bearer ${refreshToken}`);

    expect(response.body).toBeDefined();
    expect(response.body).toHaveProperty("message");
    expect(response.body).toHaveProperty("refreshToken");
    expect(response.body.refreshToken).toBeDefined();
    expect(response.get("Set-Cookie")).toBeDefined();
  });
});
