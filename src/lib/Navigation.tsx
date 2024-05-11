import Rooms from "@/components/pages/Rooms";
import Devices from "@/components/pages/Devices";
import LoginPage from "@/components/pages/LoginPage";
import DashBoard from "@/components/pages/DashBoard";
import Statictics from "@/components/pages/Statictics";
import Setting from "@/components/pages/Setting";
import UserDetail from "@/components/pages/UserDetail ";
import ManageRoom from "@/components/pages/ManageRoom";
import ManageDevices from "@/components/pages/ManageDevices";
import FamilyMemberDetail from "@/components/pages/FamilyMemberDetail";
import RoomDevices from "@/components/generes/RoomDevices";

export const nav = [
  {
    path: "/rooms",
    name: "Rooms",
    element: <Rooms />,
    isPrivate: true,
  },
  {
    path: "/rooms/:roomId",
    name: "Room Details",
    element: <RoomDevices />,
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
    path: "/statictics",
    name: "statictics",
    element: <Statictics />,
    isPrivate: true,
  },
  {
    path: "/admin",
    name: "/admin",
    element: <Statictics />,
    isPrivate: false,
  },
  {
    path: "/setting",
    name: "setting",
    element: <Setting />,
    isPrivate: true,
  },
  {
    path: "/setting/userDetail",
    name: "user Detail",
    element: <UserDetail />,
    isPrivate: true,
  },
  {
    path: "/setting/manageRooms",
    name: "manage Rooms",
    element: <ManageRoom />,
    isPrivate: true,
  },
  {
    path: "/setting/manageDevices",
    name: "manage Devices",
    element: <ManageDevices />,
    isPrivate: true,
  },

  {
    path: "/setting/familyMemberDetail",
    name: "family Member Detail",
    element: <FamilyMemberDetail />,
    isPrivate: true,
  },
];
