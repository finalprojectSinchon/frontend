import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Card, CardBody } from 'reactstrap';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import './calendar.scss';
import { fetchMaintenances } from 'src/store/apps/maintenance/maintenanceSlice.js';
import { useNavigate } from "react-router-dom";
import api from "src/store/apps/airplane/api.js";

moment.locale('ko');
const localizer = momentLocalizer(moment);

const CalendarApp = () => {
    const dispatch = useDispatch();
    const maintenanceList = useSelector((state) => state.maintenances.maintenanceList);
    const maintenances = maintenanceList?.data?.maintenanceList || [];
    const userInfo = useSelector((state) => state.userInfo); // 유저 정보 가져오기
    const [calenderData, setCalenderData] = useState([]);

    const navigate = useNavigate();

    useEffect(() => {
        dispatch(fetchMaintenances());
    }, [dispatch]);

    useEffect(() => {
        const fetchManagers = async (maintenanceCode) => {
            try {
                const response = await api.post('/api/v1/managers', {
                    airportType: "maintenance",
                    airportCode: maintenanceCode
                });
                return response.data.data;
            } catch (error) {
                console.error('Error fetching managers:', error);
                return null;
            }
        };

        const fetchMaintenanceInfo = async () => {
            let myMaintenance = [];

            for (let maintenance of maintenances) {
                const managers = await fetchManagers(maintenance.maintenanceCode);

                const managerList = Array.isArray(managers.Manager) ? managers.Manager : [managers.Manager];
                console.log('managerList', managerList);

                if (managerList) {
                    const userManagers = managerList.filter(manager => manager.username == userInfo.userName);
                    console.log('userManagers', userManagers);
                    if (userManagers.length > 0) {
                        myMaintenance.push(maintenance);
                    }
                } else {
                    console.error('No valid managers found:', managers);
                }
            }

            const newCalendarData = myMaintenance.map(maintenance => {
                const maintenanceEndDate = new Date(maintenance.maintenanceEndDate);
                const maintenanceStartDate = new Date(maintenance.maintenanceStartDate);

                maintenanceEndDate.setDate(maintenanceEndDate.getDate() + 1);

                return {
                    title: `${maintenance.structure} 정비`,
                    start: maintenanceStartDate,
                    end: maintenanceEndDate,
                    allDay: true,
                    color: 'primary',
                    code: maintenance.maintenanceCode
                };
            });

            setCalenderData(newCalendarData);
        };

        if (maintenances.length > 0) {
            fetchMaintenanceInfo();
        }
    }, [maintenances, userInfo]);

    const eventColors = (event) => {
        return { className: `event-${event.color || 'default'}` };
    };

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
