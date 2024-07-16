import React from 'react';
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

const LoginFormik = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const initialValues = {
    userId: '', // Changed from 'email' to 'userId'
    userPassword: '', // Changed from 'password' to 'userPassword'
  };

  const validationSchema = Yup.object().shape({
    userId: Yup.string().required('아이디는 반드시 입력해야합니다.'), // Changed from 'email' to 'userId'
    userPassword: Yup.string()
      .min(8, '비밀번호는 8글자 이상을 입력해야합니다.')
      .required('비밀번호는 반드시 입력해야합니다.'), // Changed from 'password' to 'userPassword'
  });

  const submitHandler = (fields) => {
    console.log(fields)
    axios.post('http://localhost:8080/login', fields, {
      headers: {
        'Content-Type': 'multipart/form-data',
      }
    })
      .then(res => res.data)
      .then((data) => {
        alert(data.data.Authorization)
        Cookies.set('token',data.data.Authorization,{ expires: 1 })
        navigate('/');
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
                  render={({ errors, touched }) => (
                    <Form>
                      <FormGroup>
                        <Label htmlFor="userId">ID</Label> {/* Changed from 'Email' to 'User ID' */}
                        <Field
                          name="userId" // Changed from 'email' to 'userId'
                          type="text"
                          className={`form-control${errors.userId && touched.userId ? ' is-invalid' : ''}`}
                        />
                        <ErrorMessage name="userId" component="div" className="invalid-feedback" />
                      </FormGroup>
                      <FormGroup>
                        <Label htmlFor="userPassword">Password</Label> {/* Changed from 'Password' to 'User Password' */}
                        <Field
                          name="userPassword" // Changed from 'password' to 'userPassword'
                          type="password"
                          className={`form-control${errors.userPassword && touched.userPassword ? ' is-invalid' : ''}`}
                        />
                        <ErrorMessage name="userPassword" component="div" className="invalid-feedback" />
                      </FormGroup>
                      <FormGroup className="form-check d-flex" inline>
                        <Label check>
                          <Input type="checkbox" />
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
                />
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default LoginFormik;
