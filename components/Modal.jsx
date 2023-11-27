"use client";

import React from "react";
import { v4 as uuidv4 } from "uuid";

import { fieldsetLeft, fieldsetRight } from "@/data";

import Fieldset from "./Fieldset";

const Modal = ({
  inputRef,
  positions,
  setPositions,
  selectedPosition,
  setSelectedPosition,
  itemDeleted,
  setItemDeleted,
  enabled,
  setEnabled,
}) => {
  const [name, setName] = React.useState("");
  const [itemSubmitting, setItemSubmitting] = React.useState(false);
  const [selectedResponsibilities, setSelectedResponsibilities] =
    React.useState([]);

  // Refs for useEffect not to execute on the first render
  const firstRender1 = React.useRef(true);
  const firstRender2 = React.useRef(true);

  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = {
      id: selectedPosition.id,
      position: name,
      salary: 0,
      responsibilities: selectedResponsibilities,
    };
    console.log("FORM DATA: ", formData);
    setItemSubmitting(true);
    setName("");
    setSelectedResponsibilities([]);
    setSelectedPosition(null);
  };

  const handleCheckboxChange = (id) => {
    setSelectedResponsibilities((prevSelected) => {
      if (prevSelected.includes(id)) {
        return prevSelected.filter((item) => item !== id);
      } else {
        return [...prevSelected, id];
      }
    });
  };

  const handleChangeInput = (event) => {
    setName(event.target.value);
  };

  React.useEffect(() => {
    if (firstRender1.current) {
      firstRender1.current = false;
    } else if (!itemSubmitting && !itemDeleted) {
      if (!selectedPosition) {
        // Executes when the selected position is null - basicly a create new position logic

        const _id = uuidv4();

        setPositions((prev) => [
          {
            id: _id,
            position: name,
            salary: 0,
            responsibilities: selectedResponsibilities,
          },
          ...prev,
        ]);

        setSelectedPosition({
          id: _id,
          position: name,
          salary: 0,
          responsibilities: selectedResponsibilities,
        });
      } else {
        // Executes when the selected position is not null - basicly an update position logic

        const updatedPositions = positions.map((pos) =>
          pos.id === selectedPosition?.id
            ? {
                ...pos,
                position: name,
                responsibilities: selectedResponsibilities,
              }
            : pos
        );

        setPositions(updatedPositions);
      }
    } else {
      setItemSubmitting(false);
      setItemDeleted(false);
    }
  }, [name, selectedResponsibilities]);

  React.useEffect(() => {
    if (firstRender2.current) {
      firstRender2.current = false;
    } else if (selectedPosition) {
      setName(selectedPosition.position);
      setSelectedResponsibilities(selectedPosition.responsibilities);
    } else if (itemDeleted) {
      setName("");
      setSelectedResponsibilities([]);
    }
  }, [selectedPosition]);

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full bg-black rounded-lg flex flex-col justify-between p-4 gap-2"
    >
      <div className="w-full h-[110px] bg-main rounded-lg p-4">
        <h3 className="text-gray text-xs/[18px] font-semibold pb-1">
          Название
        </h3>
        <label htmlFor="input-1">
          <input
            type="text"
            id="input-1"
            ref={inputRef}
            value={name}
            readOnly={!enabled}
            onChange={handleChangeInput}
            className="w-full h-12 bg-main rounded-lg border-2 border-default py-3.5 px-4 text-white outline-none"
          />
        </label>
      </div>
      <div className="checkboxes-wrapper w-full max-h-[220px] bg-main rounded-lg mt-[7px] flex flex-col">
        <div className="w-full h-10 pt-[11px] px-[9px] pb-4 shadow-block rounded-t-lg">
          <h3 className="text-gray text-sm font-medium">Обязаности</h3>
        </div>
        <div className="flex overflow-auto">
          <div className="h-fit flex w-full pb-2">
            <div className="flex flex-1 flex-col px-[11px] py-3 gap-3">
              {fieldsetLeft.map((fieldset, index) => (
                <Fieldset
                  key={index}
                  fieldset={fieldset}
                  selectedResponsibilities={selectedResponsibilities}
                  handleCheckboxChange={handleCheckboxChange}
                  enabled={enabled}
                />
              ))}
            </div>
            <div className="flex flex-1 flex-col px-[11px] py-3 gap-3">
              {fieldsetRight.map((fieldset, index) => (
                <Fieldset
                  key={index}
                  fieldset={fieldset}
                  selectedResponsibilities={selectedResponsibilities}
                  handleCheckboxChange={handleCheckboxChange}
                  enabled={enabled}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
      <button
        type="submit"
        disabled={!selectedPosition || !name}
        className="w-full justify-self-end min-h-[48px] bg-secondary text-white text-sm font-semibold rounded-lg border-2 border-buttons
        disabled:opacity-60 btn"
      >
        Сохранить
      </button>
    </form>
  );
};

export default Modal;
