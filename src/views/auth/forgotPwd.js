import React, { useState } from 'react';
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
    Modal,
    ModalHeader,
    ModalBody,
    ModalFooter,
} from 'reactstrap';
import { useNavigate } from 'react-router-dom';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axios from 'axios'; // axios 추가
import AuthLogo from '../../layouts/logo/AuthLogo';
import { ReactComponent as LeftBg } from '../../assets/images/bg/login-bgleft.svg';
import { ReactComponent as RightBg } from '../../assets/images/bg/login-bg-right.svg';
import img1 from '../../assets/images/users/user4.jpg';
import api from "src/store/apps/airplane/api.js";

const ForgotPwd = () => {
    const navigate = useNavigate();

    // 모달 상태 관리
    const [modalOpen, setModalOpen] = useState(false);
    const [modalData, setModalData] = useState('');
    const [modalType, setModalType] = useState('success'); // 'success' or 'error'

    const initialValues = {
        email: '',
        uname: '',
    };

    const validationSchema = Yup.object().shape({
        email: Yup.string().email('Email is invalid').required('Email is required'),
        uname: Yup.string().required('Username is required'),
    });

    const handleSubmit = (fields) => {
        api.post('/account/search-id', fields)
            .then(response => {
                const userId = response.data.data;

                // 아이디 마스킹 처리
                const maskedUserId = maskUserId(userId);

                setModalData(`아이디는 '${maskedUserId}' 입니다.`);
                setModalType('success');
                setModalOpen(true);
            })
            .catch(error => {
                setModalData('이름 혹은 이메일이 틀렸습니다.');
                setModalType('error');
                setModalOpen(true);
            });
    };

    // 아이디 마스킹 함수
    const maskUserId = (userId) => {
        if (userId.length <= 4) {
            // 아이디가 4자리 이하일 경우, 앞 두 글자만 보여주고 나머지 모두 마스킹
            return userId.substring(0, 2) + '**';
        }
        // 아이디가 4자리보다 클 경우, 앞 두 글자와 마지막 두 글자만 보여주고 중간 두 글자 마스킹
        return userId.substring(0, 2) + '**' + userId.substring(4);
    };

    const handleCloseModal = () => {
        setModalOpen(false);
    };

    const handleLoginRedirect = () => {
        navigate('/auth/loginformik');
    };

    const handleFindPasswordRedirect = () => {
        navigate('/auth/findPassword');
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
                                        아이디 찾기
                                    </CardTitle>
                                </div>
                                <Formik
                                    initialValues={initialValues}
                                    validationSchema={validationSchema}
                                    onSubmit={handleSubmit}
                                    render={({ errors, touched }) => (
                                        <Form className="mt-3">
                                            <FormGroup>
                                                <Label htmlFor="uname">Name</Label>
                                                <Field
                                                    name="uname"
                                                    type="text"
                                                    placeholder='이름을 입력해주세요.'
                                                    className={`form-control${
                                                        errors.uname && touched.uname ? ' is-invalid' : ''
                                                    }`}
                                                />
                                                <ErrorMessage name="uname" component="div" className="invalid-feedback" />
                                            </FormGroup>
                                            <FormGroup>
                                                <Label htmlFor="email">Email</Label>
                                                <Field
                                                    name="email"
                                                    type="text"
                                                    placeholder='이메일을 입력해주세요.'
                                                    className={`form-control${
                                                        errors.email && touched.email ? ' is-invalid' : ''
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

            <Modal isOpen={modalOpen} toggle={handleCloseModal} centered={true}>
                <ModalHeader toggle={handleCloseModal} className="text-center">
                    {modalType === 'success' ? '아이디 찾기 성공' : '아이디 찾기 실패'}
                </ModalHeader>
                <ModalBody>
                    <div>
                        {modalData}
                    </div>
                </ModalBody>
                <ModalFooter>
                    {modalType === 'success' ? (
                        <>
                            <Button color="primary" onClick={handleLoginRedirect} className="me-2">로그인하러 가기</Button>
                            <Button color="secondary" onClick={handleFindPasswordRedirect}>비밀번호 찾기</Button>
                        </>
                    ) : (
                        <Button color="primary" onClick={handleCloseModal}>확인</Button>
                    )}
                </ModalFooter>
            </Modal>
        </div>
    );
};

export default ForgotPwd;
