const BASE_URL = "http://localhost:5000/api";

export async function getHistory(userId) {
  const response = await fetch(`${BASE_URL}/history/${userId}`);

  if (!response.ok) {
    throw new Error("Failed to fetch history");
  }

  return response.json();
}

export async function createHistory(history) {
  const response = await fetch(`${BASE_URL}/history`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(history),
  });

  if (!response.ok) {
    throw new Error("Failed to create history");
  }

  return response.json();
}