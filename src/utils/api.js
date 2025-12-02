// API utility functions for backend communication

const API_BASE_URL = 'http://localhost:5000/api'

// Helper function for API calls
async function apiCall(endpoint, options = {}) {
  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    })

    if (!response.ok) {
      const error = await response.json().catch(() => ({ error: 'Request failed' }))
      throw new Error(error.error || 'Request failed')
    }

    return await response.json()
  } catch (error) {
    console.error('API Error:', error)
    throw error
  }
}

// Items API
export const itemsAPI = {
  getAll: () => apiCall('/items'),
  getById: (id) => apiCall(`/items/${id}`),
  create: (item) => apiCall('/items', {
    method: 'POST',
    body: JSON.stringify(item),
  }),
  update: (id, item) => apiCall(`/items/${id}`, {
    method: 'PUT',
    body: JSON.stringify(item),
  }),
  delete: (id) => apiCall(`/items/${id}`, {
    method: 'DELETE',
  }),
}

// Categories API
export const categoriesAPI = {
  getAll: () => apiCall('/categories'),
  create: (category) => apiCall('/categories', {
    method: 'POST',
    body: JSON.stringify(category),
  }),
  update: (id, category) => apiCall(`/categories/${id}`, {
    method: 'PUT',
    body: JSON.stringify(category),
  }),
  delete: (id) => apiCall(`/categories/${id}`, {
    method: 'DELETE',
  }),
}

// Health check
export const healthCheck = () => apiCall('/health')

