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
import { useParams, useNavigate } from 'react-router-dom'; 
import { useDispatch, useSelector } from 'react-redux'; 
import { fetchEquipment, modifyEquipment, deleteEquipment } from '../../store/apps/equipment/equipmentSlice'; 

const EquipmentDetail = () => {
  const { equipmentCode } = useParams();
  const [readOnly, setReadOnly] = useState(true);
  const [equipmentInfo, setEquipmentInfo] = useState({});
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const equipmentDetail = useSelector(state => state.equipments.equipmentDetail);
  


  useEffect(() => {
    dispatch(fetchEquipment({ equipmentCode }));
    

  }, [dispatch, equipmentCode]);


  useEffect(() => {
    if (equipmentDetail && equipmentDetail.data) {
      setEquipmentInfo(equipmentDetail.data);
    }
  }, [equipmentDetail]);



  const onChangeHandler = e => {
    const { name, value } = e.target;
    setEquipmentInfo({ 
      ...equipmentInfo,
      [name]: value } );
  };

  const handleSave = () => {
    dispatch(modifyEquipment({ equipmentCode, equipmentInfo: equipmentInfo }))
    navigate('/equipment');

  
  };

  const handleDelete = () => {
    dispatch(deleteEquipment({ equipmentCode}))
    navigate('/equipment');
  
  };



  return (
    <div>
      <BreadCrumbs />
      <Row>
        <Col md="12">
          <Card>
            <CardBody className="bg-light">
              <CardTitle tag="h2" className="mb-0">Equipment</CardTitle>
            </CardBody>
            <CardBody>
              <Form>
                <Row>
                  <Col md="6">
                    <FormGroup>
                      <Label>Location</Label>
                      <Input
                        type="text"
                        placeholder="장비 재고의 위치를 입력하세요"
                        name="equipmentLocation"
                        onChange={onChangeHandler}
                        readOnly={readOnly}
                        value={equipmentInfo.equipmentLocation || ''}
                      />
                      <FormFeedback valid>Success! You've done it.</FormFeedback>
                    </FormGroup>
                  </Col>
                  <Col md="6">
                    <FormGroup>
                      <Label>Status</Label>
                      <Input
                        type="select"
                        name="status"
                        onChange={onChangeHandler}
                        disabled={readOnly}
                        value={equipmentInfo.status || ''}
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
                      <Label>Name</Label>
                      <Input
                        type="text"
                        name="equipmentName"
                        placeholder="장비 이름을 입력하세요"
                        readOnly={readOnly}
                        onChange={onChangeHandler}
                        value={equipmentInfo.equipmentName || ''}
                      />
                      <FormText className="muted"></FormText>
                    </FormGroup>
                  </Col>
                  <Col md="6">
                    <FormGroup>
                      <Label>Manager</Label>
                      <Input
                        type="text"
                        name="equipmentManager"
                        placeholder="이름을 입력하세요"
                        readOnly={readOnly}
                        onChange={onChangeHandler}
                        value={equipmentInfo.equipmentManager || ''}
                      />
                      <FormText className="muted">가격은 반드시 입력해야 합니다.</FormText>
                    </FormGroup>
                  </Col>
                </Row>
                <Row>
                  <Col md="6">
                    <FormGroup>
                      <Label>Quantity</Label>
                      <Input
                        type="text"
                        name="equipmentQuantity"
                        placeholder='수량을 기입하세요.'
                        readOnly={readOnly}
                        onChange={onChangeHandler}
                        value={equipmentInfo.equipmentQuantity || ''}
                      />
                    </FormGroup>
                  </Col>
                  <Col md="6">
                    <FormGroup>
                      <Label>Price</Label>
                      <Input
                        type="text"
                        name="equipmentPrice"
                        placeholder="--원"
                        readOnly={readOnly}
                        onChange={onChangeHandler}
                        value={equipmentInfo.equipmentPrice || ''}
                      />
                      <FormText className="muted">휴대폰 번호는 반드시 입력해야 합니다.</FormText>
                    </FormGroup>
                  </Col>
                </Row>
                <Row>
                
                </Row>
                <Col className="d-flex justify-content-center">
                  {readOnly ? (
                    <Button className="btn" color="primary" onClick={() => setReadOnly(false)}>
                      수정
                    </Button>
                  ) : (
                    <>
                      <Button className="btn" color="success" onClick={handleSave}>
                        저장
                      </Button>
                      <Button className="btn" color="secondary" onClick={handleDelete}>
                        삭제
                      </Button>
                    </>
                  )}
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
