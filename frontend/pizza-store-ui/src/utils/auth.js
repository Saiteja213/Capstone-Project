import { jwtDecode } from "jwt-decode";

export const getUserRole = () => {
  const token = sessionStorage.getItem("token");

  if (!token) return null;

  const decoded = jwtDecode(token);
  return decoded.role;
};