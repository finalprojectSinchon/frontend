import React, { useState, useEffect } from 'react';
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
import { useDispatch ,useSelector} from 'react-redux';
import { registInspection } from '../../store/apps/inspection/inspectionSlice';
import { useLocation } from 'react-router-dom';
import { fetchLocation } from "../../store/apps/maintenance/maintenanceSlice";
import CustomModal  from "src/views/CustomModal.js";


const InspectionRegist = () => {

  const [modal, setModal] = useState(false);
  const toggleModal = () => setModal(!modal);
  const [type,setType] = useState('');
  const [content, setContent] = useState('');

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const { info } = location.state || {};


  const [inspectionInfo, setInspectionInfo] = useState({
    manager: '',
    status: '',
    location: '',
    text: '',
    type: '',
    regularInspectionDate: '',
    phone: '',
    structure:''

  });
  const [structure,setStructure] = useState('');
  const locationList = useSelector(state => state.maintenances.location);
  const locations = locationList?.data?.locationList  || [];
  const [all, setAll] = useState({

    
    manager: '',
    status: '',
    location: '',
    text: '',
    type: '',
  });

  useEffect(() => {
    dispatch(fetchLocation(structure));
  }, [structure]);


  useEffect(() => {
    if (info) {
      setAll(info);
      setInspectionInfo(prev => ({
        ...prev,
        ...info
      }));
    }
  }, [info]);

  const onChangeHandler = (e) => {
    setInspectionInfo({
      ...inspectionInfo,
      [e.target.name]: e.target.value,
    });  
    if(e.target.name == 'structure'){
      setStructure(e.target.value)
    }
  };

  const handleRegisterClick = () => {

    setType('등록');
    setContent('안전점검이 등록되었습니다.')
    toggleModal();
    setTimeout(() => {

    dispatch(registInspection({ inspectionInfo }));
    navigate('/inspection');
    window.location.reload();
    }, 3000);
  };



  return (
    <div>
      <BreadCrumbs />
      <Row>
        <Col md="12">
          <Card>
            <CardBody className="bg-light">
              <CardTitle tag="h2" className="mb-0">
                안전 점검 등록
              </CardTitle>
            </CardBody>
            <CardBody>
              <Form>
                <Row>
                <Col md="6">
                    <FormGroup>
                      <Label>시설물</Label>
                      <Input
                        type="select"
                        name="structure"
                        onChange={onChangeHandler}
                      >
                        <option value="">선택하세요</option>
                        <option value="gate">탑승구</option>
                        <option value="baggageClaim">수화물 수취대</option>
                        <option value="checkinCounter">체크인 카운터</option>
                        <option value="facilities">편의시설</option>
                        <option value="store">점포</option>
                        <option value="storage">창고</option>
                      </Input>
                    </FormGroup>
                  </Col>
                  <Col md="6">
                    <FormGroup>
                      <Label>위치</Label>
                      <Input
                        type="select"
                        name="location"
                        onChange={onChangeHandler}
                      >
                        <option value="">위치를 선택하세요</option>
                        {locations.map((location, index) => (
                            <option key={index} value={location}>{location}</option>
                        ))}
                      </Input>
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
                        onChange={onChangeHandler} 
                        value={info?.type}
                        >
                        <option value="">A</option>
                        <option value="">B</option>
                        <option value="">C</option>
                        <option value="">D</option>
                        
                        
                      
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
                        value={info?.manager}
                      />
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
                        value={info?.regularInspectionDate}
                      />
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
                        value={info?.phone}
                      />
                    </FormGroup>
                  </Col>
                </Row>
                <Row>
                <Col md="6">
                    <FormGroup>
                      <Label>Status</Label>
                      <Input 
                        type="select" 
                        name="status" 
                        onChange={onChangeHandler} 
                        value={info?.status}
                      >
                        <option value="정상">정상</option>
                        <option value="점검중">점검중</option>
                        <option value="중단">중단</option>
                      </Input>
                    </FormGroup>
                  </Col>
                  <Col md="6">
                    <FormGroup>
                      <Label>비고</Label>
                      <Input 
                        type="textarea" 
                        placeholder="특이사항을 입력하세요"  
                        rows="6" 
                        name="text"
                        onChange={onChangeHandler} 
                        value={info?.text}
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

export default InspectionRegist;
