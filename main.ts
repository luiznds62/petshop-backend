import { Server } from "./server";

const server = new Server();
server
  .bootstrap()
  .then(server => {
    console.log(`Server is listening on: `,server.application.address().port);
  })
  .catch(error => {
    console.log("Server has failed to start");
    console.error(error);
    process.exit(1);
  });
