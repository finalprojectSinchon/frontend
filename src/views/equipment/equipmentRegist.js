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
import { registEquipment } from '../../store/apps/equipment/equipmentSlice';

const EquipmentRegist = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [equipmentInfo, setEquipmentInfo] = useState({
    equipmentManager: null,
    equipmentStatus: null,
    equipmentLocation: null,
    equipmentName: null,
    equipmentQuantity: null,
    equipmentPrice: null,
    isactive: 'Y'
  });

  const onChangeHandler = (e) => {
    setEquipmentInfo({
      ...equipmentInfo,
      [e.target.name]: e.target.value,
    }); 
  };

  const handleRegisterClick = () => {
    console.log('equipmentInfo 값 들음?',equipmentInfo);
    dispatch(registEquipment({equipmentInfo}));
    navigate('/equipment');
    window.location.reload();

  };

  console.log('22222222222',equipmentInfo)
  return (
    <div>
      <BreadCrumbs />
      <Row>
        <Col md="12">
          <Card>
            <CardBody className="bg-light">
              <CardTitle tag="h2" className="mb-0">
                장비 재고 등록
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
                        name='equipmentLocation' 
                        onChange={onChangeHandler} 
                        defaultValue={equipmentInfo.equipmentLocation } 
                      />
                    
                    </FormGroup>
                  </Col>
                  <Col md="6">
                    <FormGroup>
                      <Label>Status</Label>
                      <Input 
                        type="select" 
                        name="equipmentStatus" 
                        onChange={onChangeHandler} 
                        defaultValue={equipmentInfo.equipmentStatus }
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
                      <Label>Name</Label>
                      <Input 
                        type="text" 
                        name='equipmentName' 
                        placeholder="이름을 입력하세요" 
                        onChange={onChangeHandler} 
                        defaultValue={equipmentInfo.equipmentName }
                      >
                    
                      </Input>
                    </FormGroup>
                  </Col>
                  <Col md="6">
                    <FormGroup>
                      <Label>Manager</Label>
                      <Input 
                        type="text" 
                        name="equipmentManager" 
                        placeholder='이름을 입력하세요' 
                        onChange={onChangeHandler}  
                        defaultValue={equipmentInfo.equipmentManager } 
                      />
                    </FormGroup>
                  </Col>
                </Row>
                <Row>
                  <Col md="6">
                    <FormGroup>
                      <Label>Quantity</Label>
                      <Input 
                        type="number" 
                        name='equipmentQuantity' 
                        placeholder='가격을 기입하세요' 
                        onChange={onChangeHandler} 
                        defaultValue={equipmentInfo.equipmentQuantity } 
                      />
                    </FormGroup>
                  </Col>
                  <Col md="6">
                    <FormGroup>
                      <Label>Price</Label>
                      <Input 
                        type="text" 
                        name='equipmentPrice' 
                        placeholder="--원"
                        maxLength="13" 
                        onChange={onChangeHandler} 
                        defaultValue={equipmentInfo.equipmentPrice } 
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

export default EquipmentRegist;
