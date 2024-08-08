import React from 'react';
import { Chart, ArcElement, CategoryScale, LinearScale, BarElement, PointElement, LineElement, RadialLinearScale } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import BreadCrumbs from "../../layouts/breadcrumbs/BreadCrumbs";
import ComponentCard from "../../components/ComponentCard";
import { Row, Col } from 'reactstrap'; // react-bootstrap에서 Row와 Col을 가져옵니다.

Chart.register(ArcElement, CategoryScale, LinearScale, BarElement, PointElement, LineElement, RadialLinearScale);

const EquipmentChart = () => {
    // chartData를 직접 정의합니다.
    const chartData = {
        doughnutData: {
            data: [300, 50, 100, 40, 120]
        }
    };

    const doughnutData = {
        labels: ['Red', 'Blue', 'Yellow', 'Green', 'Orange'],
        datasets: [
            {
                data: chartData.doughnutData.data,
                backgroundColor: ['#dc3545', '#2962ff', '#fb6340', '#2dce89', '#4fc3f7'],
                hoverBackgroundColor: ['#dc3545', '#2962ff', '#fb6340', '#2dce89', '#4fc3f7'],
            },
        ],
    };

    return (
        <div>
            <BreadCrumbs />
            <Row>
                <Col md="6">
                    <ComponentCard title="Doughnut Chart">
                        <div className="chart-wrapper" style={{ width: '100%', margin: '0 auto', height: 350 }}>
                            <Doughnut
                                data={doughnutData}
                                options={{
                                    maintainAspectRatio: false,
                                    plugins: {
                                        legend: {
                                            display: true,
                                            labels: {
                                                fontFamily: 'Nunito Sans, sans-serif',
                                                fontColor: '#1e2a35',
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

export default EquipmentChart;
