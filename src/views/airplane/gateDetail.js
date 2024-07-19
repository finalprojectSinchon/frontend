import React, { useEffect } from 'react';
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
  FormText,
  Button,
  FormFeedback,
} from 'reactstrap';
import BreadCrumbs from '../../layouts/breadcrumbs/BreadCrumbs';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchGate } from '../../store/apps/airplane/gateSlice';




const gateDetail = () => {
 
  const dispatch = useDispatch();
  const { gateCode } = useParams();
  console.log("gateCode detail",gateCode)
  const gateDetail = useSelector((state) => state.gates.gateDetail);


  console.log('gateDetail',gateDetail);

 

  useEffect(() => {

        dispatch(fetchGate({	
          gateCode
        }));            
    }
    ,[dispatch]);

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
                    <Input type="text"  value={gateDetail.data.gate.gateCode} />
                    </FormGroup>
                  </Col>
                  <Col md="6">
                    <FormGroup>
                    <Label>Status</Label>
                      <Input type="select"   value={gateDetail.data.gate.status} >
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
                      <Input type="select"   value={gateDetail.data.gate.gateType}  >
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
                    <Input type="text" name="Select Category" value={gateDetail.data.gate.airplane.airline} />
                    </FormGroup>
                  </Col>
                </Row>
                <Row>
                   <Col md="6">
                    <FormGroup>
                    <Label>편명</Label>
                    <Input type="text" value={gateDetail.data.gate.airplane.flightId} />
                    </FormGroup>
                  </Col>
                  <Col md="6">
                    <FormGroup>
                      <Label>최근 점검일</Label>
                      <Input type="date" value={gateDetail.data.gate.lastInspectionDate} />
                    </FormGroup>
                  </Col>
                </Row>
                <Row>
                <Col md="6">
                    <FormGroup>
                    <Label>도착예정시간</Label>
                    <Input type="datetime-local"  value={gateDetail.data.gate.airplane.scheduleDateTime} />
                    </FormGroup>
                  </Col>
                  <Col md="6">
                    <FormGroup>
                      <Label>지연시간</Label>
                      <Input type="number" placeholder="지연시간을 입력하세요" />
                    </FormGroup>
                  </Col>
                </Row>
                <Row>
                <Col md="6">
                    <FormGroup>
                    <Label>도착공항명</Label>
                    <Input type="text"    value={gateDetail.data.gate.airplane.airport} />
                    </FormGroup>
                  </Col>
                  <Col md="6">
                    <FormGroup>
                    <Label>담당자</Label>
                    <Input type="text" value={gateDetail.data.gate.manager} />
                    </FormGroup>
                  </Col>
                </Row>
                <Row>
                <Col md="6">
                    <FormGroup>
                    <Label>위치</Label>
                    <Input type="text"    value={gateDetail.data.gate.location} />
                    </FormGroup>
                  </Col>
                  <Col md="6">
                    <FormGroup>
                    <Label>비고</Label>
                    <Input type="textarea" rows="6" value={gateDetail.data.gate.note} />
                    </FormGroup>
                  </Col>
                </Row>
              
              <Col className='d-flex justify-content-center'>
                <Button className="btn " color="primary"  >
                  primary
                </Button>
                <Button className="btn" color="secondary" >
                  secondary
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

export default gateDetail;