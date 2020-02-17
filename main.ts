import { Server } from "./server";

const server = new Server();
server
  .bootstrap()
  .then(server => {
    console.log(`Servidor ouvindo em: `,server.application.address());
  })
  .catch(error => {
    console.log("Servidor apresentou um erro ao iniciar");
    console.error(error);
    process.exit(1);
  });
