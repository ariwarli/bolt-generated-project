import React, { useState } from 'react';
    import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

    const App = () => {
      const [elements, setElements] = useState([
        { id: 'text-box', type: 'text' },
        { id: 'image', type: 'image' },
        { id: 'button', type: 'button' },
        { id: 'form', type: 'form' },
      ]);

      const handleDragEnd = (result) => {
        if (!result.destination) return;
        const { source, destination } = result;
        const newElements = [...elements];
        const [removed] = newElements.splice(source.index, 1);
        newElements.splice(destination.index, 0, removed);
        setElements(newElements);
      };

      return (
        <DragDropContext onDragEnd={handleDragEnd}>
          <Droppable droppableId="droppable-1">
            {(provided) => (
              <div ref={provided.innerRef} {...provided.droppableProps}>
                {elements.map((element, index) => (
                  <Draggable key={element.id} draggableId={element.id} index={index}>
                    {(provided) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                      >
                        {element.type === 'text' && <div>Text Box</div>}
                        {element.type === 'image' && <div>Image</div>}
                        {element.type === 'button' && <div>Button</div>}
                        {element.type === 'form' && <div>Form</div>}
                      </div>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>
      );
    };

    export default App;
