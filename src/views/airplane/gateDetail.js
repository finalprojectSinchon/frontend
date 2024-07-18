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
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';



const gateDetail = () => {
 
  const dispatch = useDispatch();
  const { gateCode } = useParams();
  console.log("gateCode detail",gateCode)
  const gateDetail = useSelector((state) => state.gates.gateDetail);


  console.log('gateDetail',gateDetail)

 

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
                      <Label>Status</Label>
                      <Input type="select"   value={gateDetail.data.gate.status} >
                        <option>고장</option>
                        <option>정상</option>
                        <option>점검중</option>
                      </Input>
                      <FormText className="muted">This field has error.</FormText>
                    </FormGroup>
                  </Col>
                </Row>
                <Row>
                  <Col md="6">
                    <FormGroup>
                     
                      <FormText className="muted">Select your type</FormText>
                    </FormGroup>
                  </Col>
                  <Col md="6">
                    <FormGroup>
                      <Label>항공사</Label>
                      <Input type="text" name="Select Category" invalid/>
                      <FormFeedback>Sorry, that username&apos;s taken. Try another?</FormFeedback>
                    </FormGroup>
                  </Col>
               
                </Row>
                <Row>
                   <Col md="6">
                    <FormGroup>
                    <Label>편명</Label>
                    <Input type="text" />
                    </FormGroup>
                  </Col>
                  <Col md="6">
                    <FormGroup>
                      <Label>최근 점검일</Label>
                      <Input type="date" placeholder="DOB Here" />
                    </FormGroup>
                  </Col>
                </Row>
                <Row>
                <Col md="6">
                    <FormGroup>
                    <Label>도착예정시간</Label>
                    <Input type="datetime-local" />
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
                    <Input type="text" />
                    </FormGroup>
                  </Col>
                  <Col md="6">
                    <FormGroup>
                      <Label>비고</Label>
                      <Input type="textarea" placeholder="특이사항을 입력하세요"  rows="6" />
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