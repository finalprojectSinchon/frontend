import React, { useState, useEffect } from 'react';
import {
  Card,
  CardBody,
  CardTitle,
  Row,
  Col,
  Form,
  FormGroup,
  Label,
  Input,
  Button,
  FormText
} from 'reactstrap';
import BreadCrumbs from '../../layouts/breadcrumbs/BreadCrumbs';
import { useNavigate, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAirplanes } from '../../store/apps/airplane/airplaneSlice';
import { fetchChkinCounters } from '../../store/apps/airplane/chkinCounterSlice';

const CheckinCounterDetail = () => {
  const location = useLocation();
  const state = location.state || {};
  const dispatch = useDispatch();
  
  const AirplaneList = useSelector((state) => state.airplanes.airplaneList);
  const ChkinCounterList = useSelector((state) => state.chkinCounters.chkinCounterList);
  const airplanes = AirplaneList?.data?.airplaneList || [];
  const chkincounters = ChkinCounterList?.data?.chkinCounterList;

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedAirline, setSelectedAirline] = useState('');
  const [selectedSchedule, setSelectedSchedule] = useState('');
  const [selectedAirport, setSelectedAirport] = useState('');
  const [arrivalTimes, setArrivalTimes] = useState([]);
  const [airports, setAirports] = useState([]);
  const [flightId, setFlightId] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        await dispatch(fetchAirplanes());
        await dispatch(fetchChkinCounters());
      } catch (err) {
        setError(err.message || '데이터 로딩 실패');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [dispatch]);

  useEffect(() => {
    const filteredTimes = airplanes
      .filter(airplane => airplane.airline === selectedAirline)
      .map(airplane => airplane.scheduleDateTime);
      
    setArrivalTimes(filteredTimes);
    setSelectedSchedule(''); 
  }, [selectedAirline, airplanes]);

  useEffect(() => {
    const filteredAirports = airplanes
      .filter(airplane => airplane.airline === selectedAirline && airplane.scheduleDateTime === selectedSchedule)
      .map(airplane => airplane.airport);

    setAirports(filteredAirports);
  }, [selectedAirline, selectedSchedule, airplanes]);

  useEffect(() => {
    const selectedAirplane = airplanes.find(airplane =>
      airplane.airline === selectedAirline &&
      airplane.scheduleDateTime === selectedSchedule &&
      airplane.airport === selectedAirport
    );



    setFlightId(selectedAirplane ? selectedAirplane.flightId : '');
  }, [selectedAirline, selectedSchedule, airplanes,selectedAirport]);


  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  const onClickHandler = () => {
    if (chkincounters.airplane.airline === selectedAirline 
      && chkincounters.airline.scheduleDateTime === selectedSchedule
      && chkincounters.airline.airport === selectedAirport) {
      // Handle the click event
    }
  };

  const uniqueAirlines = [...new Set(airplanes.map(airplane => airplane.airline))];
  const uniqueTimes = [...new Set(arrivalTimes.map(time => time))]
  const ChangeHandler = (event) => {
    const { name, value } = event.target;
    console.log('name', name);

    if (name === 'airline') {
      setSelectedAirline(value);

      const filteredTimes = airplanes
        .filter(airplane => airplane.airline === value)
        .map(airplane => airplane.scheduleDateTime);
      
      
      setArrivalTimes(filteredTimes);
      setSelectedSchedule(''); 
      console.log('filteredTimes', filteredTimes);

    } else if (name === 'scheduleDateTime') {
      setSelectedSchedule(value);
    } else if (name === 'airport'){
      setSelectedAirport(value);
    } 
  };


  return (
    <div>
      <BreadCrumbs />
      <Row>
        <Col md="12">
          <Card>
            <CardBody className="bg-light">
              <CardTitle tag="h4" className="mb-0">
                체크인 카운터 등록
              </CardTitle>
            </CardBody>
            <CardBody>
              <Form>
                <Row>
                  <Col md="6">
                    <FormGroup>
                      <Label>위치</Label>
                      <FormText color="muted" style={{ marginLeft: '15px' }}>
                        * 항공사를 먼저 선택해주세요.
                      </FormText>
                      <Input type="text" name="location" value={state.location || ''} />
                    </FormGroup>
                  </Col>
                  <Col md="6">
                    <FormGroup>
                      <Label>Status</Label>
                      <Input type="select" name="status">
                        <option>정상</option>
                        <option>고장</option>
                        <option>점검중</option>
                      </Input>
                    </FormGroup>
                  </Col>
                </Row>
                <Row>
                  <Col md="6">
                    <FormGroup>
                      <Label>항공사</Label>
                      <Input type="select" name='airline' onChange={ChangeHandler}>
                        <option value="">항공사를 선택하세요</option>
                        {uniqueAirlines.map((airline, index) => (
                          <option key={index} value={airline}>
                            {airline}
                          </option>
                        ))}
                      </Input>
                    </FormGroup>
                  </Col>
                  <Col md="6">
                    <FormGroup>
                      <Label>type</Label>
                      <Input type="select" name="gateType">
                        <option>A</option>
                        <option>B</option>
                        <option>C</option>
                        <option>D</option>
                      </Input>
                    </FormGroup>
                  </Col>
                </Row>
                <Row>
                  <Col md="6">
                    <FormGroup>
                      <Label>도착예정시간</Label>
                      <Input type="select" name='scheduleDateTime' value={selectedSchedule} onChange={ChangeHandler}>
                        <option value="">도착 예정 시간을 선택하세요</option>
                        {uniqueTimes.map((time, index) => (
                          <option key={index} value={time}>{time}</option>
                        ))}
                      </Input>
                    </FormGroup>
                  </Col>
                  <Col md="6">
                    <FormGroup>
                      <Label>최근 점검일</Label>
                      <Input type="date" name="lastInspectionDate" />
                    </FormGroup>
                  </Col>
                </Row>
                <Row>
                  <Col md="6">
                    <FormGroup>
                      <Label>도착공항명</Label>
                      <Input type="select" name='airport' onChange={ChangeHandler}>
                        <option value="">도착 공항을 선택하세요</option>
                        {airports.map((airport, index) => (
                          <option key={index} value={airport}>{airport}</option>
                        ))}
                      </Input>
                    </FormGroup>
                  </Col>
                  <Col md="6">
                    <FormGroup>
                      <Label>지연시간</Label>
                      <Input type="number" name='delayTime' />
                    </FormGroup>
                  </Col>
                </Row>
                <Row>
                  <Col md="6">
                    <FormGroup>
                      <Label>편명</Label>
                      <Input type="text" name='flightId' value={flightId} readOnly />
                    </FormGroup>
                  </Col>
                  <Col md="6">
                    <FormGroup>
                      <Label>담당자</Label>
                      <Input type="text" name="manager" />
                    </FormGroup>
                  </Col>
                </Row>
                <Row>
                  <Col md="6">
                    <FormGroup>
                      <Label>비고</Label>
                      <Input type="textarea" rows="6" name="note" />
                    </FormGroup>
                  </Col>
                </Row>
                <Col className='d-flex justify-content-center'>
                  <Button className="m-2" color="primary" onClick={onClickHandler}>
                    등록
                  </Button>
                </Col>
              </Form>
            </CardBody>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default CheckinCounterDetail;
