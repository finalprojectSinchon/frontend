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
} from 'reactstrap';
import BreadCrumbs from '../../layouts/breadcrumbs/BreadCrumbs';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAirplane } from '../../store/apps/airplane/airplaneSlice';

const AirplaneDetail = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { airplaneCode } = useParams();

  const airplaneDetail = useSelector((state) => state.airplanes.airplaneDetail);
  const [airplaneInfo, setAirplaneInfo] = useState({});
  const [readOnly, setReadOnly] = useState(true);

  useEffect(() => {
    dispatch(fetchAirplane({ airplaneCode }));
  }, [dispatch, airplaneCode]);

  useEffect(() => {
    if (airplaneDetail && airplaneDetail.data) {
      setAirplaneInfo(airplaneDetail.data.airplane);
    }
  }, [airplaneDetail]);

  const onChangeHandler = (e) => {
    const { name, value } = e.target;
    setAirplaneInfo((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  return (
      <div>
        <BreadCrumbs />
        <Row>
          <Col md="12">
            <Card>
              <CardBody className="bg-light">
                <CardTitle tag="h4" className="mb-0">
                  비행기
                </CardTitle>
              </CardBody>
              <CardBody>
                <Form>
                  <Row>
                    <Col md="6">
                      <FormGroup>
                        <Label>Airplane Code</Label>
                        <Input type="text" value={airplaneInfo.airplaneCode} name='airplaneCode' onChange={onChangeHandler} readOnly={readOnly} />
                      </FormGroup>
                    </Col>
                    <Col md="6">
                      <FormGroup>
                        <Label>Airport</Label>
                        <Input type="text" name="airport" value={airplaneInfo.airport} onChange={onChangeHandler} disabled={readOnly} />
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                    <Col md="6">
                      <FormGroup>
                        <Label>터미널 구분</Label>
                        <Input type="text" value={airplaneInfo.terminalid} name='terminalid' onChange={onChangeHandler} readOnly={readOnly} />
                      </FormGroup>
                    </Col>
                    <Col md="6">
                      <FormGroup>
                        <Label>체크인 카운터</Label>
                        <Input type="text" name='chkinrange' value={airplaneInfo.chkinrange} onChange={onChangeHandler} disabled={readOnly} />
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                    <Col md="6">
                      <FormGroup>
                        <Label>편명</Label>
                        <Input type="text" name='flightId' value={airplaneInfo.flightId} onChange={onChangeHandler} disabled={readOnly} />
                      </FormGroup>
                    </Col>
                    <Col md="6">
                      <FormGroup>
                        <Label>탑승구</Label>
                        <Input type="text" value={airplaneInfo.gatenumber} name="gatenumber" onChange={onChangeHandler} disabled={readOnly} />
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                    <Col md="6">
                      <FormGroup>
                        <Label>운항 상태</Label>
                        <Input type="text" value={airplaneInfo.remark} name='remark' onChange={onChangeHandler} disabled={readOnly} />
                      </FormGroup>
                    </Col>
                    <Col md="6">
                      <FormGroup>
                        <Label>예정 일자</Label>
                        <Input type="date" value={airplaneInfo.scheduleDateTime} name='scheduleDateTime' onChange={onChangeHandler} disabled={readOnly} />
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>

                    <Col md="6">
                      <FormGroup>
                        <Label>비고</Label>
                        <Input type="textarea" rows="6" value={airplaneInfo.note} name="note" onChange={onChangeHandler} disabled={readOnly} />
                      </FormGroup>
                    </Col>
                  </Row>
                </Form>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
  );
};

export default AirplaneDetail;
