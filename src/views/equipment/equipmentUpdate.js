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
  Button
} from 'reactstrap';
import BreadCrumbs from '../../layouts/breadcrumbs/BreadCrumbs';
import { useParams } from 'react-router-dom';
import api from '../../store/apps/airplane/api';


const EquipmentDetail = () => {
  const { equipmentCode } = useParams();
  const [readOnly, setReadOnly] = useState(true);
  const [equipmentInfo, setEquipmentInfo] = useState({});

  useEffect(() => {
    api.get(`/api/v1/equipment/${equipmentCode}`)
      .then(res => res.data)
      .then(data => {
        setEquipmentInfo(data.data);

      });
  }, [equipmentCode]);

  const onChangeHandler = e => {
    setEquipmentInfo({
      ...equipmentInfo,
      [e.target.name]: e.target.value
    });
  };


  return (
    <div>
      <BreadCrumbs />
      <Row>
        <Col md="12">
          <Card>
            <CardBody className="bg-light">
              <CardTitle tag="h2" className="mb-0">
                장비 재고
              </CardTitle>
            </CardBody>
            <CardBody>
              <Form>
                <Row>
                  <Col md="6">
                    <FormGroup>
                      <Label>재고 위치</Label>
                      <Input 
                        type="text" 
                        placeholder="장비 재고의 위치를 입력하세요" 
                        name='location' 
                        onChange={onChangeHandler} 
                        value={equipmentInfo.location || ""} 
                        readOnly={readOnly}
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
                        value={equipmentInfo.status || ""}
                        readOnly={readOnly}
                      >
                        <option value="정상">정상</option>
                        <option value="점검중">점검중</option>
                        <option value="고장">고장</option>
                      </Input>
                    </FormGroup>
                  </Col>
                </Row>
                <Row>
                  <Col md="6">
                    <FormGroup>
                      <Label>이름</Label>
                      <Input 
                        type="text" 
                        name='equipmentName' 
                        onChange={onChangeHandler} 
                        value={equipmentInfo.equipmentName || ""}
                        readOnly={readOnly}
                      />
                    </FormGroup>
                  </Col>
                  <Col md="6">
                    <FormGroup>
                      <Label>관리자</Label>
                      <Input 
                        type="text" 
                        name="manager" 
                        placeholder='이름을 입력하세요' 
                        onChange={onChangeHandler}  
                        value={equipmentInfo.manager || ""} 
                        readOnly={readOnly}
                      />
                      <FormText className='muted'>이름은 반드시 입력해야 합니다.</FormText>
                    </FormGroup>
                  </Col>
                </Row>
                <Row>
                  <Col md="6">
                    <FormGroup>
                      <Label>수량</Label>
                      <Input 
                        type="text" 
                        name='equipmentQuantity' 
                        placeholder='수량을 기입하세요.' 
                        onChange={onChangeHandler} 
                        value={equipmentInfo.equipmentQuantity || ""} 
                        readOnly={readOnly}
                      />
                      <FormText className='muted'>점검일은 반드시 입력해야 합니다.</FormText>
                    </FormGroup>
                  </Col>
                  <Col md="6">
                    <FormGroup>
                      <Label>가격</Label>
                      <Input 
                        type="text" 
                        name='equipmentPrice' 
                        placeholder="가격을 입력하세요."
                        onChange={onChangeHandler} 
                        value={equipmentInfo.equipmentPrice || ""} 
                        readOnly={readOnly}
                      />
                      <FormText className='muted'>가격은 반드시 입력해야 합니다.</FormText>
                    </FormGroup>
                  </Col>
                </Row>
                <Row>
                  <Col md="6">
                    {!readOnly ? <h1>수정 가능</h1> : null}
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

export default EquipmentDetail;
