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
import { fetchGate, modifyGate, softdeleteGate } from '../../store/apps/airplane/gateSlice';


const GateDetail = () => {
  const dispatch = useDispatch();
  const { gateCode } = useParams();
  const gateDetail = useSelector((state) => state.gates.gateDetail);
  const [gateInfo, setGateInfo] = useState({});
  const [readOnly, setReadOnly] = useState(true);

  const onChangeHandler = e => {
    setGateInfo({
      ...gateInfo,
      [e.target.name]: e.target.value
    });
  };

  const navigate = useNavigate();
  const onClickHandler = () => {
    
    dispatch(softdeleteGate({gateCode}));
    navigate('/airplane/gate');
  }

  useEffect(() => {
    dispatch(fetchGate({ gateCode }));
  }, [dispatch, gateCode]);

  useEffect(() => {
    if (gateDetail && gateDetail.data && gateDetail.data.gate) {
      setGateInfo(gateDetail.data.gate);
    }
  }, [gateDetail]);

  const handleEditClick = () => {
    if (readOnly) {
      setReadOnly(false);
    } else {
      setReadOnly(true);
      dispatch(modifyGate({ gateCode, gateInfo }));
    }
  };

  console.log('modify gateInfo', gateInfo);

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
                탑승구
              </CardTitle>
            </CardBody>
            <CardBody>
              <Form>
                <Row>
                  <Col md="6">
                    <FormGroup>
                      <Label>탑승구 코드</Label>
                      <Input type="text" value={gateInfo.gateCode } name='gateCode' onChange={onChangeHandler}disabled/>
                    </FormGroup>
                  </Col>
                  <Col md="6">
                    <FormGroup>
                      <Label>Status</Label>
                      <Input type="select" name="status" value={gateInfo.status } onChange={onChangeHandler} disabled={readOnly}>
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
                      <Input type="select" name="gateType" value={gateInfo.gateType } onChange={onChangeHandler} disabled={readOnly}>
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
                      <Input type="text" value={gateInfo.airplane?.airline } disabled />
                    </FormGroup>
                  </Col>
                </Row>
                <Row>
                  <Col md="6">
                    <FormGroup>
                      <Label>편명</Label>
                      <Input type="text" value={gateInfo.airplane?.flightId} disabled/>
                    </FormGroup>
                  </Col>
                  <Col md="6">
                    <FormGroup>
                      <Label>최근 점검일</Label>
                      <Input type="date" value={gateInfo.lastInspectionDate } name="lastInspectionDate" onChange={onChangeHandler} disabled={readOnly} />
                    </FormGroup>
                  </Col>
                </Row>
                <Row>
                  <Col md="6">
                    <FormGroup>
                      <Label>도착예정시간</Label>
                      <Input type="datetime" value={gateInfo.airplane?.scheduleDateTime } name='scheduleDateTime' disabled={readOnly}/>
                    </FormGroup>
                  </Col>
                  <Col md="6">
                    <FormGroup>
                      <Label>지연시간</Label>
                      <Input type="number"  value={gateInfo.delayTime }  name='delayTime' disabled={readOnly} />
                    </FormGroup>
                  </Col>
                </Row>
                <Row>
                  <Col md="6">
                    <FormGroup>
                      <Label>도착공항명</Label>
                      <Input type="text" value={gateInfo.airplane?.airport} disabled />
                    </FormGroup>
                  </Col>
                  <Col md="6">
                    <FormGroup>
                      <Label>담당자</Label>
                      <Input type="text" value={gateInfo.manager } name="manager" onChange={onChangeHandler} disabled={readOnly} />
                    </FormGroup>
                  </Col>
                </Row>
                <Row>
                  <Col md="6">
                    <FormGroup>
                      <Label>위치</Label>
                      <Input type="text" value={gateInfo.location} name="location" onChange={onChangeHandler} disabled={readOnly} />
                    </FormGroup>
                  </Col>
                  <Col md="6">
                    <FormGroup>
                      <Label>비고</Label>
                      <Input type="textarea" rows="6" value={gateInfo.note} name="note" onChange={onChangeHandler} disabled={readOnly} />
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

export default GateDetail;
