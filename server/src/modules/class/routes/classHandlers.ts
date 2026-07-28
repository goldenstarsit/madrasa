import type {
  ClassService
} from "../services/classService.js";

import type {
  CreateClassInput,
  UpdateClassInput
} from "../types/class.js";


export interface ClassHandlers {

  getClasses(): Promise<unknown>;

  getClassById(
    id: number
  ): Promise<unknown>;

  createClass(
    input: CreateClassInput
  ): Promise<unknown>;

  updateClass(
    id: number,
    input: UpdateClassInput
  ): Promise<unknown>;

  deleteClass(
    id: number
  ): Promise<void>;

}


export function createClassHandlers(
  service: ClassService
): ClassHandlers {

  return {

    async getClasses() {

      return service.getAll();

    },


    async getClassById(
      id: number
    ) {

      return service.getById(
        id
      );

    },


    async createClass(
      input: CreateClassInput
    ) {

      return service.create(
        input
      );

    },


    async updateClass(
      id: number,
      input: UpdateClassInput
    ) {

      return service.update(
        id,
        input
      );

    },


    async deleteClass(
      id: number
    ) {

      await service.delete(
        id
      );

    }

  };

}
