import { getBooks , getBook } from "../api/bookapi";

export const fetchBooks = async () => {
  return await getBooks();
};

export const fetchBook = async (id) => {
  return await getBook(id);
};