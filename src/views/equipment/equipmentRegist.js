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
  Button,
} from 'reactstrap';
import BreadCrumbs from '../../layouts/breadcrumbs/BreadCrumbs';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { registEquipment, fetchEquipments } from '../../store/apps/equipment/equipmentSlice';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { storage } from 'src/firebase.js';
import api from 'src/store/apps/airplane/api.js';
import CustomModal  from "src/views/CustomModal.js";


const EquipmentRegist = () => {

  const [modal, setModal] = useState(false);
  const toggleModal = () => setModal(!modal);
  const [type,setType] = useState('');
  const [content, setContent] = useState('');

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [equipmentInfo, setEquipmentInfo] = useState({
    equipmentManager: null,
    equipmentStatus: null,
    equipmentName: null,
    location: null,
    zoneCode: null,
    equipmentQuantity: null,
    equipmentPrice: null,
    img: '',
  });
  const [img, setImg] = useState(null);
  const [location, setLocation] = useState([]);
  const [existingEquipments, setExistingEquipments] = useState([]);
  const equipment = useSelector(state => state.equipments.equipmentList)
  console.log('equipment',equipment)

  useEffect(() => {
    api.get('/api/v1/equipment/storage')
        .then(res => res.data)
        .then(data => {
          setLocation(data.data);
        });

  }, [dispatch]);

  useEffect(() => {
    dispatch(fetchEquipments());
  }, [dispatch]);

  useEffect(() => {
    setExistingEquipments(equipment);
  }, [equipment]);

  console.log('11',existingEquipments)
  const onChangeHandler = (e) => {
    setEquipmentInfo({
      ...equipmentInfo,
      [e.target.name]: e.target.value,
    });
  };

  const handleRegisterClick = async () => {
    if (existingEquipments ) {

      const isDuplicate = existingEquipments.data.some(
          equipment => equipment.equipmentName === equipmentInfo.equipmentName
      );

      if (isDuplicate) {
        setType('등록');
        setContent('중복된 이름의 장비가 이미 존재합니다.');
        toggleModal();
        return;
      }
    }

    let imgUrl = '';

    if (img) {
      const img_ref = ref(storage, `equipmentImg/${equipmentInfo.equipmentName}`);
      try {
        await uploadBytes(img_ref, img);
        imgUrl = await getDownloadURL(img_ref);
      } catch (e) {
        console.error('Image upload error:', e);
      }
    }

    const updatedEquipmentInfo = { ...equipmentInfo, img: imgUrl };
    setEquipmentInfo(updatedEquipmentInfo);

    setType('등록');
    setContent('장비가 등록되었습니다.')
    toggleModal();
    setTimeout(() => {

    dispatch(registEquipment({ equipmentInfo: updatedEquipmentInfo }));
    navigate('/equipment');
    window.location.reload();
    }, 3000);
  };

  const changeHandler = (e) => {
    if (e.target.files[0]) {
      setImg(e.target.files[0]);
    }
  };

  const handleRegionChange = (e) => {
    setEquipmentInfo({
      ...equipmentInfo,
      location: e.target.value,
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
                            name="location"
                            onChange={handleRegionChange}
                            placeholder="지역을 입력해 주세요"
                        >
                          <option value="">지역을 선택하세요</option>
                          {location.map((regionItem) => (
                              <option key={regionItem.code} value={regionItem.location}>
                                {regionItem.location}
                              </option>
                          ))}
                        </Input>
                      </FormGroup>
                    </Col>
                    <Col md="6">
                      <FormGroup>
                        <Label>image</Label>
                        <Input
                            type="file"
                            name='img'
                            onChange={changeHandler}
                        />
                      </FormGroup>
                    </Col>
                    <Col md="6">
                      <FormGroup>
                        <Label>카테고리</Label>
                        <Input
                            type="select"
                            name="category"
                            onChange={onChangeHandler}
                        >
                          <option value="">카테고리를 선택해주세요</option>
                          <option value="항공기정비장비">항공기정비장비</option>
                          <option value="활주로및계류장유지보수장비"> 활주로및계류장유지보수장비</option>
                          <option value="전기및전자장비">전기및전자장비</option>
                          <option value="통신및네트워크장비">통신및네트워크장비</option>
                          <option value="화재및안전장비">화재및안전장비</option>
                          <option value="청소및환경관리장비">청소및환경관리장비</option>
                          <option value="건설및건축장비">건설및건축장비</option>
                          <option value="운송및물류장비">운송및물류장비</option>
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
                        >
                        </Input>
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
        <CustomModal  isOpen={modal} toggle={toggleModal} type = {type} content={content}/>

      </div>
  );
};

export default EquipmentRegist;
