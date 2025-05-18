export interface RegisterRequest {
  username: string;
  password: string;
  confirm_password: string;
  email: string;
  full_name: string;
  phone: string;
}

export interface LoginRequest {
  username: string;
  password: string;
}

export interface JwtPayload {
  user_id: number;
  username: string;
  email: string;
  full_name: string;
  phone: string;
  exp: number;
  iat: number;
}

export interface ResumeUploadResponse {
  name: string;
  email: string;
  skills: string;
  ats_score: number;
}

export interface Skill {
  id: number;
  name: string;
}
