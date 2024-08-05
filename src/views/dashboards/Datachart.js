import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Col } from 'reactstrap';
import Chart from 'react-apexcharts';
import ComponentCard from '../../components/ComponentCard';
import { fetchInspections } from '../../store/apps/inspection/inspectionSlice';

const DataChart = () => {
    const dispatch = useDispatch();
    const inspectionList = useSelector((state) => state.inspections.inspectionList);
    const status = useSelector((state) => state.inspections.status);
    const error = useSelector((state) => state.inspections.error);

    useEffect(() => {
        dispatch(fetchInspections());
    }, [dispatch]);

    useEffect(() => {
        console.log('inspectionList:', inspectionList);
        console.log('status:', status);
        console.log('error:', error);
    }, [inspectionList, status, error]);

    const data = status === 'succeeded' && inspectionList && Array.isArray(inspectionList.data) ? inspectionList.data : [];
    useEffect(() => {
        console.log('data:', data);
    }, [data]);

    const categories = data.map(item => item.status || 'Unknown status');
    const seriesData = data.map(item => item.equipmentQuantity || 0);

    const optionscolumn = {
        colors: ['#745af2', '#263238', '#4fc3f7'],
        chart: {
            fontFamily: "'Rubik', sans-serif",
        },
        plotOptions: {
            bar: {
                horizontal: false,
                endingShape: 'rounded',
                columnWidth: '55%',
            },
        },
        dataLabels: {
            enabled: false,
        },
        stroke: {
            show: true,
            width: 2,
            colors: ['transparent'],
        },
        xaxis: {
            categories: categories,
            labels: {
                style: {
                    cssClass: 'grey--text lighten-2--text fill-color',
                },
            },
        },
        yaxis: {
            title: {
                text: 'Quantity',
                color: '#8898aa',
            },
            labels: {
                style: {
                    cssClass: 'grey--text lighten-2--text fill-color',
                },
            },
        },
        fill: {
            opacity: 1,
        },
        tooltip: {
            theme: 'dark',
            y: {
                formatter(val) {
                    return `${val}`;
                },
            },
        },
        grid: {
            borderColor: 'rgba(0,0,0,0.1)',
        },
        legend: {
            show: true,
            position: 'bottom',
            width: '50px',
            fontFamily: "'Montserrat', sans-serif",
            labels: {
                colors: '#8898aa',
            },
        },
    };

    const seriescolumn = [
        {
            name: 'Inspection Quantity',
            data: seriesData,
        },
    ];

    return (
        <Col md="12">
            <ComponentCard title="안전 점검 전체 현황">
                {status === 'loading' && <p>Loading...</p>}
                {status === 'failed' && <p>Error: {error}</p>}
                {status === 'succeeded' && (
                    <Chart options={optionscolumn} series={seriescolumn} type="bar" height="280" />
                )}
            </ComponentCard>
        </Col>
    );
};

export default DataChart;
