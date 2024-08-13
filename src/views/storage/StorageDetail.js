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
import api from '../../store/apps/airplane/api';
import ManagerDragAndDrop from "src/components/apps/managerDargAndDrop/ManagerDragAndDrop.js";
import Location from "src/components/location/Location.js";
import CustomModal  from "src/views/CustomModal.js";
import {useSelector} from "react-redux";



const StorageDetail = () => {

    const [modal, setModal] = useState(false);
    const toggleModal = () => setModal(!modal);
    const [type,setType] = useState('');
    const [content, setContent] = useState('');

    const { storageCode } = useParams();

    const navigate = useNavigate();

    const [storageInfo, setstorageInfo] = useState();
    const [readOnly, setreadOnly] = useState(true);

    const [manager, setManager] = useState();
    const [airportType, setAirportType] = useState()
    const [location, setLocation] = useState()
    const [isModify, setIsModify] = useState(false);
    const [locationState, setLocationState] = useState("")

    const userInfo = useSelector((state) => state.userInfo);

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
        api.get(`/api/v1/location/storage/${storageCode}`)
            .then(res => res.data)
            .then(data => {
                setLocation(data.data)
            })
            .catch(err => console.log(err));

    }, [airportType]);


    useEffect(() => {
            api.get(`/api/v1/storage/${storageCode}`)
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
        approvalRequester:userInfo,
        [e.target.name] : e.target.value
    })
}


    useEffect(() => {
        setstorageInfo({
            ...storageInfo,
            location : locationState
        })
    }, [locationState]);
// 수정
const onClickSave = () => {
    api.put(`/api/v1/storage/${storageCode}`, storageInfo)
    .then(res => {
        setIsModify(true);
        setType('수정');
        setContent('해당 창고를 수정 승인을 요청했습니다..')
        toggleModal();
        return res.data;
    })
    .catch(error => {
        console.error('에러 : ', error);
    })
}


// 삭제
const onClickDelete = () => {
    api.put(`/api/v1/storage/${storageCode}/delete`)
    .then(res => {
        setType('삭제');
        setContent('해당 체크인카운터가 삭제되었습니다.');
        toggleModal();

        setTimeout(() => {
            navigate('/storage')
            window.location.reload();
        }, 3000);
    })
    .catch(error => {
        console.error(error)
    })

}

return (
    <div>
        <BreadCrumbs />
        <div>
            <Button color="dark" onClick={() => navigate('/inspection/inspectionRegist', { state: { info: storageInfo } })}>
            안전 점검 등록
            </Button>
                    
            </div>
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
                                        value={storageInfo ? storageInfo.type : '로딩중...'}/>
                                    </FormGroup>
                                </Col>
                                <Col md="6">
                                    <FormGroup>
                                        <Label>Status</Label>
                                        <Input type="select" name="status" onChange={onChangeHandler} disabled={readOnly}>
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
                                        <Label>대분류</Label>
                                        <Input type="text"  placeholder="대분류를 입력하세요"
                                               name='category' onChange={onChangeHandler} readOnly={readOnly}
                                               value={storageInfo ? storageInfo.category : '로딩중...' }/>
                                    </FormGroup>
                                </Col>
                                <Col md="6">
                                    {readOnly ? <> <Label>위치</Label>
                                            <Input type="text" placeholder="창고 위치를 입력하세요" name='facilitiesName' onChange={onChangeHandler} readOnly={readOnly}
                                                   value={location ? location.region + " " + location.floor + " " + location.location : '위치 데이터가 없습니다.'  } /> </> :
                                        <Location setLocationState={setLocationState}/>
                                    }
                                </Col>
                            </Row>
                            <Row>
                                <Col md="6">
                                    <FormGroup>
                                        <Label>담당부서</Label>
                                        <Input type="text" placeholder="담당부서를 입력하세요" 
                                        name='department'
                                                onChange={onChangeHandler} readOnly={readOnly}
                                                value={storageInfo ? storageInfo.department : '로딩중...'}/>
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
                                    {userInfo.userRole === "ROLE_ADMIN" ?        <Button className="me-2" color="danger" onClick={onClickDelete}>
                                        삭제하기
                                    </Button> : null}
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
)

};
export default StorageDetail