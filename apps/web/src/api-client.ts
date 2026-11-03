export interface ApiErrorBody {
  error?: { code?: string; message?: string; requestId?: string; details?: unknown };
}

export class ApiError extends Error {
  constructor(
    readonly status: number,
    readonly code: string | undefined,
    readonly requestId: string | undefined,
    message: string,
  ) {
    super(message);
    this.name = 'ApiError';
  }
}

export interface ApiClientOptions {
  baseUrl?: string;
  getCsrfToken?: () => string | null;
  fetcher?: typeof fetch;
}

export function createApiClient(options: ApiClientOptions = {}) {
  const baseUrl = (options.baseUrl ?? '/api/v1').replace(/\/$/, '');
  const fetcher = options.fetcher ?? fetch;

  async function request<T>(path: string, init: RequestInit = {}): Promise<T> {
    const method = (init.method ?? 'GET').toUpperCase();
    const headers = new Headers(init.headers);
    headers.set('Accept', 'application/json');

    if (init.body && !headers.has('Content-Type')) {
      headers.set('Content-Type', 'application/json');
    }
    if (!['GET', 'HEAD', 'OPTIONS'].includes(method)) {
      const token = options.getCsrfToken?.();
      if (token) headers.set('X-CSRF-Token', token);
    }

    const response = await fetcher(`${baseUrl}${path.startsWith('/') ? path : `/${path}`}`, {
        ...init,
        method,
        headers,
        credentials: 'include',
      },
    );

    if (response.status === 204) return undefined as T;
    const body = (await response.json().catch(() => ({}))) as ApiErrorBody & { data?: T };
    if (!response.ok) {
      throw new ApiError(
        response.status,
        body.error?.code,
        body.error?.requestId,
        body.error?.message ?? 'Request failed.',
      );
    }
    return body.data as T;
  }

  return {
    get: <T>(path: string) => request<T>(path),
    post: <T>(path: string, data?: unknown) =>
      request<T>(path, {
        method: 'POST',
        body: data === undefined ? undefined : JSON.stringify(data),
      }),
    patch: <T>(path: string, data: unknown) =>
      request<T>(path, { method: 'PATCH', body: JSON.stringify(data) }),
    delete: (path: string) => request<void>(path, { method: 'DELETE' }),
  };
}

export const apiClient = createApiClient();
