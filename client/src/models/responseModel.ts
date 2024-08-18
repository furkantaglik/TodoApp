export interface ResponseModel {
  message: string | null;
  data: object | null | string;
  code: number;
  status: boolean;
}
