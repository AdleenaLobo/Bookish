const BASE_URL = "http://localhost:5000/api";

export async function getBooks() {
  const response = await fetch(`${BASE_URL}/books`);

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Failed to fetch books");
  }

  return data;
}

export async function getBook(id) {
  const response = await fetch(`${BASE_URL}/books/${id}`);

  if (!response.ok) {
    throw new Error("Failed to fetch book");
  }

  return await response.json();
}