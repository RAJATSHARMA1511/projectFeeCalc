import React from 'react'
import './FeeTime.css';

const FeeTime = ({label, selectedValue, handleChange, dropdownOptions }) => {
  return (
        <>
        <label>{label + ":"}</label>
        <select value={selectedValue} onChange={handleChange}>
            <option value="">{`Select a ${label}`}</option>
            {dropdownOptions}
        </select>
        </>
  )
}

export default FeeTime;