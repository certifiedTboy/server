module.exports = {
  "/auth/login": {
    post: {
      tags: ["Auth"],
      summary: "Login a user and receive access and refresh tokens",
      requestBody: {
        required: true,
        content: {
          "application/json": {
            schema: {
              type: "object",
              properties: {
                email: { type: "string" },
                password: { type: "string" },
              },
              required: ["email", "password"],
            },
          },
        },
      },

      responses: {
        200: { description: "User logged in successfully" },
      },
    },
  },

  "/auth/new-access-token": {
    post: {
      tags: ["Auth"],
      summary: "Generate a new access token using a refresh token",
      security: [
        {
          bearerAuth: [],
        },
      ],

      responses: {
        200: { description: "New access token generated successfully" },
      },
    },
  },
};
