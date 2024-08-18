import { Context } from "hono";
import { StatusCode } from "hono/utils/http-status";

export default function response(
  c: Context,
  message: string | null = null,
  data: object | null = null,
  code: StatusCode = 200,
  status: boolean = true
) {
  const responsePayload = {
    message: message,
    data: data && Array.isArray(data) && data.length === 0 ? null : data,
    code: code,
    status: status,
  };

  return c.json(responsePayload, code);
}
