import React, { useEffect, useState } from 'react';
import { Card, Col, Row, CardImgOverlay } from 'reactstrap';
import img1 from '../../assets/images/background/weatherbg.jpg';
import axios from "axios";

const WeatherCard = () => {
    const airapiURI = import.meta.env.VITE_airApi;

    const [currentDateTime, setCurrentDateTime] = useState('');
    const [airInfo, setAirInfo] = useState([]);

    useEffect(() => {
        const now = new Date();
        const year = now.getFullYear();
        const month = (now.getMonth() + 1).toString().padStart(2, '0');
        const day = now.getDate().toString().padStart(2, '0');
        const hours = now.getHours().toString().padStart(2, '0');
        const minutes = now.getMinutes().toString().padStart(2, '0');

        const formattedDateTime = `${year}${month}${day}${hours}${minutes}`;
        setCurrentDateTime(formattedDateTime);
    }, []);

    useEffect(() => {
        axios.get(airapiURI + currentDateTime)
            .then(res => res.data)
            .then(data => {
                const info = data.response.body?.items.item.map(air => ({
                    windDirection: air.wd,
                    windSpeed: air.ws,
                    Temperatures: air.ta,
                    SteamPressure: air.qnh
                }));
                setAirInfo(info || []);
            })
            .catch(error => {
                console.error('error : ', error);
            });
    }, [currentDateTime]);

    return (
        <Card className="overflow-hidden">
            <img src={img1} alt="" className="city-img" />
            <CardImgOverlay>
                <h3 className="text-dark-white">인천 공항</h3>
                <span className="text-dark-white">현재</span>
            </CardImgOverlay>
            <div className="p-3">
                <Row>
                    <Col xs="15">
                        <div className="d-flex justify-content-around">
                            <div className="d-flex align-items-center text-center">
                                <div className="display-6 text-primary">
                                    <i className="bi bi-sun" />
                                </div>
                                <div className="ms-3">
                                    {airInfo?.length > 0 ? (
                                        <>
                                            <h1 className="fw-light text-primary mb-0">
                                                {airInfo[0].Temperatures}
                                                <sup>0</sup>
                                            </h1>
                                            <small className="text-muted">기온</small>
                                        </>
                                    ) : (
                                        <h1 className="fw-light text-primary mb-0">Loading...</h1>
                                    )}
                                </div>
                            </div>

                            <div className="d-flex align-items-center text-center">
                                <div className="ms-3">
                                    {airInfo?.length > 0 ? (
                                        <>
                                            <h1 className="fw-light text-primary mb-0">
                                                {airInfo[0].windSpeed}
                                                <sup> m/s</sup>
                                            </h1>
                                            <small className="text-muted">풍속</small>
                                        </>
                                    ) : (
                                        <h1 className="fw-light text-primary mb-0">Loading...</h1>
                                    )}
                                </div>
                            </div>

                            <div className="d-flex align-items-center text-center">
                                <div className="ms-3">
                                    {airInfo?.length > 0 ? (
                                        <>
                                            <h1 className="fw-light text-primary mb-0">
                                                {airInfo[0].windDirection}
                                                <sup>°</sup>
                                            </h1>
                                            <small className="text-muted">풍향</small>
                                        </>
                                    ) : (
                                        <h1 className="fw-light text-primary mb-0">Loading...</h1>
                                    )}
                                </div>
                            </div>

                            <div className="d-flex align-items-center text-center">
                                <div className="ms-3">
                                    {airInfo?.length > 0 ? (
                                        <>
                                            <h1 className="fw-light text-primary mb-0">
                                                {airInfo[0].SteamPressure}
                                                <sup> hPa</sup>
                                            </h1>
                                            <small className="text-muted">기압</small>
                                        </>
                                    ) : (
                                        <h1 className="fw-light text-primary mb-0">Loading...</h1>
                                    )}
                                </div>
                            </div>
                        </div>
                    </Col>
                </Row>
            </div>
        </Card>
    );
};

export default WeatherCard;
