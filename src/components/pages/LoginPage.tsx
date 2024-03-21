import BackgroundImage from "@/assets/background_main_page.png"
import { Button } from "../ui/button"
import SignIn from "../auth/SignIn"
import AuthDetails from "../auth/AuthDetails"

const LoginPage = () => {
  return (
    <div
      className="flex justify-center h-screen w-screen bg-blue-200"
      style={{
        backgroundImage: `url(${BackgroundImage})`,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
      }}
    >
      <div className="Login flex flex-col items-center justify-center content-center">
        <p className=" md:text-5xl lg:text-6xl sm:text-5xl font-bold font-merri text-white  mb-4 md:mb-6 lg:mb-8 ">
          Login
        </p>
        <SignIn />
        <AuthDetails />
        <Button className="w-48 md:w-56 lg:w-60 m-3 p-2 bg-[#76A2CB] rounded-3xl border border-[#76A2CB] font-bold s text-[19px] text-center">
          Forget password ?
        </Button>
      </div>
    </div>
  )
}

export default LoginPage
