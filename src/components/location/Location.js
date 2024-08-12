import { useEffect, useState } from "react";
import { Container, Row, Col, FormGroup, Label, Input, Alert } from "reactstrap";
import api from "src/store/apps/airplane/api.js";

const Location = ({ setLocationState }) => {


    const [region, setRegion] = useState([]);
    const [floor, setFloor] = useState([]);
    const [location, setLocation] = useState([]);
    const [selectedRegion, setSelectedRegion] = useState("");
    const [selectedFloor, setSelectedFloor] = useState("");
    const [selectedLocation, setSelectedLocation] = useState("");
    const [error, setError] = useState(null);

    useEffect(() => {
        setLocationState(selectedRegion + " " + selectedFloor + " " + selectedLocation)
    }, [selectedRegion,selectedFloor,selectedLocation]);

    useEffect(() => {
        // 이상한 데이터가 너무 많음
        // api
        //     .get("/api/v1/location/region")
        //     .then((res) => res.data)
        //     .then((data) => {
        //         console.log(data.data)
        //         setRegion(data.data);
        //     })
        //     .catch((error) => {
        //         console.error(error);
        //         setError("다시 시도해 주세요");
        //     });
        setRegion([{region :  '제1여객터미널'}
            ,{region : '제2여객터미널'},
            {region : '탑승동'}
        ])

    }, []);

    const handleRegionChange = (e) => {
        const selected = e.target.value;
        console.log(selected)
        setSelectedRegion(selected);

        if (selected) {
            api.get(`/api/v1/location/region/${selected}/floors`)
                .then(res => res.data)
                .then(data => {
                    setFloor(data.data)
                })
        } else {
            setFloor([]);
        }
    };

    const handleFloorChange = (e) => {
        const selected = e.target.value;
        console.log(selected)
        setSelectedFloor(selected);
        if(selected) {
            api.get(`/api/v1/location/floors/${selectedRegion}/${selected}/locations`)
                .then(res => res.data)
                .then(data => {
                    setLocation(data.data);
                    console.log(data);
                })
                .catch(error => {
                    console.error(error);
                    setLocation("다시 시도하세요")
                })
        } else {
            setLocation([]);
        }
    }

    const handleLocationChange = (e) => {
        const selected = e.target.value;
        setSelectedLocation(selected);
    }

    return (
        <Container className="mt-4">
            <Row>
                <Col md={4}>
                    <FormGroup>
                        <Label for="regionSelect">지역</Label>
                        <Input
                            type="select"
                            id="regionSelect"
                            value={selectedRegion}
                            onChange={handleRegionChange}
                            placeholder="지역을 입력해 주세요"
                        >
                            <option value="">지역을 선택하세요</option>
                            {region.map((regionItem, index) => (
                                <option key={index} value={regionItem.region}>
                                    {regionItem.region}
                                </option>
                            ))}
                        </Input>
                    </FormGroup>
                </Col>
                <Col md={4}>
                    <FormGroup>
                        <Label for="floorSelect">층수</Label>
                        <Input
                            type="select"
                            id="floorSelect"
                            disabled={!selectedRegion}
                            onChange={handleFloorChange}
                            placeholder="지역을 입력해 주세요"
                        >
                            <option value="">층수를 선택하세요</option>
                            {floor.map((floorItem, index) => (
                                <option key={index} value={floorItem.floor}>
                                    {floorItem.floor}
                                </option>
                            ))}
                        </Input>
                    </FormGroup>
                </Col>
                <Col md={4}>
                    <FormGroup>
                        <Label for="locationSelect">위치</Label>
                        <Input
                            type="select"
                            id="locationSelect"
                            disabled={!selectedFloor}
                            placeholder="지역을 입력해 주세요"
                            onChange={handleLocationChange}
                        >
                            <option value="">위치를 선택하세요</option>
                            {location.map((locationItem, index) => (
                                <option key={index} value={locationItem.locationOne}>
                                    {locationItem.locationOne}
                                </option>
                            ))}
                        </Input>
                    </FormGroup>
                </Col>
            </Row>
            {error && <Alert color="danger">{error}</Alert>}
        </Container>
    );
};

export default Location;
