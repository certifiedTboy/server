module.exports = {
  "/users": {
    post: {
      tags: ["Users"],
      summary: "Create a new user",
      requestBody: {
        required: true,
        content: {
          "application/json": {
            schema: {
              type: "object",
              properties: {
                firstName: { type: "string" },
                lastName: { type: "string" },
                email: { type: "string" },
                password: { type: "string" },
                confirmPassword: { type: "string" },
              },
              required: [
                "firstName",
                "lastName",
                "email",
                "password",
                "confirmPassword",
              ],
            },
          },
        },
      },

      responses: {
        201: { description: "User created successfully" },
      },
    },
  },

  "/users/verify": {
    put: {
      tags: ["Users"],
      summary: "Verify a user's email address",
      requestBody: {
        required: true,
        content: {
          "application/json": {
            schema: {
              type: "object",
              properties: {
                otp: { type: "string" },
              },
              required: ["otp"],
            },
          },
        },
      },

      responses: {
        200: { description: "User verified successfully" },
      },
    },
  },
};
