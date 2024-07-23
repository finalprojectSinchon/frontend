import React, { useState } from 'react';
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
import { useDispatch } from 'react-redux';
import { createMaintenance } from '../../store/apps/maintenance/maintenanceSlice';

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
  });

  const onChangeHandler = (e) => {
    setMaintenanceInfo({
      ...maintenanceInfo,
      [e.target.name]: e.target.value,
    });
  };

  const handleRegisterClick = () => {
    dispatch(createMaintenance(maintenanceInfo));
    navigate('/maintenance');
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
                        <option value="이동수단">이동수단</option>
                        <option value="탑승구">탑승구</option>
                        <option value="수화물 수취대">수화물 수취대</option>
                        <option value="체크인 카운터">체크인 카운터</option>
                        <option value="편의시설">편의시설</option>
                        <option value="점포">점포</option>
                        <option value="창고">창고</option>
                      </Input>
                    </FormGroup>
                  </Col>
                  <Col md="6">
                    <FormGroup>
                      <Label>위치</Label>
                      <Input
                        type="text"
                        name="location"
                        onChange={onChangeHandler}
                      />
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
                      <Label>사용 장비</Label>
                      <Input
                        type="text"
                        name="equipment"
                        onChange={onChangeHandler}
                      />
                    </FormGroup>
                  </Col>
                </Row>
                <Row>
                  <Col md="6">
                    <FormGroup>
                      <Label>갯수</Label>
                      <Input
                        type="number"
                        name="quantity"
                        onChange={onChangeHandler}
                      />
                    </FormGroup>
                  </Col>
                  <Col md="6">
                    <FormGroup>
                      <Label>비용</Label>
                      <Input
                        type="number"
                        name="expense"
                        onChange={onChangeHandler}
                      />
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
                <Row>
                  <Col md="12">
                    <FormGroup>
                      <Label>보고서 파일 보기</Label>
                      <Input
                        type="file"
                        name="reportFile"
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
