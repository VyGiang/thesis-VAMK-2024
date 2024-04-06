import Navbar from "./Navbar";
import Statictics from "./StaticticsControl";
import { BsThreeDots } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import WeatherComponent from "./WeatherComponent";
import TodoList from "./TodoList";
import CurrentTime from "./CurrentTime";
import CustomPopup from "./CustomPopup";
import { useState } from "react";

const HomeControl = () => {
  const navigate = useNavigate();
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const navigateToLivingRoom = () => {
    navigate("/rooms/livingRoom");
  };
  const navigateToBedRoom = () => {
    navigate("/rooms/bedRoom");
  };
  const navigateToBathRoom = () => {
    navigate("/rooms/bathRoom");
  };
  const navigateToKitchen = () => {
    navigate("/rooms/kitchen");
  };

  // Handler for closing the popup
  const popupCloseHandler = () => {
    setIsPopupOpen(false);
  };
  const handleOpenPopup = () => setIsPopupOpen(true);

  return (
    <>
      <div className="grid grid-cols-2 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-2 gap-5">
        {/* Navbar */}
        <Navbar />
        <div className="flex items-center justify-end transform duration-500 hover:scale-105">
          <CurrentTime />
        </div>

        {/* main*/}
        <div className=" bg-[#F0F0F0] sm:col-span-1 md:col-span-1 lg:col-span-2 rounded-xl  grid grid-cols-4 gap-5 p-5 dark:bg-[#66676d]">
          {/* Living Room */}
          <div
            className="transform bg-white h-32 transition duration-500 hover:scale-105 hover:bg-blue-100 rounded-2xl sm:col-span-2 md:col-span-1 lg:col-span-1 dark:bg-[#414244]"
            onClick={navigateToLivingRoom}
          >
            <div className=" p-3">
              <div className="flex flex-wrap justify-around items-center">
                <strong className=" text-sm">Living Room</strong>
                <div>
                  <button className="mt-1">
                    <BsThreeDots size={20} />
                  </button>
                </div>
              </div>
              <div className="flex flex-wrap justify-evenly">
                <img
                  src="/images/living.png"
                  className="w-3/12 object-contain"
                ></img>

                <div className=" content-center">
                  <p className="text-3xl text-center">150</p>
                  <p className="text-center text-[#828282]">kWh</p>
                </div>
              </div>
            </div>
          </div>
          {/* Bedroom */}
          <div
            className="transform duration-500 hover:scale-105 hover:bg-blue-100 bg-white h-32 rounded-2xl sm:col-span-2 md:col-span-1 lg:col-span-1  dark:bg-[#414244]"
            onClick={navigateToBedRoom}
          >
            <div className=" p-3">
              <div className="flex flex-wrap justify-around items-center">
                <strong className=" text-sm">Bedroom</strong>
                <div>
                  <button className="mt-1">
                    <BsThreeDots size={20} />
                  </button>
                </div>
              </div>
              <div className="flex flex-wrap justify-evenly">
                <img
                  src="/images/bed.png"
                  className="w-3/12 object-contain"
                ></img>

                <div className=" content-center">
                  <p className="text-3xl text-center">150</p>
                  <p className="text-center text-[#828282]">kWh</p>
                </div>
              </div>
            </div>
          </div>
          {/* Bathroom */}
          <div
            className=" transform duration-500 hover:scale-105 hover:bg-blue-100 bg-white h-32 rounded-2xl sm:col-span-2 md:col-span-1 lg:col-span-1  dark:bg-[#414244]"
            onClick={navigateToBathRoom}
          >
            <div className=" p-3">
              <div className="flex flex-wrap justify-around items-center">
                <strong className=" text-sm">Bathroom</strong>
                <div>
                  <button className="mt-1">
                    <BsThreeDots size={20} />
                  </button>
                </div>
              </div>
              <div className="flex flex-wrap justify-evenly">
                <img
                  src="/images/bath.png"
                  className="w-3/12 object-contain"
                ></img>

                <div className=" content-center">
                  <p className="text-3xl text-center">150</p>
                  <p className="text-center text-[#828282]">kWh</p>
                </div>
              </div>
            </div>
          </div>
          {/* Kitchen */}
          <div
            className="transform duration-500 hover:scale-105 hover:bg-blue-100  bg-white h-32 rounded-2xl sm:col-span-2 md:col-span-1 lg:col-span-1  dark:bg-[#414244]"
            onClick={navigateToKitchen}
          >
            <div className=" p-3">
              <div className="flex flex-wrap justify-around items-center">
                <strong className=" text-sm">Kitchen</strong>
                <div>
                  <button className="mt-1">
                    <BsThreeDots size={20} />
                  </button>
                </div>
              </div>
              <div className="flex flex-wrap justify-evenly">
                <img
                  src="/images/kitchen.png"
                  className="w-3/12 object-contain"
                ></img>

                <div className=" content-center">
                  <p className="text-3xl text-center">150</p>
                  <p className="text-center text-[#828282]">kWh</p>
                </div>
              </div>
            </div>
          </div>
          {/* phan phia duoi */}
          <div className=" col-span-4 grid grid-cols-12 gap-5">
            {/*  temperature and humidity */}
            <WeatherComponent city="Vaasa,FI" />
            {/* Todo list*/}
            <div className="  transform duration-500 hover:scale-105 hover:bg-blue-100 col-span-7 h-auto sm:col-span-12 md:col-span-12 lg:col-span-7 bg-white rounded-xl">
              <TodoList onOpenPopup={handleOpenPopup} />
            </div>
          </div>
        </div>

        {/* Statictics*/}
        {/* <Statictics /> */}

        {/* Custom Popup for TodoList */}
        <CustomPopup
          onClose={popupCloseHandler}
          show={isPopupOpen}
          // title="My Todo List"
        >
          <TodoList />
        </CustomPopup>
      </div>
    </>
  );
};

export default HomeControl;
