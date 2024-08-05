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
import { useDispatch, useSelector } from 'react-redux';
import api from '../../store/apps/airplane/api';
import ManagerDragAndDrop from "src/components/apps/managerDargAndDrop/ManagerDragAndDrop.js";
import Location from "src/components/location/Location.js";

const FacilitiesDetail = () => {

    const { facilitiesCode } = useParams();

    const navigate = useNavigate();

    const [facilitiesInfo, setfacilitiesInfo] = useState();
    const [readOnly, setreadOnly] = useState(true);
    const [manager, setManager] = useState([]);
    const [airportType, setAirportType] = useState()

    const [isModify, setIsModify] = useState(false);
    const [location, setLocation] = useState()

    useEffect(() => {

        api.post('/api/v1/managers',{
            airportType : "facilities",
            airportCode : facilitiesCode
        })
            .then(res => res.data)
            .then(data => {
                setManager(data.data)
            })
    }, [facilitiesInfo]);

    useEffect(() =>{
        api.get(`/api/v1/facilities/${facilitiesCode}`)
            .then(res => res.data)
            .then(data => {
                setfacilitiesInfo(data.data);
            })
        setAirportType('facilities')
    },[]);

    useEffect(() => {
        api.get(`/api/v1/location/facilities/${facilitiesCode}`)
            .then(res => res.data)
            .then(data => {
                setLocation(data.data)
            })
            .catch(err => console.log(err));

    }, [airportType]);

    const onClickDelete = () => {
        api.put(`/api/v1/facilities/${facilitiesCode}/delete`)
            .then(res => {
                alert('삭제에 성공하였습니다.')
                navigate('/facilities')
            })
            .catch(error => {
                console.error('에러 : ', error);
            })
    }
    const onChangeHandler = e => {
        setfacilitiesInfo({
            ...facilitiesInfo,
            [e.target.name] : e.target.value
        })
    }

    const onClickSave = () => {
        api.put(`/api/v1/facilities/${facilitiesCode}`,facilitiesInfo)
            .then(res => {
                setIsModify(true);
                return res.data
            })
            .catch(error => {
                console.error('에러 : ',error);
            })
    }


    return (
        <div>
            <BreadCrumbs />
            <div>
            <Button color="dark" onClick={() => navigate('/inspection/inspectionRegist')}>
            안전 점검 등록
            </Button>
            </div>
            <Row>
                <Col md="12">
                    <Card>
                        <CardBody className="bg-light">
                            <CardTitle tag="h2" className="mb-0">
                                편의시설
                            </CardTitle>
                        </CardBody>
                        <CardBody>
                            <Form>
                                <Row>
                                    <Col md="6">
                                        <FormGroup>
                                            <Label>시설물</Label>
                                            <Input type="text" placeholder="시설물 이름을 입력하세요" name='facilitiesName' onChange={onChangeHandler} readOnly={readOnly}
                                                    value={facilitiesInfo ? facilitiesInfo.facilitiesName : '로딩중,.,.'  } />
                                        </FormGroup>
                                    </Col>
                                    <Col md="6">
                                        <FormGroup>
                                            <Label>운행 상태</Label>
                                            <Input type="select" name="status" disabled={readOnly} onChange={onChangeHandler}>
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
                                            <Input type="select" name='facilitiesClass' 
                                            value={facilitiesInfo ? facilitiesInfo.facilitiesClass : ''} 
                                            placeholder="12n" onChange={onChangeHandler} disabled={readOnly}>
                                                <option name='편의시설'>편의시설</option>
                                                <option name='이동수단'>이동수단</option>
                                            </Input>
                                            <FormText className="muted">Select your type</FormText>
                                        </FormGroup>
                                    </Col>
                                    <Col md="6">
                                        {readOnly ? <> <Label>위치</Label>
                                            <Input type="text" placeholder="시설물 이름을 입력하세요" name='facilitiesName' onChange={onChangeHandler} readOnly={readOnly}
                                                   value={location ? location.region + " " + location.floor + " " + location.location : '위치 데이터가 없습니다.'  } /> </> :
                                            <Location isModify={isModify} setIsModify={setIsModify} setReadOnly={setreadOnly} code={facilitiesCode} type={airportType}/>
                                        }
                                    </Col>
                                </Row>
                                <Row>
                                    <Col md="6">
                                        <FormGroup>
                                            <Label>분류</Label>
                                            <Input type="select" name='type' placeholder='취급품목을 입력하세요'
                                                    disabled={readOnly} onChange={onChangeHandler}
                                                    value={facilitiesInfo ? facilitiesInfo.type : 'asd2'}>
                                                <option name='엘리베이터'>엘리베이터</option>
                                                <option name='에스컬레이터'>에스컬레이터</option>
                                                <option name='무빙워크'>무빙워크</option>
                                                <option name='락커'>락커</option>
                                                <option name='흡연실'>흡연실</option>
                                                <option name='샤워실'>샤워실</option>
                                                <option name='남자화장실'>남자화장실</option>
                                                <option name='여자화장실'>여자화장실</option>
                                            </Input>
                                        </FormGroup>
                                        <Col md="12">
                                            <FormGroup>
                                                <Label>비고</Label>
                                                <Input type="textarea" placeholder="특이사항을 입력하세요"  rows="6" name='' readOnly={readOnly}/>
                                            </FormGroup>
                                        </Col>
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
                                            {manager ? <ManagerDragAndDrop AllUser={manager.AllUser} Manager={manager.Manager} airportCode={facilitiesCode}
                                                                            airportType={airportType} isEditMode={readOnly}/>
                                                : <h3>loading</h3> }

                                        </div>
                                    </Col>
                                </Row>

                                <Col className="d-flex justify-content-center align-items-center">
                                    <div className="d-flex">
                                        <Button className="me-2" color="danger" onClick={onClickDelete}>
                                            삭제하기
                                        </Button>
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
        </div>
    );
};

export default FacilitiesDetail;