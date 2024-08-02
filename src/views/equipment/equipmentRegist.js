import React, {useEffect, useState} from 'react';
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
import api from "src/store/apps/airplane/api.js";

const EquipmentRegist = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [equipmentInfo, setEquipmentInfo] = useState({
    equipmentManager: null,
    equipmentStatus: null,
    equipmentName: null,
    location : null,
    zoneCode : null,
    equipmentQuantity: null,
    equipmentPrice: null,
  });

  console.log(equipmentInfo)

  const [location, setLocation] = useState([]);

  useEffect(() => {
    api.get("/api/v1/location/storage")
        .then(res => res.data)
        .then(data => {
          setLocation(data.data)
        })
  }, []);



  const onChangeHandler = (e) => {
    setEquipmentInfo({
      ...equipmentInfo,
      [e.target.name]: e.target.value,
    }); 
  };

  const handleRegisterClick = () => {
    dispatch(registEquipment({equipmentInfo}));
    navigate('/equipment');
    window.location.reload();

  };

  const handleRegionChange = (e) => {
    const selectedZone = location.find(
        (regionItem) => regionItem.zone === e.target.value
    );

    setEquipmentInfo({
      ...equipmentInfo,
      location: selectedZone.zone,
      zoneCode: selectedZone.zoneCode,
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
                장비 재고 등록
              </CardTitle>
            </CardBody>
            <CardBody>
              <Form>
                <Row>
                  <Col md="6">
                    <FormGroup>
                      <Label for="regionSelect">위치</Label>
                      <Input
                          type="select"
                          id="regionSelect"
                          onChange={handleRegionChange}
                          placeholder="지역을 입력해 주세요"
                      >
                        <option value="">지역을 선택하세요</option>
                        {location.map((regionItem) => (
                            <option key={regionItem.zoneCode} value={regionItem.zone}>
                              {regionItem.zone}
                            </option>
                        ))}
                      </Input>
                    
                    </FormGroup>
                  </Col>
                  <Col md="6">
                    <FormGroup>
                      <Label>Status</Label>
                      <Input 
                        type="select" 
                        name="status" 
                        onChange={onChangeHandler} 
                        defaultValue={equipmentInfo.status }
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
                        name="manager" 
                        placeholder='이름을 입력하세요' 
                        onChange={onChangeHandler}  
                        defaultValue={equipmentInfo.manager } 
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
