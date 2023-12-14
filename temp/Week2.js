import React, { useEffect } from 'react';
import 'jquery-ui/ui/widgets/datepicker';
import $ from 'jquery';
import Column from './Column'; 

function Week2Page() {
  const numberOfBoxes = 15; 
  
  useEffect(() => {
    $("#datepicker").datepicker({
      onSelect: function (dateText) {
        $(this).val(dateText); 
      }
    });

    $(".date-picker").on('click', function () {
      $("#datepicker").datepicker("show");
    });

  }, []);

  return (
    <div className="main-container">
      <div className="horizontal-container">
        <div className="horizontal-box"></div>
        <div className="horizontal-box"></div>
        <div className="horizontal-box third-box"></div>
        <input type="text" className="date-picker" id="datepicker" />
      </div>

      <div className="columns-container">
        <Column numberOfBoxes={numberOfBoxes} />
        <Column numberOfBoxes={numberOfBoxes} />
        <Column numberOfBoxes={numberOfBoxes} />
      </div>
    </div>
  );
}

export default Week2Page;
