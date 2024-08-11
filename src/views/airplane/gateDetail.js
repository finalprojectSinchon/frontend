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
import ManagerDragAndDrop from "src/components/apps/managerDargAndDrop/ManagerDragAndDrop.js";
import api from "src/store/apps/airplane/api.js";


const GateDetail = () => {
  const dispatch = useDispatch();
  const { gateCode } = useParams();
  const gateDetail = useSelector((state) => state.gates.gateDetail);
  const userInfo = useSelector((state) => state.user.userInfo);
  const [gateInfo, setGateInfo] = useState({});
  const [readOnly, setReadOnly] = useState(true);

  const [manager, setManager] = useState([])
  const [airportType, setAirportType] = useState()


  useEffect(() => {

    api.post('/api/v1/managers',{
      airportType : "gate",
      airportCode : gateCode
    })
        .then(res => res.data)
        .then(data => {
          setManager(data.data)
        })

  }, [gateInfo]);

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
    setAirportType('gate');
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
      alert("해당 게이트 수정 승인을 요청했습니다. ")
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
                          <option>사용가능</option>
                          <option>사용중</option>
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
                        <Input type="text" value={gateInfo?.airline } disabled />
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                    <Col md="6">
                      <FormGroup>
                        <Label>편명</Label>
                        <Input type="text" value={gateInfo?.flightid} disabled/>
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
                        <Input type="datetime" value={gateInfo?.scheduleDateTime } name='scheduleDateTime' disabled={readOnly}/>
                      </FormGroup>
                    </Col>
                    <Col md="6">
                      <FormGroup>
                        <Label>위치</Label>
                        <Input type="text" value={gateInfo.gateCode + "번 탑승구"} name="location" onChange={onChangeHandler} disabled={readOnly} />
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

                    </Col>
                  </Row>
                  <Row>

                    <Col md="6">
                      <FormGroup>
                        <Label>비고</Label>
                        <Input type="textarea" rows="6" value={gateInfo.note} name="note" onChange={onChangeHandler} disabled={readOnly} />
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
                        {manager ? <ManagerDragAndDrop AllUser={manager.AllUser} Manager={manager.Manager} airportCode={gateCode}
                                                       airportType={airportType} isEditMode={readOnly}/>
                            : <h3>loading</h3> }
                      </div>
                    </Col>
                  </Row>
                  <Col className='d-flex justify-content-center'>
                    <Button className="m-2" color="primary" onClick={handleEditClick}>
                      {readOnly ? '수정' : '저장'}
                    </Button>
                    {userInfo.userRole === "ROLE_ADMIN" ?     <Button className="m-2 " color="danger" onClick={onClickHandler} >
                      삭제
                    </Button> : null}
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
