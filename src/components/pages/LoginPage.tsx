import BackgroundImage from "@/assets/background_main_page.png"
import SignIn from "../auth/SignIn"
import AuthDetails from "../auth/AuthDetails"

const LoginPage = () => {
  return (
    <div
      className="flex justify-center items-center h-screen w-screen bg-blue-200"
      style={{
        backgroundImage: `url(${BackgroundImage})`,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
      }}
    >
      <div className="flex flex-col items-center justify-center content-center bg-white bg-opacity-10 backdrop-filter backdrop-blur-lg rounded-3xl border border-gray-200 shadow-lg p-8">
        <h1 className="text-5xl font-bold text-white mb-8">Login</h1>
        <SignIn />
        <AuthDetails />
      </div>
    </div>
  )
}

export default LoginPage
