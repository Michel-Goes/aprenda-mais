import { supabase } from './supabase';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3003/api';

/**
 * Wrapper para chamadas fetch que automaticamente injeta o token JWT do Supabase
 */
export async function fetchWithAuth(endpoint: string, options: RequestInit = {}) {
  const { data: { session } } = await supabase.auth.getSession();
  
  const headers = new Headers(options.headers);
  
  if (session?.access_token) {
    headers.set('Authorization', `Bearer ${session.access_token}`);
  }
  
  if (!(options.body instanceof FormData) && !headers.has('Content-Type')) {
    headers.set('Content-Type', 'application/json');
  }

  const response = await fetch(`${API_URL}${endpoint}`, {
    ...options,
    headers,
  });

  if (!response.ok) {
    let errorData;
    try {
      errorData = await response.json();
    } catch (e) {
      errorData = { error: `Erro do servidor: ${response.status}` };
    }
    throw new Error(errorData.error || `Erro da API: ${response.status}`);
  }

  return response.json();
}
