export interface ClassResponse<T> {

  success: boolean;

  data: T;

}


export function successResponse<T>(
  data: T
): ClassResponse<T> {

  return {
    success: true,
    data
  };

}
