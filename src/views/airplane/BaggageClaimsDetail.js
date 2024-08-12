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
  FormText,
} from 'reactstrap';
import BreadCrumbs from '../../layouts/breadcrumbs/BreadCrumbs';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchBaggageClaim, modifyBaggageClaim, softdeleteBaggageClaim } from '../../store/apps/airplane/baggageClaimSlice';
import ManagerDragAndDrop from "src/components/apps/managerDargAndDrop/ManagerDragAndDrop.js";
import api from "src/store/apps/airplane/api.js";
import Location from "src/components/location/Location.js";
import CustomModal from "src/views/CustomModal.js";
import { fetchApprove } from "src/store/apps/approve/ContactSlice.js";

const BaggageClaimsDetail = () => {
  const [modal, setModal] = useState(false);
  const toggleModal = () => setModal(!modal);
  const [type, setType] = useState('');
  const [content, setContent] = useState('');

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { baggageClaimCode } = useParams();

  const BaggageClaimDetail = useSelector((state) => state.baggageClaims.baggageClaimDetail);
  const userInfo = useSelector((state) => state.userInfo);
  const [baggageClaimInfo, setBaggageClaimInfo] = useState({});
  const [readOnly, setReadOnly] = useState(true);

  const [manager, setManager] = useState([]);
  const [airportType, setAirportType] = useState();
  const [isModify, setIsModify] = useState(false);
  const [location, setLocation] = useState();
  const approves = useSelector((state) => state.contacts.approveData);
  const approve = approves?.data?.approvalList || [];

  useEffect(() => {
    api.post('/api/v1/managers', {
      airportType: airportType,
      airportCode: baggageClaimCode
    })
        .then(res => res.data)
        .then(data => {
          setManager(data.data);
        });
  }, [baggageClaimInfo]);

  const onChangeHandler = e => {
    setBaggageClaimInfo({
      ...baggageClaimInfo,
      [e.target.name]: e.target.value
    });
  };


  const formatDateTime = (dateTime) => {
    if (!dateTime || dateTime === '미정') return '미정';
    const date = new Date(dateTime);
    return date.toLocaleString();
  };
  const onClickHandler = () => {
    setType('삭제');
    setContent('수화물 수취대가 삭제되었습니다.');
    toggleModal();

    setTimeout(() => {
      dispatch(softdeleteBaggageClaim({ baggageClaimCode }));
      navigate('/airplane/baggage-claim');
      window.location.reload();
    }, 3000);
  };

  useEffect(() => {
    dispatch(fetchBaggageClaim({ baggageClaimCode }));
    dispatch(fetchApprove());
  }, [dispatch, baggageClaimCode]);


  useEffect(() => {
    if (BaggageClaimDetail && BaggageClaimDetail.data) {
      const baggageClaimData = BaggageClaimDetail.data.baggageClaim;


      if (baggageClaimCode) {
        const baggageClaimApproval = approve.find(a => {
          return a.baggageClaim && a.baggageClaim.baggageClaimCode === baggageClaimCode && a.checked === 'N';
        });



        if (baggageClaimApproval) {
          setBaggageClaimInfo({
            ...baggageClaimData,
            status: '',
            type: '',
            lastInspectionDate: '',
            note: ''
          });
        } else {
          setBaggageClaimInfo(baggageClaimData);
        }
      } else {
        setBaggageClaimInfo(baggageClaimData);
      }
    }
    setAirportType("baggageClaim");
  }, [BaggageClaimDetail, approve, baggageClaimCode]);

  useEffect(() => {
    api.get(`/api/v1/location/baggageClaim/${baggageClaimCode}`)
        .then(res => res.data)
        .then(data => {
          setLocation(data.data);
        })
        .catch(err => console.log(err));
  }, [airportType]);

  const handleEditClick = async () => {
    if (readOnly) {
      setReadOnly(false);
    } else {
      await dispatch(modifyBaggageClaim({ baggageClaimCode, baggageClaimInfo }));
      setType('수정');
      setContent('해당 수화물 수취대가 수정 승인 요청되었습니다.');
      toggleModal();
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
                  수화물 수취대
                </CardTitle>
              </CardBody>
              <CardBody>
                <Form>
                  <Row>
                    <Col md="6">
                      <FormGroup>
                        <Label>Counter Code</Label>
                        <Input type="text" value={baggageClaimInfo.baggageClaimCode} name='checkinCounterCode' onChange={onChangeHandler} disabled />
                      </FormGroup>
                    </Col>
                    <Col md="6">
                      <FormGroup>
                        <Label>Status</Label>
                        <Input type="select" name="status" value={baggageClaimInfo.status} onChange={onChangeHandler} disabled={readOnly}>
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
                        <Label>type</Label>
                        <Input type="select" name="gateType" value={baggageClaimInfo.type} onChange={onChangeHandler} disabled={readOnly}>
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
                        <Input type="text" value={baggageClaimInfo?.airline} disabled />
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                    <Col md="6">
                      <FormGroup>
                        <Label>편명</Label>
                        <Input type="text" value={baggageClaimInfo?.flightid} disabled />
                      </FormGroup>
                    </Col>
                    <Col md="6">
                      <FormGroup>
                        <Label>최근 점검일</Label>
                        <Input type="date" value={baggageClaimInfo.lastInspectionDate} name="lastInspectionDate" onChange={onChangeHandler} disabled={readOnly} />
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                    <Col md="6">
                      <FormGroup>
                        <Label>도착예정시간</Label>
                        <Input type="datetime" value={formatDateTime(baggageClaimInfo?.scheduleDateTime)} name='scheduleDateTime' disabled={readOnly} />
                      </FormGroup>
                    </Col>
                    <Col md="6">
                      {readOnly ? (
                          <>
                            <Label>위치</Label>
                            <Input
                                type="text"
                                placeholder="시설물 이름을 입력하세요"
                                name='facilitiesName'
                                onChange={onChangeHandler}
                                readOnly={readOnly}
                                value={location ? `${location.region} ${location.floor} ${location.location}` : '위치 데이터가 없습니다.'}
                            />
                          </>
                      ) : (
                          <Location isModify={isModify} setIsModify={setIsModify} setReadOnly={setReadOnly} code={baggageClaimCode} type={airportType} />
                      )}
                    </Col>
                  </Row>
                  <Row>
                    <Col md="6">
                      <FormGroup>
                        <Label>도착공항명</Label>
                        <Input type="text" value={baggageClaimInfo?.airport} disabled />
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>

                      <Col md="6">
                      <FormGroup>
                        <Label>비고</Label>
                        <Input type="textarea" rows="6" value={baggageClaimInfo.note} name="note" onChange={onChangeHandler} disabled={readOnly} />
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
                        {manager ? (
                            <ManagerDragAndDrop
                                AllUser={manager.AllUser}
                                Manager={manager.Manager}
                                airportCode={baggageClaimCode}
                                airportType={airportType}
                                isEditMode={readOnly}
                            />
                        ) : (
                            <h3>loading</h3>
                        )}
                      </div>
                    </Col>
                  </Row>
                  <Row>
                    <Col className='d-flex justify-content-center'>
                      <Button className="m-2" color="primary" onClick={handleEditClick}>
                        {readOnly ? '수정' : '저장'}
                      </Button>
                      {userInfo.userRole === "ROLE_ADMIN" && (
                          <Button className="m-2 " color="danger" onClick={onClickHandler}>
                            삭제
                          </Button>
                      )}
                    </Col>
                  </Row>
                </Form>
              </CardBody>
            </Card>
          </Col>
        </Row>
        <CustomModal isOpen={modal} toggle={toggleModal} type={type} content={content} />
      </div>
  );
};

export default BaggageClaimsDetail;
