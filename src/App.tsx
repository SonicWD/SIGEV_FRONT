import { Routes, Route } from "react-router-dom"
import PublicRoutes from '@/routes/PublicRoutes'
import PrivateRoutes from '@/routes/PrivateRoutes'
import { ThemeProvider } from "./contexts/ThemeContext"
import "./index.css"

export default function App() {
  return (
      <ThemeProvider defaultTheme="system" storageKey="sigev-ui-theme">
    <Routes>
      <Route path="/*" element={<PublicRoutes />} />
      <Route path="/dashboard/*" element={<PrivateRoutes />} />
    </Routes>
        </ThemeProvider>

  )
}