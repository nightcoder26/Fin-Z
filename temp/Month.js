import React, { useState } from 'react';
import $ from 'jquery';
import 'jquery-ui/ui/widgets/datepicker';

function MonthPage() {
  const [selectedDate, setSelectedDate] = useState('');

  $(function () {
    $("#datepicker").datepicker({
      onSelect: function (dateText) {
        setSelectedDate(dateText);
      }
    });

    $(".date-picker").on('click', function () {
      $("#datepicker").datepicker("show");
    });
  });

  return (
    <div className="main-container">
      <div className="horizontal-container">
        <div className="horizontal-box"></div>
        <div className="horizontal-box"></div>
        <div className="horizontal-box third-box"></div>
        <input type="text" className="date-picker" id="datepicker" />
      </div>

      <div className="vertical-container">
        {[...Array(10)].map((_, index) => (
          <div className="vertical-box" key={index}></div>
        ))}
      </div>

      <p id="selectedDate">{selectedDate}</p>
    </div>
  );
}

export default MonthPage;
