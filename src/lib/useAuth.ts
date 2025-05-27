import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"

export default function useAuth(redirectToLogin = true) {
  const navigate = useNavigate()
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const token = localStorage.getItem("accessToken") // ← este es el nombre correcto

    if (token) {
      setIsAuthenticated(true)
    } else {
      setIsAuthenticated(false)
      if (redirectToLogin) navigate("/iniciar-sesion", { replace: true })
    }

    setLoading(false)
  }, [navigate, redirectToLogin])

  return { isAuthenticated, loading }
}
