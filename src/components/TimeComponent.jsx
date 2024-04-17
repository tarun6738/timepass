import React, { useEffect, useState } from 'react';

const TimeComponent = ({ id, onClose, uniqueListPlace, selectedItem }) => {
  const [selectedHour, setSelectedHour] = useState(0);
  const [showTimeList, setShowTimeList] = useState(false);
  const [uniqueListPlaceLocal, setUniqueListPlaceLocal] = useState(uniqueListPlace);
  const [selectedItemLocal, setSelectedItemLocal] = useState(selectedItem);
  

  const handleChange = (event) => {
    setSelectedHour(parseInt(event.target.value));
  };

  useEffect(() => {
    setUniqueListPlaceLocal(uniqueListPlace);
  }, [uniqueListPlace]);

  // Update selectedItemLocal when props change
  useEffect(() => {
    setSelectedItemLocal(selectedItem);
  }, [selectedItem]);


  const generateTimeOptions = () => {
    const options = [];
    for (let hour = 0; hour < 24; hour++) {
      for (let minute = 0; minute < 60; minute += 30) {
        const time = `${formatHour(hour)}:${formatMinute(minute)} ${hour < 12 ? 'am' : 'pm'}`;
        options.push(
          <div
            key={time}
            className="cursor-pointer p-2 hover:bg-gray-100"
            onClick={() => handleTimeSelect(hour * 60 + minute)}
          >
            {time}
          </div>
        );
      }
    }
    return options;
  };

  const formatHour = (hour) => {
    if (hour === 0) return '12'; // Midnight
    if (hour > 12) return `${hour - 12}`; // After noon
    return `${hour}`; // Before noon
  };

  const formatMinute = (minute) => { 
    return minute < 10 ? `0${minute}` : `${minute}`;
  };

  const handleTimeSelect = (hour) => {
    setSelectedHour(hour);
    setShowTimeList(false);
  };

  const handleClose = () => {
    onClose(id);
  };

  const handleInputClick = () => {
    setShowTimeList(!showTimeList); // Toggle the visibility of time list
  };

  const formattedTime = () => {
    const hour = Math.floor(selectedHour / 60);
    const minute = selectedHour % 60;
    const period = hour < 12 ? 'am' : 'pm';
    return `${formatHour(hour)}:${formatMinute(minute)} ${period}`;
  };

  const maxSliderValue = 23 * 60 + 45; // Maximum value representing 11:45 PM

  const sliderLabels = ['12 AM', '3 AM', '6 AM', '9 AM', '12 PM', '3 PM', '6 PM', '9 PM'];

  // Calculate slider positions for labels
  const sliderPositions = sliderLabels.map((label, index) => {
    return Math.floor((maxSliderValue / 8) * index);
  });

  console.log("uniqueListPlace:", uniqueListPlaceLocal);
  console.log("selectedItem:",selectedItemLocal);

  
 

// Keep the time part unchanged: "20:16"


  

  



  return (
    <div>
    <div className='lg:w-4/5 mx-auto mt-2 border border-blue-300 p-4 h-54 relative'>
      <button onClick={() => onClose(id)} className="absolute top-0 right-0 m-2 text-xl">&times;</button>
      <div className='flex justify-between'>
        {/* Timezone and Time */}
        <div><h2 className='text-4xl font-bold'>{uniqueListPlace && uniqueListPlace.abbreviation}</h2></div>
        <div className='flex w-64 lg:w-2/5 md:w-2/5 sm:w-2/5'>
          <input 
            type='text' 
            value={formattedTime()}
            className='text-4xl font-bold border border-black-400 shadow-sm w-4/6 text-center p-1'
            onChange={handleChange}
            onClick={handleInputClick}
            readOnly 
          />
          {showTimeList && (
            <div className="absolute mt-10 w-40 max-h-36 overflow-y-auto bg-white border border-gray-300 rounded-md shadow-lg" style={{ zIndex: 999 }}>
              {generateTimeOptions()}
            </div>
          )}
        </div>
      </div>

      <div className='flex justify-between mt-2'>
        {/* Full form, GMT, Current Date */}
        <div><p>{uniqueListPlaceLocal.fullName}</p></div>
        <div className="flex w-64 lg:w-2/5 md:w-2/5 sm:w-2/5">
          <p className="w-1/2">GMT <span>{uniqueListPlaceLocal.gmtOffset}</span></p>
          <p className="w-1/2">Hello</p>
        </div>
      </div>

      <div className="items-center mt-4 relative">
        <input
          type="range"
          min="0"
          max={maxSliderValue}
          step="15"
          value={selectedHour}
          onChange={handleChange}
          className="w-full appearance-none bg-gray-200 h-4 rounded-full"
          style={{ zIndex: 0 }}
        />
        <div className="w-full flex justify-between text-sm mt-2">
          {sliderLabels.map((label, index) => (
            <span key={index} className="text-center ml-2" style={{ flex: '1 0 auto', position: 'absolute', left: `${(sliderPositions[index] / maxSliderValue) * 100}%`, transform: 'translateX(-50%)' }}>{label}</span>
          ))}
        </div>
        <div className="h-4 mt-2 flex justify-between">
          {sliderLabels.map((label, index) => (
            <div key={index} className="w-1 bg-gray-400" style={{ position: 'absolute', left: `${(sliderPositions[index] / maxSliderValue) * 100}%`, transform: 'translateX(-50%)' }}></div>
          ))}
        </div>
      </div>
    </div>
    </div>
  );
};

export default TimeComponent;