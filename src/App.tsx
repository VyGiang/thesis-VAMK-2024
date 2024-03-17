import AuthWrapper from "./components/auth/AuthWrapper"
import { BrowserRouter as Router } from "react-router-dom"
import { RenderRoutes } from "./lib/RenderNavigation"

function App() {
  return (
    <div className="bg-blue-200">
      <Router>
        <AuthWrapper>
          <RenderRoutes />
        </AuthWrapper>
      </Router>
    </div>
  )
}

export default App
