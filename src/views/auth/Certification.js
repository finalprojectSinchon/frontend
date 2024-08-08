import React from 'react';
import {
    Button,
    Label,
    FormGroup,
    CardTitle,
    Container,
    Row,
    Col,
    Card,
    CardBody,
} from 'reactstrap';
import { useNavigate } from 'react-router-dom';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import AuthLogo from '../../layouts/logo/AuthLogo';
import { ReactComponent as LeftBg } from '../../assets/images/bg/login-bgleft.svg';
import { ReactComponent as RightBg } from '../../assets/images/bg/login-bg-right.svg';
import img1 from '../../assets/images/users/user4.jpg';
import axios from "axios";
import {useDispatch} from "react-redux";
import {addAuthCode} from "src/store/apps/login/userSlice.js";
import api from "src/store/apps/airplane/api.js";

const Certification = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const initialValues = {
        password: '',
    };

    const validationSchema = Yup.object().shape({
        password: Yup.string()
            .min(6, '인증코드 6자리를 입력해주세요')
            .required('인증코드를 입력해주세요'),
    });

    const submitHandler = (fields) => {
        api.post("/api/v1/auth",fields)
            .then(res => {
                dispatch(addAuthCode(fields))
                navigate('/auth/registerformik')
            })
            .catch(err => {
                alert('인증코드가 일치하지 않습니다.')
                console.log(err);
            })
    }

    return (
        <div className="loginBox">
            <LeftBg className="position-absolute left bottom-0" />
            <RightBg className="position-absolute end-0 top" />
            <Container fluid className="h-100">
                <Row className="justify-content-center align-items-center h-100">
                    <Col lg="12" className="loginContainer">
                        <AuthLogo />
                        <Card>
                            <CardBody className="p-4 m-1">
                                <div className="text-center">
                                    <img src={img1} alt="avatar" className="rounded-circle" width="95" />
                                    <CardTitle tag="h4" className="mt-2">
                                        Welcome !
                                    </CardTitle>
                                </div>
                                <Formik
                                    initialValues={initialValues}
                                    validationSchema={validationSchema}
                                    onSubmit={submitHandler}
                                    render={({ errors, touched }) => (
                                        <Form className="mt-3">
                                            <FormGroup>
                                                <Label htmlFor="Code">인증코드를 입력하세요</Label>
                                                <Field
                                                    name="password"
                                                    type="text"
                                                    className={`form-control${
                                                        errors.password && touched.password ? ' is-invalid' : ''
                                                    }`}
                                                />
                                                <ErrorMessage
                                                    name="password"
                                                    component="div"
                                                    className="invalid-feedback"
                                                />
                                            </FormGroup>
                                            <FormGroup>
                                                <Button type="submit" color="info" block className="me-2">
                                                    Login
                                                </Button>
                                            </FormGroup>
                                        </Form>
                                    )}
                                />
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </div>
    );
};

export default Certification;
