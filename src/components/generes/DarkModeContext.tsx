import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react"

// Define the shape of the context state
interface DarkModeContextType {
  isDarkMode: boolean
  setIsDarkMode: (isDark: boolean) => void
}

// Create the context with an undefined initial value but assert the type
const DarkModeContext = createContext<DarkModeContextType | undefined>(
  undefined
)

interface DarkModeProviderProps {
  children: ReactNode
}

export const DarkModeProvider: React.FC<DarkModeProviderProps> = ({
  children,
}) => {
  const [isDarkMode, setIsDarkMode] = useState<boolean>(() => {
    // Check local storage for dark mode preference
    const storedPreference = localStorage.getItem("darkMode")
    return storedPreference === "true" ? true : false
  })

  useEffect(() => {
    localStorage.setItem("darkMode", String(isDarkMode))
    if (isDarkMode) {
      document.documentElement.classList.add("dark")
    } else {
      document.documentElement.classList.remove("dark")
    }
  }, [isDarkMode])

  return (
    <DarkModeContext.Provider value={{ isDarkMode, setIsDarkMode }}>
      {children}
    </DarkModeContext.Provider>
  )
}

// Custom hook for using the dark mode context
export const useDarkMode = (): DarkModeContextType => {
  const context = useContext(DarkModeContext)
  if (context === undefined) {
    throw new Error("useDarkMode must be used within a DarkModeProvider")
  }
  return context
}
