import React, { useEffect, useState } from 'react';
import {Chart, ArcElement,CategoryScale,LinearScale,BarElement,PointElement,LineElement,RadialLinearScale} from 'chart.js';
import { Doughnut, Line, Bar, Radar, Pie,PolarArea } from 'react-chartjs-2';
import ComponentCard from "../../components/ComponentCard";
import { Row, Col } from 'reactstrap';
import { fetchMaintenances } from "src/store/apps/maintenance/maintenanceSlice.js";
import { useDispatch, useSelector } from "react-redux";
import 'chart.js/auto';

Chart.register(ArcElement,CategoryScale,LinearScale,BarElement,PointElement,LineElement,RadialLinearScale);

const MaintenanceChart = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchMaintenances());
    }, [dispatch]);

    const maintenceList = useSelector(state => state.maintenances.maintenanceList);
    const maintences = maintenceList?.data?.maintenanceList || [];
    const [status, setStatus] = useState([]);

    const statusCounts = maintences.reduce((acc, maintenance) => {
        const { status } = maintenance;
        if (status) {
            acc[status] = (acc[status] || 0) + 1;
        }
        return acc;
    }, {});

    useEffect(() => {
        const statusArray = Object.entries(statusCounts).map(([key, value]) => ({
            status: key,
            count: value,
        }));
        setStatus(statusArray);
    }, [maintences]);

    const chartData = {
        doughnutData: {
            data: status.map(item => item.count),
            labels: status.map(item => item.status),
        },
    };

    console.log('chartData',chartData)
    const doughnutData = {
        labels: chartData.doughnutData.labels,
        datasets: [
            {
                data: chartData.doughnutData.data,
                backgroundColor: ['#9eb4dd', '#2e4cab', '#4777db'],
                hoverBackgroundColor: ['#9eb4dd', '#2e4cab', '#4777db'],
            },
        ],
    };

    return (
        <div>
            <Row>
                <Col md="12">
                    <ComponentCard title="시설물 정비" >
                        <div className="chart-wrapper" style={{ width: '100%', margin: '0 auto', height: 145}}>
                            <Doughnut
                                data={doughnutData}
                                options={{
                                    maintainAspectRatio: false,
                                    plugins: {
                                        tooltip: {
                                            enabled: true,
                                            callbacks: {
                                                label: (tooltipItem) => {
                                                    return `${tooltipItem.label}: ${tooltipItem.raw}`;
                                                },
                                            },
                                        },
                                        legend: {
                                            display: true,
                                            position: 'bottom',  // 라벨을 차트 아래에 표시
                                            labels: {
                                                font: {
                                                    size: 10,  // 라벨 글씨 크기를 작게 조정
                                                },
                                                boxWidth: 10, // 라벨 앞의 색상 박스 크기 조정
                                                padding: 15,  // 라벨 간의 간격 조정
                                            },
                                        },
                                    },
                                }}

                            />
                        </div>
                    </ComponentCard>
                </Col>
            </Row>
        </div>
    );
};

export default MaintenanceChart;
