export interface User {
  _id: string;
  name: string;
  email: string;
  profileImage?: string;
  phone?: string;
  referralCode?: string;
  referralEarnings?: number;
  createdAt: string;
  updatedAt: string;
}

export interface AuthResponse {
  user: User;
  token: string;
}
