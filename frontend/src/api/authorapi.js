const BASE_URL = "http://localhost:5000/api";

export async function getAuthors() {
  const response = await fetch(`${BASE_URL}/authors`);

  if (!response.ok) {
    throw new Error("Failed to fetch authors");
  }

  return await response.json();
}

export async function getAuthor(id) {
  const response = await fetch(`${BASE_URL}/authors/${id}`);

  if (!response.ok) {
    throw new Error("Failed to fetch author");
  }

  return await response.json();
}
