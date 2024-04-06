import MobileHeader from "../generes/MobileHeader";
import LeftSidebar from "../generes/LeftSidebar";
import StaticticsControl from "../generes/StaticticsControl";

const Statictics = () => {
  return (
    <div className="bg-blue-200 font-merri  dark:bg-[#1c1d1f]">
      <div>
        {/* Your other components */}
        <MobileHeader />
      </div>
      <div className=" grid grid-cols-12 gap-5 container mx-auto p-6 md:px-6">
        <div className="bg-[#4979a3] flex-wrap space-between sticky top-0 md:col-span-12 md:hidden h-screen sm:col-span-12 sm:hidden lg:col-span-2 lg:flex rounded-xl dark:bg-[#2e537a]">
          <LeftSidebar />
        </div>
        <div className="md:col-span-12 sm:col-span-12 lg:col-span-10 rounded-xl">
          <StaticticsControl />
        </div>
      </div>
    </div>
  );
};

export default Statictics;
