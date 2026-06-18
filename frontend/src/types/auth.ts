export interface LoginPayload {
  username: string;
  password: string;
}

export interface RegisterPayload {
  username: string;
  password: string;
  email: string;
  mobile: string;
  resume: string;
}

export interface AuthUser {
  _id: string;
  username: string;
  email: string;
  mobile: string;
  resume?: string;
}

export interface AuthResponse {
  result: AuthUser;
  token: string;
}

export interface ApiErrorResponse {
  message: string;
}
