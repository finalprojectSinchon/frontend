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
import { useNavigate ,useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';



const CheckinCounterDetail = () => {
  const location = useLocation();
  const state = location.state || {}; 

  console.log('location',location)
  console.log('state',state)

  const dispatch = useDispatch();
  const navigate = useNavigate();


  const [checkinCounterInfo, setCheckinCounterInfo] = useState({});
 

  const onChangeHandler = e => {
    setCheckinCounterInfo({
      ...checkinCounterInfo,
      [e.target.name]: e.target.value
    });
  };

  
 

  const handleClick = () => {
   
  
 
    }

  return (
    <div>
      <BreadCrumbs />
      <Row>
        <Col md="12">
          <Card>
            <CardBody className="bg-light">
              <CardTitle tag="h4" className="mb-0">
                체크인 카운터 등록
              </CardTitle>
            </CardBody>
            <CardBody>
              <Form>
                <Row>
                <Col md="6">
                    <FormGroup>
                      <Label>위치</Label>
                      <Input type="text" name="location" value={state.location} onChange={onChangeHandler}  />
                    </FormGroup>
                  </Col>
                  <Col md="6">
                    <FormGroup>
                      <Label>Status</Label>
                      <Input type="select" name="status"  onChange={onChangeHandler} >
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
                      <Label>type</Label>
                      <Input type="select" name="gateType"  onChange={onChangeHandler} >
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
                      <Input type="text" onChange={onChangeHandler}  />
                    </FormGroup>
                  </Col>
                </Row>
                <Row>
                  <Col md="6">
                    <FormGroup>
                      <Label>편명</Label>
                      <Input type="text" onChange={onChangeHandler}  />
                    </FormGroup>
                  </Col>
                  <Col md="6">
                    <FormGroup>
                      <Label>최근 점검일</Label>
                      <Input type="date"  name="lastInspectionDate" onChange={onChangeHandler}  />
                    </FormGroup>
                  </Col>
                </Row>
                <Row>
                  <Col md="6">
                    <FormGroup>
                      <Label>도착예정시간</Label>
                      <Input type="datetime" name='scheduleDateTime' onChange={onChangeHandler}/>
                    </FormGroup>
                  </Col>
                  <Col md="6">
                    <FormGroup>
                      <Label>지연시간</Label>
                      <Input type="number"  name='delayTime' onChange={onChangeHandler} />
                    </FormGroup>
                  </Col>
                </Row>
                <Row>
                  <Col md="6">
                    <FormGroup>
                      <Label>도착공항명</Label>
                      <Input type="text" name='airport' onChange={onChangeHandler}  />
                    </FormGroup>
                  </Col>
                  <Col md="6">
                    <FormGroup>
                      <Label>담당자</Label>
                      <Input type="text" name="manager" onChange={onChangeHandler}  />
                    </FormGroup>
                  </Col>
                </Row>
                <Row>
                 
                  <Col md="6">
                    <FormGroup>
                      <Label>비고</Label>
                      <Input type="textarea" rows="6"  name="note" onChange={onChangeHandler} />
                    </FormGroup>
                  </Col>
                </Row>
                <Col className='d-flex justify-content-center'>
                  <Button className="m-2" color="primary" onClick={handleClick}>
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


 



  

export default CheckinCounterDetail;
