import * as http from "http";
import app from "./app";
import db from "./models";
require("dotenv").config(".env");

const server = http.createServer(app);
const PORT = 3003;
db.sequelize.sync().then(() => {
  server.listen(PORT);

  server.on("listening", () => {
    console.log(`Listening on port ${PORT}`);
  });
});
