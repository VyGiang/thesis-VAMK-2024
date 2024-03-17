import Rooms from "@/components/pages/Rooms"
import Devices from "@/components/pages/Devices"
import LoginPage from "@/components/pages/LoginPage"
import DashBoard from "@/components/pages/DashBoard"
import Room from "@/components/pages/Room"

export const nav = [
  {
    path: "/rooms",
    name: "Rooms",
    element: <Rooms />,
    isPrivate: true,
  },
  {
    path: "/dashboard",
    name: "Dashboard",
    element: <DashBoard />,
    isPrivate: true,
  },
  {
    path: "/devices",
    name: "Devices",
    element: <Devices />,
    isPrivate: true,
  },
  {
    path: "/",
    name: "Login",
    element: <LoginPage />,
    isPrivate: false,
  },
  {
    path: "/room",
    name: "room",
    element: <Room />,
    isPrivate: false,
  },
]
