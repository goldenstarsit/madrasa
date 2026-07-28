import type {
  ClassRoom,
  CreateClassInput,
  UpdateClassInput,
  ClassFilter,
  ClassListResult,
  ClassRepository
} from "../types/class.js";

import {
  validateCreateClass,
  validateUpdateClass
} from "../validation/classValidation.js";


import {
  AppError
} from "../../../core/errors/appError.js";


export class ClassService {


  constructor(
    private readonly repository: ClassRepository
  ) {}


  async getAll(
    filter?: ClassFilter
  ): Promise<ClassListResult> {

    return this.repository.findAll(
      filter
    );

  }


  async getById(
    id: number
  ): Promise<ClassRoom | null> {

    return this.repository.findById(
      id
    );

  }


  async getByName(
    name: string
  ): Promise<ClassRoom | null> {

    return this.repository.findByName(
      name
    );

  }


  async create(
    input: CreateClassInput
  ): Promise<ClassRoom> {


    const validation =
      validateCreateClass(
        input
      );


    if (!validation.valid) {

      throw new AppError(
        "VALIDATION_ERROR",
        validation.message ??
          "Invalid class data"
      );

    }


    const existing =
      await this.repository.findByName(
        input.name
      );


    if (existing) {

      throw new AppError(
        "DUPLICATE_ENTRY",
        "Class name already exists"
      );

    }


    return this.repository.create(
      input
    );

  }


  async update(
    id: number,
    input: UpdateClassInput
  ): Promise<ClassRoom> {


    const validation =
      validateUpdateClass(
        input
      );


    if (!validation.valid) {

      throw new AppError(
        "VALIDATION_ERROR",
        validation.message ??
          "Invalid class data"
      );

    }


    if (input.name) {

      const existing =
        await this.repository.findByName(
          input.name
        );


      if (
        existing &&
        existing.id !== id
      ) {

        throw new AppError(
          "DUPLICATE_ENTRY",
          "Class name already exists"
        );

      }

    }


    return this.repository.update(
      id,
      input
    );

  }


  async delete(
    id: number
  ): Promise<void> {

    await this.repository.delete(
      id
    );

  }


}
