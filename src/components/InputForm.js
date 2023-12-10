import React, { useState } from 'react';

const InputForm = ({ onGenerateChart }) => {
  const [miniscript, setMiniscript] = useState('');

  const handleInputChange = (e) => {
    setMiniscript(e.target.value);
  };

  const handleGenerateClick = () => {
    onGenerateChart(miniscript);
  };

  return (
    <div className="containerinput">
      <div className="roworganize">
        <input type="text" value={miniscript} onChange={handleInputChange} />
        <button onClick={handleGenerateClick}>Generate MiniScript</button>
      </div>
    </div>
  );
};

export default InputForm;
