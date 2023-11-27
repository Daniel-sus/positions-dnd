import React from "react";

import { getPositionsFromLS } from "@/utils/getPositionsFromLS";

import Modal from "../Modal";
import Sidebar from "../Sidebar";

const PositionsTab = () => {
  const [selectedPosition, setSelectedPosition] = React.useState(null);
  const [positions, setPositions] = React.useState(getPositionsFromLS());
  const [itemDeleted, setItemDeleted] = React.useState(false);
  const [enabled, setEnabled] = React.useState(false);

  const inputRef = React.useRef(null);
  const isMounted = React.useRef(false);

  React.useEffect(() => {
    if (isMounted.current) {
      if (positions.length === 0) {
        localStorage.clear();
      } else {
        localStorage.setItem("positions", JSON.stringify(positions));
      }
    }
    isMounted.current = true;
  }, [positions]);

  return (
    <div className="tab flex justify-between gap-4">
      <Sidebar
        selectedPosition={selectedPosition}
        setSelectedPosition={setSelectedPosition}
        positions={positions}
        setPositions={setPositions}
        inputRef={inputRef}
        setItemDeleted={setItemDeleted}
        enabled={enabled}
        setEnabled={setEnabled}
      />
      <Modal
        inputRef={inputRef}
        positions={positions}
        setPositions={setPositions}
        selectedPosition={selectedPosition}
        setSelectedPosition={setSelectedPosition}
        itemDeleted={itemDeleted}
        setItemDeleted={setItemDeleted}
        enabled={enabled}
        setEnabled={setEnabled}
      />
    </div>
  );
};

export default PositionsTab;
