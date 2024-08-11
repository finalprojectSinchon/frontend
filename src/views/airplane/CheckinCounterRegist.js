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
import { fetchChkinCounters, registChkinCounter } from '../../store/apps/airplane/chkinCounterSlice';
import CustomModal from "src/views/CustomModal.js";

const CheckinCounterRegist = () => {

  const [modal, setModal] = useState(false);
  const toggleModal = () => setModal(!modal);
  const [type,setType] = useState('');
  const [content, setContent] = useState('');

  const location = useLocation();
  const state = location.state || {};
  const dispatch = useDispatch();
  const navigate = useNavigate();

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
  const [checkinCounterInfo, setCheckinCounterInfo] = useState({
    location: state.location || '',
    status: null,
    lastInspectionDate: null,
    delayTime: null,
    manager: null,
    note: null,
    airplaneCode: null,
    type:null
  });


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
    // 선택된 항공사에 따라 도착 시간을 필터링합니다.
    const filteredTimes = airplanes
      .filter(airplane => airplane.airline === selectedAirline)
      .map(airplane => airplane.scheduleDateTime);

    setArrivalTimes(filteredTimes);
    setSelectedSchedule('');
  }, [selectedAirline, airplanes]);

  useEffect(() => {
    // 선택된 항공사와 도착 시간에 따라 공항을 필터링합니다.
    if (selectedAirline && selectedSchedule) {
      const filteredAirports = airplanes
        .filter(airplane => airplane.airline == selectedAirline && airplane.scheduleDateTime == selectedSchedule)
        .map(airplane => airplane.airport);

      setAirports(filteredAirports);
    }
  }, [selectedAirline, selectedSchedule, airplanes]);

  useEffect(() => {
    // 선택된 항공사, 도착 시간, 공항에 따라 비행 ID를 설정합니다.
    const selectedAirplane = airplanes.find(airplane =>
      airplane.airline == selectedAirline &&
      airplane.scheduleDateTime == selectedSchedule &&
      airplane.airport == selectedAirport
    );
    setFlightId(selectedAirplane ? selectedAirplane.flightId : '');

    // 비행 ID를 설정하지만, checkinCounterInfo의 기존 상태는 유지
    setCheckinCounterInfo(prevInfo => ({
      ...prevInfo,
      airplaneCode: selectedAirplane?.airplaneCode || ''
  
    }));
  }, [selectedAirline, selectedSchedule, selectedAirport, airplanes]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  

  const onClickHandler =  ()  => {
    if (chkincounters.some(counter =>
      counter.airplaneCode == checkinCounterInfo.airplaneCode 
    )) {
      setType('등록');
      setContent('이미 등록된 체크인 카운터 입니다')
      toggleModal();
      return;
    }

    setType('등록');
    setContent('체크인 카운터 등록 승인을 요청했습니다.')
    toggleModal();
    setTimeout(() => {

    dispatch(registChkinCounter(checkinCounterInfo));
    navigate('/airplane/checkin-counter');
    window.location.reload();
    }, 3000);
  };

  const uniqueAirlines = [...new Set(airplanes.map(airplane => airplane.airline))];
  const uniqueTimes = [...new Set(arrivalTimes.map(time => time))];

  const ChangeHandler = (event) => {
    const { name, value } = event.target;

    // 상태에 필요한 필드만 업데이트
    if (name === 'airline') {
      setSelectedAirline(value);
      setSelectedSchedule('');
      setSelectedAirport('');
    } else if (name === 'scheduleDateTime') {
      setSelectedSchedule(value);
      setSelectedAirport('');
    } else if (name === 'airport') {
      setSelectedAirport(value);
    } else {
      setCheckinCounterInfo(prevInfo => ({
        ...prevInfo,
        [name]: value // 특정 필드만 업데이트
      }));
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
                      <Input type="text" name="location" value={state.location} readOnly />
                    </FormGroup>
                  </Col>
                  <Col md="6">
                    <FormGroup>
                      <Label>Status</Label>
                      <Input type="select" name="status" onChange={ChangeHandler}>
                        <option value="">상태를 선택하세요</option>
                        <option value="정상">정상</option>
                        <option value="고장">고장</option>
                        <option value="점검중">점검중</option>
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
                      <Input type="select" name="type" onChange={ChangeHandler}>
                        <option value="">타입을 선택하세요</option>
                        <option value="A">A</option>
                        <option value="B">B</option>
                        <option value="C">C</option>
                        <option value="D">D</option>
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
                      <Input type="date" name="lastInspectionDate" onChange={ChangeHandler} />
                    </FormGroup>
                  </Col>
                </Row>
                <Row>
                  <Col md="6">
                    <FormGroup>
                      <Label>도착공항명</Label>
                      <Input type="select" name='airport' value={selectedAirport} onChange={ChangeHandler}>
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
                      <Input type="number" name='delayTime' onChange={ChangeHandler} />
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
                      <Input type="text" name="manager" onChange={ChangeHandler} />
                    </FormGroup>
                  </Col>
                </Row>
                <Row>
                  <Col md="6">
                    <FormGroup>
                      <Label>비고</Label>
                      <Input type="textarea" rows="6" name="note" onChange={ChangeHandler} />
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
      <CustomModal  isOpen={modal} toggle={toggleModal} type = {type} content={content}/>

    </div>
  );
};

export default CheckinCounterRegist;
