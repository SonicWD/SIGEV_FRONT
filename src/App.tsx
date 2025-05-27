import { Routes, Route } from "react-router-dom"
import { ThemeProvider } from "./contexts/ThemeContext"
import PublicRoutes from "./routes/PublicRoutes"
import PrivateRoutes from "./routes/PrivateRoutes"
import "./index.css"

function App() {
  return (
    <ThemeProvider defaultTheme="system" storageKey="sigev-ui-theme">
      <div className="min-h-screen flex flex-col">
        <Routes>
          {/* Rutas públicas */}
          <Route path="/*" element={<PublicRoutes />} />

          {/* Rutas privadas */}
          <Route path="/dashboard/*" element={<PrivateRoutes />} />
        </Routes>
      </div>
    </ThemeProvider>
  )
}

export default App
