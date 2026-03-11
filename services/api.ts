export const BASE_URL = 'https://fakestoreapi.com';

export type ApiError = {
  message: string;
  status?: number;
};

const fetcher = async <T>(endpoint: string, options: RequestInit = {}): Promise<T> => {
  const res = await fetch(`${BASE_URL}${endpoint}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...(options.body ? { 'Content-Type': 'application/json' } : {}),
      ...options.headers,
    },
  });

  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}));
    const msg = errorData.message || `Error ${res.status}: ${res.statusText}`;
    const error = new Error(msg);
    (error as any).status = res.status;
    throw error;
  }

  return res.json();
};

export const api = {
  get: <T>(url: string, opt?: RequestInit) => fetcher<T>(url, { ...opt, method: 'GET' }),
  post: <T>(url: string, body: any, opt?: RequestInit) => fetcher<T>(url, { ...opt, method: 'POST', body: JSON.stringify(body) }),
  put: <T>(url: string, body: any, opt?: RequestInit) => fetcher<T>(url, { ...opt, method: 'PUT', body: JSON.stringify(body) }),
  delete: <T>(url: string, opt?: RequestInit) => fetcher<T>(url, { ...opt, method: 'DELETE' }),
};
