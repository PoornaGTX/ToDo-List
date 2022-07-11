import React from "react";

const FormRow = ({ type, name, value, handleChange, labelText, color }) => {
  return (
    <div className="form-row">
      <label htmlFor={name} className="form-label">
        {labelText || name}
      </label>
      <input
        type={type}
        value={value}
        name={name}
        onChange={handleChange}
        style={{ color: color }}
        className="form-input"
      />
    </div>
  );
};

export default FormRow;
