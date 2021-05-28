import React from 'react';

const ServerTime = ({ api }) => {
    const [date, setDate] = React.useState();
    const [dateString, setDateString] = React.useState();

    const updateTime = () => {
        if (!date) return;

        date.setSeconds(date.getSeconds() + 1);

        const year = date.getUTCFullYear();
        const month = `0${date.getMonth() + 1}`.slice(-2);
        const day = `0${date.getUTCDate()}`.slice(-2);
        const hours = `0${date.getUTCHours()}`.slice(-2);
        const minutes = `0${date.getMinutes()}`.slice(-2);
        const seconds = `0${date.getSeconds()}`.slice(-2);

        setDateString(`${year}-${month}-${day} ${hours}:${minutes}:${seconds} GMT`);
    };

    const getServerTime = () => {
        api.send({ time: 1 }).then(response => {
            const newDate = new Date(response.time * 1000);
            setDate(newDate);
        });
    };

    React.useEffect(() => {
        getServerTime();

        const updateTimeInterval = setInterval(updateTime, 1000);
        const serverTimeInterval = setInterval(getServerTime, 30000);

        return () => {
            clearInterval(updateTimeInterval);
            clearInterval(serverTimeInterval);
        };
    }, []);

    React.useEffect(() => updateTime(), [date]);

    return <b>{dateString}</b>;
};

export default ServerTime;
