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
  

  const StorageRegist = () => {
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
        dispatch(createStorage(storageInfo));
        navigate('/storage');
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
                                        <Input type="text" name='type' onChange={onChangeHandler}
                                        />
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
                                        <Input type="text" name='date' onChange={onChangeHandler}
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
        </div>
    );
  };

  export default StorageRegist;