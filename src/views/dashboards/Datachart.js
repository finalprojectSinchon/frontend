import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Col } from 'reactstrap';
import Chart from 'react-apexcharts';
import ComponentCard from '../../components/ComponentCard';
import { statusInspection } from '../../store/apps/inspection/inspectionSlice';

const DataChart = () => {
    const dispatch = useDispatch();
    const inspectionList = useSelector((state) => state.inspections.chart);
    const status = useSelector((state) => state.inspections.status);
    const error = useSelector((state) => state.inspections.error);

    useEffect(() => {
        dispatch(statusInspection());
    }, [dispatch]);

    useEffect(() => {
        console.log('inspectionList:', inspectionList);
    }, [inspectionList]);

    // 데이터 가공
    const structures = [...new Set(inspectionList.map(item => item.structure))];
    const statusTypes = ['운영중', '정상', '고장'];

    const seriesData = statusTypes.map(statusType => {
        return {
            name: statusType,
            data: structures.map(structure => {
                const item = inspectionList.find(item => item.structure === structure && item.status === statusType);
                return item ? item.count : 0;
            })
        };
    });

    console.log('seriesData', seriesData);
    console.log('categories', structures);

    const optionscolumn = {
        colors: ['#9eb4dd', '#2e4cab', '#4777db'],
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
            categories: structures,
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

    return (
        <Col md="12">
            <ComponentCard title="안전 점검 전체 현황">
                {status === 'loading' && <p>Loading...</p>}
                {status === 'failed' && <p>Error: {error}</p>}
                {status === 'succeeded' && (
                    <Chart options={optionscolumn} series={seriesData} type="bar" height="280" />
                )}
            </ComponentCard>
        </Col>
    );
};

export default DataChart;
