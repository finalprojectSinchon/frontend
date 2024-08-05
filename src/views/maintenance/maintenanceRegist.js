import React, {useEffect, useState} from 'react';
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
import { useNavigate } from 'react-router-dom';
import { useDispatch ,useSelector} from 'react-redux';
import { createMaintenance } from '../../store/apps/maintenance/maintenanceSlice';
import { fetchLocation } from "../../store/apps/maintenance/maintenanceSlice";

const MaintenanceRegist = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [maintenanceInfo, setMaintenanceInfo] = useState({
    structure: '',
    location: '',
    manager: '',
    equipment: '',
    quantity: '',
    expense: '',
    maintenanceStartDate: '',
    maintenanceEndDate: '',
    maintenanceDetails: '',
    reportFile: '',
    status:''
  });
  const [structure,setStructure] = useState('');
  const locationList = useSelector(state => state.maintenances.location);
  const locations = locationList?.data?.locationList  || [];



  useEffect(() => {
    dispatch(fetchLocation(structure));
  }, [structure]);


  console.log('locationList',locationList)
  console.log('structure',structure)

  const onChangeHandler = (e) => {
    setMaintenanceInfo({
      ...maintenanceInfo,
      [e.target.name]: e.target.value,
    });
    if(e.target.name == 'structure'){
      setStructure(e.target.value)
    }


  };
 console.log('maintenanceInfo',maintenanceInfo)
  const handleRegisterClick = () => {
    dispatch(createMaintenance(maintenanceInfo));
    navigate('/maintenance');
    window.location.reload();
  };

  return (
    <div>
      <BreadCrumbs />
      <Row>
        <Col md="12">
          <Card>
            <CardBody className="bg-light">
              <CardTitle tag="h4" className="mb-0">
                정비 등록
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
                        onChange={onChangeHandler}
                      >
                        <option value="">선택하세요</option>
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
                        type="select"
                        name="location"
                        onChange={onChangeHandler}
                      >
                        <option value="">위치를 선택하세요</option>
                        {locations.map((location, index) => (
                            <option key={index} value={location}>{location}</option>
                        ))}
                      </Input>
                    </FormGroup>
                  </Col>
                </Row>
                <Row>
                  <Col md="6">
                    <FormGroup>
                      <Label>담당자</Label>
                      <Input
                        type="text"
                        name="manager"
                        onChange={onChangeHandler}
                      />
                    </FormGroup>
                  </Col>
                  <Col md="6">
                    <FormGroup>
                      <Label>상태</Label>
                      <Input
                          type="select"
                          name="status"
                          onChange={onChangeHandler}
                      >
                        <option value="">상태를 선택하세요</option>
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
                        name="maintenanceStartDate"
                        onChange={onChangeHandler}
                      />
                    </FormGroup>
                  </Col>
                  <Col md="6">
                    <FormGroup>
                      <Label>종료 일자</Label>
                      <Input
                        type="date"
                        name="maintenanceEndDate"
                        onChange={onChangeHandler}
                      />
                    </FormGroup>
                  </Col>
                </Row>
                <Row>

                  <Col md="12">
                    <FormGroup>
                      <Label>상세 정보</Label>
                      <Input
                        type="textarea"
                        rows="6"
                        name="maintenanceDetails"
                        onChange={onChangeHandler}
                      />
                    </FormGroup>
                  </Col>
                </Row>

                <Col className="d-flex justify-content-center">
                  <Button className="m-2" color="primary" onClick={handleRegisterClick}>
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

export default MaintenanceRegist;
