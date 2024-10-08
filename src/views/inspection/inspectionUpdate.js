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
  FormText,
  Button,
  FormFeedback,
} from 'reactstrap';
import BreadCrumbs from '../../layouts/breadcrumbs/BreadCrumbs';
import { useParams } from 'react-router-dom';
import api from '../../store/apps/airplane/api';

const InspectionDetail = () => {
  const { inspectionCode } = useParams();
  const [readOnly, setreadOnly] = useState(true);
  const [inspectionInfo, setinspectionInfo] = useState({});

  useEffect(() => {
    api.get(`/api/v1/inspection/${inspectionCode}`)
      .then(res => res.data)
      .then(data => {
        setinspectionInfo(data.data);


      });
  }, [inspectionCode]);

  const onChangeHandler = e => {
    setinspectionInfo({
      ...inspectionInfo,
      [e.target.name]: e.target.value
    });
    
    if (name === 'phone') {
      const phoneRegex = /^010-\d{4}-\d{4}$/;
      if (!phoneRegex.test(value) && value !== "") {
        setPhoneError(true);
      } else {
        setPhoneError(false);
      }
    }
  };

  return (
    <div>
      <BreadCrumbs />
      <Row>
        <Col md="12">
          <Card>
            <CardBody className="bg-light">
              <CardTitle tag="h2" className="mb-0">
                Inspection
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
                        defaultValue={inspectionInfo.location || ""} 
                      />
                      <FormFeedback valid>Success! You&apos;ve done it.</FormFeedback>
                    </FormGroup>
                  </Col>
                  <Col md="6">
                    <FormGroup>
                      <Label>Status</Label>
                      <Input 
                        type="select" 
                        name="status" 
                        onChange={onChangeHandler} 
                        defaultValue={inspectionInfo.status || ""}
                      >
                        <option value="정상">정상</option>
                        <option value="점검중">점검중</option>
                        <option value="중단">중단</option>
                      </Input>
                      <FormText className="muted">This field has error.</FormText>
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
                        defaultValue={inspectionInfo.type || ""}
                      >
                        <option value='엘레베이터'>엘레베이터-A</option>
                        <option value='에스컬레이터'>에스컬레이터-C</option>
                      </Input>
                      <FormText className="muted">Select your type</FormText>
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
                        defaultValue={inspectionInfo.manager || ""} 
                      />
                      <FormText className='muted'>이름은 반드시 입력해야 합니다.</FormText>
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
                        defaultValue={inspectionInfo.regularInspectionDate || ""} 
                      />
                      <FormText className='muted'>점검일은 반드시 입력해야 합니다.</FormText>
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
                        defaultValue={inspectionInfo.phone || ""} 
                      />
                      <FormText className='muted'>휴대폰 번호는 반드시 입력해야 합니다.</FormText>
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
                        defaultValue={inspectionInfo.text || ""}
                      />
                    </FormGroup>
                  </Col>
                  <Col md="6">
                    {!readOnly ? <h1>수정가능</h1> : null}
                  </Col>
                </Row>
                <Col className='d-flex justify-content-center'>
                <Button className="btn" color="primary" onClick={() => setReadOnly(false)} >
                    수정
                  </Button>
                  <Button className="btn" color="secondary" type="submit" disabled={readOnly}>
                    저장
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

export default InspectionDetail;
