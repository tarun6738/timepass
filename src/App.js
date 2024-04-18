import React, { useState } from 'react';
import Navbar from './components/Navbar';
import { DndContext, closestCorners } from "@dnd-kit/core";

import Column from './components/Column';

const App = () => {
  const arrayMove = (arr, fromIndex, toIndex) => {
    const element = arr[fromIndex];
    const newArray = [...arr];
    newArray.splice(fromIndex, 1);
    newArray.splice(toIndex, 0, element);
    return newArray;
  };

  const [uniqueListPlace, setUniqueListPlace] = useState(null);
  const [timeComponents, setTimeComponents] = useState([]);
  const [istValues, setISTValues] = useState([]);
  const [selectedDate, setSelectedDate] = useState(new Date());
  

  const handleCloseTimeComponent = (id) => {
    setTimeComponents(prevComponents =>
      prevComponents.map(component =>
        component.id === id ? { ...component, show: false } : component
      )
    );
  };
  const handleDateSelect = (date) => {
    setSelectedDate(date);
  };

  const reverseTimeComponentOrder = () => {
    setTimeComponents(prevComponents =>
      prevComponents.slice().reverse()
    );
  };

  const getTimeComponentPos = id => timeComponents.findIndex(task => task.id === id);

  const handleDragEnd = event => {
    const { active, over } = event;
    if (active.id === over.id) return;
    setTimeComponents(timeComponents => {
      const originalPos = getTimeComponentPos(active.id);
      const newPos = getTimeComponentPos(over.id);
      return arrayMove(timeComponents, originalPos, newPos);
    });
  };

  const addTimeComponent = (selectedItem, uniqueListPlace) => {
    const part = selectedItem.split(" ");
    const gmt = part[5];
    const abb = part[3];
    
    setISTValues(prevValues => [...prevValues, { abbreviation: abb, gmtOffset: gmt }]);
    const nextId = timeComponents.length + 1;
    setTimeComponents((prevComponents) => [
      ...prevComponents,
      { id: nextId, selectedItem: selectedItem, uniqueListPlace: uniqueListPlace, show: true },
    ]);
  };

  const handleListItemSelect = (listPlace, selectedItem) => {
    setUniqueListPlace(listPlace);
    addTimeComponent(selectedItem, listPlace);
  };

  return (
    <div>
      <Navbar onReverseOrder={reverseTimeComponentOrder} onListItemSelect={handleListItemSelect} onDateSelect={handleDateSelect} />
      <div className="App">
        <DndContext onDragEnd={handleDragEnd} collisionDetection={closestCorners}>
        <Column timeComponents={timeComponents} onCloseTimeComponent={handleCloseTimeComponent} istValues={istValues} selectedDate={selectedDate}/>
        </DndContext>
      </div>
    </div>
  );
};

export default App;
