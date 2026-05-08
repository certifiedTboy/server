const http = require("http");
const app = require("./app");
const connectDb = require("./helpers/db-config");
const { PORT } = require("./lib");
const httpServer = http.createServer(app);

const startServer = async () => {
  await connectDb();
  httpServer.listen(PORT, () => {
    console.log(`server is running on port: ${PORT}`);
  });
};

startServer();
