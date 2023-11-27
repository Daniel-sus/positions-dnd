import React from "react";
import Checkbox from "./Checkbox";

const Fieldset = ({
  fieldset,
  selectedResponsibilities,
  handleCheckboxChange,
  enabled,
}) => {
  return (
    <div>
      <legend className="text-xs/[18px] font-medium text-gray">
        {fieldset.legend}
      </legend>
      <div className="mt-1 flex flex-col gap-2">
        {fieldset.checkboxes.map((checkbox) => (
          <Checkbox
            key={checkbox.id}
            id={checkbox.id}
            label={checkbox.text}
            handleCheckboxChange={handleCheckboxChange}
            checked={selectedResponsibilities?.includes(checkbox.id)}
            enabled={enabled}
          />
        ))}
      </div>
    </div>
  );
};

export default Fieldset;
