import type { Response } from 'express';

export interface ApiResponse<T = any> {
  code: number;
  message: string;
  data?: T;
}

export const success = <T>(res: Response, data?: T, message = 'success') => {
  res.json({ code: 200, message, data });
};

export const created = <T>(res: Response, data?: T, message = 'created') => {
  res.status(201).json({ code: 201, message, data });
};

export const badRequest = (res: Response, message = 'bad request') => {
  res.status(400).json({ code: 400, message });
};

export const unauthorized = (res: Response, message = 'unauthorized') => {
  res.status(401).json({ code: 401, message });
};

export const forbidden = (res: Response, message = 'forbidden') => {
  res.status(403).json({ code: 403, message });
};

export const notFound = (res: Response, message = 'not found') => {
  res.status(404).json({ code: 404, message });
};

export const error = (res: Response, message = 'internal server error') => {
  res.status(500).json({ code: 500, message });
};
