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
  import { createStorage } from '../../store/apps/storage/storageSlice';
import CustomModal  from "src/views/CustomModal.js";


const StorageRegist = () => {

    const [modal, setModal] = useState(false);
    const toggleModal = () => setModal(!modal);
    const [type,setType] = useState('');
    const [content, setContent] = useState('');

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [storageInfo, setStorageInfo] = useState({
        type: '',
        status: '',
        location: '',
        category: '',
        department: '',
        manager: '',
        period: '',
        date: '',
    });

    const onChangeHandler = (e) => {
        setStorageInfo({
            ...storageInfo,
            [e.target.name]: e.target.value,
        });
    };

    const handleRegistClick = () => {
        setType('등록');
        setContent('수하물 수취대 등록 승인을 요청했습니다.')
        toggleModal();
        setTimeout(() => {
        dispatch(createStorage(storageInfo));
        navigate('/storage');
            window.location.reload();
        }, 3000);
    };


    return (
        <div>
            <BreadCrumbs/>
            <Row>
                <Col md="12">
                    <Card>
                        <CardBody className="bg-light">
                            <CardTitle tag="h4" className="mb-0">
                                창고 등록
                            </CardTitle>
                        </CardBody>
                        <CardBody>
                            <Form>
                                <Row>
                                    <Col md="6">
                                    <FormGroup>
                                        <Label>창고타입</Label>
                                        <Input type="select" name='type' onChange={onChangeHandler}>
                                            <option name="타입A">타입A</option>
                                            <option name="타입B">타입B</option>
                                            <option name="타입C">타입C</option>
                                        </Input>
                                    </FormGroup>
                                    </Col>
                                    <Col>
                                    <FormGroup>
                                        <Label>Status</Label>
                                        <Input type="select" name="status" onChange={onChangeHandler}>
                                            <option name="정상">정상</option>
                                            <option name="점검중">점검중</option>
                                            <option name-="중단">중단</option>
                                        </Input>
                                    </FormGroup>
                                    </Col>
                                </Row>
                                <Row>
                                <Col md="6">
                                    <FormGroup>
                                        <Label>창고위치</Label>
                                        <Input type="text" name='location' onChange={onChangeHandler}
                                        />
                                    </FormGroup>
                                </Col>
                                <Col md="6">
                                    <FormGroup>
                                        <Label>대분류</Label>
                                        <Input type="text" name='category' onChange={onChangeHandler}
                                        />
                                    </FormGroup>
                                </Col>
                            </Row>
                            <Row>
                                <Col md="6">
                                    <FormGroup>
                                        <Label>담당부서</Label>
                                        <Input type="text" name='department' onChange={onChangeHandler}
                                        />
                                    </FormGroup>
                                </Col>
                                <Col md="6">
                                    <FormGroup>
                                        <Label>담당자</Label>
                                        <Input type="text" name='manager' onChange={onChangeHandler}
                                        />
                                    </FormGroup>
                                </Col>
                            </Row>
                            <Row>
                                <Col md="6">
                                    <FormGroup>
                                        <Label>사용기간</Label>
                                        <Input type="text" name='period' onChange={onChangeHandler}
                                        />
                                    </FormGroup>
                                </Col>
                                <Col md="6">
                                    <FormGroup>
                                        <Label>마지막 점검날짜</Label>
                                        <Input type="date" name='date' onChange={onChangeHandler}
                                        />
                                    </FormGroup>
                                </Col>
                            </Row>
                                <Col className="d-flex justify-content-center">
                                    <Button className="m-2" color="primary" onClick={handleRegistClick}>
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

  export default StorageRegist;