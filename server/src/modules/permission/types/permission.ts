export interface Permission {
  id: number;
  code: string;
  name: string;
  description: string | null;
  module: string;
  created_at: string;
  updated_at: string;
}

export interface CreatePermissionInput {
  code: string;
  name: string;
  module: string;
  description?: string | null;
}

export interface UpdatePermissionInput {
  name?: string;
  module?: string;
  description?: string | null;
}

export interface PermissionFilter {
  module?: string;
  code?: string;
}

export interface PermissionListResult {
  items: Permission[];
  total: number;
}

export interface PermissionRepository {
  findAll(
    filter?: PermissionFilter
  ): Promise<PermissionListResult>;

  findById(
    id: number
  ): Promise<Permission | null>;

  findByCode(
    code: string
  ): Promise<Permission | null>;

  create(
    input: CreatePermissionInput
  ): Promise<Permission>;

  update(
    id: number,
    input: UpdatePermissionInput
  ): Promise<Permission>;

  delete(
    id: number
  ): Promise<void>;
}
