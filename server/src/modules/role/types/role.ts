export interface Role {
  id: number;
  name: string;
  description: string | null;
  created_at: string;
  updated_at: string;
}

export interface CreateRoleInput {
  name: string;
  description?: string | null;
}

export interface UpdateRoleInput {
  name?: string;
  description?: string | null;
}

export interface RoleFilter {
  name?: string;
}

export interface RoleListResult {
  items: Role[];
  total: number;
}

export interface RoleRepository {
  findAll(
    filter?: RoleFilter
  ): Promise<RoleListResult>;

  findById(
    id: number
  ): Promise<Role | null>;

  findByName(
    name: string
  ): Promise<Role | null>;

  create(
    input: CreateRoleInput
  ): Promise<Role>;

  update(
    id: number,
    input: UpdateRoleInput
  ): Promise<Role>;

  delete(
    id: number
  ): Promise<void>;
}
