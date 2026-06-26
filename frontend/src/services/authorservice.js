import { getAuthors, getAuthor } from "../api/authorapi";

export const fetchAuthors = async () => {
  return await getAuthors();
};

export const fetchAuthor = async (id) => {
  return await getAuthor(id);
};
