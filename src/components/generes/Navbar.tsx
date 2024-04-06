import React from "react"

const Navbar = () => {
  return (
    <div className="">
      <form>
        <label
          htmlFor="default-search"
          className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
        >
          Search
        </label>
        <div className="relative">
          {/* <div className="absolute inset-y-0 start-0 flex items-center pointer-events-none"></div> */}
          <input
            type="search"
            id="default-search"
            className="block w-full p-4 ps-10 text-sm text-gray-900 border rounded-3xl  bg-white dark:bg-[#414244] dark:text-white transform duration-500 hover:scale-105"
            placeholder="Search"
            required
          />
          <button
            type="submit"
            className=" absolute end-2.5 bottom-2.5 focus:ring-4 text-sm px-4 py-2"
          >
            <svg
              className="w-4 h-4 text-black dark:text-gray-400"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 20 20"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
              />
            </svg>
          </button>
        </div>
      </form>
    </div>
  )
}

export default Navbar
