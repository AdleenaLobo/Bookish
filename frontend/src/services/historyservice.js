import { getHistory , createHistory } from "../api/historyapi";

export async function fetchHistory(userId) {
  return await getHistory(userId);
}

export async function leaseBook(history) {
  return await createHistory(history);
}