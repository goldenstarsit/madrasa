import path from "node:path";

export const databaseConfig = {
  filename: path.join(
    process.cwd(),
    "data",
    "madrasa.db"
  )
};
