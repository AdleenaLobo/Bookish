import { createUser, loginUser } from "../api/authapi.js";

export const signup = async (data) => {
  return await createUser(data);
};

export const login = async (data) => {
  return await loginUser(data);
};
