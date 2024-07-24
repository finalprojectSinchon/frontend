import React, { useState } from 'react';
import {
    Card,
    CardBody,
    Col,
    Row,
    Button,
    Alert,
    FormGroup,
    Label,
    InputGroup,
    Spinner,
} from 'reactstrap';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import BreadCrumbs from '../../layouts/breadcrumbs/BreadCrumbs';
import api from 'src/store/apps/airplane/api.js';

const AuthCode = () => {
    const [authInfo, setAuthInfo] = useState(null);
    const [disabled, setDisabled] = useState(false);
    const [isDisabled, setIsDisabled] = useState(true);

    const onClickHandler = () => {
        api
            .get('/api/v1/admin/code')
            .then((res) => res.data)
            .then((data) => {
                setAuthInfo(data.data);
                setDisabled(true);
                setIsDisabled(false); // Enable the input for editing after fetching
            })
            .catch((err) => {
                alert('다시 시도해주세요');
                console.error('error', err);
            });
    };

    // Initial form values
    const initialValues = {
        userEmail: '',
        userPhone: '',
        authCode: '',
    };

    // Validation schema
    const validationSchema = Yup.object().shape({
        userEmail: Yup.string()
            .email('유효한 이메일을 입력하세요.')
            .test(
                'emailOrPhone',
                '이메일 또는 전화번호 중 하나는 필수입니다.',
                function (value) {
                    const { userPhone } = this.parent;
                    return Boolean(value || userPhone);
                }
            ),
        userPhone: Yup.string()
            .matches(/^\d{10,11}$/, '전화번호는 10자리 또는 11자리 숫자여야 합니다.')
            .test(
                'emailOrPhone',
                '이메일 또는 전화번호 중 하나는 필수입니다.',
                function (value) {
                    const { userEmail } = this.parent;
                    return Boolean(value || userEmail);
                }
            ),
        authCode: Yup.string()
            .matches(/^\d{6}$/, '인증 코드는 6자리 숫자여야 합니다.')
            .required('인증 코드는 필수입니다.'),
    });

    const onSubmitHandler = (values, { setSubmitting }) => {
        setSubmitting(true);
        // Add the logic for handling form submission
        console.log(values);
        api
            .post('/api/v1/admin/auth/mail', values)
            .then((res) => res.data)
            .then((data) => {
                alert(data.message);
            })
            .catch((error) => {
                console.log('err', error);
            })
            .finally(() => {
                setSubmitting(false); // Reset submitting state
            });
    };

    const modifyHandler = () => {
        if (confirm('정말로 수정하시겠습니까??')) {
            setIsDisabled(false);
        }
    };

    return (
        <>
            <BreadCrumbs />

            <CardBody className="p-4">
                <Row>
                    <Col lg="4">
                        <Card>
                            <CardBody className="profile-card pt-4 d-flex flex-column align-items-center">
                                <Button
                                    color="primary"
                                    onClick={onClickHandler}
                                    disabled={disabled}
                                >
                                    인증코드 발급
                                </Button>
                                {authInfo ? (
                                    <Alert color="info" className="mt-3">
                                        인증코드는 {authInfo.authCode} 입니다.
                                    </Alert>
                                ) : null}
                            </CardBody>
                        </Card>
                    </Col>
                    <Col lg="8">
                        <Card>
                            <CardBody className="pt-3">
                                <Formik
                                    initialValues={{
                                        ...initialValues,
                                        authCode: authInfo ? authInfo.authCode : '',
                                    }}
                                    enableReinitialize
                                    validationSchema={validationSchema}
                                    onSubmit={onSubmitHandler}
                                >
                                    {({ isSubmitting, setFieldValue }) => (
                                        <Form>
                                            <FormGroup>
                                                <Label for="authCode">인증 코드</Label>
                                                <InputGroup>
                                                    <Field
                                                        type="text"
                                                        name="authCode"
                                                        id="authCode"
                                                        placeholder="인증 코드 발급을 선택하세요"
                                                        className="form-control"
                                                        value={authInfo ? authInfo.authCode : ''}
                                                        onChange={(e) =>
                                                            setFieldValue('authCode', e.target.value)
                                                        }
                                                        disabled={isDisabled}
                                                    />
                                                    <Button onClick={modifyHandler}>수정하기</Button>
                                                </InputGroup>
                                                <ErrorMessage
                                                    name="authCode"
                                                    component="div"
                                                    className="text-danger"
                                                />
                                            </FormGroup>
                                            <FormGroup>
                                                <Label for="userEmail">이메일</Label>
                                                <Field
                                                    type="email"
                                                    name="userEmail"
                                                    id="userEmail"
                                                    placeholder="이메일을 입력하세요."
                                                    className="form-control"
                                                />
                                                <ErrorMessage
                                                    name="userEmail"
                                                    component="div"
                                                    className="text-danger"
                                                />
                                            </FormGroup>
                                            <FormGroup>
                                                <Label for="userPhone">전화번호</Label>
                                                <Field
                                                    type="text"
                                                    name="userPhone"
                                                    id="userPhone"
                                                    placeholder="전화번호를 입력하세요."
                                                    className="form-control"
                                                />
                                                <ErrorMessage
                                                    name="userPhone"
                                                    component="div"
                                                    className="text-danger"
                                                />
                                            </FormGroup>
                                            <Button color="primary" type="submit" disabled={isSubmitting}>
                                                {isSubmitting ? (
                                                    <>
                                                        <Spinner size="sm" /> Loading
                                                    </>
                                                ) : (
                                                    '제출'
                                                )}
                                            </Button>
                                        </Form>
                                    )}
                                </Formik>
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
            </CardBody>
        </>
    );
};

export default AuthCode;
