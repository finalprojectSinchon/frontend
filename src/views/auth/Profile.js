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
import { useDispatch, useSelector } from 'react-redux';
import Cookies from 'js-cookie';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { modifyUser } from '../../store/apps/login/userSlice';
import { StyledDemo } from "src/views/auth/image/UploadImage.js";
import MDEditor from '@uiw/react-md-editor';
import ReactMarkdown from "react-markdown";
import api from "src/store/apps/airplane/api.js";
import rehypeRaw from "rehype-raw";

const Profile = () => {
  const [activeTab, setActiveTab] = useState('1');
  const [passwordForm, setPasswordForm] = useState(false);
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState(null);
  const [confirmPassword, setConfirmPassword] = useState(null);
  const [isPasswordValid, setIsPasswordValid] = useState(false);
  const [mdContent, setMdContent] = useState('');
  const [isEditing, setIsEditing] = useState(false); // 상태 추가: 에디터 활성화 여부



  const userInfo = useSelector((state) => state.userInfo);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [changeInfo, setChangeInfo] = useState({
    userCode: userInfo.userCode,
    userName: userInfo.userName,
    userEmail: userInfo.userEmail,
    userPhone: userInfo.userPhone,
    userAddress: userInfo.userAddress,
    userAbout: userInfo.userAbout,
  });

  useEffect(() => {
    setMdContent(userInfo.userAbout || '');
  }, [userInfo.userAbout]);

  const toggle = (tab) => {
    if (activeTab !== tab) {
      setActiveTab(tab);
    }
  };

  const onChangeHandler = (e) => {
    setChangeInfo({
      ...changeInfo,
      [e.target.name]: e.target.value,
    });
  };

  const onClickHandler = () => {
    axios.post("http://localhost:8080/user", changeInfo, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': Cookies.get('token'),
      }
    })
        .then(res => res.data)
        .then(data => {
          alert(data.message);
          dispatch(modifyUser(changeInfo));
        })
        .catch(error => {
          alert('오류가 발생하였습니다. 다시 시도해주세요');
          console.error('error', error);
        });
  };

  const handleNewPasswordChange = (e) => {
    const newPassword = e.target.value;
    setNewPassword(newPassword);
    setIsPasswordValid(newPassword.length >= 8 && newPassword === confirmPassword);
  };

  const handleConfirmPasswordChange = (e) => {
    const confirmPassword = e.target.value;
    setConfirmPassword(confirmPassword);
    setIsPasswordValid(newPassword.length >= 8 && newPassword === confirmPassword);
  };

  const formatPhoneNumber = (phoneNumber) => {
    const cleaned = ('' + phoneNumber).replace(/\D/g, '');
    const match = cleaned.match(/^(\d{3})(\d{4})(\d{4})$/);
    if (match) {
      return match[1] + '-' + match[2] + '-' + match[3];
    }
    return phoneNumber;
  };

  const passwordCheckHandler = () => {
    let passwordCheckForm = {
      userCode: userInfo.userCode,
      userPassword: currentPassword,
    };
    axios.post('http://localhost:8080/api/v1/account/password-check', passwordCheckForm, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': Cookies.get('token'),
      }
    })
        .then(res => res.data)
        .then(data => {
          alert(data.message);
          setPasswordForm(true);
        })
        .catch(error => {
          alert('비밀번호가 일치하지 않습니다. 다시 시도해주세요');
          console.error('error', error);
        });
  };

  const changePasswordHandler = () => {
    let ChangePasswordForm = {
      userCode: userInfo.userCode,
      newPassword: newPassword,
      confirmPassword: confirmPassword,
    };
    axios.put('http://localhost:8080/api/v1/account/change-password', ChangePasswordForm, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': Cookies.get('token'),
      }
    })
        .then(res => res.data)
        .then(data => {
          console.log(data.message);
          alert('비밀번호 변경에 성공하였습니다. 다시 로그인해주세요');
          navigate("/auth/loginformik");
        })
        .catch(error => {
          alert('비밀번호 변경에 오류가 발생하였습니다. 다시 시도해주세요');
          console.error('error', error);
        });
  };

  const handleMdChange = (value) => {
    setMdContent(value);
    setChangeInfo({
      ...changeInfo,
      userAbout: value,
    });
  };

  const userAboutHandler = () => {
    setIsEditing(false);
    api.post('/api/v1/user-about', {
      userCode : userInfo.userCode,
      userAbout : mdContent
    })
        .then(res => {
          alert('등록성공!');
        })
        .catch(err => {
          alert('다시 시도해주세요!')
          console.error('error', err);
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
                  <CardSubtitle className="text-muted">
                    {userInfo.userRole === "ROLE_USER" ? '일반회원' : '관리자'}
                  </CardSubtitle>
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
                {isEditing ? <div className="position-absolute top-0 end-0 p-2">
                      <Button color="primary" size="sm" onClick={userAboutHandler}>완료</Button>
                    </div> :
                    <div className="position-absolute top-0 end-0 p-2">
                      <Button color="secondary" size="sm" onClick={() => setIsEditing(true)}>수정하기</Button>
                    </div>}

              </Nav>
              <TabContent activeTab={activeTab}>
                <TabPane tabId="1">
                  <Row>
                    <Col sm="12">
                      <div className="p-4 position-relative">
                        {isEditing ? (
                            <>
                              <MDEditor height={865} value={mdContent} onChange={handleMdChange} />
                            </>
                        ) : (
                            <>
                              <ReactMarkdown rehypePlugins={[rehypeRaw]}>
                                {mdContent}
                              </ReactMarkdown>
                            </>
                        )}
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
                        <Progress value={80} />
                        <h5 className="mt-4">
                          HTML 5 <span className="float-end">90%</span>
                        </h5>
                        <Progress color="success" value={90} />
                        <h5 className="mt-4">
                          jQuery <span className="float-end">50%</span>
                        </h5>
                        <Progress color="info" value={50} />
                        <h5 className="mt-4">
                          Photoshop <span className="float-end">70%</span>
                        </h5>
                        <Progress color="warning" value={70} />
                      </div>
                    </Col>
                  </Row>
                </TabPane>
                <TabPane tabId="3">
                  <Row>
                    <Col sm="12">
                      <div className="p-4">
                        <Form>
                          <StyledDemo />
                          <FormGroup>
                            <Label>이름</Label>
                            <Input type="text" placeholder={userInfo.userName} name='userName' onChange={onChangeHandler} />
                          </FormGroup>
                          <FormGroup>
                            <Label>이메일</Label>
                            <Input type="email" placeholder={userInfo.userEmail} name='userEmail' onChange={onChangeHandler} />
                          </FormGroup>
                          <FormGroup>
                            <Label>휴대폰번호</Label>
                            <Input type="text" placeholder={userInfo.userPhone} name='userPhone' onChange={onChangeHandler} />
                          </FormGroup>
                          <FormGroup>
                            <Label>주소</Label>
                            <InputGroup>
                              <Input type="text" placeholder={userInfo.userAddress} name='userAddress' onChange={onChangeHandler} />
                              <Button color='success' onClick="">주소찾기</Button>
                            </InputGroup>
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
                          <Input className='mt-1' onChange={e => setCurrentPassword(e.target.value)} type='password' />
                          <Button color='primary' className='mt-2 d-flex justify-content-center' onClick={passwordCheckHandler}>확인</Button>
                        </InputGroup>
                        {passwordForm ? (
                            <>
                              <Label className='mt-2'>새 비밀번호</Label>
                              <Input className='mt-1' type='password' onChange={handleNewPasswordChange} />
                              <Label className='mt-2'>비밀번호 확인</Label>
                              <Input className='mt-1' type='password' onChange={handleConfirmPasswordChange} />
                            </>
                        ) : null}
                        {isPasswordValid ? (
                            <Button onClick={changePasswordHandler}>비밀번호 변경하기</Button>
                        ) : (
                            <Alert color="danger" className='mt-3'>
                              비밀번호는 8자리 이상을 입력해야 합니다.
                            </Alert>
                        )}
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
