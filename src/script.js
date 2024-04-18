const selectedDate = new Date("Apr 18, 2024");
const timeChangedFor = "IST";
const timeChangedTo = "12:00:00 pm";

const selectedItems = [
  {
    abbreviation: "IST",
    gmtOffset: "+05:30"
  },
  {
    abbreviation: "EDT",
    gmtOffset: "-04:00"
  }
];

function convertToIST(selectedDate, timeChangedFor, timeChangedTo, selectedItems) {
  // Step 1: Calculate timeChangedTo with respect to IST
  const istOffset = selectedItems.find(item => item.abbreviation === timeChangedFor).gmtOffset;
  const [hoursOffset, minutesOffset] = istOffset.split(':').map(Number);
  const timeParts = timeChangedTo.match(/(\d+):(\d+)(?::(\d+))? (am|pm)/i);
  if (!timeParts) {
    throw new Error("Invalid time format");
  }
  let [hours, minutes, seconds] = timeParts.slice(1, 4).map(Number);
  const meridian = timeParts[4].toLowerCase();
  if (meridian === 'pm' && hours !== 12) {
    hours += 12;
  } else if (meridian === 'am' && hours === 12) {
    hours = 0;
  }
  hours -= hoursOffset;
  minutes -= minutesOffset;
  if (minutes < 0) {
    hours--;
    minutes += 60;
  }
  if (hours < 0) {
    hours += 24;
    selectedDate.setDate(selectedDate.getDate() - 1);
  }
  const timeIST = new Date(selectedDate);
  timeIST.setHours(hours, minutes, seconds);

  // Step 2: Calculate times for other time zones
  const result = selectedItems
    .filter(item => item.abbreviation !== timeChangedFor)
    .map(item => {
      const [hoursOffset, minutesOffset] = item.gmtOffset.split(':').map(Number);
      let time = new Date(timeIST);
      time.setHours(time.getHours() + hoursOffset);
      time.setMinutes(time.getMinutes() + minutesOffset);
      // Adjust date for time zones with negative offsets
      if (hoursOffset < 0 && time.getHours() >= 24) {
        time.setDate(time.getDate() + 1);
      }
      return {
        abbreviation: item.abbreviation,
        date: time.toDateString(),
        time: time.toLocaleTimeString('en-US', { hour12: true, hour: '2-digit', minute: '2-digit', second: '2-digit' })
      };
    });

  return result;
}

console.log(convertToIST(selectedDate, timeChangedFor, timeChangedTo, selectedItems));










// [
//   {
//       "abbreviation": "PDT",
//       "date": "Wed Apr 18 2024",
//       "time": "05:30:00 AM"
//   },
//   {
//       "abbreviation": "AEDT",
//       "date": "Thu Apr 18 2024",
//       "time": "11:30:00 PM"
//   }
// ]