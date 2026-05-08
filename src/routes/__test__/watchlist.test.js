const request = require("supertest");
const app = require("../../app");

let refreshToken;

const getAuthCredentials = async () => {
  await global.signup();
  return await global.signin();
};

describe("Post /api/v1/watchlist", () => {
  it("should return 200 and cookie header if login is successful", async () => {
    const accessToken = await getAuthCredentials();

    const response = await request(app)
      .post("/api/v1/watchlists")
      .set("Cookie", [`accessToken=${accessToken}`])
      .send({
        movieId: "123455",
        title: "Avatar",
        overview: "Best movie ever",
        imageUri: "https://movie.jpg",
        releaseYear: "10-10-2025",
      });

    expect(response.status).toBe(201);
    expect(response.body).toBeDefined();
    expect(response.body).toHaveProperty("message");
    expect(response.body).toHaveProperty("data");
  });
});
