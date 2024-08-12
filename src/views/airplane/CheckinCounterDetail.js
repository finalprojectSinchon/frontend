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
import CustomModal  from "src/views/CustomModal.js";
import { fetchApprove } from "src/store/apps/approve/ContactSlice.js";

const CheckinCounterDetail = () => {

  const [modal, setModal] = useState(false);
  const toggleModal = () => setModal(!modal);
  const [type,setType] = useState('');
  const [content, setContent] = useState('');

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { checkinCounterCode } = useParams();

  const approves = useSelector((state) => state.contacts.approveData);
  const approve = approves?.data?.approvalList || [];


  const chkinCounterDetail = useSelector((state) => state.chkinCounters.chkinCounterDetail);
  const userInfo = useSelector((state) => state.userInfo);

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
  const formatDateTime = (dateTime) => {
    if (!dateTime || dateTime === '미정') return '미정';
    const date = new Date(dateTime);
    return date.toLocaleString();
  };

  const onChangeHandler = e => {
    setCheckinCounterInfo({
      ...checkinCounterInfo,
      approvalRequester : userInfo,
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
    setType('삭제');
    setContent('해당 체크인카운터가 삭제되었습니다.');
    toggleModal();

    setTimeout(() => {
    dispatch(softdeleteChkinCounter({checkinCounterCode}));
    navigate('/airplane/checkin-counter');
    window.location.reload();
    }, 3000);
  }

  useEffect(() => {
    dispatch(fetchChkinCounter({ checkinCounterCode }));
    setAirportType('checkinCounter');
    dispatch(fetchApprove());
  }, [dispatch, checkinCounterCode]);


  useEffect(() => {
    if (chkinCounterDetail && chkinCounterDetail.data) {
      const checkinCounterData = chkinCounterDetail.data.chkinCounter;


      if (checkinCounterCode) {
        const checkinCounterApproval = approve.find(a => {
          return a.checkinCounter && a.checkinCounter.checkinCounterCode == checkinCounterCode && a.checked == 'N';
        });



        if (checkinCounterApproval) {
          setCheckinCounterInfo({
            ...checkinCounterData,
            status: '',
            type: '',
            lastInspectionDate: '',
            note: ''
          });
        } else {
          setCheckinCounterInfo(checkinCounterData);
        }
      } else {
        setCheckinCounterInfo(checkinCounterData);
      }
    }

  }, [chkinCounterDetail, approve, checkinCounterCode]);



  const handleEditClick = async () => {
    if (readOnly) {
      setReadOnly(false);
    } else {
      await dispatch(modifyChkinCounter({ checkinCounterCode, checkinCounterInfo }));
      setType('수정');
      setContent('해당 체크인 카운터 수정 승인을 요청했습니다..')
      toggleModal();
      setIsModify(true);
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
                체크인 카운터
              </CardTitle>
            </CardBody>
            <CardBody>
              <Form>
                <Row>
                  <Col md="6">
                    <FormGroup>
                      <Label>카운터 코드</Label>
                      <Input type="text" value={checkinCounterInfo.checkinCounterCode } name='checkinCounterCode' onChange={onChangeHandler} disabled/>
                    </FormGroup>
                  </Col>
                  <Col md="6">
                    <FormGroup>
                      <Label>상태</Label>
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
                      <Label>타입</Label>
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
                      <Input type="text" value={checkinCounterInfo?.airline } disabled />
                    </FormGroup>
                  </Col>
                </Row>
                <Row>
                  <Col md="6">
                    <FormGroup>
                      <Label>편명</Label>
                      <Input type="text" value={checkinCounterInfo?.flightid} disabled/>
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
                      <Input type="datetime" value={formatDateTime(checkinCounterInfo?.scheduleDateTime) } name='scheduleDateTime' disabled={readOnly}/>
                    </FormGroup>
                  </Col>
                  <Col md="6">
                    <FormGroup>
                      <Label>운항상태</Label>
                      <Input type="text" value={checkinCounterInfo?.remark } disabled />
                    </FormGroup>
                  </Col>
                </Row>
                <Row>
                  <Col md="6">
                    <FormGroup>
                      <Label>도착공항명</Label>
                      <Input type="text" value={checkinCounterInfo?.airport} disabled/>
                    </FormGroup>
                  </Col>
                  <Col md="6">
                    {readOnly ? <> <Label>위치</Label>
                          <Input type="text" placeholder="시설물 이름을 입력하세요" name='facilitiesName' onChange={onChangeHandler} readOnly={readOnly}
                                 value={location ? location.region + " " + location.floor + " " + location.location : '위치 데이터가 없습니다.'  } /> </> :
                        <Location isModify={isModify} setIsModify={setIsModify} setReadOnly={setReadOnly} code={checkinCounterCode} type={airportType}/>
                    }
                  </Col>
                </Row>
                <Row>

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
                        <h4 className="ms-5 ps-4">전체 직원</h4>
                      </Col>
                      <Col md="6" className="d-flex justify-content-end">
                        <h4 className="me-5 pe-5">담당 직원</h4>
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
                  {userInfo.userRole === "ROLE_ADMIN" ?       <Button className="m-2 " color="danger" onClick={onClickHandler} >
                    삭제
                  </Button> : null }

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

export default CheckinCounterDetail;
