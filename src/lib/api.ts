import axios from "axios"
import API_URL from "@/config/config"

const api = axios.create({
  baseURL: API_URL,
})

// ✅ Interceptor para añadir el token a cada request
api.interceptors.request.use(
  config => {
    const token = localStorage.getItem("accessToken")
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`
    }
    return config
  },
  error => Promise.reject(error)
)

// 🔄 Interceptor para manejar tokens vencidos
api.interceptors.response.use(
  res => res,
  async error => {
    const originalRequest = error.config

    if (
      error.response?.status === 401 &&
      !originalRequest._retry &&
      localStorage.getItem("refresh")
    ) {
      originalRequest._retry = true

      try {
        const refreshResponse = await axios.post(`${API_URL}/api/token/refresh/`, {
          refresh: localStorage.getItem("refresh"),
        })

        const newAccessToken = refreshResponse.data.access
        localStorage.setItem("accessToken", newAccessToken)

        originalRequest.headers["Authorization"] = `Bearer ${newAccessToken}`
        return api(originalRequest)
      } catch (refreshError) {
        localStorage.clear()
        window.location.href = "/iniciar-sesion"
        return Promise.reject(refreshError)
      }
    }

    return Promise.reject(error)
  }
)

export default api
