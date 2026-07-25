import {
  getDatabase
} from "../../../database/connection.js";

import {
  authQueries
} from "./authQueries.js";

import type {
  User
} from "../../user/types/user.js";

import type {
  AuthRepository as AuthRepositoryContract
} from "../types/auth.js";


interface UserRow {
  id: number;
  username: string;
  email: string | null;
  password_hash: string;
  role_id: number | null;
  is_active: number;
  created_at: string;
  updated_at: string;
}


function mapUser(
  row: UserRow
): User {

  return {
    id: row.id,
    username: row.username,
    email: row.email,
    password_hash: row.password_hash,
    role_id: row.role_id,
    is_active: Boolean(row.is_active),
    created_at: row.created_at,
    updated_at: row.updated_at
  };
}


export class AuthRepository
  implements AuthRepositoryContract {

  async findUserForLogin(
    username: string
  ): Promise<User | null> {

    const database = getDatabase();

    return new Promise(
      (resolve, reject) => {

        database.get(
          authQueries.findUserForLogin,
          [username],
          (
            error,
            row
          ) => {

            if (error) {
              reject(error);
              return;
            }


            if (!row) {
              resolve(null);
              return;
            }


            resolve(
              mapUser(
                row as UserRow
              )
            );
          }
        );

      }
    );
  }
}
