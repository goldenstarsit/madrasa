import {
  getDatabase
} from "../../../database/connection.js";

import {
  permissionQueries
} from "./permissionQueries.js";

import type {
  Permission,
  CreatePermissionInput,
  UpdatePermissionInput,
  PermissionFilter,
  PermissionListResult,
  PermissionRepository as PermissionRepositoryContract
} from "../types/permission.js";


interface PermissionRow {
  id: number;
  code: string;
  name: string;
  description: string | null;
  module: string;
  created_at: string;
  updated_at: string;
}


function mapPermission(
  row: PermissionRow
): Permission {
  return {
    id: row.id,
    code: row.code,
    name: row.name,
    description: row.description,
    module: row.module,
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


export class PermissionRepository
  implements PermissionRepositoryContract {

  async findAll(
    filter?: PermissionFilter
  ): Promise<PermissionListResult> {

    let query: string =
      permissionQueries.findAll;

    const params: unknown[] = [];

    if (filter?.module) {
      query =
        query.replace(
          "ORDER BY",
          "WHERE module = ? ORDER BY"
        );

      params.push(
        filter.module
      );
    }

    if (filter?.code) {
      query =
        query.replace(
          "ORDER BY",
          "WHERE code = ? ORDER BY"
        );

      params.push(
        filter.code
      );
    }

    const rows =
      await all<PermissionRow>(
        query,
        params
      );

    return {
      items: rows.map(
        mapPermission
      ),
      total: rows.length
    };
  }


  async findById(
    id: number
  ): Promise<Permission | null> {

    const row =
      await get<PermissionRow>(
        permissionQueries.findById,
        [id]
      );

    return row
      ? mapPermission(row)
      : null;
  }


  async findByCode(
    code: string
  ): Promise<Permission | null> {

    const row =
      await get<PermissionRow>(
        permissionQueries.findByCode,
        [code]
      );

    return row
      ? mapPermission(row)
      : null;
  }


  async create(
    input: CreatePermissionInput
  ): Promise<Permission> {

    await run(
      permissionQueries.create,
      [
        input.code,
        input.name,
        input.description ?? null,
        input.module
      ]
    );

    const permission =
      await this.findByCode(
        input.code
      );

    if (!permission) {
      throw new Error(
        "Permission creation failed"
      );
    }

    return permission;
  }


  async update(
    id: number,
    input: UpdatePermissionInput
  ): Promise<Permission> {

    await run(
      permissionQueries.update,
      [
        input.name ?? "",
        input.description ?? null,
        input.module ?? "",
        id
      ]
    );

    const permission =
      await this.findById(
        id
      );

    if (!permission) {
      throw new Error(
        "Permission update failed"
      );
    }

    return permission;
  }


  async delete(
    id: number
  ): Promise<void> {

    await run(
      permissionQueries.delete,
      [id]
    );
  }
}
