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


const CheckinCounterDetail = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { checkinCounterCode } = useParams();


  const chkinCounterDetail = useSelector((state) => state.chkinCounters.chkinCounterDetail);
  const [checkinCounterInfo, setCheckinCounterInfo] = useState({});
  const [readOnly, setReadOnly] = useState(true);

  const onChangeHandler = e => {
    setCheckinCounterInfo({
      ...checkinCounterInfo,
      [e.target.name]: e.target.value
    });
  };

  
  const onClickHandler = () => {
    
    dispatch(softdeleteChkinCounter({checkinCounterCode}));
    navigate('/airplane/checkin-counter');
    window.location.reload();
  }

  useEffect(() => {
    dispatch(fetchChkinCounter({ checkinCounterCode }));
  }, [dispatch, checkinCounterCode]);

  useEffect(() => {
    if (chkinCounterDetail && chkinCounterDetail.data && chkinCounterDetail.data.chkinCounter) {
        setCheckinCounterInfo(chkinCounterDetail.data.chkinCounter);
    }
  }, [chkinCounterDetail]);



  const handleEditClick = () => {
    if (readOnly) {
      setReadOnly(false);
    } else {
      setReadOnly(true);
      dispatch(modifyChkinCounter({ checkinCounterCode, checkinCounterInfo }));
    }
  };

  console.log('detail',checkinCounterInfo)


  return (
    <div>
      <BreadCrumbs />
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
                      <Input type="text" value={checkinCounterInfo.checkinCounterCode } name='checkinCounterCode' onChange={onChangeHandler} readOnly={readOnly} />
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
                      <Input type="select" name="gateType" value={checkinCounterInfo.type } onChange={onChangeHandler} disabled={readOnly}>
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
                      <Input type="text" value={checkinCounterInfo.airplane?.airline } readOnly={readOnly} />
                    </FormGroup>
                  </Col>
                </Row>
                <Row>
                  <Col md="6">
                    <FormGroup>
                      <Label>편명</Label>
                      <Input type="text" value={checkinCounterInfo.airplane?.flightId} readOnly={readOnly} />
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
                      <Input type="text" value={checkinCounterInfo.airplane?.airport} readOnly={readOnly} />
                    </FormGroup>
                  </Col>
                  <Col md="6">
                    <FormGroup>
                      <Label>담당자</Label>
                      <Input type="text" value={checkinCounterInfo.manager } name="manager" onChange={onChangeHandler} readOnly={readOnly} />
                    </FormGroup>
                  </Col>
                </Row>
                <Row>
                  <Col md="6">
                    <FormGroup>
                      <Label>위치</Label>
                      <Input type="text" value={checkinCounterInfo.location} name="location" onChange={onChangeHandler} disabled={readOnly} />
                    </FormGroup>
                  </Col>
                  <Col md="6">
                    <FormGroup>
                      <Label>비고</Label>
                      <Input type="textarea" rows="6" value={checkinCounterInfo.note} name="note" onChange={onChangeHandler} disabled={readOnly} />
                    </FormGroup>
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
