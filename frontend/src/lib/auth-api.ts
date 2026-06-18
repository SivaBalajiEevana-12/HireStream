import type {
  LoginPayload,
  RegisterPayload,
  AuthResponse,
  ApiErrorResponse,
} from "../types/auth";

const BASE_URL = "http://localhost:5000/api/auth";

async function handleResponse(res: Response): Promise<AuthResponse> {
  const data = await res.json();
  if (!res.ok) {
    const errorData = data as ApiErrorResponse;
    throw new Error(errorData.message || "Something went wrong");
  }
  return data as AuthResponse;
}

export async function loginRequest(payload: LoginPayload): Promise<AuthResponse> {
  const res = await fetch(`${BASE_URL}/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  return handleResponse(res);
}

export async function registerRequest(payload: RegisterPayload): Promise<AuthResponse> {
  const res = await fetch(`${BASE_URL}/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  return handleResponse(res);
}
