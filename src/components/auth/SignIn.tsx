import React, { useState } from "react"
import { Button } from "../ui/button"
import { Input } from "../ui/input"
import { AuthData } from "./AuthWrapper"
import { useNavigate } from "react-router-dom"
import Checkbox from "@mui/material/Checkbox"

const SignIn = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const { login, user, logout } = AuthData()
  const navigate = useNavigate()

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value)
  }

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value)
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (user) {
      logout()
      navigate("")
    } else {
      login(email, password)
      navigate("/dashboard")
    }
  }

  return (
    <div>
      <div className="flex flex-col">
        <Input
          className="w-80 md:w-96 lg:w-96 m-3 p-5 bg-white rounded-2xl border border-white"
          type="text"
          placeholder="Username"
          value={email}
          onChange={handleEmailChange}
        />

        <Input
          className="w-80 md:w-96 lg:w-96 m-3 p-5 bg-white rounded-2xl border border-white"
          type="password"
          placeholder="Password"
          value={password}
          onChange={handlePasswordChange}
        />
      </div>
      <div className="flex justify-between items-center">
        <label className="flex items-center">
          <Checkbox style={{ color: "white" }} />
          <span className="text-white">Remember me</span>
        </label>
        <a href="#" className="text-white hover:text-blue-800 pr-2">
          Forgot Password?
        </a>
      </div>
      <div className="flex flex-col items-center">
        {/* Updated to center the content */}
        <Button
          className="sm:w-64 md:w-64 lg:w-72 m-3 p-1 rounded-3xl font-bold text-[#033047] text-[29px] text-center
     bg-blue-300 border border-blue-300"
          type="submit"
          onClick={handleSubmit}
        >
          Login
        </Button>
      </div>
    </div>
  )
}

export default SignIn
