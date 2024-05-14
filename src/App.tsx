import React from "react"
import { BrowserRouter as Router } from "react-router-dom"
import AuthWrapper from "./components/auth/AuthWrapper"
import { RenderRoutes } from "./lib/RenderNavigation"
import { DarkModeProvider } from "./components/generes/DarkModeContext"
import withErrorBoundary from "./error_handling/WrapperErrorBoundary"
import { DataProvider } from "./lib/DataContext"

function App() {
  return (
    <DarkModeProvider>
      <DataProvider>
        <div className="bg-blue-200 dark:bg-gray-800">
          <Router>
            <AuthWrapper>
              <RenderRoutes />
            </AuthWrapper>
          </Router>
        </div>
      </DataProvider>
    </DarkModeProvider>
  )
}

export default withErrorBoundary(App)
