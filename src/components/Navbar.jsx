import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { TiPlus } from 'react-icons/ti';
import { LuCalendarDays } from 'react-icons/lu';
import { FaRegCalendarPlus } from 'react-icons/fa';
import { RiArrowUpDownFill } from 'react-icons/ri';
import { FiLink } from 'react-icons/fi';
import { IoMoon } from 'react-icons/io5';
import { IoSunny } from 'react-icons/io5';

const Navbar = ({ onReverseOrder }) => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [isOpen, setIsOpen] = useState(false);

  const monthNames = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
  ];

  const formattedDate = `${
    monthNames[selectedDate.getMonth()]
  } ${selectedDate.getDate()}, ${selectedDate.getFullYear()}`;

  const handleDateChange = (date) => {
    setSelectedDate(date);
    setIsOpen(false); // Close the calendar after selecting a date
  };

  const toggleCalendar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="navbar mt-4 bg-gray-200 w-full lg:w-4/5 px-4 py-2 mx-auto">
      <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 justify-between items-center">
        {/* Search Input with Plus Button */}
        <div className="relative flex items-center w-full sm:w-auto">
          <input
            type="text"
            placeholder="Add Time Zone"
            className="p-2 pr-12 sm:pr-16 rounded border border-gray-400 focus:outline-none focus:border-blue-500 w-full"
          />
          <button
            className="absolute right-0 top-0 bottom-0 px-3 text-blue-500 rounded-r flex items-center justify-center text-lg sm:text-xl"
            onClick={toggleCalendar}
          >
            <TiPlus />
          </button>
        </div>
        {/* Calendar */}
        <div className="relative flex items-center w-full sm:w-auto">
          <input
            type="text"
            placeholder="Select Date"
            className="p-2 pr-8 sm:pr-10 rounded border border-gray-400 focus:outline-none focus:border-blue-500 w-full"
            value={formattedDate}
            readOnly
          />

          <DatePicker
            selected={selectedDate}
            onChange={handleDateChange}
            dateFormat="dd/MM/yyyy"
            className="cursor-pointer"
            customInput={
              <button
                className="px-3 text-blue-500 text-lg sm:text-xl"
                onClick={() => setIsOpen(!isOpen)}
              >
                <LuCalendarDays />
              </button>
            }
          />
        </div>
        {/* Additional Buttons */}
        <div className="lg:mr-20 flex lg:space-x-6 sm:space-x-2 space-x-6">
          <div className="flex items-center">
            <button className="px-3 py-2 border border-black rounded-full">
              <FaRegCalendarPlus className="text-lg sm:text-xl text-blue-500" />
            </button>
          </div>

          <div className="flex items-center">
            <button className="px-3 py-2 border border-black rounded-full" onClick={onReverseOrder}>
              <RiArrowUpDownFill className="text-lg sm:text-xl text-blue-500" />
            </button>
          </div>

          <div className="flex items-center">
            <button className="px-3 py-2 border border-black rounded-full">
              <FiLink className="text-lg sm:text-xl text-blue-500" />
            </button>
          </div>

          <div className="flex items-center">
            <button className="px-3 py-2 border border-black rounded-full">
              <IoMoon className="text-lg sm:text-xl text-blue-500" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
