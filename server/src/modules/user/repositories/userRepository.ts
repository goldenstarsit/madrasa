import {
  getDatabase
} from "../../../database/connection.js";

import {
  userQueries
} from "./userQueries.js";

import type {
  User,
  CreateUserInput,
  UpdateUserInput,
  UserFilter,
  UserListResult,
  UserRepository as UserRepositoryContract
} from "../types/user.js";


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


function get<T>(
  sql: string,
  params: unknown[] = []
): Promise<T | undefined> {

  const database = getDatabase();

  return new Promise(
    (resolve, reject) => {
      database.get(
        sql,
        params,
        (
          error,
          row
        ) => {
          if (error) {
            reject(error);
            return;
          }

          resolve(
            row as T | undefined
          );
        }
      );
    }
  );
}


function all<T>(
  sql: string,
  params: unknown[] = []
): Promise<T[]> {

  const database = getDatabase();

  return new Promise(
    (resolve, reject) => {
      database.all(
        sql,
        params,
        (
          error,
          rows
        ) => {
          if (error) {
            reject(error);
            return;
          }

          resolve(
            rows as T[]
          );
        }
      );
    }
  );
}


function run(
  sql: string,
  params: unknown[] = []
): Promise<void> {

  const database = getDatabase();

  return new Promise(
    (resolve, reject) => {
      database.run(
        sql,
        params,
        (
          error
        ) => {
          if (error) {
            reject(error);
            return;
          }

          resolve();
        }
      );
    }
  );
}


export class UserRepository
  implements UserRepositoryContract {

  async findAll(
    filter?: UserFilter
  ): Promise<UserListResult> {

    let query: string =
      userQueries.findAll;

    const params: unknown[] = [];

    if (filter?.username) {
      query =
        query.replace(
          "ORDER BY",
          "WHERE username LIKE ? ORDER BY"
        );

      params.push(
        `%${filter.username}%`
      );
    }

    const rows =
      await all<UserRow>(
        query,
        params
      );

    return {
      items: rows.map(
        mapUser
      ),
      total: rows.length
    };
  }


  async findById(
    id: number
  ): Promise<User | null> {

    const row =
      await get<UserRow>(
        userQueries.findById,
        [id]
      );

    return row
      ? mapUser(row)
      : null;
  }


  async findByUsername(
    username: string
  ): Promise<User | null> {

    const row =
      await get<UserRow>(
        userQueries.findByUsername,
        [username]
      );

    return row
      ? mapUser(row)
      : null;
  }


  async findByEmail(
    email: string
  ): Promise<User | null> {

    const row =
      await get<UserRow>(
        userQueries.findByEmail,
        [email]
      );

    return row
      ? mapUser(row)
      : null;
  }


  async create(
    input: CreateUserInput
  ): Promise<User> {

    await run(
      userQueries.create,
      [
        input.username,
        input.email ?? null,
        input.password_hash,
        input.role_id ?? null,
        input.is_active === false ? 0 : 1
      ]
    );

    const user =
      await this.findByUsername(
        input.username
      );

    if (!user) {
      throw new Error(
        "User creation failed"
      );
    }

    return user;
  }


  async update(
    id: number,
    input: UpdateUserInput
  ): Promise<User> {

    const current =
      await this.findById(
        id
      );

    if (!current) {
      throw new Error(
        "User not found"
      );
    }

    await run(
      userQueries.update,
      [
        input.username ?? current.username,
        input.email ?? current.email,
        input.password_hash ?? current.password_hash,
        input.role_id ?? current.role_id,
        input.is_active === false ? 0 : 1,
        id
      ]
    );

    const updated =
      await this.findById(
        id
      );

    if (!updated) {
      throw new Error(
        "User update failed"
      );
    }

    return updated;
  }


  async delete(
    id: number
  ): Promise<void> {

    await run(
      userQueries.delete,
      [id]
    );
  }
}
