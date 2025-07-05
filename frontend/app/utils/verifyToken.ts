import { jwtDecode } from "jwt-decode";
import type { TUser } from "@/redux/features/auth/authSlice";

export const verifyToken = (token: string) => {
  const user: TUser = jwtDecode(token);
  return user;
};
