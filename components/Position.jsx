import React from "react";
import Image from "next/image";

const Position = ({
  inputRef,
  item,
  provided,
  isDragging,
  selectedPosition,
  setSelectedPosition,
  setIsItemInDrag,
  isItemInDrag,
}) => {
  const { position, salary, responsibilities } = item;
  const firstUpdate = React.useRef(true);

  const handleClickPosition = (position) => {
    if (position.id === selectedPosition?.id) {
      setSelectedPosition(null);
    } else {
      inputRef.current.focus();
      setSelectedPosition(item);
    }
  };

  React.useEffect(() => {
    if (firstUpdate.current) {
      firstUpdate.current = false;
    } else {
      if (isDragging) {
        setSelectedPosition(item);
      }
      setIsItemInDrag(isDragging);
    }
  }, [isDragging]);

  return (
    <div
      className={`flex justify-between items-center h-[80px] border-2  bg-black py-[30px] px-[16px]  rounded-lg mb-2 cursor-pointer position 
        ${
          isDragging | (selectedPosition?.id === item.id)
            ? "border-purple"
            : "border-black"
        } 
        ${isItemInDrag && "pointer-events-none"}
        `}
      onClick={() => handleClickPosition(item)}
    >
      <div className="flex gap-4">
        <Image
          src="/icons/drag_and_drop-icon.svg"
          width={12}
          height={20}
          {...provided.dragHandleProps}
          draggable="false"
          alt="drag and drop"
        />
        <div className="flex flex-col gap-[2px]">
          <h6 className="text-white text-sm font-semibold">
            {position.length >= 20 ? `${position.slice(0, 20)}` : position}
          </h6>
          <p className="text-gray font-semibold text-xs/[18px]">
            {responsibilities?.length} заданий
          </p>
        </div>
      </div>
      <p className="text-yellow text-xs font-bold">
        ${salary}
        <span className="text-gray text-xs font-medium"> / час</span>
      </p>
    </div>
  );
};

export default Position;
