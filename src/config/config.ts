// src/config/config.ts
const ENV = "development" as "development" | "production"

const config = {
  development: {
    API_URL: "http://127.0.0.1:8000/sigev/v1",
  },
  production: {
    API_URL: "https://event-app-backend-44ux.onrender.com",
  },
}

const API_URL = config[ENV].API_URL

export default API_URL
