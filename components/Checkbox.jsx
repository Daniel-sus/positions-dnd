import React from "react";

const Checkbox = ({ id, label, checked, handleCheckboxChange, enabled }) => {
  return (
    <div className="relative flex gap-x-3">
      <label htmlFor={`checkbox-${id}`} className="flex gap-x-3 items-center">
        <input
          type="checkbox"
          id={`checkbox-${id}`}
          disabled={!enabled}
          checked={checked}
          onChange={() => handleCheckboxChange(id)}
          className="appearance-none cursor-pointer w-6 h-6 min-w-[24px] border-2 border-default rounded-[4px] checked:border-purple"
        />
        <svg
          className={`absolute cursor-pointer top-[1.8px] left-[2px] invisible check-${id} transition`}
          width="20"
          height="20"
          viewBox="0 0 20 20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M8.33333 12.9883L5.58917 10.2442L4.41084 11.4225L8.33333 15.345L16.4225 7.25584L15.2442 6.07751L8.33333 12.9883Z"
            fill="#6764F1"
          />
        </svg>
        <div className="text-sm leading-6">
          <p className="text-white text-xs/[18px] font-medium">{label}</p>
        </div>
      </label>
    </div>
  );
};

export default Checkbox;
