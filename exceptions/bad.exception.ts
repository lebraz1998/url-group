import { NextApiRequest, NextApiResponse } from "next";

export function methodNotAllowedExceptionHandler(
  error: any,
  req: NextApiRequest,
  res: NextApiResponse,
) {
  res.status(400).json(error);
}
