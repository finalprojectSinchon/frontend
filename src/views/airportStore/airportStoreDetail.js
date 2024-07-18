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
import { useDispatch, useSelector } from 'react-redux';
import api from '../../store/apps/airplane/api';



const AirportStoreDetail = () => {
 

  const { storeId } = useParams();
  console.log("storeId detail",storeId)

  const [storeInfo, setstoreInfo] = useState();
  const [readOnly, setreadOnly] = useState(true);
  console.log(storeInfo);

  useEffect(() => {
    api.get(`/api/v1/store/${storeId}`)
    .then(res=> res.data)
    .then(data => {
      setstoreInfo(data.data)
    })
  }, []);


  const onChangeHandler = e => {
    setstoreInfo({
        ...storeInfo,
        [e.target.name] : e.target.value
    })
  }

  return (
    <div>
      <BreadCrumbs />
      <Row>
        <Col md="12">
          <Card>
            <CardBody className="bg-light">
              <CardTitle tag="h2" className="mb-0">
                Store
              </CardTitle>
            </CardBody>
            <CardBody>
              <Form>
                <Row>
                  <Col md="6">
                    <FormGroup>
                      <Label>점포명</Label>
                      <Input type="text" placeholder="점포이름을 입력하세요" name='storeName' onChange={onChangeHandler} readOnly={readOnly}
                      value={storeInfo ? storeInfo.storeName :  '로딩중...' } valid />
                      <FormFeedback valid>Success! You&apos;ve done it.</FormFeedback>
                    </FormGroup>
                  </Col>
                  <Col md="6">
                    <FormGroup>
                      <Label>Status</Label>
                      <Input type="select" name="storeStatus" onChange={onChangeHandler} disabled={readOnly}>
                        <option name="정상">정상</option>
                        <option name="점검중">점검중</option>
                        <option name="중단">중단</option>
                      </Input>
                      <FormText className="muted">This field has error.</FormText>
                    </FormGroup>
                  </Col>
                </Row>
                <Row>
                  <Col md="6">
                    <FormGroup>
                      <Label>type</Label>
                      <Input type="select" name='storeType' placeholder="12n" onChange={onChangeHandler} disabled={readOnly}>
                        <option name='점포'>점포</option>
                        <option name='안내소'>안내소</option>
                      </Input>
                      <FormText className="muted">Select your type</FormText>
                    </FormGroup>
                  </Col>
                  <Col md="6">
                    <FormGroup>
                      <Label>주요업무</Label>
                      <Input type="text" name="storeWork" placeholder='주요업무를 입력하세요' readOnly={readOnly}
                        onChange={onChangeHandler}  value={storeInfo ? storeInfo.storeWork :  '로딩중...' }/>
                      <FormText className='muted'>주요업무는 반드시 입력해야햡니다.</FormText>
                    </FormGroup>
                  </Col>
               
                </Row>
                <Row>
                   <Col md="6">
                    <FormGroup>
                    <Label>연락처</Label>
                    <Input type="text" name='storeContact' placeholder='연락처를 입력하세요' readOnly={readOnly}
                     onChange={onChangeHandler} value={storeInfo ? storeInfo.storeContact :  '로딩중...' }/>
                    </FormGroup>
                  </Col>
                  <Col md="6">
                    <FormGroup>
                      <Label>운영시간</Label>
                      <Input type="text" name='storeOperatingTime' placeholder="운영시간을 입력하세요" readOnly={readOnly} 
                      onChange={onChangeHandler} value={storeInfo ? storeInfo.storeOperatingTime :  '로딩중...' } />
                    </FormGroup>
                  </Col>
                </Row>
                <Row>
                <Col md="6">
                    <FormGroup>
                    <Label>취급품목</Label>
                    <Input type="text" name='storeItems' placeholder='취급품목을 입력하세요' readOnly={readOnly}
                      onChange={onChangeHandler} value={storeInfo ? storeInfo.storeItems :  '로딩중...' } />
                    </FormGroup>
                  </Col>
                  <Col md="6">
                    <FormGroup>
                      <Label>담당자</Label>
                      <Input type="text" name='storeManager' placeholder="담당자를 입력하세요" readOnly={readOnly}
                        onChange={onChangeHandler} value={storeInfo ? storeInfo.storeManager :  '로딩중...' } />
                    </FormGroup>
                  </Col>
                </Row>
                <Row>
                  <Col md="6">
                    <FormGroup>
                      <Label>비고</Label>
                      <Input type="textarea" placeholder="특이사항을 입력하세요"  rows="6" />
                    </FormGroup>
                  </Col>
                <Col md="6">
                    {!readOnly ? <h1>수정가능</h1> : null}
                </Col>
                </Row>
              <Col className='d-flex justify-content-center'>
                <Button className="btn " color="primary" onClick={() => setreadOnly(false)}  >
                  수정하기
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

export default AirportStoreDetail;