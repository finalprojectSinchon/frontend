import {useEffect, useState} from "react";
import axios from "axios";
import {Col} from "reactstrap";
import ComponentCard from "src/components/ComponentCard.js";
import Chart from "react-apexcharts";

const NoiseChart = () => {

    const noiseapiURI = import.meta.env.VITE_noiseApi;
    const [noiseData,setNoiseData] = useState([]);
    const [noiseInfo,setNoiseInfo] = useState([{
        mesurpostnNm:'',
        mesurVal : null
    }])

    useEffect(() => {

        axios.get(noiseapiURI)
            .then(res=> res.data)
            .then(data => {
                setNoiseData(data.response.body.items)
            })
            .catch(error => {
                alert('다시 시도해주세요')
                console.error('error : ', error)
            })

    }, []);

    useEffect(() => {
        const info = noiseData.map(noise => ({
            mesurpostnNm: noise.mesurpostnNm,
            mesurVal: noise.mesurVal
        }));
        setNoiseInfo(info);
    }, [noiseData]);

    const optionsbar = {
        chart: {
            fontFamily: "'Rubik', sans-serif",
        },
        colors: ['#4fc3f7'],
        dataLabels: {
            enabled: false,
        },
        xaxis: {
            categories:
                noiseInfo.map(noise => {
                    return noise.mesurpostnNm
                }),
            labels: {
                style: {
                    cssClass: 'grey--text lighten-2--text fill-color',
                },
            },
        },
        plotOptions: {
            bar: {
                horizontal: true,
            },
        },
        grid: {
            borderColor: 'rgba(0,0,0,0.1)',
        },
        yaxis: {
            labels: {
                style: {
                    cssClass: 'grey--text lighten-2--text fill-color',
                },
            },
        },
        tooltip: {
            theme: 'dark',
        },
    };

    const seriesbar = [
        {
            data: noiseInfo.map(noise => {
                return noise.mesurVal
            }),
        },
    ];
    return(

          <Col md="15">
            <ComponentCard title="공항 소음 정보">
                <Chart options={optionsbar} series={seriesbar} type="bar" height="500" />
            </ComponentCard>
        </Col>

    );

}

export default NoiseChart