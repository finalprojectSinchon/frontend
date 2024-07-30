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
import { registInspection } from '../../store/apps/inspection/inspectionSlice';

const InspectionRegist = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [inspectionInfo, setinspectionInfo] = useState({
    manager: null,
    status: null,
    location: null,
    text: null,
    type: null,
    regularInspectionDate: null,
    phone: null,
    isactive: 'Y'
  });

  const onChangeHandler = (e) => {
    setinspectionInfo({
      ...inspectionInfo,
      [e.target.name]: e.target.value,
    }); 
  };

  const handleRegisterClick = () => {
    console.log('inspectionInfo 값 들음?',inspectionInfo);
    dispatch(registInspection({inspectionInfo}));
    navigate('/inspection');
    window.location.reload();

  };

  console.log('22222222222',inspectionInfo)
  return (
    <div>
      <BreadCrumbs />
      <Row>
        <Col md="12">
          <Card>
            <CardBody className="bg-light">
              <CardTitle tag="h2" className="mb-0">
                안전 점검 등록
              </CardTitle>
            </CardBody>
            <CardBody>
              <Form>
                <Row>
                  <Col md="6">
                    <FormGroup>
                      <Label>Location</Label>
                      <Input 
                        type="text" 
                        placeholder="안전점검 할 위치를 입력하세요" 
                        name='location' 
                        onChange={onChangeHandler} 
                        defaultValue={inspectionInfo.location } 
                      />
                    
                    </FormGroup>
                  </Col>
                  <Col md="6">
                    <FormGroup>
                      <Label>Status</Label>
                      <Input 
                        type="select" 
                        name="status" 
                        onChange={onChangeHandler} 
                        defaultValue={inspectionInfo.status }
                      >
                        <option value="정상">정상</option>
                        <option value="점검중">점검중</option>
                        <option value="중단">중단</option>
                      </Input>

                    </FormGroup>
                  </Col>
                </Row>
                <Row>
                  <Col md="6">
                    <FormGroup>
                      <Label>Type</Label>
                      <Input 
                        type="select" 
                        name='type' 
                        placeholder="12n" 
                        onChange={onChangeHandler} 
                        defaultValue={inspectionInfo.type }
                      >
                        <option value='엘레베이터'>엘레베이터-A</option>
                        <option value='에스컬레이터'>에스컬레이터-C</option>
                      </Input>
                    </FormGroup>
                  </Col>
                  <Col md="6">
                    <FormGroup>
                      <Label>Manager</Label>
                      <Input 
                        type="text" 
                        name="manager" 
                        placeholder='이름을 입력하세요' 
                        onChange={onChangeHandler}  
                        defaultValue={inspectionInfo.manager } 
                      />
                    </FormGroup>
                  </Col>
                </Row>
                <Row>
                  <Col md="6">
                    <FormGroup>
                      <Label>Regular Inspection Date</Label>
                      <Input 
                        type="date" 
                        name='regularInspectionDate' 
                        placeholder='점검일을 기입하세요. EX)202X-XX-XX' 
                        onChange={onChangeHandler} 
                        defaultValue={inspectionInfo.regularInspectionDate } 
                      />
                    </FormGroup>
                  </Col>
                  <Col md="6">
                    <FormGroup>
                      <Label>Phone</Label>
                      <Input 
                        type="text" 
                        name='phone' 
                        placeholder="EX)010-****-****"
                        maxLength="13" 
                        onChange={onChangeHandler} 
                        defaultValue={inspectionInfo.phone } 
                      />
                    </FormGroup>
                  </Col>
                </Row>
                <Row>
                  <Col md="6">
                    <FormGroup>
                      <Label>비고</Label>
                      <Input 
                        type="textarea" 
                        placeholder="특이사항을 입력하세요"  
                        rows="6" 
                        name="text"
                        onChange={onChangeHandler} 
                        defaultValue={inspectionInfo.text }
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

export default InspectionRegist;
