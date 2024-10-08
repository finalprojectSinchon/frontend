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
import {
  fetchMaintenance,
  maintenance,
  modifyMaintenance,
  softdeleteMaintenance,
} from '../../store/apps/maintenance/maintenanceSlice';
import EquipmentStock from "src/views/maintenance/EquipmentStock.js";
import CustomModal  from "src/views/CustomModal.js";
import ManagerDragAndDrop from "src/components/apps/managerDargAndDrop/ManagerDragAndDrop.js";
import api from "src/store/apps/airplane/api.js";


const MaintenanceDetails = () => {

  const [customModal, setCustomModal] = useState(false);
  const toggleCustomModal = () => setCustomModal(!customModal);  // 수정된 부분
  const [type,setType] = useState('');
  const [content, setContent] = useState('');

  const dispatch = useDispatch();
  const { maintenanceCode } = useParams();
  const maintenanceDetails = useSelector((state) => state.maintenances.maintenanceDetails);
  const [maintenanceInfo, setMaintenanceInfo] = useState({});
  const [readOnly, setReadOnly] = useState(true);
  const [modal, setModal] = useState(false);
  const [equipmentRegistered, setEquipmentRegistered] = useState(false);
  const result = useSelector((state) => state.maintenances.result);

  const [manager, setManager] = useState([]);
  const [airportType, setAirportType] = useState()


  const userInfo = useSelector((state) => state.userInfo);

  const toggleModal = () => setModal(!modal);

  const onChangeHandler = (e) => {
    setMaintenanceInfo({
      ...maintenanceInfo,
      [e.target.name]: e.target.value,
    });
  };

  useEffect(() => {
    api.post('/api/v1/managers',{
      airportType : "maintenance",
      airportCode : maintenanceCode
    })
        .then(res => res.data)
        .then(data => {
          setManager(data.data)
        })
  }, [maintenanceDetails]);

  const navigate = useNavigate();
  const onClickHandler = () => {
    setType('삭제');
    setContent('해당 정비가 삭제되었습니다.');
    toggleCustomModal();

    setTimeout(() => {
      dispatch(softdeleteMaintenance({ maintenanceCode }));
      navigate('/maintenance');
      window.location.reload();
    }, 3000);
  };

  useEffect(() => {
    dispatch(fetchMaintenance({ maintenanceCode }));
    setAirportType("maintenance")
  }, [dispatch, maintenanceCode]);

  useEffect(() => {
    if (maintenanceDetails && maintenanceDetails.data && maintenanceDetails.data.maintenanceDTO) {
      setMaintenanceInfo(maintenanceDetails.data.maintenanceDTO);
    }
    dispatch(maintenance({maintenanceCode}));
  }, [maintenanceDetails, dispatch, maintenanceCode]);

  const handleEditClick = () => {
    if (readOnly) {
      setReadOnly(false);
    } else {
      setType('수정');
      setContent('해당 정비 수정되었습니다.')
      toggleCustomModal();
      setReadOnly(true);
      dispatch(modifyMaintenance({ maintenanceCode, maintenanceInfo }));
    }
  };

  const handleEquipmentRegistered = () => {
    setEquipmentRegistered(true);
  };

  return (
      <div>
        <BreadCrumbs />
        <Row>
          <Col md="12">
            <Card>
              <CardBody className="bg-light">
                <CardTitle tag="h4" className="mb-0">
                  정비
                </CardTitle>
              </CardBody>
              <CardBody>
                <Form>
                  <Row>
                    <Col md="6">
                      <FormGroup>
                        <Label>시설물</Label>
                        <Input
                            type="select"
                            name="structure"
                            value={maintenanceInfo.structure}
                            onChange={onChangeHandler}
                            disabled={readOnly}
                        >
                          <option value="gate">탑승구</option>
                          <option value="baggageClaim">수화물 수취대</option>
                          <option value="checkinCounter">체크인 카운터</option>
                          <option value="facilities">편의시설</option>
                          <option value="store">점포</option>
                          <option value="storage">창고</option>
                        </Input>
                      </FormGroup>
                    </Col>
                    <Col md="6">
                      <FormGroup>
                        <Label>위치</Label>
                        <Input
                            type="text"
                            value={maintenanceInfo.location}
                            name="location"
                            onChange={onChangeHandler}
                            disabled={readOnly}
                        />
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                    <Col md="6">
                      <FormGroup>
                        <Label>비용</Label>
                        <Input
                            type="text"
                            name="price"
                            value={maintenanceInfo.price}
                            disabled
                        />
                      </FormGroup>

                    </Col>
                    <Col md="6">
                      <FormGroup>
                        <Label>상태</Label>
                        <Input
                            type="select"
                            name="status"
                            value={maintenanceInfo.status}
                            onChange={onChangeHandler}
                            disabled={readOnly}
                        >
                          <option value="정비예정">정비예정</option>
                          <option value="정비중">정비중</option>
                          <option value="정비완료">정비완료</option>
                        </Input>
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                    <Col md="6">
                      <FormGroup>
                        <Label>시작 일자</Label>
                        <Input
                            type="date"
                            value={maintenanceInfo.maintenanceStartDate}
                            name="maintenanceStartDate"
                            onChange={onChangeHandler}
                            disabled={readOnly}
                        />
                      </FormGroup>
                    </Col>
                    <Col md="6">
                      <FormGroup>
                        <Label>종료 일자</Label>
                        <Input
                            type="date"
                            value={maintenanceInfo.maintenanceEndDate}
                            name="maintenanceEndDate"
                            onChange={onChangeHandler}
                            disabled={readOnly}
                        />
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                    <Col md="6">
                      <FormGroup>
                        <Label>상세 정보</Label>
                        <Input
                            type="textarea"
                            rows="6"
                            value={maintenanceInfo.maintenanceDetails}
                            name="maintenanceDetails"
                            onChange={onChangeHandler}
                            disabled={readOnly}
                        />
                      </FormGroup>
                    </Col>

                    <Col>
                      <FormGroup>
                        <Row className="mb-3 mt-3">
                          <Col md="6" className="d-flex justify-content-start">
                            <h2 className="ms-5 ps-4">전체 직원</h2>
                          </Col>
                          <Col md="6" className="d-flex justify-content-end">
                            <h2 className="me-5 pe-5">담당 직원</h2>
                          </Col>
                        </Row>
                        <div className='mb-4'>
                          {manager ? <ManagerDragAndDrop AllUser={manager.AllUser} Manager={manager.Manager} airportCode={maintenanceCode}
                                                         airportType={airportType} isEditMode={readOnly}/>
                              : <h3>loading</h3> }

                        </div>
                      </FormGroup>
                    </Col>
                  </Row>

                  <Row>
                    <Col md="6">
                    </Col>
                  </Row>
                  <Col className="d-flex justify-content-center">
                    <Button
                        className="m-2"
                        color="primary"
                        onClick={toggleModal}
                        disabled={maintenanceInfo.status !== '정비완료' || equipmentRegistered || result === 1} // Disable based on the new state
                    >
                      장비 재고 등록
                    </Button>
                    <Button className="m-2" color="primary" onClick={handleEditClick} disabled={equipmentRegistered || result === 1}>
                      {readOnly ? '수정' : '저장'}
                    </Button>
                    {userInfo.userRole ?     <Button className="m-2" color="danger" onClick={onClickHandler}>
                      삭제
                    </Button> : null }
                  </Col>
                </Form>
              </CardBody>
            </Card>
          </Col>
        </Row>
        <EquipmentStock isOpen={modal} toggle={toggleModal} maintenance={maintenanceInfo} onEquipmentRegistered={handleEquipmentRegistered} />
        <CustomModal  isOpen={customModal} toggle={toggleCustomModal} type = {type} content={content}/> {/* 수정된 부분 */}

      </div>
  );
};

export default MaintenanceDetails;
