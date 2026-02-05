export type LoginRequest = {
  email: string;
  password: string;
};

export type LoginResponse = {
  access_token: string;
  user: User;
};

export type LogoutResponse = {
  message: string;
  status?: number;
};

export type RegisterRequest = {
  email: string;
  password: string;
  name: string;
};

export type RegisterResponse = {
    message: string;
  status?: number;

};

export type User = {
  id?: string;
  email?: string;
  name?: string;
  createdAt?: string | Date;
  password?: string;
};

export interface ApiResponse<T> {
  message: string;
  error: string | null;
  data: T;
  status: number;
}

export interface ApiError {
  status: number;
  message: string;
  errors?: unknown;
}

export type CommonErrorInterface = {
  message?: string;
  error?: string;
  data?: null;
  status?: number;
};
