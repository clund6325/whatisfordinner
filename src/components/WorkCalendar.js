import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import moment from "moment";

const WorkCalendar = ({ setWorkDays }) => {
    const [selectedDates, setSelectedDates] = useState([]);
    const handleDateChange = (date) => {
        if (!date) {
            return;
        }

        const newSelectedDates = selectedDates.some(selectedDate => moment(selectedDate).isSame(date, 'day')) ? selectedDates.filter(selectedDate => !moment(selectedDate).isSame(date, 'day')) : [...selectedDates, date];

        setSelectedDates(newSelectedDates);

        const workDaysArray = Array(7).fill(false);
        newSelectedDates.forEach(date => {
            const dayIndex = moment(date).day();
            workDaysArray[dayIndex] = true;
        });
        setWorkDays(workDaysArray);
    };

    return(
        <div>
            <h2>Select Work Days</h2>
            <DatePicker
                selected={null}
                onChange={handleDateChange}
                inline
                highlightDates={selectedDates}
            />
        </div>
    );
};

export default WorkCalendar;