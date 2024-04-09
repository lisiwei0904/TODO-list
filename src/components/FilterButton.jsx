import React from "react";

function FilterButton({ setFilter, select, name, activeFilter }) {
  const isActive = activeFilter === select;

  return (
    <button 
      type="button" 
      className={`btn toggle-btn ${isActive ? 'active-green' : ''}`} 
      onClick={() => setFilter(select)}
    >
      {name}
    </button>
  );
}

export default FilterButton;
