import axios from "axios"
import API_URL from "@/config/config";
const api = axios.create({
  baseURL: API_URL,
})

// Interceptor para manejar tokens vencidos
api.interceptors.response.use(
  res => res,
  async error => {
    const originalRequest = error.config

    if (
      error.response?.status === 401 &&
      !originalRequest._retry &&
      localStorage.getItem("refreshToken")
    ) {
      originalRequest._retry = true

      try {
        const refreshResponse = await axios.post(`${API_URL}/api/token/refresh/`, {
          refresh: localStorage.getItem("refreshToken"),
        })

        const newAccessToken = refreshResponse.data.access
        localStorage.setItem("accessToken", newAccessToken)

        // Añadir nuevo token a la petición original y reintentar
        originalRequest.headers["Authorization"] = `Bearer ${newAccessToken}`
        return api(originalRequest)
      } catch (refreshError) {
        localStorage.clear()
        window.location.href = "/login"
        return Promise.reject(refreshError)
      }
    }

    return Promise.reject(error)
  }
)

export default api
