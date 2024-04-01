import React from "react"
import { BrowserRouter as Router } from "react-router-dom"
import AuthWrapper from "./components/auth/AuthWrapper"
import { RenderRoutes } from "./lib/RenderNavigation"
import { DarkModeProvider } from "./components/generes/DarkModeContext"
// Import DarkModeProvider

function App() {
  return (
    <DarkModeProvider>
      {/* Wrap the entire app in the DarkModeProvider */}
      <div className="bg-blue-200 dark:bg-gray-800">
        {/* Add dark mode classes */}
        <Router>
          <AuthWrapper>
            <RenderRoutes />
          </AuthWrapper>
        </Router>
      </div>
    </DarkModeProvider>
  )
}

export default App
