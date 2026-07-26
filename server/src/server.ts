import { createApp } from "./app.js";


export function startServer(): void {

  const app = createApp();

  console.log(
    "Madrasa server initialized",
    app.getRoutes()
  );

}


startServer();
