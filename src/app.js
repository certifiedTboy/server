const express = require("express");
const cookieParser = require("cookie-parser");
const { rateLimit } = require("express-rate-limit");
const cors = require("cors");
const swaggerUi = require("swagger-ui-express");
const swaggerSpec = require("./helpers/swagger");
const userRoutes = require("./routes/user-routes");
const authRoutes = require("./routes/auth-routes");
const watchlistRoutes = require("./routes/wathclist-routes");
const { globalErrorHandler, notFoundError, HttpException } = require("./lib");
const app = express();

// Apply the rate limiting middleware to all requests
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  limit: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes).
  standardHeaders: "draft-8", // draft-6: `RateLimit-*` headers; draft-7 & draft-8: combined `RateLimit` header
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers.
  ipv6Subnet: 56, // Set to 60 or 64 to be less aggressive, or 52 or 48 to be more aggressive
  // store: ... , // Redis, Memcached, etc. See below.
  handler: (req, res, next, options) => {
    next(new HttpException("Too many requests", 429));
  },
});

app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://movie-app-client-plum.vercel.app",
    ],
    credentials: true,
  }),
);
app.use(limiter);
app.use(cookieParser());
// global middleware
// allows json body data in the req.body object
app.use(express.json({ limit: "10kb" }));
app.use(express.urlencoded({ extended: true, limit: "10kb" }));

app.get("/", (req, res) => {
  res.json({ message: "Server is live..." });
});

app.use("/api/v1/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use("/api/v1/users", userRoutes);
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/watchlists", watchlistRoutes);

app.use(globalErrorHandler);
app.use(notFoundError);

module.exports = app;
