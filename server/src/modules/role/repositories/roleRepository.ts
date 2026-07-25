import {
  getDatabase
} from "../../../database/connection.js";

import {
  roleQueries
} from "./roleQueries.js";

import type {
  Role,
  CreateRoleInput,
  UpdateRoleInput,
  RoleFilter,
  RoleListResult,
  RoleRepository as RoleRepositoryContract
} from "../types/role.js";


interface RoleRow {
  id: number;
  name: string;
  description: string | null;
  created_at: string;
  updated_at: string;
}


function mapRole(
  row: RoleRow
): Role {
  return {
    id: row.id,
    name: row.name,
    description: row.description,
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


export class RoleRepository
  implements RoleRepositoryContract {

  async findAll(
    filter?: RoleFilter
  ): Promise<RoleListResult> {

    let query: string =
      roleQueries.findAll;

    const params: unknown[] = [];

    if (filter?.name) {
      query =
        query.replace(
          "ORDER BY",
          "WHERE name LIKE ? ORDER BY"
        );

      params.push(
        `%${filter.name}%`
      );
    }

    const rows =
      await all<RoleRow>(
        query,
        params
      );

    return {
      items: rows.map(
        mapRole
      ),
      total: rows.length
    };
  }


  async findById(
    id: number
  ): Promise<Role | null> {

    const row =
      await get<RoleRow>(
        roleQueries.findById,
        [id]
      );

    return row
      ? mapRole(row)
      : null;
  }


  async findByName(
    name: string
  ): Promise<Role | null> {

    const row =
      await get<RoleRow>(
        roleQueries.findByName,
        [name]
      );

    return row
      ? mapRole(row)
      : null;
  }


  async create(
    input: CreateRoleInput
  ): Promise<Role> {

    await run(
      roleQueries.create,
      [
        input.name,
        input.description ?? null
      ]
    );

    const role =
      await this.findByName(
        input.name
      );

    if (!role) {
      throw new Error(
        "Role creation failed"
      );
    }

    return role;
  }


  async update(
    id: number,
    input: UpdateRoleInput
  ): Promise<Role> {

    await run(
      roleQueries.update,
      [
        input.name ?? "",
        input.description ?? null,
        id
      ]
    );

    const role =
      await this.findById(
        id
      );

    if (!role) {
      throw new Error(
        "Role update failed"
      );
    }

    return role;
  }


  async delete(
    id: number
  ): Promise<void> {

    await run(
      roleQueries.delete,
      [id]
    );
  }
}
