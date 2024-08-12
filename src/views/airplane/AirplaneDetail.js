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
import { useParams,useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAirplane, modifyAirplane, softdeleteAirplane } from '../../store/apps/airplane/airplaneSlice';
import CustomModal  from "src/views/CustomModal.js";


const AirplaneDetail = () => {

  const [modal, setModal] = useState(false);
  const toggleModal = () => setModal(!modal);
  const [type,setType] = useState('');
  const [content,setContent] = useState('');

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { airplaneCode } = useParams();


  const airplaneDetail = useSelector((state) => state.airplanes.airplaneDetail);
  const userInfo = useSelector(state => state.userInfo);
  const [airplaneInfo, setAirplaneInfo] = useState({});
  const [readOnly, setReadOnly] = useState(true);

  const onChangeHandler = e => {
    setAirplaneInfo({
      ...airplaneInfo,
      [e.target.name]: e.target.value
    });
  };

  const onClickHandler = () => {
    setType('삭제');
    setContent('비행기가 삭제되었습니다.');
    toggleModal();

    setTimeout(() => {
      dispatch(softdeleteAirplane({ airplaneCode }));
      navigate('/airplane');
      window.location.reload();
    }, 3000);
  }

  useEffect(() => {
    dispatch(fetchAirplane({ airplaneCode }));
  }, [dispatch, airplaneCode]);

  useEffect(() => {
    if (airplaneDetail && airplaneDetail.data) {
        setAirplaneInfo(airplaneDetail.data.airplane);
    }
  }, [airplaneDetail]);



  const handleEditClick = () => {
    if (readOnly) {
      setReadOnly(false);
    } else {
      setReadOnly(true);
      dispatch(modifyAirplane({ airplaneCode, airplaneInfo }));
      setType('수정');
      setContent('비행기 수정 승인 요청되었습니다.')
      toggleModal();
    }
  };




  return (
    <div >
      <BreadCrumbs />
      <Row>
        <Col md="12">
          <Card>
            <CardBody className="bg-light">
              <CardTitle tag="h4" className="mb-0">
                비행기
              </CardTitle>
            </CardBody>
            <CardBody>
              <Form>
                <Row>
                  <Col md="6">
                    <FormGroup>
                      <Label>Airplane Code</Label>
                      <Input type="text" value={airplaneInfo.airplaneCode } name='airplaneCode' onChange={onChangeHandler} readOnly={readOnly} />
                    </FormGroup>
                  </Col>
                  <Col md="6">
                    <FormGroup>
                      <Label>Airport</Label>
                      <Input type="text" name="airport" value={airplaneInfo.airport } onChange={onChangeHandler} disabled={readOnly} />
                    </FormGroup>
                  </Col>
                </Row>
                <Row>
                  <Col md="6">
                    <FormGroup>
                      <Label>수화물 수취대</Label>
                      <Input type="text" name="carousel" value={airplaneInfo.carousel } onChange={onChangeHandler} disabled={readOnly}/>
                    </FormGroup>
                  </Col>
                  <Col md="6">
                    <FormGroup>
                      <Label>체크인 카운터</Label>
                      <Input type="text" name='chkinrange' value={airplaneInfo.chkinrange } onChange={onChangeHandler} disabled={readOnly} />
                    </FormGroup>
                  </Col>
                </Row>
                <Row>
                  <Col md="6">
                    <FormGroup>
                      <Label>편명</Label>
                      <Input type="text" name='flightId' value={airplaneInfo.flightId} onChange={onChangeHandler} disabled={readOnly} />
                    </FormGroup>
                  </Col>
                  <Col md="6">
                    <FormGroup>
                      <Label>탑승구</Label>
                      <Input type="text" value={airplaneInfo.gatenumber } name="gatenumber" onChange={onChangeHandler} disabled={readOnly} />
                    </FormGroup>
                  </Col>
                </Row>
                <Row>
                  <Col md="6">
                    <FormGroup>
                      <Label>운항 상태</Label>
                      <Input type="remark" value={airplaneInfo.remark } name='scheduleDateTime' onChange={onChangeHandler} disabled={readOnly}/>
                    </FormGroup>
                  </Col>
                  <Col md="6">
                    <FormGroup>
                      <Label>예정 일자</Label>
                      <Input type="date"  value={airplaneInfo.scheduleDateTime }  name='scheduleDateTime' onChange={onChangeHandler} disabled={readOnly} />
                    </FormGroup>
                  </Col>
                </Row>
                <Row>
                  <Col md="6">
                    <FormGroup>
                      <Label>터미널 구분</Label>
                      <Input type="text" value={airplaneInfo.terminalid} name='terminalid' onChange={onChangeHandler}  readOnly={readOnly} />
                    </FormGroup>
                  </Col>
                  <Col md="6">
                    <FormGroup>
                      <Label>비고</Label>
                      <Input type="textarea" rows="6" value={airplaneInfo.note} name="note" onChange={onChangeHandler} disabled={readOnly} />
                    </FormGroup>
                  </Col>
                </Row>

              </Form>
            </CardBody>
          </Card>
        </Col>
      </Row>
      <CustomModal  isOpen={modal} toggle={toggleModal} type = {type} content={content}/>
    </div>
  );
};


export default AirplaneDetail;
