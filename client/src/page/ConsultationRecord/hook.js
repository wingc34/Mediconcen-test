import { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import dayjs from 'dayjs';

const formattingDay = (datetime) => {
    return dayjs(datetime).format('YYYY-MM-DD');
};

export default (email) => {
    const [records, setRecords] = useState([]);
    const [markedDates, setMarkedDates] = useState({});
    const [selectedrecords, setSelectedrecords] = useState([]);
    const [selectedDate, setSelectedDate] = useState(formattingDay(Date.now()));

    const displayRecords = useCallback(
        (selectedDay) => {
            setSelectedrecords(
                Object.values(records).filter((record) => {
                    return formattingDay(record.datetime) == selectedDay.dateString;
                }),
            );
            setSelectedDate(selectedDay.dateString);
        },
        [setSelectedrecords, records, setSelectedDate],
    );

    useEffect(() => {
        axios
            .get(`http://localhost:5001/consultation-records`, {
                params: {
                    email: email,
                },
            })
            .then((res) => {
                const recordObject = res.data.reduce((obj, record) => {
                    return {
                        ...obj,
                        [formattingDay(record.datetime)]: { ...record },
                    };
                }, {});
                const markedObject = res.data.reduce((obj, record) => {
                    return {
                        ...obj,
                        [formattingDay(record.datetime)]: { selected: true },
                    };
                }, {});
                setRecords(recordObject);
                setMarkedDates(markedObject);
            });
    }, []);

    return {
        markedDates,
        displayRecords,
        selectedrecords,
        selectedDate,
    };
};
