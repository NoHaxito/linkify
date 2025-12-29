export class ApiError extends Error {
  constructor(
    message: string,
    public statusCode?: number
  ) {
    super(message);
    this.name = "ApiError";
  }
}

export async function apiRequest<T>(
  url: string,
  options?: RequestInit
): Promise<T> {
  try {
    const response = await fetch(url, {
      ...options,
      headers: {
        "Content-Type": "application/json",
        ...options?.headers,
      },
    });

    const data = await response.json();

    if (!response.ok || data.error) {
      throw new ApiError(data.message || "An error occurred", response.status);
    }

    return data;
  } catch (error) {
    if (error instanceof ApiError) {
      throw error;
    }
    throw new ApiError("Network error occurred");
  }
}

export async function createLink(values: {
  url: string;
  slug: string;
  password?: string;
  expires_at?: string;
  allowUnauthenticated: boolean;
}) {
  return apiRequest<{ link: string }>("/api/link/create", {
    method: "POST",
    body: JSON.stringify(values),
  });
}

export async function deleteLink(id: string) {
  return apiRequest<{ message: string }>(`/api/link/${id}/delete`, {
    method: "DELETE",
  });
}

export async function verifyPassword(slug: string, password: string) {
  return apiRequest<{ success: boolean }>(`/api/link/${slug}/verify-password`, {
    method: "POST",
    body: JSON.stringify({ password }),
  });
}
