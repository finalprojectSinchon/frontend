import React, { useEffect, useState } from 'react';
import Iframe from 'react-iframe';
import {
  Alert,
  Row,
  Col,
  Card,
  CardBody,
  CardTitle,
  CardSubtitle,
  Button,
  TabContent,
  TabPane,
  Nav,
  NavItem,
  NavLink,
  Progress,
  Form,
  FormGroup,
  Label,
  Input,
  InputGroup,
} from 'reactstrap';
import BreadCrumbs from '../../layouts/breadcrumbs/BreadCrumbs';

import img1 from '../../assets/images/users/user1.jpg';
import img2 from '../../assets/images/users/user2.jpg';
import img3 from '../../assets/images/users/user3.jpg';
import img4 from '../../assets/images/users/user4.jpg';

import time1 from '../../assets/images/bg/bg1.jpg';
import time2 from '../../assets/images/bg/bg2.jpg';
import time3 from '../../assets/images/bg/bg3.jpg';
import time4 from '../../assets/images/bg/bg4.jpg';
import { useDispatch, useSelector } from 'react-redux';
import Cookies from 'js-cookie'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { modifyUser } from '../../store/apps/login/userSlice';
import ProfileUploader from "src/views/auth/imgUpload.js";

const Profile = () => {



  const [activeTab, setActiveTab] = useState('1');

  const toggle = (tab) => {
    if (activeTab !== tab) {
      setActiveTab(tab);
    }
  };

  const [passwordForm, setpasswordForm] = useState(false);
  const [currentPassword, setcurrentPassword] = useState('');
  const [newPassword, setnewPassword] = useState(null);
  const [confirmPassword, setconfirmPassword] = useState(null);
  const [isPasswordValid, setIsPasswordValid] = useState(false);

  const userInfo = useSelector((state) => state.userInfo);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [changeInfo, setchangeInfo] = useState({
    userCode : userInfo.userCode,
    userName : userInfo.userName,
    userEmail : userInfo.userEmail,
    userPhone : userInfo.userPhone,
    userAddress : userInfo.userAddress,
    userAbout : userInfo.userAbout,
  });

  const onChangeHandler = (e) => {
    setchangeInfo({
      ...changeInfo,
      [e.target.name] : e.target.value
    })
  } 

  const onClickHandler = () => {
    axios.post("http://localhost:8080/user",changeInfo,{
      headers: {
        'Content-Type': 'application/json',
        'Authorization' : Cookies.get('token'),
      }
    })
    .then(res => res.data)
    .then(data => {
      alert(data.message)
      dispatch(modifyUser(changeInfo));
    })
    .catch(error => {
      alert('오류가 발생하였습니다. 다시 시도해주세요')
      console.error('error',error);
    })
  }

  const handleNewPasswordChange = (e) => {
    const newPassword = e.target.value;
    setnewPassword(newPassword);
    setIsPasswordValid(newPassword.length >= 8 && newPassword === confirmPassword);
  };

  const handleConfirmPasswordChange = (e) => {
    const confirmPassword = e.target.value;
    setconfirmPassword(confirmPassword);
    setIsPasswordValid(newPassword.length >= 8 && newPassword === confirmPassword);
  };


  const formatPhoneNumber = (phoneNumber) => {
    // 정규 표현식을 사용하여 전화번호를 원하는 형식으로 변환
    const cleaned = ('' + phoneNumber).replace(/\D/g, '');
    const match = cleaned.match(/^(\d{3})(\d{4})(\d{4})$/);
    if (match) {
      return match[1] + '-' + match[2] + '-' + match[3];
    }
    return phoneNumber; // 변환이 실패한 경우 그대로 반환
  };

  let passwordCheckForm = {
    userCode : userInfo.userCode,
    userPassword : currentPassword,
  }
  const passwordCheckHandler = () => {
    console.log(passwordCheckForm)
    axios.post('http://localhost:8080/api/v1/account/password-check',passwordCheckForm,{
      headers:{
        'Content-Type': 'application/json',
        'Authorization' : Cookies.get('token'),
      }
    })
    .then(res => res.data)
    .then(data => {
      alert(data.message);
      setpasswordForm(true);
    })
    .catch(error => {
      alert('비밀번호가 일치하지 않습니다. 다시 시도해주세요')
      console.error('error',error);
    })
  }


  let ChangePasswordForm = {
    userCode : userInfo.userCode,
    newPassword : newPassword,
    confirmPassword : confirmPassword,
  }

  const changePasswordHandler = () => {
    axios.put('http://localhost:8080/api/v1/account/change-password',ChangePasswordForm,{
      headers:{
        'Content-Type': 'application/json',
        'Authorization' : Cookies.get('token'),
      }
    })
    .then(res => res.data)
    .then(data => {
      console.log(data.message);
      alert('비밀번호 변경에 성공하였습니다. 다시 로그인해주세요')
      navigate("/auth/loginformik")
    })
    .catch(error => {
      alert('비밀번호 변경에 오류가 발생하였습니다. 다시시 도해주세요')
      console.error('errpr',error)
    })


  }
  return (
    <>
      <BreadCrumbs />
      <Row>
        <Col xs="12" md="12" lg="4">
          <Card>
            <CardBody className="p-4">
              <div className="text-center mt-4">
                <img src={userInfo.userImg} className="rounded-circle" width="150" alt="profile Img" />
                <CardTitle tag="h4" className="mt-2 mb-0">
                  {userInfo.userName}
                </CardTitle>
                <CardSubtitle className="text-muted">{
                userInfo.userRole == "ROLE_USER" ? '일반회원' : '관리자'
                }</CardSubtitle>
                <Row className="text-center justify-content-md-center mt-3">
                  <Col xs="4">
                    <a href="/" className="text-dark fw-bold text-decoration-none">
                      <i className="bi bi-person text-muted"></i>
                      <span className="font-medium ms-2">254</span>
                    </a>
                  </Col>
                  <Col xs="4">
                    <a href="/" className="text-dark fw-bold text-decoration-none">
                      <i className="bi bi-columns text-muted"></i>
                      <span className="font-medium ms-2">54</span>
                    </a>
                  </Col>
                </Row>
              </div>
            </CardBody>
            <CardBody className="border-top p-4">
              <div>
                <CardSubtitle className="text-muted fs-5">Email address</CardSubtitle>
                <CardTitle tag="h5">{userInfo.userEmail}</CardTitle>

                <CardSubtitle className="text-muted fs-5 mt-3">Phone</CardSubtitle>
                <CardTitle tag="h5">{formatPhoneNumber(userInfo.userPhone)}</CardTitle>

                <CardSubtitle className="text-muted fs-5 mt-3">Address</CardSubtitle>
                <CardTitle tag="h5">{userInfo.userAddress}</CardTitle>
                <div>
                  <Iframe
                    className="position-relative"
                    url="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3162.9478695734483!2d126.93466157662166!3d37.55629197204114!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x357ca2e75d4a7c41%3A0x4916c3cc69cb6c2f!2z7ZWY7J2066-465SU7Ja07Lu07ZOo7YSw7ZWZ7JuQ7Iug7LSM7KCQ!5e0!3m2!1sko!2skr!4v1721114979780!5m2!1sko!2skr"
                    width="280"
                    height="150"
                    frameborder="0"
                    allowfullscreen
                  />
                </div>
                <CardSubtitle className="text-muted fs-5 mt-3 mb-2">Social Profile</CardSubtitle>
                <div className="d-flex align-items-center gap-2">
                  <Button className="btn-circle" color="info">
                    <i className="bi bi-facebook"></i>
                  </Button>
                  <Button className="btn-circle" color="success">
                    <i className="bi bi-twitter"></i>
                  </Button>
                  <Button className="btn-circle" color="danger">
                    <i className="bi bi-youtube"></i>
                  </Button>
                </div>
              </div>
            </CardBody>
          </Card>
        </Col>
        <Col xs="12" md="12" lg="8">
          <Card>
            <Nav tabs>
              <NavItem>
                <NavLink
                  className={activeTab === '1' ? 'active bg-transparent' : 'cursor-pointer'}
                  onClick={() => {
                    toggle('1');
                  }}
                >
                  타임라인
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink
                  className={activeTab === '2' ? 'active bg-transparent' : 'cursor-pointer'}
                  onClick={() => {
                    toggle('2');
                  }}
                >
                  내프로필
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink
                  className={activeTab === '3' ? 'active bg-transparent' : 'cursor-pointer'}
                  onClick={() => {
                    toggle('3');
                  }}
                >
                  수정하기
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink
                  className={activeTab === '4' ? 'active bg-transparent' : 'cursor-pointer'}
                  onClick={() => {
                    toggle('4');
                  }}
                >
                  비밀번호 변경
                </NavLink>
              </NavItem>
            </Nav>
            <TabContent activeTab={activeTab}>
              <TabPane tabId="1">
                <Row>
                  <Col sm="12">
                    <div className="p-4">
                      <div className="steamline position-relative border-start ms-4 mt-0">
                        <div className="sl-item my-3 pb-3 border-bottom">
                          <div className="sl-left float-start text-center rounded-circle text-white ms-n3 me-3 bg-success">
                            <img src={img2} width="40" alt="user" className="rounded-circle" />
                          </div>
                          <div className="sl-right ps-4">
                            <div>
                              <a href="/" className="text-dark fs-4 text-decoration-none fw-bold">
                                John Doe
                              </a>
                              <span className="ms-2 text-muted">5 minutes ago</span>
                              <p className="text-muted">
                                assign a new task
                                <a href="/"> Design weblayout</a>
                              </p>
                              <Row className="ms-1">
                                <Col lg="3" md="6" className="mb-3">
                                  <img src={time1} className="img-fluid rounded" alt="" />
                                </Col>
                                <Col lg="3" md="6" className="mb-3">
                                  <img src={time2} className="img-fluid rounded" alt="" />
                                </Col>
                                <Col lg="3" md="6" className="mb-3">
                                  <img src={time3} className="img-fluid rounded" alt="" />
                                </Col>
                                <Col lg="3" md="6" className="mb-3">
                                  <img src={time4} className="img-fluid rounded" alt="" />
                                </Col>
                              </Row>
                              <div className="desc ms-3">
                                <a href="/" className="text-decoration-none text-dark me-2">
                                  2 comment
                                </a>
                                <a href="/" className="text-decoration-none text-dark me-2">
                                  <i className="bi bi-heart-fill me-2 text-danger"></i>5 Love
                                </a>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="sl-item my-3 pb-3 border-bottom">
                          <div className="sl-left float-start text-center rounded-circle text-white ms-n3 me-3 bg-success">
                            <img src={img3} width="40" alt="user" className="rounded-circle" />
                          </div>
                          <div className="sl-right ps-4">
                            <div>
                              <a href="/" className="text-dark fs-4 text-decoration-none fw-bold">
                                John Doe
                              </a>
                              <span className="ms-2 text-muted">5 minutes ago</span>
                              <Row className="mt-3 ms-1">
                                <Col md="3" xs="12">
                                  <img src={time1} alt="user" className="img-fluid rounded" />
                                </Col>
                                <Col md="9" xs="12">
                                  <p>
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer
                                    nec odio. Praesent libero. Sed cursus ante dapibus diam.
                                  </p>
                                  <a href="/" className="btn btn-success">
                                    Design weblayout
                                  </a>
                                </Col>
                              </Row>
                              <div className="desc ms-3 mt-3">
                                <a href="/" className="text-decoration-none text-dark me-2">
                                  2 comment
                                </a>
                                <a href="/" className="text-decoration-none text-dark me-2">
                                  <i className="bi bi-heart-fill me-2 text-danger"></i>5 Love
                                </a>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="sl-item my-3 pb-3 border-bottom">
                          <div className="sl-left float-start text-center rounded-circle text-white ms-n3 me-3 bg-success">
                            <img src={img4} width="40" alt="user" className="rounded-circle" />
                          </div>
                          <div className="sl-right ps-4">
                            <div>
                              <a href="/" className="text-dark fs-4 text-decoration-none fw-bold">
                                John Doe
                              </a>
                              <span className="ms-2 text-muted">5 minutes ago</span>
                              <p className="mt-2 ms-3">
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec
                                odio. Praesent libero. Sed cursus ante dapibus diam. Sed nisi. Nulla
                                quis sem at nibh elementum imperdiet. Duis sagittis ipsum. Praesent
                                mauris. Fusce nec tellus sed augue semper
                              </p>
                            </div>
                            <div className="desc ms-3 mt-3">
                              <a href="/" className="text-decoration-none text-dark me-2">
                                2 comment
                              </a>
                              <a href="/" className="text-decoration-none text-dark me-2">
                                <i className="bi bi-heart-fill me-2 text-danger"></i>5 Love
                              </a>
                            </div>
                          </div>
                        </div>
                        <div className="sl-item my-3 pb-3 border-bottom">
                          <div className="sl-left float-start text-center rounded-circle text-white ms-n3 me-3 bg-success">
                            <img src={img1} width="40" alt="user" className="rounded-circle" />
                          </div>
                          <div className="sl-right ps-4">
                            <div>
                              <a href="/" className="text-dark fs-4 text-decoration-none fw-bold">
                                John Doe
                              </a>
                              <span className="ms-2 text-muted">5 minutes ago</span>
                              <div className="mt-2 ms-3">
                                Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do
                                eiusmod tempor incididunt
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Col>
                </Row>
              </TabPane>
              <TabPane tabId="2">
                <Row>
                  <Col sm="12">
                    <div className="p-4">
                      <Row>
                        <Col md="3" xs="6" className="border-end">
                          <strong>Full Name</strong>
                          <br />
                          <p className="text-muted">{userInfo.userName}</p>
                        </Col>
                        <Col md="3" xs="6" className="border-end">
                          <strong>Phone</strong>
                          <br />
                          <p className="text-muted">{formatPhoneNumber(userInfo.userPhone)}</p>
                        </Col>
                        <Col md="3" xs="6" className="border-end">
                          <strong>Email</strong>
                          <br />
                          <p className="text-muted">{userInfo.userEmail}</p>
                        </Col>
                        <Col md="3" xs="6" className="border-end">
                          <strong>Address</strong>
                          <br />
                          <p className="text-muted">{userInfo.userAddress}</p>
                        </Col>
                      </Row>
                      <p className="mt-4">
                        {userInfo.userAbout}
                      </p>
                      <h4 className="font-medium mt-4">Skill Set</h4>
                      <hr />
                      <h5 className="mt-4">
                        Wordpress <span className="float-end">80%</span>
                      </h5>
                      <Progress value={2 * 5} />
                      <h5 className="mt-4">
                        HTML 5 <span className="float-end">90%</span>
                      </h5>
                      <Progress color="success" value="25" />
                      <h5 className="mt-4">
                        jQuery <span className="float-end">50%</span>
                      </h5>
                      <Progress color="info" value={50} />
                      <h5 className="mt-4">
                        Photoshop <span className="float-end">70%</span>
                      </h5>
                      <Progress color="warning" value={75} />
                    </div>
                  </Col>
                </Row>
              </TabPane>
              {/* 프로필 수정 */}
              <TabPane tabId="3">
                <Row>
                  <Col sm="12">
                    <div className="p-4">
                      <Form>
                        <ProfileUploader/>
                        <FormGroup>
                          <Label>이름</Label>
                          <Input type="text" placeholder={userInfo.userName} name='userName'
                          onChange={onChangeHandler}/>
                        </FormGroup>
                        <FormGroup>
                          <Label>이메일</Label>
                          <Input type="email" placeholder={userInfo.userEmail} name='userEmail'
                          onChange={onChangeHandler}/>
                        </FormGroup>
                        <FormGroup>
                          <Label>휴대폰번호</Label>
                          <Input type="text" placeholder={userInfo.userPhone} name='userPhone'
                          onChange={onChangeHandler}/>
                        </FormGroup>
                        <FormGroup>
                          <Label>주소</Label>
                          <InputGroup>
                          <Input type="text" placeholder={userInfo.userAddress} name='userAddress'
                          onChange={onChangeHandler}/>
                          <Button color='success' onClick="">주소찾기</Button>
                          </InputGroup>
                        </FormGroup>
                        <FormGroup>
                          <Label>내소개</Label>
                          <Input type="textarea" placeholder={userInfo.userAbout} name='userAbout'
                          onChange={onChangeHandler}/>
                        </FormGroup>
                        <Button color="primary" onClick={onClickHandler}>수정하기</Button>
                      </Form>
                    </div>
                  </Col>
                </Row>
              </TabPane>
              <TabPane tabId='4'>
              <Row>
                  <Col sm="12">
                    <div className="p-4">
                      <Label>현재 비밀번호</Label>
                      <InputGroup>
                      <Input className='mt-1' onChange={e => setcurrentPassword(e.target.value)} type='password'/>
                      <Button color='primary' className='mt-2 d-flex justify-content-center'
                      onClick={passwordCheckHandler}>확인</Button>                
                      </InputGroup>
                      {passwordForm ? (
                        <>
                          <Label className='mt-2'>새 비밀번호</Label>
                          <Input className='mt-1' type='password' onChange={handleNewPasswordChange} />
                          <Label className='mt-2'>비밀번호 확인</Label>
                          <Input className='mt-1' type='password' onChange={handleConfirmPasswordChange} />
                        </>
                      ) : null}
                      {isPasswordValid ? <Button onClick={changePasswordHandler}>비밀번호 변경하기</Button> : 
                      <Alert color="danger" className='mt-3'>
                      비밀번호는 8자리 이상을 입력해야 합니다.
                      </Alert>
                      }
                    </div>
                  </Col>
                </Row>
              </TabPane>
            </TabContent>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default Profile;
