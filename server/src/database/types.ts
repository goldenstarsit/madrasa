export interface DatabaseConnection {

  run(
    query: string,
    params?: unknown[],
    callback?: (
      error: Error | null
    ) => void
  ): void;


  get<T>(
    query: string,
    params?: unknown[],
    callback?: (
      error: Error | null,
      row?: T
    ) => void
  ): void;


  all<T>(
    query: string,
    params?: unknown[],
    callback?: (
      error: Error | null,
      rows?: T[]
    ) => void
  ): void;


  serialize(
    callback: () => void
  ): void;


  close(): void;


  execute(
    query: string,
    params?: unknown[]
  ): Promise<void>;


  query<T>(
    query: string,
    params?: unknown[]
  ): Promise<T[]>;


  transaction<T>(
    callback: () => Promise<T>
  ): Promise<T>;

}


export interface DatabaseConfig {
  filename: string;
}
