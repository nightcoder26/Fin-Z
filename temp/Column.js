import React from 'react';

const Column = ({ numberOfBoxes }) => {
  const renderBoxes = () => {
    const boxes = [];
    for (let i = 1; i <= numberOfBoxes; i++) {
      boxes.push(
        <div className="vertical-box" key={i}>
        </div>
      );
    }
    return boxes;
  };

  return (
    <div className="column">
      <div className="vertical-scroll">
        {renderBoxes()}
      </div>
    </div>
  );
};

export default Column;
