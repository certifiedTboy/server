module.exports = {
  "/watchlists": {
    post: {
      tags: ["Watchlists"],
      summary: "Create a new watchlist",
      requestBody: {
        required: true,
        content: {
          "application/json": {
            schema: {
              type: "object",
              properties: {
                movieId: { type: "string" },
                title: { type: "string" },
                imageUri: { type: "string" },
                releaseYear: { type: "string" },
                overview: { type: "string" },
              },
              required: [
                "movieId",
                "title",
                "imageUri",
                "releaseDate",
                "overview",
              ],
            },
          },
        },
      },

      security: [{ cookieAuth: [] }],

      responses: {
        201: { description: "Watchlist created successfully" },
      },
    },

    get: {
      tags: ["Watchlists"],
      summary: "Get all watchlists for a user",
      security: [{ cookieAuth: [] }],
      responses: {
        200: { description: "Watchlists retrieved successfully" },
      },
    },
  },
};
