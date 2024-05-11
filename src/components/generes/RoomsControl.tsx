import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import { useNavigate } from "react-router-dom";
import CurrentTime from "./CurrentTime";
import { getAllRoomsFromUser } from "@/lib/FirebaseCollection";
import { IRoom } from "@/lib/DataInterfaces";
import { auth } from "@/firebase";

const RoomsControl: React.FC = () => {
  const userId = auth.currentUser?.uid ?? "";
  const navigate = useNavigate();

  const [localRooms, setLocalRooms] = useState<IRoom[]>([]);

  const fetchData = async () => {
    // Fetch s from Firestore and update the state
    const fetchedRooms = await getAllRoomsFromUser(userId);
    setLocalRooms(fetchedRooms as IRoom[]);
  };

  const handleRoomClick = (roomId: number) => {
    navigate(`/rooms/${roomId}`); // Navigates to the room details page
  };

  useEffect(() => {
    fetchData();
  }, [userId]);

  return (
    <div>
      <div className="grid grid-cols-2 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-2 gap-5">
        {/* Navbar */}
        <Navbar />
        <div className="flex items-center justify-end transform duration-500 hover:scale-105">
          <CurrentTime />
        </div>

        {/* main*/}
        <div className=" bg-[#F0F0F0] sm:col-span-1 md:col-span-1 lg:col-span-2 rounded-xl p-10 dark:bg-[#66676d]">
          <h1 className="lg:text-5xl  sm:text-lg md:text-lg font-bold mb-3">
            Rooms
          </h1>
          {/* Dynamically render rooms */}
          {localRooms.map((room) => (
            <React.Fragment key={room.roomId}>
              <div
                className="bg-white p-3 rounded-2xl flex items-center mb-5 dark:bg-[#1d1d1f] transform duration-500 hover:scale-105"
                onClick={() => handleRoomClick(room.roomId)}
              >
                <div
                  className={`flex h-20 w-20 shrink-0 grow-0 items-center justify-center rounded-full ${room.color} shadow-md shadow-slate-500`}
                >
                  <img src={room.icon} alt={room.name} className="w-5/12"></img>
                </div>
                <span className=" lg:text-xl  sm:text-lg md:text-lg font-bold pl-5">
                  {room.name}
                </span>
              </div>
            </React.Fragment>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RoomsControl;
