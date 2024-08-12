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
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchGate, modifyGate, softdeleteGate } from '../../store/apps/airplane/gateSlice';
import ManagerDragAndDrop from "src/components/apps/managerDargAndDrop/ManagerDragAndDrop.js";
import api from "src/store/apps/airplane/api.js";
import CustomModal from "src/views/CustomModal.js";
import { fetchApprove } from "src/store/apps/approve/ContactSlice.js";

const GateDetail = () => {
  const [modal, setModal] = useState(false);
  const toggleModal = () => setModal(!modal);
  const [type, setType] = useState('');
  const [content, setContent] = useState('');

  const dispatch = useDispatch();
  const { gateCode } = useParams();
  const gateDetail = useSelector((state) => state.gates.gateDetail);
  const userInfo = useSelector((state) => state.userInfo);
  const [gateInfo, setGateInfo] = useState({});
  const [readOnly, setReadOnly] = useState(true);

  const [manager, setManager] = useState([]);
  const [airportType, setAirportType] = useState();
  const approves = useSelector((state) => state.contacts.approveData);
  const approve = approves?.data?.approvalList || [];

  useEffect(() => {
    api.post('/api/v1/managers', {
      airportType: "gate",
      airportCode: gateCode
    })
        .then(res => res.data)
        .then(data => {
          setManager(data.data);
        });
  }, [gateInfo]);

  const onChangeHandler = e => {
    setGateInfo({
      ...gateInfo,
      approvalRequester : userInfo,
      [e.target.name]: e.target.value
    });
  };

  const navigate = useNavigate();
  const onClickHandler = () => {
    setType('삭제');
    setContent('탑승구가 삭제되었습니다.');
    toggleModal();

    setTimeout(() => {
      dispatch(softdeleteGate({ gateCode }));
      navigate('/airplane/gate');
      window.location.reload();
    }, 3000);
  }

  useEffect(() => {
    dispatch(fetchGate({ gateCode }));
    setAirportType('gate');
    dispatch(fetchApprove());
  }, [dispatch, gateCode]);

  useEffect(() => {
    if (gateDetail && gateDetail.data) {
      const gateData = gateDetail.data.gate;

      console.log('gateCode',gateCode)
      console.log('approve',approve)
      if (gateCode) {
        const gateApproval = approve.find(a => {
          return a.gate && a.gate.gateCode == gateCode && a.checked == 'N';
        });


        if (gateApproval) {
          setGateInfo({
            ...gateData,
            status: '',
            type: '',
            lastInspectionDate: '',
            note: ''
          });
        } else {
          setGateInfo(gateData);
        }
      } else {
        setGateInfo(gateData);
      }
    }
    setAirportType("gate");
  }, [gateDetail, approve, gateCode]);



  const handleEditClick = async () => {
    if (readOnly) {
      setReadOnly(false);
    } else {
      setReadOnly(true);
      await dispatch(modifyGate({ gateCode, gateInfo }));
      setType('수정');
      setContent('해당 탑승구가 수정 승인 요청되었습니다.');
      toggleModal();
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
                  탑승구
                </CardTitle>
              </CardBody>
              <CardBody>
                <Form>
                  <Row>
                    <Col md="6">
                      <FormGroup>
                        <Label>탑승구 코드</Label>
                        <Input type="text" value={gateInfo.gateCode} name='gateCode' onChange={onChangeHandler} disabled />
                      </FormGroup>
                    </Col>
                    <Col md="6">
                      <FormGroup>
                        <Label>Status</Label>
                        <Input type="select" name="status" value={gateInfo.status} onChange={onChangeHandler} disabled={readOnly}>
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
                        <Input type="select" name="gateType" value={gateInfo.gateType} onChange={onChangeHandler} disabled={readOnly}>
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
                        <Input type="text" value={gateInfo?.airline} disabled />
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                    <Col md="6">
                      <FormGroup>
                        <Label>편명</Label>
                        <Input type="text" value={gateInfo?.flightid} disabled />
                      </FormGroup>
                    </Col>
                    <Col md="6">
                      <FormGroup>
                        <Label>최근 점검일</Label>
                        <Input type="date" value={gateInfo.lastInspectionDate} name="lastInspectionDate" onChange={onChangeHandler} disabled={readOnly} />
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                    <Col md="6">
                      <FormGroup>
                        <Label>도착예정시간</Label>
                        <Input type="datetime" value={gateInfo?.scheduleDateTime} name='scheduleDateTime' disabled={readOnly} />
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
                      {/* 다른 필드 추가 가능 */}
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
                                                       airportType={airportType} isEditMode={readOnly} />
                            : <h3>loading</h3>}
                      </div>
                    </Col>
                  </Row>
                  <Col className='d-flex justify-content-center'>
                    <Button className="m-2" color="primary" onClick={handleEditClick}>
                      {readOnly ? '수정' : '저장'}
                    </Button>
                    {userInfo.userRole === "ROLE_ADMIN" ? <Button className="m-2 " color="danger" onClick={onClickHandler} >
                      삭제
                    </Button> : null}
                  </Col>
                </Form>
              </CardBody>
            </Card>
          </Col>
        </Row>
        <CustomModal isOpen={modal} toggle={toggleModal} type={type} content={content} />

      </div>
  );
};

export default GateDetail;
