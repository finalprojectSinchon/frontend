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
import { useSelector, useDispatch } from 'react-redux';
import { fetchEquipment, modifyEquipment } from '../../store/apps/equipmentSlice';

const EquipmentDetail = () => {
  const { equipmentCode } = useParams();
  const dispatch = useDispatch();
  const equipmentDetail = useSelector((state) => state.equipment.equipmentDetail);
  const [formState, setFormState] = useState(null);
  const [readOnly, setReadOnly] = useState(true);

  useEffect(() => {
    dispatch(fetchEquipment({ equipmentCode }));
  }, [dispatch, equipmentCode]);

  useEffect(() => {
    if (equipmentDetail) {
      setFormState(equipmentDetail);
    }
  }, [equipmentDetail]);

  const onChangeHandler = e => {
    const { name, value } = e.target;
    setFormState({
      ...formState,
      [name]: value
    });
  };

  const onSubmitHandler = e => {
    e.preventDefault();
    dispatch(modifyEquipment({ equipmentCode, equipmentInfo: formState }))
      .then(() => {
        alert('저장이 완료되었습니다.');
        setReadOnly(true);
      })
      .catch(err => {
        alert('저장 중 오류가 발생했습니다.');
      });
  };

  if (!formState) {
    return <div>로딩 중...</div>;
  }

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
              <Form onSubmit={onSubmitHandler}>
                <Row>
                  <Col md="6">
                    <FormGroup>
                      <Label>재고 위치</Label>
                      <Input 
                        type="text" 
                        placeholder="장비 재고의 위치를 입력하세요" 
                        name='equipmentLocation' 
                        onChange={onChangeHandler} 
                        value={formState.equipmentLocation || ""} 
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
                        value={formState.status || ""}
                        readOnly={readOnly}
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
                      <Label>이름</Label>
                      <Input 
                        type="text" 
                        name='equipmentName' 
                        onChange={onChangeHandler} 
                        value={formState.equipmentName || ""}
                        readOnly={readOnly}
                      />
                    </FormGroup>
                  </Col>
                  <Col md="6">
                    <FormGroup>
                      <Label>관리자</Label>
                      <Input 
                        type="text" 
                        name="equipmentManager" 
                        placeholder='이름을 입력하세요' 
                        onChange={onChangeHandler}  
                        value={formState.equipmentManager || ""} 
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
                        value={formState.equipmentQuantity || ""} 
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
                        value={formState.equipmentPrice || ""} 
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