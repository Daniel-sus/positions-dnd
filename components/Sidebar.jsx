"use client";

import React from "react";
import { v4 as uuidv4 } from "uuid";
import { DndContext } from "@/context/DnDContext";
import { Draggable, Droppable } from "react-beautiful-dnd";

import Position from "./Position";
import Skeleton from "./Skeleton";

const Sidebar = ({
  inputRef,
  positions,
  setPositions,
  selectedPosition,
  setSelectedPosition,
  setItemDeleted,
  enabled,
  setEnabled,
}) => {
  const [isItemInDrag, setIsItemInDrag] = React.useState(false);

  const onDragEnd = (result) => {
    if (!result.destination) return;
    if (result.destination.droppableId === "bin") {
      // Deletes item from the list

      const newItems = positions.filter(
        (item, index) => index !== result.source.index
      );

      setPositions(newItems);
      setIsItemInDrag(false);
      setItemDeleted(true);
      setSelectedPosition(null);
    } else {
      // Rearranges items in the list

      const newItems = [...positions];
      const [removed] = newItems.splice(result.source.index, 1);
      newItems.splice(result.destination.index, 0, removed);

      setPositions(newItems);
    }
  };

  const onHandleCreatePosition = () => {
    const _id = uuidv4();

    setPositions((prev) => [
      {
        id: _id,
        position: "",
        salary: 0,
        responsibilities: [],
      },
      ...prev,
    ]);

    setSelectedPosition({
      id: _id,
      position: "",
      salary: 0,
      responsibilities: [],
    });

    inputRef.current.focus();
  };

  // UseEffect for react-beautiful-dnd to work properly with Next JS

  React.useEffect(() => {
    const animation = requestAnimationFrame(() => setEnabled(true));

    return () => {
      cancelAnimationFrame(animation);
      setEnabled(false);
    };
  }, []);

  return (
    <div className="min-w-[296px] max-h-[440px] flex flex-col justify-between gap-2 pb-4 pl-[10px] sidebar">
      {enabled ? (
        <DndContext onDragEnd={onDragEnd}>
          <Droppable droppableId="positions-list">
            {(provided) => (
              <div
                className="flex-1 flex flex-col overflow-auto"
                {...provided.droppableProps}
                ref={provided.innerRef}
              >
                {positions.map((item, index) => {
                  return (
                    <Draggable
                      key={item.id}
                      draggableId={`draggable-${item.id}`}
                      index={index}
                    >
                      {(provided, snapshot) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                        >
                          <Position
                            inputRef={inputRef}
                            selectedPosition={selectedPosition}
                            setSelectedPosition={setSelectedPosition}
                            provided={provided}
                            item={item}
                            setIsItemInDrag={setIsItemInDrag}
                            isDragging={snapshot.isDragging}
                            isItemInDrag={isItemInDrag}
                          />
                        </div>
                      )}
                    </Draggable>
                  );
                })}
                {provided.placeholder}
              </div>
            )}
          </Droppable>

          <Droppable droppableId="bin" isDropDisabled={false}>
            {(provided, snapshot) => (
              <div {...provided.droppableProps} ref={provided.innerRef}>
                {isItemInDrag ? (
                  <div className="pl-[20px]">
                    <div
                      className={`  ml-[20px]relative bg-red-600 text-white flex justify-center items-center h-12 w-full rounded-lg ${
                        snapshot.isDraggingOver ? "drag-over" : ""
                      }`}
                    >
                      <div className="delete-container absolute">
                        DRAG TO DELETE
                      </div>
                      {provided.placeholder}
                    </div>
                  </div>
                ) : (
                  <div className="pl-[20px]">
                    <button
                      onClick={onHandleCreatePosition}
                      className="w-full  min-h-[48px] bg-secondary text-white text-sm font-semibold rounded-lg border-2 border-buttons btn"
                    >
                      Создать новую должность
                    </button>
                  </div>
                )}
              </div>
            )}
          </Droppable>
        </DndContext>
      ) : (
        <Skeleton />
      )}
    </div>
  );
};

export default Sidebar;
