import React, { useState } from 'react'
import Navbar from './components/Navbar'

import TimeComponent from './components/TimeComponent';

const App = () => {
  const [timeComponents, setTimeComponents] = useState([
    { id: 1, show: true },
    { id: 2, show: true },
    { id: 3, show: true },
    { id: 4, show: true },
    
    
    // Add more time components as needed
  ]);

  

  const handleCloseTimeComponent = (id) => {
    setTimeComponents(prevComponents =>
      prevComponents.map(component =>
        component.id === id ? { ...component, show: false } : component
      )
    );
  };

  const reverseTimeComponentOrder = () => {
    setTimeComponents(prevComponents =>
      prevComponents.slice().reverse()
    );
  };

  return (
    <div>
      <Navbar onReverseOrder={reverseTimeComponentOrder} />
      <div className="App">
        {timeComponents.map((component, index) => (
          component.show && (
            <TimeComponent
              key={component.id}
              id={component.id}
              onClose={handleCloseTimeComponent}
              draggable
            />
          )
        ))}
        {/* Render other components or content here */}
      </div>
    
      
    </div>
  )
}

export default App