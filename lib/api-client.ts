// Client-side API helper functions

export interface ApiResponse<T = any> {
  success: boolean
  data?: T
  error?: string
  details?: any
}

class ApiClient {
  private baseUrl: string

  constructor(baseUrl = "/api") {
    this.baseUrl = baseUrl
  }

  private async request<T>(endpoint: string, options?: RequestInit): Promise<ApiResponse<T>> {
    try {
      const response = await fetch(`${this.baseUrl}${endpoint}`, {
        ...options,
        headers: {
          "Content-Type": "application/json",
          ...options?.headers,
        },
      })

      const data = await response.json()
      return data
    } catch (error) {
      console.error(`[v0] API request failed: ${endpoint}`, error)
      return {
        success: false,
        error: "Network error occurred",
      }
    }
  }

  // Projects API
  async getProjects(category?: string) {
    const url = category ? `/projects?category=${category}` : "/projects"
    return this.request(url)
  }

  async getProjectById(id: string) {
    return this.request(`/projects/${id}`)
  }

  async createProject(data: any) {
    return this.request("/projects", {
      method: "POST",
      body: JSON.stringify(data),
    })
  }

  async updateProject(id: string, data: any) {
    return this.request(`/projects/${id}`, {
      method: "PUT",
      body: JSON.stringify(data),
    })
  }

  async deleteProject(id: string) {
    return this.request(`/projects/${id}`, {
      method: "DELETE",
    })
  }

  // Contact API
  async submitContact(data: { name: string; email: string; message: string }) {
    return this.request("/contact", {
      method: "POST",
      body: JSON.stringify(data),
    })
  }

  // Newsletter API
  async subscribeNewsletter(email: string) {
    return this.request("/newsletter", {
      method: "POST",
      body: JSON.stringify({ email }),
    })
  }
}

export const apiClient = new ApiClient()
