import React, { useEffect, useState } from 'react';
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
} from 'reactstrap';
import BreadCrumbs from '../../layouts/breadcrumbs/BreadCrumbs';
import { useParams,useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchChkinCounter, modifyChkinCounter, softdeleteChkinCounter } from '../../store/apps/airplane/chkinCounterSlice';
import Location from "src/components/location/Location.js";
import api from "src/store/apps/airplane/api.js";
import ManagerDragAndDrop from "src/components/apps/managerDargAndDrop/ManagerDragAndDrop.js";


const CheckinCounterDetail = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { checkinCounterCode } = useParams();


  const chkinCounterDetail = useSelector((state) => state.chkinCounters.chkinCounterDetail);

  const [checkinCounterInfo, setCheckinCounterInfo] = useState({});
  const [readOnly, setReadOnly] = useState(true);

  const [manager, setManager] = useState([]);
  const [airportType, setAirportType] = useState();

  const [isModify, setIsModify] = useState(false);
  const [location, setLocation] = useState();

  useEffect(() => {
    api.post('/api/v1/managers',{
      airportType : airportType,
      airportCode : checkinCounterCode
    })
        .then(res => res.data)
        .then(data => {
          setManager(data.data)
        })
  }, [checkinCounterInfo]);


  const onChangeHandler = e => {
    setCheckinCounterInfo({
      ...checkinCounterInfo,
      [e.target.name]: e.target.value
    });
  };

  useEffect(() => {
    api.get(`/api/v1/location/${airportType}/${checkinCounterCode}`)
        .then(res => res.data)
        .then(data => {
          setLocation(data.data)
        })
        .catch(err => console.log(err));

  }, [airportType]);

  
  const onClickHandler = () => {
    
    dispatch(softdeleteChkinCounter({checkinCounterCode}));
    navigate('/airplane/checkin-counter');
    window.location.reload();
  }

  useEffect(() => {
    dispatch(fetchChkinCounter({ checkinCounterCode }));
    setAirportType('checkinCounter');
  }, [dispatch, checkinCounterCode]);

  useEffect(() => {
    if (chkinCounterDetail && chkinCounterDetail.data && chkinCounterDetail.data.chkinCounter) {
        setCheckinCounterInfo(chkinCounterDetail.data.chkinCounter);
    }
  }, [chkinCounterDetail]);



  const handleEditClick = async () => {
    if (readOnly) {
      setReadOnly(false);
    } else {
      await dispatch(modifyChkinCounter({ checkinCounterCode, checkinCounterInfo }));
      alert("해당 체크인 카운터 수정 승인을 요청했습니다.")
      setIsModify(true);
    }
  };





  return (
    <div>
      <BreadCrumbs />
      <div>
            <Button color="dark" onClick={() => navigate('/inspection/inspectionRegist')}>
            안전 점검 등록
            </Button>
                    
            </div>
      <Row>
        <Col md="12">
          <Card>
            <CardBody className="bg-light">
              <CardTitle tag="h4" className="mb-0">
                체크인 카운터
              </CardTitle>
            </CardBody>
            <CardBody>
              <Form>
                <Row>
                  <Col md="6">
                    <FormGroup>
                      <Label>Counter Code</Label>
                      <Input type="text" value={checkinCounterInfo.checkinCounterCode } name='checkinCounterCode' onChange={onChangeHandler} disabled/>
                    </FormGroup>
                  </Col>
                  <Col md="6">
                    <FormGroup>
                      <Label>Status</Label>
                      <Input type="select" name="status" value={checkinCounterInfo.status } onChange={onChangeHandler} disabled={readOnly}>
                        <option>고장</option>
                        <option>정상</option>
                        <option>점검중</option>
                      </Input>
                    </FormGroup>
                  </Col>
                </Row>
                <Row>
                  <Col md="6">
                    <FormGroup>
                      <Label>type</Label>
                      <Input type="select" name="type" value={checkinCounterInfo.type } onChange={onChangeHandler} disabled={readOnly}>
                        <option>A</option>
                        <option>B</option>
                        <option>C</option>
                        <option>D</option>
                      </Input>
                    </FormGroup>
                  </Col>
                  <Col md="6">
                    <FormGroup>
                      <Label>항공사</Label>
                      <Input type="text" value={checkinCounterInfo.airplane?.airline } disabled />
                    </FormGroup>
                  </Col>
                </Row>
                <Row>
                  <Col md="6">
                    <FormGroup>
                      <Label>편명</Label>
                      <Input type="text" value={checkinCounterInfo.airplane?.flightId} disabled/>
                    </FormGroup>
                  </Col>
                  <Col md="6">
                    <FormGroup>
                      <Label>최근 점검일</Label>
                      <Input type="date" value={checkinCounterInfo.lastInspectionDate } name="lastInspectionDate" onChange={onChangeHandler} disabled={readOnly} />
                    </FormGroup>
                  </Col>
                </Row>
                <Row>
                  <Col md="6">
                    <FormGroup>
                      <Label>도착예정시간</Label>
                      <Input type="datetime" value={checkinCounterInfo.airplane?.scheduleDateTime } name='scheduleDateTime' disabled={readOnly}/>
                    </FormGroup>
                  </Col>
                  <Col md="6">
                    <FormGroup>
                      <Label>지연시간</Label>
                      <Input type="number"  value={checkinCounterInfo.airplane?.delayTime }  name='delayTime' disabled={readOnly} />
                    </FormGroup>
                  </Col>
                </Row>
                <Row>
                  <Col md="6">
                    <FormGroup>
                      <Label>도착공항명</Label>
                      <Input type="text" value={checkinCounterInfo.airplane?.airport} disabled/>
                    </FormGroup>
                  </Col>
                  <Col md="6">
                    <FormGroup>
                      <Label>운항상태</Label>
                      <Input type="text" value={checkinCounterInfo.airplane?.remark } disabled />
                    </FormGroup>
                  </Col>
                </Row>
                <Row>
                  <Col md="6">
                    {readOnly ? <> <Label>위치</Label>
                          <Input type="text" placeholder="시설물 이름을 입력하세요" name='facilitiesName' onChange={onChangeHandler} readOnly={readOnly}
                                 value={location ? location.region + " " + location.floor + " " + location.location : '위치 데이터가 없습니다.'  } /> </> :
                        <Location isModify={isModify} setIsModify={setIsModify} setReadOnly={setReadOnly} code={checkinCounterCode} type={airportType}/>
                    }
                  </Col>
                  <Col md="6">

                  </Col>
             
                </Row>
                <Row>
                <Col md="6">
                    <FormGroup>
                      <Label>비고</Label>
                      <Input type="textarea" rows="6" value={checkinCounterInfo.note} name="note" onChange={onChangeHandler} disabled={readOnly} />
                    </FormGroup>
                  </Col>
                  <Col md="6">
                    <Row className="mb-3 mt-3">
                      <Col md="6" className="d-flex justify-content-start">
                        <h2 className="ms-5 ps-4">전체 직원</h2>
                      </Col>
                      <Col md="6" className="d-flex justify-content-end">
                        <h2 className="me-5 pe-5">담당 직원</h2>
                      </Col>
                    </Row>
                    <div className='mb-4'>
                      {manager ? <ManagerDragAndDrop AllUser={manager.AllUser} Manager={manager.Manager} airportCode={checkinCounterCode}
                                                     airportType={airportType} isEditMode={readOnly}/>
                          : <h3>loading</h3> }

                    </div>
                  </Col>
                </Row>
                <Col className='d-flex justify-content-center'>
                  <Button className="m-2" color="primary" onClick={handleEditClick}>
                    {readOnly ? '수정' : '저장'}
                  </Button>
                  <Button className="m-2 " color="danger" onClick={onClickHandler} >
                    삭제
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
