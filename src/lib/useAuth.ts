import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"

export default function useAuth(redirectToLogin = true) {
  const navigate = useNavigate()
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false)

  useEffect(() => {
    const token = localStorage.getItem("accessToken")

    if (!token) {
      setIsAuthenticated(false)
      if (redirectToLogin) {
        navigate("/login")
      }
    } else {
      setIsAuthenticated(true)
    }
  }, [navigate, redirectToLogin])

  return isAuthenticated
}
