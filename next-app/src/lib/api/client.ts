import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';

class ApiClient {
  private client: AxiosInstance;

  constructor() {
    this.client = axios.create({
      baseURL: process.env.NEXT_PUBLIC_API_URL || '/api',
      timeout: 10000,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    // Request interceptor
    this.client.interceptors.request.use(
      (config) => {
        // Add auth token if available
        const token = localStorage.getItem('auth_token');
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );

    // Response interceptor
    this.client.interceptors.response.use(
      (response) => response.data,
      (error) => {
        if (error.response?.status === 401) {
          // Handle unauthorized access
          localStorage.removeItem('auth_token');
          window.location.href = '/auth/login';
        }
        return Promise.reject(error);
      }
    );
  }

  // Products
  async getProducts(params?: {
    limit?: number;
    offset?: number;
    categoryId?: string;
    featured?: boolean;
    search?: string;
    minPrice?: number;
    maxPrice?: number;
    sortBy?: string;
    sortOrder?: 'ASC' | 'DESC';
  }) {
    return this.client.get('/products', { params });
  }

  async getProduct(id: string) {
    return this.client.get(`/products/${id}`);
  }

  async createProduct(data: any) {
    return this.client.post('/products', data);
  }

  async updateProduct(id: string, data: any) {
    return this.client.put(`/products/${id}`, data);
  }

  async deleteProduct(id: string) {
    return this.client.delete(`/products/${id}`);
  }

  // Categories
  async getCategories(includeInactive?: boolean) {
    return this.client.get('/categories', {
      params: { includeInactive },
    });
  }

  async createCategory(data: any) {
    return this.client.post('/categories', data);
  }

  // Cart
  async getCart() {
    return this.client.get('/cart');
  }

  async addToCart(data: {
    productId: string;
    quantity: number;
    price: number;
    attributes?: any;
  }) {
    return this.client.post('/cart', data);
  }

  async removeFromCart(itemId: string) {
    return this.client.delete('/cart', {
      params: { itemId },
    });
  }

  // Orders
  async getOrders(params?: {
    limit?: number;
    offset?: number;
    status?: string;
  }) {
    return this.client.get('/orders', { params });
  }

  async getOrder(id: string) {
    return this.client.get(`/orders/${id}`);
  }

  async createOrder(data: {
    payment_method: string;
    subtotal: number;
    discount?: number;
    tax?: number;
    shipping_cost?: number;
    total: number;
    shipping_address_id?: string;
    billing_address_id?: string;
    notes?: string;
    items: Array<{
      product_id: string;
      product_name: string;
      product_sku?: string;
      quantity: number;
      price: number;
      discount?: number;
      attributes?: any;
    }>;
  }) {
    return this.client.post('/orders', data);
  }

  async updateOrderStatus(
    id: string,
    data: {
      status: string;
      tracking_number?: string;
    }
  ) {
    return this.client.patch(`/orders/${id}`, data);
  }

  // Health
  async checkHealth() {
    return this.client.get('/health');
  }

  // Database Management (Dev only)
  async initializeDatabase() {
    return this.client.post('/db/init');
  }

  async seedDatabase() {
    return this.client.post('/db/seed');
  }
}

export const apiClient = new ApiClient();
export default apiClient;
