import {useEffect, useState} from "react";
import Modal from "react-modal";

import css from "./Calendar.module.css";
import clsx from "clsx";
import Shift from "../Shift/Shift";
import {useDispatch, useSelector} from "react-redux";
import {createShift} from "../../redux/tickets/operations";
import {selectUser} from "../../redux/auth/selectors";
import {selectShifts} from "../../redux/tickets/selectors";

const Calendar = ({isOpen, onClose, shiftList}) => {
    const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    const [currentDate, setCurrentDate] = useState(new Date());
    const [selectedDate, setSelectedDate] = useState();
    const [filteredShifts, setFilteredShifts] = useState();

    const dispatch = useDispatch();

    const user = useSelector(selectUser);
    const shifts = useSelector(selectShifts);

    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();

    const firstDayOfMonth = new Date(year, month, 1);
    const lastDayOfMonth = new Date(year, month + 1, 0);
    const firstDayIndex = firstDayOfMonth.getDay();
    const daysInMonth = lastDayOfMonth.getDate();

    // Генерація масиву для відображення днів у календарі
    const daysArray = Array.from({length: firstDayIndex}, () => null).concat(
        Array.from({length: daysInMonth}, (_, i) => i + 1)
    );

    const prevMonth = () => setCurrentDate(new Date(year, month - 1, 1));
    const nextMonth = () => setCurrentDate(new Date(year, month + 1, 1));

    const formatDate = (y, m, d) =>
        `${y}-${String(m + 1).padStart(2, "0")}-${String(d).padStart(2, "0")}`;

    const isEventDay = (day) => {
        const dateString = formatDate(year, month, day);
        return shiftList.some((shift) => shift.date.slice(0, 10) === dateString);
    };

    const getLocalISOString = () => {
        const now = new Date();

        const year = now.getFullYear();
        const month = String(now.getMonth() + 1).padStart(2, "0");
        const day = String(now.getDate()).padStart(2, "0");
        const hours = String(now.getHours()).padStart(2, "0");
        const minutes = String(now.getMinutes()).padStart(2, "0");
        const seconds = String(now.getSeconds()).padStart(2, "0");
        const milliseconds = String(now.getMilliseconds()).padStart(3, "0");

        return `${year}-${month}-${day}T${hours}:${minutes}:${seconds}.${milliseconds}Z`;
    };
    const today = getLocalISOString().split("T")[0]; // Формат 'YYYY-MM-DD'

    const isTodayDay = (day) => {
        console.log(today)
        return formatDate(year, month, day) === today;
    };

    const getEventsForDate = (day) => {
        const dateString = formatDate(year, month, day);
        console.log(shiftList)
        const result = shiftList.filter(
            (shift) => shift.date.slice(0, 10) === dateString
        );
        setFilteredShifts(result);
        setSelectedDate(formatDate(year, month, day));
        console.log(selectedDate)
    };

    const handleCreateNewShift = () => {
        const date = getLocalISOString();
        console.log(date);
        dispatch(createShift({date, groupId: user.groupId}));
    };


    useEffect(() => {
        const date = new Date();
        setSelectedDate(formatDate(year, month, date.getDate()));
        console.log(selectedDate);
        getEventsForDate(date.getDate());
    }, [shifts]);

    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={onClose}
            shouldCloseOnOverlayClick={true}
            shouldCloseOnEsc={true}
            bodyOpenClassName="no-scroll"
            className={clsx(css.modal)}
            overlayClassName={clsx(css.customOverlay)}
        >
            <div className={clsx(css.calendar)}>
                <div className={clsx(css.calendarHeader)}>
                    <button onClick={prevMonth}>{"<"}</button>
                    <h2>
                        {currentDate.toLocaleString("default", {month: "long"})} {year}
                    </h2>
                    <button onClick={nextMonth}>{">"}</button>
                </div>

                <div className={clsx(css.calendarGrid)}>
                    {daysOfWeek.map((day) => (
                        <div key={day} className={clsx(css.dayHeader)}>
                            {day}
                        </div>
                    ))}

                    {daysArray.map((day, index) => (
                        <button
                            onClick={() => day && isEventDay(day) && getEventsForDate(day)}
                            type="button"
                            key={index}
                            className={clsx(
                                css.day,
                                !day && css.empty,
                                day && css.active,
                                isEventDay(day) && css.event,
                                isTodayDay(day) && css.today
                            )}
                        >
                            {day}
                        </button>
                    ))}
                </div>
                <div className={clsx(css.shiftListWrapper)}>
                    {selectedDate && (
                        <div>
                            <h3>Shifts for {selectedDate}</h3>
                            <ul className={clsx(css.shiftList)}>
                                {filteredShifts.map((shift, index) => (
                                    <li key={index}>
                                        <Shift shift={shift} onClose={onClose}/>
                                    </li>
                                ))}
                            </ul>
                            {/* <button onClick={() => setSelectedDate(null)}>Close</button> */}
                        </div>
                    )}
                    <button
                        className={clsx(css.button)}
                        onClick={handleCreateNewShift}
                        type="button"
                    >
                        Start new shift
                    </button>
                </div>
            </div>
        </Modal>
    );
};

export default Calendar;
