import * as http from "http";
import app from "./app";
import db from "./models";

const server = http.createServer(app);

db.sequelize.sync().then(() => {
  server.listen(3000);

  server.on("listening", () => console.log("Listening on port x"));
});
