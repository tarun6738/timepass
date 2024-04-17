import React, { useState } from "react";
import Navbar from "./components/Navbar";
import TimeComponent from "./components/TimeComponent";

const App = () => {
  const [timeComponents, setTimeComponents] = useState([]);
  const [uniqueListPlace, setUniqueListPlace] = useState(null);

  const handleCloseTimeComponent = (id) => {
    setTimeComponents((prevComponents) =>
      prevComponents.filter((component) => component.id !== id)
    );
  };

  const reverseTimeComponentOrder = () => {
    setTimeComponents((prevComponents) => prevComponents.slice().reverse());
  };

  const addTimeComponent = (selectedItem, uniqueListPlace) => {
    const nextId = timeComponents.length + 1;
    setTimeComponents((prevComponents) => [
      ...prevComponents,
      { id: nextId, selectedItem: selectedItem, uniqueListPlace: uniqueListPlace }, // Pass selectedItem and uniqueListPlace to TimeComponent
    ]);
  };

  const handleListItemSelect = (listPlace, selectedItem) => {
    setUniqueListPlace(listPlace);
    addTimeComponent(selectedItem, listPlace); // Pass selectedItem and uniqueListPlace when adding a TimeComponent
  };

  return (
    <div>
      <Navbar
        onReverseOrder={reverseTimeComponentOrder}
        onListItemSelect={handleListItemSelect}
      />
      <div className="App">
        {timeComponents.map((component, index) => (
          <TimeComponent
            key={component.id}
            id={component.id}
            onClose={handleCloseTimeComponent}
            uniqueListPlace={component.uniqueListPlace} // Pass uniqueListPlace to TimeComponent
            selectedItem={component.selectedItem} // Pass selectedItem to TimeComponent
            draggable
          />
        ))}
        {/* Render other components or content here */}
      </div>
    </div>
  );
};

export default App;
