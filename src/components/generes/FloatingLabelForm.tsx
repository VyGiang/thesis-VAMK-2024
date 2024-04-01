// FormWithFloatingLabels.tsx
import React from "react"

interface Props {
  isOpen: boolean
  setIsOpen: (isOpen: boolean) => void
}

const FormWithFloatingLabels: React.FC<Props> = ({ isOpen, setIsOpen }) => {
  // Apply the overlay style conditionally based on isOpen
  const overlayStyle = isOpen
    ? {
        opacity: 1,
        visibility: "visible" as const,
      }
    : {
        opacity: 0,
        visibility: "hidden" as const,
      }

  // Prevent form from closing when clicking inside the form
  const handleFormClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    e.stopPropagation()
  }
  return (
    <div
      style={overlayStyle}
      className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-40 transition-opacity duration-500"
      onClick={() => setIsOpen(false)} // Close the form when the overlay is clicked
    >
      <div
        className="w-full px-4 py-6 sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl mx-auto bg-white border-0 shadow-lg sm:rounded-3xl"
        onClick={handleFormClick} // Prevent click through to the overlay
      >
        <h1 className="text-2xl font-bold mb-8">Add Devices</h1>
        <form id="form" noValidate>
          {/* Input field for name */}
          <div className="relative z-0 w-full mb-5">
            <input
              type="text"
              name="name"
              placeholder=" "
              className={`pt-3 pb-2 block w-full px-0 mt-0 bg-transparent border-0 border-b-2 appearance-none focus:outline-none focus:ring-0 focus:border-black border-gray-200  "border-red-600" : ""
              }`}
            />
            <label
              htmlFor="name"
              className="absolute duration-300 top-3 -z-1 origin-0 text-gray-500"
            >
              Enter Device
            </label>

            <span className="text-sm text-red-600">Name is required</span>
          </div>

          <div className="relative z-0 w-full mb-5">
            <input
              type="password"
              name="password"
              placeholder=" "
              className="pt-3 pb-2 block w-full px-0 mt-0 bg-transparent border-0 border-b-2 appearance-none focus:outline-none focus:ring-0 focus:border-black border-gray-200"
            />
            <label
              htmlFor="password"
              className="absolute duration-300 top-3 -z-1 origin-0 text-gray-500"
            >
              Enter password
            </label>
            <span className="text-sm text-red-600 hidden" id="error">
              Password is required
            </span>
          </div>

          <fieldset className="relative z-0 w-full p-px mb-5">
            <legend className="absolute text-gray-500 transform scale-75 -top-3 origin-0">
              Choose an option
            </legend>
            <div className="block pt-3 pb-2 space-x-4">
              <label>
                <input
                  type="radio"
                  name="radio"
                  value="1"
                  className="mr-2 text-black border-2 border-gray-300 focus:border-gray-300 focus:ring-black"
                />
                Option 1
              </label>
              <label>
                <input
                  type="radio"
                  name="radio"
                  value="2"
                  className="mr-2 text-black border-2 border-gray-300 focus:border-gray-300 focus:ring-black"
                />
                Option 2
              </label>
            </div>
            <span className="text-sm text-red-600 hidden" id="error">
              Option has to be selected
            </span>
          </fieldset>

          <div className="relative z-0 w-full mb-5">
            <select
              name="select"
              value=""
              onClick="this.setAttribute('value', this.value);"
              className="pt-3 pb-2 block w-full px-0 mt-0 bg-transparent border-0 border-b-2 appearance-none z-1 focus:outline-none focus:ring-0 focus:border-black border-gray-200"
            >
              <option value="" selected disabled hidden></option>
              <option value="1">Option 1</option>
              <option value="2">Option 2</option>
              <option value="3">Option 3</option>
              <option value="4">Option 4</option>
              <option value="5">Option 5</option>
            </select>
            <label
              htmlFor="select"
              className="absolute duration-300 top-3 -z-1 origin-0 text-gray-500"
            >
              Select an option
            </label>
            <span className="text-sm text-red-600 hidden" id="error">
              Option has to be selected
            </span>
          </div>

          <div className="flex flex-row space-x-4">
            <div className="relative z-0 w-full mb-5">
              <input
                type="text"
                name="date"
                placeholder=" "
                onClick="this.setAttribute('type', 'date');"
                className="pt-3 pb-2 block w-full px-0 mt-0 bg-transparent border-0 border-b-2 appearance-none focus:outline-none focus:ring-0 focus:border-black border-gray-200"
              />
              <label
                htmlFor="date"
                className="absolute duration-300 top-3 -z-1 origin-0 text-gray-500"
              >
                Date
              </label>
              <span className="text-sm text-red-600 hidden" id="error">
                Date is required
              </span>
            </div>
            <div className="relative z-0 w-full">
              <input
                type="text"
                name="time"
                placeholder=" "
                onClick="this.setAttribute('type', 'time');"
                className="pt-3 pb-2 block w-full px-0 mt-0 bg-transparent border-0 border-b-2 appearance-none focus:outline-none focus:ring-0 focus:border-black border-gray-200"
              />
              <label
                htmlFor="time"
                className="absolute duration-300 top-3 -z-1 origin-0 text-gray-500"
              >
                Time
              </label>
              <span className="text-sm text-red-600 hidden" id="error">
                Time is required
              </span>
            </div>
          </div>

          <div className="relative z-0 w-full mb-5">
            <input
              type="number"
              name="money"
              placeholder=" "
              className="pt-3 pb-2 pl-5 block w-full px-0 mt-0 bg-transparent border-0 border-b-2 appearance-none focus:outline-none focus:ring-0 focus:border-black border-gray-200"
            />
            <div className="absolute top-0 left-0 mt-3 ml-1 text-gray-400">
              $
            </div>
            <label
              htmlFor="money"
              className="absolute duration-300 top-3 left-5 -z-1 origin-0 text-gray-500"
            >
              Amount
            </label>
            <span className="text-sm text-red-600 hidden" id="error">
              Amount is required
            </span>
          </div>

          <div className="relative z-0 w-full mb-5">
            <input
              type="text"
              name="duration"
              placeholder=" "
              className="pt-3 pb-2 pr-12 block w-full px-0 mt-0 bg-transparent border-0 border-b-2 appearance-none focus:outline-none focus:ring-0 focus:border-black border-gray-200"
            />
            <div className="absolute top-0 right-0 mt-3 mr-4 text-gray-400">
              min
            </div>
            <label
              htmlFor="duration"
              className="absolute duration-300 top-3 -z-1 origin-0 text-gray-500"
            >
              Duration
            </label>
            <span className="text-sm text-red-600 hidden" id="error">
              Duration is required
            </span>
          </div>

          <button
            type="button"
            className="w-full px-6 py-3 mt-3 text-lg text-white transition-all duration-150 ease-linear rounded-lg shadow outline-none bg-pink-500 hover:bg-pink-600 hover:shadow-lg focus:outline-none"
            onClick={() => setIsOpen(false)}
          >
            Toggle Error
          </button>
        </form>
      </div>
    </div>
  )
}

export default FormWithFloatingLabels
