import Rooms from "@/components/pages/Rooms"
import Devices from "@/components/pages/Devices"
import LoginPage from "@/components/pages/LoginPage"
import DashBoard from "@/components/pages/DashBoard"
import Statictics from "@/components/pages/Statictics"
import LivingRoom from "@/components/pages/LivingRoom"
import BathRoom from "@/components/pages/BathRoom"
import BedRoom from "@/components/pages/BedRoom"
import Kitchen from "@/components/pages/Kitchen"

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
    path: "/rooms/livingRoom",
    name: "livingRoom",
    element: <LivingRoom />,
    isPrivate: true,
  },
  {
    path: "rooms/bathRoom",
    name: "bathRoom",
    element: <BathRoom />,
    isPrivate: true,
  },
  {
    path: "rooms/bedRoom",
    name: "bedRoom",
    element: <BedRoom />,
    isPrivate: true,
  },
  {
    path: "rooms/kitchen",
    name: "kitchen",
    element: <Kitchen />,
    isPrivate: true,
  },
  {
    path: "/statictics",
    name: "Statictics",
    element: <Statictics />,
    isPrivate: true,
  },
]
