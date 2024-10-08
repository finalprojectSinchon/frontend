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
import { useNavigate, useParams } from 'react-router-dom';
import api from '../../store/apps/airplane/api';
import ManagerDragAndDrop from "src/components/apps/managerDargAndDrop/ManagerDragAndDrop.js";
import CustomModal  from "src/views/CustomModal.js";
import {useSelector} from "react-redux";


const AirportStoreDetail = () => {

  const [modal, setModal] = useState(false);
  const toggleModal = () => setModal(!modal);
  const [type,setType] = useState('');
  const [content, setContent] = useState('');

  const { storeId } = useParams();

  const navigate = useNavigate();

  const [storeInfo, setstoreInfo] = useState();
  const [readOnly, setreadOnly] = useState(true);
  const [manager, setManager] = useState([])
  const [airportType, setAirportType] = useState()
  const userInfo = useSelector(state => state.userInfo)



  useEffect(() => {
    api.get(`/api/v1/store/${storeId}`)
    .then(res=> res.data)
    .then(data => {
      setstoreInfo(data.data)
    })
    .catch(error => {
        navigate('auth/404')
    })
    setAirportType('store')
  }, []);


  useEffect(() => {

    api.post('/api/v1/managers',{
      airportType : "store",
      airportCode : storeId
    })
        .then(res => res.data)
        .then(data => {
          setManager(data.data)
        })

  }, [storeInfo]);


  const onChangeHandler = e => {
    setstoreInfo({
        ...storeInfo,
      approvalRequester:userInfo,
        [e.target.name] : e.target.value
    })
  }


  //ytyty
  const onClickSave = () => {
    api.put(`/api/v1/store/${storeId}`,storeInfo)
    .then(res => {
      setType('수정');
      setContent('해당 점포가 수정 승인 요청되었습니다.')
      toggleModal();
      setreadOnly(true);
    })
    .catch(error => {
        console.error('에러 : ', error);
    })
  }

  const onClickDelete = () => {
    api.put(`/api/v1/store/${storeId}/delete`)
    .then(res => {
      setType('삭제');
      setContent('점포가 삭제되었습니다.');
      toggleModal();
      setTimeout(() => {
        navigate('/airport/store')
        window.location.reload();
      }, 3000);
    })
    .catch(error => {
        console.error('에러 : ', error);
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
                      value={storeInfo ? storeInfo.storeName :  '로딩중...' } />
                    </FormGroup>
                  </Col>
                  <Col md="6">
                    <FormGroup>
                      <Label>Status</Label>
                      <Input type="select" name="status" onChange={onChangeHandler} disabled={readOnly}>
                        <option name="정상">정상</option>
                        <option name="점검중">점검중</option>
                        <option name="중단">중단</option>
                      </Input>
                    </FormGroup>
                  </Col>
                </Row>
                <Row>
                  <Col md="6">
                    <FormGroup>
                      <Label>type</Label>
                      <Input type="select" name='type' placeholder="12n" onChange={onChangeHandler} disabled={readOnly}>
                        <option name='점포'>점포</option>
                        <option name='안내소'>안내소</option>
                      </Input>
                    </FormGroup>
                  </Col>
                  <Col md="6">
                    <FormGroup>
                      <Label>위치</Label>
                      <Input type="text" name="storeWork" placeholder='주요업무를 입력하세요' readOnly='true'
                        onChange={onChangeHandler}  value={storeInfo ? storeInfo.storeLocation :  '로딩중...' }/>
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

                    <FormGroup>
                      <Label>비고</Label>
                      <Input type="textarea" placeholder="특이사항을 입력하세요"  rows="6" name='storeExtra' onChange={onChangeHandler} readOnly={readOnly} />
                    </FormGroup>

                  </Col>
                  <Col md="6">
                    <Row className="mb-3 mt-3">
                      <Col md="6" className="d-flex justify-content-start">
                        <h2 className="ms-5 ps-4">전체 직원</h2>
                      </Col>
                      <Col md="6" className="d-flex justify-content-end">
                        <h2 className="me-5 pe-5">담당 직원</h2>
                      </Col>
                    </Row>
                    <div className='mb-4'>
                      {manager ? <ManagerDragAndDrop AllUser={manager.AllUser} Manager={manager.Manager} airportCode={storeId}
                                                      airportType={airportType} isEditMode={readOnly}/>
                      : <h3>loading</h3> }

                    </div>
                  </Col>
                </Row>
                <Row>

                </Row>
                <Col className="d-flex justify-content-center align-items-center">
                <div className="d-flex">
                  {userInfo.userRole === "ROLE_ADMIN" ?   <Button className="me-2" color="danger" onClick={onClickDelete}>
                    삭제하기
                  </Button> : null }
                    {readOnly ? (
                    <Button className="btn" color="primary" onClick={() => setreadOnly(false)}>
                        수정하기
                    </Button>
                    ) : (
                    <Button color="success" onClick={onClickSave}>
                        저장하기
                    </Button>
                    )}
                </div>
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

export default AirportStoreDetail;