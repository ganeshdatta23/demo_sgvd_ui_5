import { API_CONFIG, TokenManager } from './config';

class ApiClient {
  private async request<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
    const token = TokenManager.getToken();
    const headers: HeadersInit = {
      'Content-Type': 'application/json',
      ...options.headers,
    };
    
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }

    const response = await fetch(`${API_CONFIG.BASE_URL}${endpoint}`, {
      ...options,
      headers,
    });

    if (!response.ok) {
      const error = await response.json().catch(() => ({ detail: 'Request failed' }));
      throw new Error(error.detail || `HTTP ${response.status}`);
    }

    return response.json();
  }

  // Auth
  async login(email: string, password: string) {
    const formData = new URLSearchParams();
    formData.append('username', email);
    formData.append('password', password);

    const response = await fetch(`${API_CONFIG.BASE_URL}/sgvd/auth/token`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: formData,
    });

    if (!response.ok) throw new Error('Login failed');
    const data = await response.json();
    TokenManager.setToken(data.access_token);
    return data;
  }

  async register(email: string, password: string, full_name: string) {
    return this.request('/sgvd/auth/register', {
      method: 'POST',
      body: JSON.stringify({ email, password, full_name }),
    });
  }

  async getMe() {
    return this.request('/sgvd/auth/me');
  }

  // Spiritual Activities
  async logJapa(count: number, location_id?: string) {
    return this.request('/sgvd/spiritual/japa', {
      method: 'POST',
      body: JSON.stringify({ count, location_id }),
    });
  }

  async logPranayama(count: number, location_id?: string) {
    return this.request('/sgvd/spiritual/pranayama', {
      method: 'POST',
      body: JSON.stringify({ count, location_id }),
    });
  }

  async logDarshan(location_id?: string) {
    return this.request('/sgvd/spiritual/darshan', {
      method: 'POST',
      body: JSON.stringify({ location_id }),
    });
  }

  async getStats() {
    return this.request('/sgvd/spiritual/stats');
  }

  async getStatsToday() {
    return this.request('/sgvd/spiritual/stats/today');
  }

  // Admin
  async getAdminStats(sort_by?: string, order?: string) {
    const params = new URLSearchParams();
    if (sort_by) params.append('sort_by', sort_by);
    if (order) params.append('order', order);
    return this.request(`/sgvd/admin/spiritual-stats?${params}`);
  }

  // Locations
  async getLocations() {
    return this.request('/sgvd/locations');
  }

  async saveLocation(name: string, latitude: number, longitude: number, description?: string) {
    return this.request('/sgvd/locations', {
      method: 'POST',
      body: JSON.stringify({ name, latitude, longitude, description }),
    });
  }

  // Events
  async getEvents() {
    return this.request('/sgvd/events');
  }

  // User Profile
  async updateProfile(data: any) {
    return this.request('/sgvd/users/profile', {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  }

  async getUserProfile() {
    return this.request('/sgvd/users/profile');
  }

  logout() {
    TokenManager.removeToken();
  }
}

export const apiClient = new ApiClient();
