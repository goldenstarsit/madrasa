import {
  getDatabase
} from "./connection.js";


export function runTransaction(
  callback: () => void
): void {

  const database = getDatabase();


  database.serialize(() => {

    database.run(
      "BEGIN TRANSACTION"
    );


    try {

      callback();


      database.run(
        "COMMIT"
      );


    } catch (error) {

      database.run(
        "ROLLBACK"
      );


      throw error;

    }

  });

}
