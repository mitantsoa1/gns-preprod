import { User } from ".";

// types/api.ts
export interface ApiResponse<T = any> {
    data: T;
    message?: string;
    status: number;
}

export interface AuthResponse {
    user: User;
    token: string;
    permissions: string[];
}

export interface ErrorResponse {
    message: string;
    errors?: Record<string, string[]>;
    status: number;
}