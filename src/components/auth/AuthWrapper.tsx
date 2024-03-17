import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react"
import firebase from "firebase/compat/app"
import { auth } from "@/firebase"
import {
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth"

// import { RenderRoutes } from "@/lib/RenderNavigation";

export type TAuthContext = {
  user: firebase.User | null
  login: (email: string, password: string) => void
  logout: () => void
}

const AuthContext = createContext<TAuthContext | undefined>({
  user: null,
  login: () => {},
  logout: () => {},
})

export const AuthData = (): TAuthContext => {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("AuthData must be used within an AuthProvider")
  }
  return context
}

const AuthWrapper = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<firebase.User | null>(null)

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in.
        console.log(typeof user)
        setUser(user)
      } else {
        // No user is signed in.
        setUser(null)
      }
    })

    // Cleanup subscription on unmount
    return () => unsubscribe()
  }, [])

  const login = (email: string, password: string) => {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        console.log(userCredential)
        console.log(typeof user)
        // ...
      })
      .catch((error) => {
        console.log(error)
      })
    // TODO: Implement login logic
  }

  const logout = async () => {
    try {
      await signOut(auth)
      setUser(null) // Ensure user state is cleared
    } catch (error) {
      console.error("Logout error:", error)
    }
  }

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      <>{children}</>
    </AuthContext.Provider>
  )
}

export default AuthWrapper
