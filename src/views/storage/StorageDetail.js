import axios from 'axios';
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
import Cookies from 'js-cookie';
import api from '../../store/apps/airplane/api';
import ManagerDragAndDrop from "src/components/apps/managerDargAndDrop/ManagerDragAndDrop.js";

const StorageDetail = () => {

    const { storageCode } = useParams();

    const navigate = useNavigate();

    const [storageInfo, setstorageInfo] = useState();
    const [readOnly, setreadOnly] = useState(true);

    const [manager, setManager] = useState();
    const [airportType, setAirportType] = useState()


    useEffect(() => {

        api.post('/api/v1/managers',{
            airportType : "storage",
            airportCode : storageCode
        })
            .then(res => res.data)
            .then(data => {
                setManager(data.data)
            })
    }, [storageInfo]);


    useEffect(() => {
            axios.get(`http://localhost:8080/api/v1/storage/${storageCode}`, {
                headers:{
                    Authorization: Cookies.get('token')
                }
            })
            .then(res => res.data)
            .then(data => {
                setstorageInfo(data.data)
            })
        setAirportType('storage')
        }, []);

// 상세조회
const onChangeHandler = e => {
    setstorageInfo({
        ...storageInfo,
        [e.target.name] : e.target.value
    })
}

// 수정
const onClickSave = () => {
    axios.put(`http://localhost:8080/api/v1/storage/${storageCode}`, storageInfo, {
        headers:{
            Authorization: Cookies.get('token')
        }
    }, )
    .then(res => {
        alert('수정에 성공하였습니다.')
    })
    .catch(error => {
        console.error('에러 : ', error);
    })
}


// 삭제
const onClickDelete = () => {
    api.put(`/api/v1/storage/${storageCode}/delete`)
    .then(res => {
        alert('삭제에 성공하였습니다.')
        navigate('/storage')
    })
    .catch(error => {
        console.error(error)
    })

}

return (
    <div>
        <BreadCrumbs />
        <Row>
            <Col>
                <Card>
                    <CardBody className="bg-light">
                        <CardTitle tag="h2" className="mb-0">
                            Storage
                        </CardTitle>
                    </CardBody>
                    <CardBody>
                        <Form>
                            <Row>
                                <Col md="6">
                                    <FormGroup>
                                        <Label>창고타입</Label>
                                        <Input type="text" placeholder="창고 타입을 입력하세요" name='storageType' onChange={onChangeHandler} readOnly={readOnly}
                                        value={storageInfo ? storageInfo.storageType : '로딩중...'}/>
                                    </FormGroup>
                                </Col>
                                <Col md="6">
                                    <FormGroup>
                                        <Label>Status</Label>
                                        <Input type="select" name="storageStatus" onChange={onChangeHandler} disabled={readOnly}>
                                            <option name="정상">정상</option>
                                            <option name="점검중">점검중</option>
                                            <option name-="중단">중단</option>
                                        </Input>
                                        <FormText className="muted">This field has error.</FormText>
                                    </FormGroup>
                                </Col>
                            </Row>
                            <Row>
                                <Col md="6">
                                    <FormGroup>
                                        <Label>창고위치</Label>
                                        <Input type="text" placeholder="창고위치를 입력하세요" name='storageLocation' onChange={onChangeHandler} readOnly={readOnly}
                                        value={storageInfo ? storageInfo.storageLocation : '로딩중...'}/>
                                    </FormGroup>
                                </Col>
                                <Col md="6">
                                    <FormGroup>
                                        <Label>대분류</Label>
                                        <Input type="text"  placeholder="대분류를 입력하세요" name='category' onChange={onChangeHandler} readOnly={readOnly}
                                        value={storageInfo ? storageInfo.category : '로딩중...' }/>
                                    </FormGroup>
                                </Col>
                            </Row>
                            <Row>
                                <Col md="6">
                                    <FormGroup>
                                        <Label>담당부서</Label>
                                        <Input type="text" placeholder="담당부서를 입력하세요" name='department'
                                               onChange={onChangeHandler} readOnly={readOnly}
                                               value={storageInfo ? storageInfo.department : '로딩중...'}/>
                                    </FormGroup>
                                </Col>
                                <Col md="6">
                                    <FormGroup>
                                        <Label>담당자</Label>
                                        <Input type="text" placeholder="담당자를 입력하세요" name='manager' onChange={onChangeHandler} readOnly={readOnly}
                                            value={storageInfo ? storageInfo.manager : '로딩중...' }/>
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
                                {manager ? <ManagerDragAndDrop AllUser={manager.AllUser} Manager={manager.Manager} airportCode={storageCode}
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
)

};
export default StorageDetail