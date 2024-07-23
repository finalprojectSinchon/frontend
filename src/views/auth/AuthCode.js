import React, {useState} from 'react';
import {
    Card,
    CardBody,
    Col,
    Row,
    Button, Alert,
} from 'reactstrap';
import BreadCrumbs from '../../layouts/breadcrumbs/BreadCrumbs';
import api from "src/store/apps/airplane/api.js";

const AuthCode = () => {

    const [authInfo, setAuthInfo] = useState()
    const [disabled, setDisabled] = useState(false)
    console.log(authInfo)

    const onClickHandler = () => {
        api.get("/api/v1/admin/code")
            .then(res => res.data)
            .then(data => {
                setAuthInfo(data.data);
                setDisabled(true)
            })
            .catch(err => {
                alert('다시 시도해주세요')
                console.error('error',err);
            })
    }

    return (
        <>
            <BreadCrumbs />

                <CardBody className="p-4">
                    <Row>
                        <Col lg="4">
                            <Card>
                                <CardBody className="profile-card pt-4 d-flex flex-column align-items-center">
                                    <Button color="primary" onClick={onClickHandler} disabled={disabled}>인증코드 발급</Button>
                                    {authInfo ?
                                    <Alert color="info" className="mt-3">인증코드는 {authInfo.authCode} 입니다.</Alert>
                                    : null}
                                </CardBody>
                            </Card>
                        </Col>
                        <Col lg="8">
                            <Card>
                                <CardBody className="pt-3">

                                </CardBody>
                            </Card>
                        </Col>
                    </Row>
                </CardBody>

        </>
    );
};

export default AuthCode;
