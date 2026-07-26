import {
  getDatabase
} from "../../../database/connection.js";

import {
  authorizationQueries
} from "./authorizationQueries.js";

import type {
  AuthorizationRepository as AuthorizationRepositoryContract,
  UserPermission
} from "../types/authorization.js";


interface PermissionRow {
  id: number;
  code: string;
  name: string;
  module: string;
}


function mapPermission(
  row: PermissionRow
): UserPermission {

  return {
    id: row.id,
    code: row.code,
    name: row.name,
    module: row.module
  };
}


export class AuthorizationRepository
  implements AuthorizationRepositoryContract {

  async getUserPermissions(
    user_id: number
  ): Promise<UserPermission[]> {

    const database = getDatabase();

    return new Promise(
      (resolve, reject) => {

        database.all(
          authorizationQueries.getUserPermissions,
          [user_id],
          (
            error,
            rows
          ) => {

            if (error) {
              reject(error);
              return;
            }

            resolve(
              (rows as PermissionRow[])
                .map(mapPermission)
            );
          }
        );

      }
    );
  }


  async hasPermission(
    user_id: number,
    permission_code: string
  ): Promise<boolean> {

    const database = getDatabase();

    return new Promise(
      (resolve, reject) => {

        database.get(
          authorizationQueries.hasPermission,
          [
            user_id,
            permission_code
          ],
          (
            error,
            row
          ) => {

            if (error) {
              reject(error);
              return;
            }

            resolve(
              Boolean(row)
            );
          }
        );

      }
    );
  }
}
