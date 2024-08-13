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
import { createFacilities } from '../../store/apps/facilities/facilitiesSlice';
import CustomModal from "src/views/CustomModal.js";
import Location from "src/components/location/Location.js";


const FacilitiesRegist = () => {

    const [modal, setModal] = useState(false);
    const toggleModal = () => setModal(!modal);
    const [type, setType] = useState('');
    const [content, setContent] = useState('');

    const userInfo = useSelector((state) => state.userInfo);

    const [locationState, setLocationState] = useState('');

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [facilitiesInfo, setFacilitiesInfo] = useState({
        facilitiesName: '',
        facilitiesStatus: '',
        facilitiesClass: '',
        location: '',
        facilitiesType: '',
        approvalRequester: userInfo,
    });

    useEffect(() => {
        setFacilitiesInfo({
            ...facilitiesInfo,
            location: locationState
        })
    }, [locationState]);

    const onChangeHandler = (e) => {
        setFacilitiesInfo({
            ...facilitiesInfo,
            [e.target.name]: e.target.value,
        });
    };

    const handleRegistClick = () => {
        setType('등록');
        setContent('편의시설 등록 승인을 요청했습니다.');
        toggleModal();

        setTimeout(() => {
            dispatch(createFacilities({ facilitiesInfo }));
            navigate('/facilities');
            window.location.reload();
        }, 3000);
    };


    const renderFacilitiesTypeOptions = () => {
        if (facilitiesInfo.facilitiesClass === '편의시설') {
            return (
                <>
                    <option value="">분류를 선택해주세요</option>
                    <option value="락커">락커</option>
                    <option value="흡연실">흡연실</option>
                    <option value="샤워실">샤워실</option>
                    <option value="남자화장실">남자화장실</option>
                    <option value="여자화장실">여자화장실</option>
                </>
            );
        } else if (facilitiesInfo.facilitiesClass === '이동수단') {
            return (
                <>
                    <option value="">분류를 선택해주세요</option>
                    <option value="엘리베이터">엘리베이터</option>
                    <option value="에스컬레이터">에스컬레이터</option>
                    <option value="무빙워크">무빙워크</option>
                </>
            );
        } else {
            return <option>취급품목을 입력하세요</option>;
        }
    };

    return (
        <div>
            <BreadCrumbs />
            <Row>
                <Card>
                    <CardBody>
                        <CardTitle tag="h4" className="mb-0">
                            편의시설 등록
                        </CardTitle>
                    </CardBody>
                    <CardBody>
                        <Form>
                            <Row>
                                <Col md="6">
                                    <FormGroup>
                                        <Label>시설물</Label>
                                        <Input type="text" name="facilitiesName" onChange={onChangeHandler} />
                                    </FormGroup>
                                </Col>
                                <Col md="6">
                                    <FormGroup>
                                        <Label>운행 상태</Label>
                                        <Input type="select" name="facilitiesStatus" onChange={onChangeHandler}>
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
                                        <Label>Type</Label>
                                        <Input
                                            type="select"
                                            name="facilitiesClass"
                                            value={facilitiesInfo.facilitiesClass}
                                            onChange={onChangeHandler}
                                        >
                                            <option value="">타입을 지정해주세요</option>
                                            <option value="편의시설">편의시설</option>
                                            <option value="이동수단">이동수단</option>
                                        </Input>
                                    </FormGroup>
                                </Col>
                                <Col md="6">
                                    <FormGroup>
                                        <Label>분류</Label>
                                        <Input
                                            type="select"
                                            name="facilitiesType"
                                            onChange={onChangeHandler}
                                            value={facilitiesInfo.facilitiesType}
                                        >
                                            {renderFacilitiesTypeOptions()}
                                        </Input>
                                    </FormGroup>
                                </Col>
                                <Col md="6">
                                    <Location setLocationState={setLocationState} />
                                </Col>
                                <Col md="6">
                                    <FormGroup>
                                        <Label>비고</Label>
                                        <Input type="textarea" rows="6" name="remark" />
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
            </Row>
            <CustomModal isOpen={modal} toggle={toggleModal} type={type} content={content} />
        </div>
    );
};

export default FacilitiesRegist;
