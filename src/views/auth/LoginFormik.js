import React, { useState, useEffect } from 'react';
import { Button, Label, FormGroup, Container, Row, Col, Card, CardBody, Input } from 'reactstrap';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { Link, useNavigate } from 'react-router-dom';
import AuthLogo from "../../layouts/logo/AuthLogo";
import { ReactComponent as LeftBg } from '../../assets/images/bg/login-bgleft.svg';
import { ReactComponent as RightBg } from '../../assets/images/bg/login-bg-right.svg';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import Cookies from 'js-cookie';
import api from "src/store/apps/airplane/api.js";

const LoginFormik = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  const [rememberMe, setRememberMe] = useState(false);

  useEffect(() => {
    const state = localStorage.getItem('rememberMe')
    setRememberMe(state);
  }, []);

  const initialValues = {
    userId: localStorage.getItem('userId') || '',
    userPassword: localStorage.getItem('userPassword') || '',
  };

  const validationSchema = Yup.object().shape({
    userId: Yup.string().required('아이디는 반드시 입력해야합니다.'),
    userPassword: Yup.string()
      .min(8, '비밀번호는 8글자 이상을 입력해야합니다.')
      .required('비밀번호는 반드시 입력해야합니다.'),
  });

  const submitHandler = (fields) => {
    if (rememberMe) {
      localStorage.setItem('userId', fields.userId);
      localStorage.setItem('userPassword', fields.userPassword);
      localStorage.setItem('rememberMe', true);
    } else {
      localStorage.removeItem('userId');
      localStorage.removeItem('userPassword');
      localStorage.removeItem('rememberMe')
    }

    api.post('/login', fields, {
      headers: {
        'Content-Type': 'multipart/form-data',
      }
    })
      .then(res => res.data)
      .then((data) => {
        Cookies.set('token',data.data.Authorization,{ expires: 1 })
        navigate('/main');
      })
      .catch((error) => {
        console.error('로그인 에러:', error);
        alert('로그인에 실패하였습니다. 다시 시도해주세요');
      });
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
                <h4 className="mb-0 fw-bold">Login</h4>
                <small className="pb-4 d-block">
                  Do not have an account? <Link to="/auth/registerformik">Sign Up</Link>
                </small>
                <Formik
                  initialValues={initialValues}
                  validationSchema={validationSchema}
                  onSubmit={submitHandler}
                >
                  {({ errors, touched, values }) => (
                    <Form>
                      <FormGroup>
                        <Label htmlFor="userId">ID</Label>
                        <Field
                          name="userId"
                          type="text"
                          className={`form-control${errors.userId && touched.userId ? ' is-invalid' : ''}`}
                        />
                        <ErrorMessage name="userId" component="div" className="invalid-feedback" />
                      </FormGroup>
                      <FormGroup>
                        <Label htmlFor="userPassword">Password</Label>
                        <Field
                          name="userPassword"
                          type="password"
                          className={`form-control${errors.userPassword && touched.userPassword ? ' is-invalid' : ''}`}
                        />
                        <ErrorMessage name="userPassword" component="div" className="invalid-feedback" />
                      </FormGroup>
                      <FormGroup className="form-check d-flex" inline>
                        <Label check>
                          <Input 
                            type="checkbox" 
                            checked={rememberMe} 
                            onChange={() => setRememberMe(!rememberMe)} 
                          />
                          Remember me
                        </Label>
                        <Link className="ms-auto text-decoration-none" to="/auth/forgotPwd">
                          <small>Forgot Pwd?</small>
                        </Link>
                      </FormGroup>
                      <FormGroup>
                        <Button type="submit" color="primary" className="me-2">
                          Login
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

export default LoginFormik;
