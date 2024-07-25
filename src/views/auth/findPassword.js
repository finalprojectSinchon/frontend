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
import axios from 'axios';
import AuthLogo from '../../layouts/logo/AuthLogo';
import { ReactComponent as LeftBg } from '../../assets/images/bg/login-bgleft.svg';
import { ReactComponent as RightBg } from '../../assets/images/bg/login-bg-right.svg';

const FindPassword = () => {
    const navigate = useNavigate();

    // 로컬스토리지에서 userId 가져오기
    const storedUserId = localStorage.getItem('userId') || '';

    const initialValues = {
        userEmail: '',
        userId: storedUserId,
        userPhone: ''
    };

    const validationSchema = Yup.object().shape({
        userEmail: Yup.string().email('Email is invalid'),
        userId: Yup.string().required('Username is required'),
        userPhone: Yup.string()
    });

    const handleSubmit = (fields) => {
        axios.post('http://localhost:8080/account/newPassword', fields)

            .then(response => {
                alert('성공!! )\n\n' + JSON.stringify(response.data, null, 4));
                navigate('/');
            })
            .catch(error => {
                alert('오류!! )\n\n' + JSON.stringify(error.response.data, null, 4));
            });
        console.log(fields);
    };

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
                                    <CardTitle tag="h4" className="mt-2">
                                        비밀번호 찾기
                                    </CardTitle>
                                </div>
                                <Formik
                                    initialValues={initialValues}
                                    validationSchema={validationSchema}
                                    onSubmit={handleSubmit}
                                    render={({ errors, touched }) => (
                                        <Form className="mt-3">
                                            <FormGroup>
                                                <Label htmlFor="userId">ID</Label>
                                                <Field
                                                    name="userId"
                                                    type="text"
                                                    className={`form-control${
                                                        errors.userId && touched.userId ? ' is-invalid' : ''
                                                    }`}
                                                    readOnly
                                                />
                                                <ErrorMessage name="userId" component="div" className="invalid-feedback" />
                                            </FormGroup>
                                            <FormGroup>
                                                <Label htmlFor="userEmail">Email</Label>
                                                <Field
                                                    name="userEmail"
                                                    type="text"
                                                    placeholder='이메일을 입력해주세요.'
                                                    className={`form-control${
                                                        errors.userEmail && touched.userEmail ? ' is-invalid' : ''
                                                    }`}
                                                />
                                                <ErrorMessage name="email" component="div" className="invalid-feedback" />
                                            </FormGroup>
                                            <FormGroup>
                                                <Label htmlFor="userPhone">전화번호</Label>
                                                <Field
                                                    name="userPhone"
                                                    type="text"
                                                    placeholder='전화번호를 입력해주세요.'
                                                    className={`form-control${
                                                        errors.userPhone && touched.userPhone ? ' is-invalid' : ''
                                                    }`}
                                                />
                                                <ErrorMessage name="email" component="div" className="invalid-feedback" />
                                            </FormGroup>
                                            <FormGroup>
                                                <Button type="submit" color="info" block className="me-2">
                                                    확인
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

export default FindPassword;
