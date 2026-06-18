const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000/api/v1';

interface RequestConfig {
  metodo?: string;
  corpo?: any;
  token?: string;
  params?: Record<string, string>;
}

async function request<T>(caminho: string, config: RequestConfig = {}): Promise<T> {
  const { metodo = 'GET', corpo, token, params } = config;

  let url = `${API_URL}${caminho}`;
  if (params) {
    const searchParams = new URLSearchParams(params);
    url += `?${searchParams.toString()}`;
  }

  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
  };
  if (token) headers['Authorization'] = `Bearer ${token}`;

  const response = await fetch(url, {
    method: metodo,
    headers,
    body: corpo ? JSON.stringify(corpo) : undefined,
  });

  if (!response.ok) {
    const erro = await response.json().catch(() => ({ mensagem: 'Erro desconhecido' }));
    throw new Error(erro.mensagem || `HTTP ${response.status}`);
  }

  return response.json();
}

export const api = {
  get: <T>(caminho: string, config?: RequestConfig) =>
    request<T>(caminho, { ...config, metodo: 'GET' }),

  post: <T>(caminho: string, corpo?: any, config?: RequestConfig) =>
    request<T>(caminho, { ...config, metodo: 'POST', corpo }),

  put: <T>(caminho: string, corpo?: any, config?: RequestConfig) =>
    request<T>(caminho, { ...config, metodo: 'PUT', corpo }),

  patch: <T>(caminho: string, corpo?: any, config?: RequestConfig) =>
    request<T>(caminho, { ...config, metodo: 'PATCH', corpo }),

  delete: <T>(caminho: string, config?: RequestConfig) =>
    request<T>(caminho, { ...config, metodo: 'DELETE' }),
};
