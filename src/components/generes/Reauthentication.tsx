// Reauthentication.tsx
import React, { useState } from "react"
import { auth } from "@/firebase"
import { EmailAuthProvider, reauthenticateWithCredential } from "firebase/auth"

interface Props {
  isOpen: boolean
  setIsOpen: (isOpen: boolean) => void
  onReauthenticate: () => void
}

const Reauthentication: React.FC<Props> = ({
  isOpen,
  setIsOpen,
  onReauthenticate,
}) => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")

  const handleReauthenticate = async () => {
    try {
      const credential = EmailAuthProvider.credential(email, password)
      await reauthenticateWithCredential(auth.currentUser!, credential)
      onReauthenticate()
      setIsOpen(false)
    } catch (err) {
      setError(
        "Re-authentication failed. Please check your credentials and try again."
      )
    }
  }

  const overlayStyle = isOpen
    ? {
        opacity: 1,
        visibility: "visible" as const,
      }
    : {
        opacity: 0,
        visibility: "hidden" as const,
      }

  return (
    <div
      style={overlayStyle}
      className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-40 transition-opacity duration-500"
      onClick={() => setIsOpen(false)}
    >
      <div
        className="w-full px-4 py-6 sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-2xl mx-auto bg-white border-0 shadow-lg sm:rounded-3xl"
        onClick={(e) => e.stopPropagation()}
      >
        <h1 className="text-2xl font-bold mb-8">Re-authenticate</h1>
        <form id="form" noValidate>
          <div className="relative z-0 w-full mb-5">
            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="pt-3 pb-2 block w-full px-0 mt-0 bg-transparent border-0 border-b-2 focus:outline-none"
            />
          </div>
          <div className="relative z-0 w-full mb-5">
            <input
              type="password"
              name="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="pt-3 pb-2 block w-full px-0 mt-0 bg-transparent border-0 border-b-2 focus:outline-none"
            />
          </div>
          {error && <span className="text-sm text-red-600">{error}</span>}
          <button
            type="button"
            className="w-full px-6 py-3 mt-3 text-lg text-white rounded-lg shadow bg-pink-500 hover:bg-pink-600 focus:outline-none"
            onClick={handleReauthenticate}
          >
            Re-authenticate
          </button>
        </form>
      </div>
    </div>
  )
}

export default Reauthentication
