import {
  getDatabase
} from "../../../database/connection.js";

import {
  classQueries
} from "./classQueries.js";

import type {
  ClassRoom,
  CreateClassInput,
  UpdateClassInput,
  ClassFilter,
  ClassListResult,
  ClassRepository as ClassRepositoryContract
} from "../types/class.js";


interface ClassRow {

  id: number;

  name: string;

  description: string | null;

  is_active: number;

  created_at: string;

  updated_at: string;

}


function mapClass(
  row: ClassRow
): ClassRoom {

  return {
    id: row.id,
    name: row.name,
    description: row.description,
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
        (error, row) => {

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
        (error, rows) => {

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
        error => {

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


export class ClassRepository
  implements ClassRepositoryContract {


  async findAll(
    _filter?: ClassFilter
  ): Promise<ClassListResult> {

    const rows =
      await all<ClassRow>(
        classQueries.findAll
      );

    return {
      items: rows.map(mapClass),
      total: rows.length
    };

  }


  async findById(
    id: number
  ): Promise<ClassRoom | null> {

    const row =
      await get<ClassRow>(
        classQueries.findById,
        [id]
      );

    return row
      ? mapClass(row)
      : null;

  }


  async findByName(
    name: string
  ): Promise<ClassRoom | null> {

    const row =
      await get<ClassRow>(
        classQueries.findByName,
        [name]
      );

    return row
      ? mapClass(row)
      : null;

  }


  async create(
    input: CreateClassInput
  ): Promise<ClassRoom> {

    await run(
      classQueries.create,
      [
        input.name,
        input.description ?? null,
        input.is_active === false ? 0 : 1
      ]
    );


    const created =
      await this.findByName(
        input.name
      );


    if (!created) {
      throw new Error(
        "Failed to create class"
      );
    }


    return created;

  }


  async update(
    id: number,
    input: UpdateClassInput
  ): Promise<ClassRoom> {

    const current =
      await this.findById(id);


    if (!current) {
      throw new Error(
        "Class not found"
      );
    }


    await run(
      classQueries.update,
      [
        input.name ?? current.name,
        input.description ?? current.description,
        input.is_active === undefined
          ? (current.is_active ? 1 : 0)
          : (input.is_active ? 1 : 0),
        id
      ]
    );


    const updated =
      await this.findById(id);


    if (!updated) {
      throw new Error(
        "Failed to update class"
      );
    }


    return updated;

  }


  async delete(
    id: number
  ): Promise<void> {

    const current =
      await this.findById(id);


    if (!current) {
      throw new Error(
        "Class not found"
      );
    }


    await run(
      classQueries.delete,
      [id]
    );

  }

}
