import React, {useEffect, useState} from 'react';
import { Card, CardBody, CardTitle, Row, Col } from 'reactstrap';
import axios from "axios";
import ComponentCard from "src/components/ComponentCard.js";


const AirQuality = () => {

    const airqualityURI = import.meta.env.VITE_airqualityApi;
    const [airqualityData,setAirqualityData] = useState([]);
    const [airqualityInfo,setAirqualityInfo] = useState([{
        terminalid:null,
        pm10 : null
    }])

    useEffect(() => {

        axios.get(airqualityURI)
            .then(res=> res.data)
            .then(data => {
                setAirqualityData(data.response.body.items)
            })
            .catch(error => {
                alert('다시 시도해주세요')
                console.error('error : ', error)
            })
    }, []);
    console.log('airqualityData',airqualityData)

    useEffect(() => {
        const info = airqualityData.map(air => ({
            terminalid: air.terminalid,
            pm10: air.pm10
        }));
        setAirqualityInfo(info);
    }, [airqualityData]);


    const icon = (info) => {
        console.log('info', info)
        if (info?.pm10 < 50) {
            return (
                <i className="bi-emoji-smile" style={{fontSize: '65px', color: 'green'}}/>
            );
        } else if (info?.pm10 < 100) {
            <i className="bi-emoji-neutral" style={{fontSize: '65px', color: 'orange'}}/>
        } else {
            <i className="bi-emoji-angry" style={{fontSize: '65px', color: 'red'}}/>
        }
    }

    return (
        <Card >
            <ComponentCard title="공항 내 미세먼지">
            <Row className="gx-0" >
            <Col md="4" className="border-end" style={{ height: '50px' }} >
                    <CardBody className="text-center" >
                        <CardTitle tag="h4">제1터미널</CardTitle>
                        <div style={{ width: '100px', margin: '0 auto' }}>
                            {airqualityInfo?.length > 0 ?
                                icon(airqualityInfo[0]):''
                            }
                        </div>
                    </CardBody>
                    <div className="border-top p-1 text-center">
                        <h4 className="mb-0">
                            {airqualityInfo?.length > 0 ?
                                airqualityInfo[0]?.pm10+'µg/m³':''
                            }
                        </h4>
                    </div>
                </Col>
                <Col md="4" className="border-end">
                    <CardBody className="text-center">
                        <CardTitle tag="h4">제2터미널</CardTitle>
                        <div style={{ width: '100px', margin: '0 auto' }}>
                            {airqualityInfo?.length > 0 ?
                                icon(airqualityInfo[1]):''
                            }
                        </div>
                    </CardBody>
                    <div className="border-top p-2 text-center">
                        <h4 className="mb-0">
                            {airqualityInfo?.length > 0 ?
                                airqualityInfo[1]?.pm10+'µg/m³':''
                            }
                        </h4>
                    </div>
                </Col>
                <Col md="4" className="border-end">
                    <CardBody className="text-center">
                        <CardTitle tag="h4">탑승동</CardTitle>
                        <div style={{width: '100px', margin: '0 auto'}}>
                            {airqualityInfo?.length > 0 ?
                                icon(airqualityInfo[2]):''
                            }
                        </div>
                    </CardBody>
                    <div className="border-top p-2 text-center">
                        <h4 className="mb-0">
                            
                            {airqualityInfo?.length > 0 ?
                                airqualityInfo[2]?.pm10+'µg/m³':''
                            }
                        </h4>
                    </div>
                </Col>

            </Row>
            </ComponentCard>
        </Card>
    );
};

export default AirQuality;
