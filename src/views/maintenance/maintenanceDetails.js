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
import { fetchMaintenance, modifyMaintenance, softdeleteMaintenance } from '../../store/apps/maintenance/maintenanceSlice';

const MaintenanceDetails = () => {
  const dispatch = useDispatch();
  const { maintenanceCode } = useParams();
  const maintenanceDetails = useSelector((state) => state.maintenances.maintenanceDetails);
  const [maintenanceInfo, setMaintenanceInfo] = useState({});
  const [readOnly, setReadOnly] = useState(true);

  const onChangeHandler = (e) => {
    setMaintenanceInfo({
      ...maintenanceInfo,
      [e.target.name]: e.target.value,
    });
  };

  const navigate = useNavigate();
  const onClickHandler = () => {
    dispatch(softdeleteMaintenance({ maintenanceCode }));
    navigate('/maintenance');
  };

  useEffect(() => {
    dispatch(fetchMaintenance({ maintenanceCode }));
  }, [dispatch, maintenanceCode]);

  useEffect(() => {
    if (maintenanceDetails && maintenanceDetails.data && maintenanceDetails.data.maintenance) {
      setMaintenanceInfo(maintenanceDetails.data.maintenance);
    }
  }, [maintenanceDetails]);

  const handleEditClick = () => {
    if (readOnly) {
      setReadOnly(false);
    } else {
      setReadOnly(true);
      dispatch(modifyMaintenance({ maintenanceCode, maintenanceInfo }));
    }
  };

  console.log('modify maintenanceInfo', maintenanceInfo);

  //푸시확인
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
                        <option>이동수단</option>
                        <option>탑승구</option>
                        <option>수화물 수취대</option>
                        <option>체크인 카운터</option>
                        <option>편의시설</option>
                        <option>점포</option>
                        <option>창고</option>
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
                      <Label>담당자</Label>
                      <Input
                        type="text"
                        value={maintenanceInfo.manager}
                        name="manager"
                        onChange={onChangeHandler}
                        readOnly={readOnly}
                      />
                    </FormGroup>
                  </Col>
                  <Col md="6">
                    <FormGroup>
                      <Label>사용 장비</Label>
                      <Input
                        type="text"
                        value={maintenanceInfo.equipment}
                        name="equipment"
                        onChange={onChangeHandler}
                        disabled={readOnly}
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
                        value={maintenanceInfo.quantity}
                        name="quantity"
                        onChange={onChangeHandler}
                        disabled={readOnly}
                      />
                    </FormGroup>
                  </Col>
                  <Col md="6">
                    <FormGroup>
                      <Label>비용</Label>
                      <Input
                        type="number"
                        value={maintenanceInfo.expense}
                        name="expense"
                        onChange={onChangeHandler}
                        disabled={readOnly}
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
                  <Col md="12">
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
                </Row>
                <Row>
                  <Col md="12">
                    <FormGroup>
                      <Label>보고서 파일 보기</Label>
                      <Input
                        type="file"
                        name="reportFile"
                        onChange={onChangeHandler}
                        disabled={readOnly}
                      />
                    </FormGroup>
                  </Col>
                </Row>
                <Col className="d-flex justify-content-center">
                  <Button className="m-2" color="primary" onClick={handleEditClick}>
                    {readOnly ? '수정' : '저장'}
                  </Button>
                  <Button className="m-2" color="danger" onClick={onClickHandler}>
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

export default MaintenanceDetails;
