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

const StorageDetail = () => {

    const { storageCode } = useParams();
    console.log("fdfdfd", storageCode)

    const navigate = useNavigate();

    const [storageInfo, setstorageInfo] = useState();
    const [readOnly, setreadOnly] = useState(true);

    console.log("qwer", storageInfo);
    console.log(readOnly);


useEffect(() => {
    axios.get(`http://localhost:8080/api/v1/storage/${storageCode}`, {
        headers:{
            Authorization: Cookies.get('token')
        }
    })
    .then(res => res.data)
    .then(data => {
        console.log(data)
        setstorageInfo(data.data)
    })

}, []);

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
                        <form>
                            <Row>
                                <Col md="6">
                                    <FormGroup>
                                        <Label>창고타입</Label>
                                        <Input type="text" placeholder="창고 타입을 입력하세요" name='storageType' readOnly={readOnly}
                                        value={storageInfo ? storageInfo.storageCode : '로딩중...'}/>
                                    </FormGroup>
                                </Col>
                                <Col md="6">
                                    <FormGroup>
                                        <Label>Status</Label>
                                        <Input>
                                            <option name="정상">정상</option>
                                            <option name="점검중">점검중</option>
                                            <option name-="중단">중단</option>
                                        </Input>
                                        <FormText className="muted">This field has error.</FormText>
                                    </FormGroup>
                                </Col>
                                <Col md="6">
                                    <FormGroup>
                                        <Label>창고위치</Label>
                                        <Input type="text" placeholder="창고 위치를 입력하세요" name='storageType'  readOnly={readOnly}
                                        value={storageInfo ? storageInfo.storageCode : '로딩중...'}/>
                                    </FormGroup>
                                </Col>
                                
                            </Row>
                            <Row>
                                <Col md="6">
                                    <FormGroup>
                                        <Label>담당자</Label>
                                        <Input type="text" name='storageManager' placeholder="담당자를 입력하세요" readOnly={readOnly}
                                            value={storageInfo ? storageInfo.storageManager : '로딩중...' }/>
                                    </FormGroup>
                                </Col>
                            </Row>
                        </form>
                    </CardBody>
                </Card>
            </Col>
        </Row>

    </div>
)

};
export default StorageDetail