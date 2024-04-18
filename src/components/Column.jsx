import React, { useState } from 'react'
import { SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable";
import TimeComponent from './TimeComponent';

const Column = ({timeComponents, onCloseTimeComponent, istValues, selectedDate}) => {

  console.log("TC in column",timeComponents);
 
  const [convertedTimes, setConvertedTimes] = useState([]);

  return (
    <div className="column">
        <SortableContext items={timeComponents} strategy={verticalListSortingStrategy}>
        {timeComponents.map((component, index) => (
          component.show && (
            <TimeComponent

              key={component.id}
              id={component.id}
              onClose={onCloseTimeComponent}
              uniqueListPlace={component.uniqueListPlace}
              selectedItem={component.selectedItem}
              istValues={istValues}
                selectedDate={selectedDate}
                convertedTimes={convertedTimes} // Pass convertedTimes as a prop
              setConvertedTimes={setConvertedTimes} 
            />
          )
        ))}
        </SortableContext>
    </div>
  )
}

export default Column