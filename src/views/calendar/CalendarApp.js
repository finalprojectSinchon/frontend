import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Card, CardBody } from 'reactstrap';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import './calendar.scss';
import { fetchMaintenances } from 'src/store/apps/maintenance/maintenanceSlice.js';
import { useNavigate } from "react-router-dom";

moment.locale('ko');
const localizer = momentLocalizer(moment);

const CalendarApp = () => {
    const dispatch = useDispatch();
    const maintenanceList = useSelector((state) => state.maintenances.maintenanceList);
    const maintenances = maintenanceList?.data?.maintenanceList || [];
    const userInfo = useSelector((state) => state.userInfo); // 유저 정보 가져오기
    const [maintenanceInfo, setMaintenanceInfo] = useState([]);
    const [calenderData, setCalenderData] = useState([]);

    useEffect(() => {
        dispatch(fetchMaintenances());
    }, [dispatch]);



    useEffect(() => {
        const myMaintenance = maintenances.filter((maintenance) => {
            return (
                (maintenance.baggageClaim?.manager === userInfo.userName) ||
                (maintenance.checkinCounter?.manager === userInfo.userName) ||
                (maintenance.facilities?.manager === userInfo.userName) ||
                (maintenance.gate?.manager === userInfo.userName) ||
                (maintenance.storage?.manager === userInfo.userName) ||
                (maintenance.store?.manager === userInfo.userName)
            );
        });
        setMaintenanceInfo(myMaintenance);
    }, [maintenanceList, userInfo]);



    useEffect(() => {
        const newCalendarData = maintenanceInfo.map(date => {
            const maintenanceEndDate = new Date(date.maintenanceEndDate);
            const maintenanceStartDate = new Date(date.maintenanceStartDate);

            maintenanceEndDate.setDate(maintenanceEndDate.getDate() + 1);

            return {
                title: `${date.structure} 정비`,
                start: maintenanceStartDate,
                end: maintenanceEndDate,
                allDay: true,
                color: 'primary',
                code: date.maintenanceCode
            };
        });

        setCalenderData([...newCalendarData]);
    }, [maintenanceInfo]);



    const eventColors = (event) => {
        if (event.color) {
            return { className: `event-${event.color}` };
        }
        return { className: `event-default` };
    };

    const navigate = useNavigate();
    const onSelectEvent = (event) => {
        navigate(`/maintenance/${event.code}`);
    };

    return (
        <Card>
            <CardBody>
                <Calendar
                    selectable
                    events={calenderData}
                    defaultView="month"
                    scrollToTime={new Date(1970, 1, 1, 6)}
                    defaultDate={new Date()}
                    localizer={localizer}
                    style={{ height: 'calc(100vh - 350px)' }}
                    eventPropGetter={(event) => eventColors(event)}
                    onSelectEvent={onSelectEvent}
                />
            </CardBody>
        </Card>
    );
};

export default CalendarApp;
