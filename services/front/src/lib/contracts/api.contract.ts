import {z} from 'zod';

export const apiResponseSchema = z.discriminatedUnion('success', [
  z.object({
    success: z.literal(true),
    body: z.any().optional(),
  }),
  z.object({
    success: z.literal(false),
    error: z.string(),
  }),
]);

export type ApiResponse<T = any> = 
  | { success: true; body?: T }
  | { success: false; error: string };


export const successResponse = <T>(body?: T): ApiResponse<T> => ({ success: true, body });

export const errorResponse = (error: string): ApiResponse<never> => ({ success: false, error });
