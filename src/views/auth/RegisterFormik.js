import React, {useEffect} from 'react';
import { Button, Label, FormGroup, Container, Row, Col, Card, CardBody } from 'reactstrap';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { Link, useNavigate } from 'react-router-dom';
import AuthLogo from "../../layouts/logo/AuthLogo";
import { ReactComponent as LeftBg } from '../../assets/images/bg/login-bgleft.svg';
import { ReactComponent as RightBg } from '../../assets/images/bg/login-bg-right.svg';
import axios from 'axios';
import {useSelector} from "react-redux";

const RegisterFormik = () => {

  let navigate = useNavigate();

  const userInfo = useSelector(state => state.userInfo);
  console.log(userInfo.authCode);

  useEffect(() => {
    console.log(userInfo);
    if(!userInfo.authCode) {
      navigate('/auth/certification')
    }
  }, []);

  const initialValues = {
    userId: '',
    userName: '',
    userEmail: '',
    userPassword: '',
    confirmPassword: '',
    userPhone: '',
    acceptTerms: false,
    authCode : parseInt(userInfo.authCode),
  };

  console.log(initialValues);
  const validationSchema = Yup.object().shape({
    userId: Yup.string().required('아이디를 입력해주세요'),
    userName: Yup.string().required('이름을 입력해주세요'),
    userEmail: Yup.string().email('이메일 형식이 맞지 않습니다.').required('이메일을 입력해주세요'),
    userPassword: Yup.string()
      .min(8, '비밀번호는 8자 이상을 입력해야합니다.')
      .required('비밀번호를 입력해주세요'),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref('userPassword'), null], '비밀번호가 일치하지 않습니다.')
      .required('비밀번호 확인을 입력해주세요'),
    userPhone: Yup.string()
      .matches(/^[0-9]+$/, '휴대폰 번호는 숫자로만 입력해주세요 (ex.01012341234)')
      .required('휴대폰 번호를 입력해주세요'),
    acceptTerms: Yup.bool().oneOf([true], '약관을 동의해주세요'),
  });

  const submitHandler = (fields) => {
    console.log(fields);
    axios.post('http://localhost:8080/join', fields, {
      headers: {
         'Content-Type': 'application/json',
      } 
    })
    .then(res => res.data)
    .then(data => {
      if(data.status == 201) {
        alert(data.message);
        navigate('/auth/loginformik')
      } else {
        alert(data.message)
      }
    })
    .catch(error => {
      if (error.response) {
          alert(error.response.data.message);
      } else if (error.request) {
          console.error(error.request);
      } else {
          console.error('Error', error.message);
      }
  });
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
                <h4 className="mb-0 fw-bold">회원가입</h4>
                <small className="pb-4 d-block">
                  아이디가 있으신가요?? <Link to="/auth/loginformik">로그인</Link>
                </small>
                <Formik
                  initialValues={initialValues}
                  validationSchema={validationSchema}
                  onSubmit={submitHandler}
                >
                  {({ errors, touched }) => (
                    <Form>
                      <FormGroup>
                        <Label htmlFor="userId">UserID</Label>
                        <Field
                          name="userId"
                          type="text"
                          className={`form-control ${
                            errors.userId && touched.userId ? ' is-invalid' : ''
                          }`}
                        />
                        <ErrorMessage
                          name="userId"
                          component="div"
                          className="invalid-feedback"
                        />
                      </FormGroup>
                      <FormGroup>
                        <Label htmlFor="userName">이름</Label>
                        <Field
                          name="userName"
                          type="text"
                          className={`form-control ${
                            errors.userName && touched.userName ? ' is-invalid' : ''
                          }`}
                        />
                        <ErrorMessage
                          name="userName"
                          component="div"
                          className="invalid-feedback"
                        />
                      </FormGroup>
                      <FormGroup>
                        <Label htmlFor="userEmail">이메일</Label>
                        <Field
                          name="userEmail"
                          type="text"
                          className={`form-control${
                            errors.userEmail && touched.userEmail ? ' is-invalid' : ''
                          }`}
                        />
                        <ErrorMessage name="userEmail" component="div" className="invalid-feedback" />
                      </FormGroup>
                      <FormGroup>
                        <Label htmlFor="userPassword">비밀번호</Label>
                        <Field
                          name="userPassword"
                          type="password"
                          className={`form-control${
                            errors.userPassword && touched.userPassword ? ' is-invalid' : ''
                          }`}
                        />
                        <ErrorMessage
                          name="userPassword"
                          component="div"
                          className="invalid-feedback"
                        />
                      </FormGroup>
                      <FormGroup>
                        <Label htmlFor="confirmPassword">비밀번호 확인</Label>
                        <Field
                          name="confirmPassword"
                          type="password"
                          className={`form-control${
                            errors.confirmPassword && touched.confirmPassword ? ' is-invalid' : ''
                          }`}
                        />
                        <ErrorMessage
                          name="confirmPassword"
                          component="div"
                          className="invalid-feedback"
                        />
                      </FormGroup>
                      <FormGroup>
                        <Label htmlFor="userPhone">휴대폰</Label>
                        <Field
                          name="userPhone"
                          type="text"
                          className={`form-control${
                            errors.userPhone && touched.userPhone ? ' is-invalid' : ''
                          }`}
                        />
                        <ErrorMessage
                          name="userPhone"
                          component="div"
                          className="invalid-feedback"
                        />
                      </FormGroup>
                      <FormGroup inline className="form-check">
                        <Field
                          type="checkbox"
                          name="acceptTerms"
                          id="acceptTerms"
                          className={`form-check-input ${
                            errors.acceptTerms && touched.acceptTerms ? ' is-invalid' : ''
                          }`}
                        />
                        <Label htmlFor="acceptTerms" className="form-check-label">
                          Accept Terms & Conditions
                        </Label>
                        <ErrorMessage
                          name="acceptTerms"
                          component="div"
                          className="invalid-feedback"
                        />
                      </FormGroup>
                      <FormGroup>
                        <Button type="submit" color="primary" className="me-2">
                          회원가입 하기
                        </Button>
                        <Button type="reset" color="secondary">
                          Reset
                        </Button>
                      </FormGroup>
                    </Form>
                  )}
                </Formik>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default RegisterFormik;
