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
import DaumPost from "src/components/apps/daumpost/DaumPost.js";
import CustomModal from "src/views/CustomModal.js";

const Profile = () => {
  const [activeTab, setActiveTab] = useState('2');
  const [passwordForm, setPasswordForm] = useState(false);
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState(null);
  const [confirmPassword, setConfirmPassword] = useState(null);
  const [isPasswordValid, setIsPasswordValid] = useState(false);
  const [mdContent, setMdContent] = useState('');
  const [isEditing, setIsEditing] = useState(false); // 상태 추가: 에디터 활성화 여부
  const [newRole, setNewRole] = useState("");


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

  useEffect(() => {
    if(userInfo) {
      switch(userInfo.userRole) {
        case "ROLE_ADMIN" : setNewRole("관리자"); break;
        case "ROLE_STORE": setNewRole("점포"); break;
        case "ROLE_AIRPLANE" : setNewRole("비행"); break;
        default : setNewRole("지정되지 않음"); break;
      }
      // userInfo.userRole = newRole;
    }

  }, [userInfo]);

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
    api.post("/user", changeInfo, {
      headers: {
        'Content-Type': 'application/json',
      }
    })
        .then(res => res.data)
        .then(data => {

          setType('프로필');
          setContent('프로필이 수정되었습니다.');
          toggleModal();
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

  const [modal, setModal] = useState(false);
  const toggleModal = () => setModal(!modal);
  const [type,setType] = useState('');
  const [content, setContent] = useState('');

  const passwordCheckHandler = () => {
    let passwordCheckForm = {
      userCode: userInfo.userCode,
      userPassword: currentPassword,
    };
    api.post('/api/v1/account/password-check', passwordCheckForm, {
      headers: {
        'Content-Type': 'application/json',
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
    api.put('/api/v1/account/change-password', ChangePasswordForm, {
      headers: {
        'Content-Type': 'application/json',
      }
    })
        .then(res => res.data)
        .then(data => {

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
                    {/*{userInfo.userRole === "ROLE_USER" ? '일반회원' : '관리자'}*/}
                    {newRole}
                  </CardSubtitle>
                </div>
              </CardBody>
              <CardBody className="border-top p-4">
                <div>
                  <CardSubtitle className="text-muted fs-5">Email address</CardSubtitle>
                  <CardTitle tag="h5">{userInfo.userEmail}</CardTitle>

                  <CardSubtitle className="text-muted fs-5 mt-3">Phone</CardSubtitle>
                  <CardTitle tag="h5">{formatPhoneNumber(userInfo.userPhone)}</CardTitle>

                  <CardSubtitle className="text-muted fs-5 mt-3">소속</CardSubtitle>
                  <CardTitle tag="h5">{formatPhoneNumber(userInfo.userDepartment)}</CardTitle>

                  <CardSubtitle className="text-muted fs-5 mt-3">Address</CardSubtitle>
                  <CardTitle tag="h5">{userInfo.userAddress}</CardTitle>

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
                    내 소개
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
                {activeTab === '1' ? (
                    isEditing ? (
                        <div className="position-absolute top-0 end-0 p-2">
                          <Button color="primary" size="sm" onClick={userAboutHandler}>완료</Button>
                        </div>
                    ) : (
                        <div className="position-absolute top-0 end-0 p-2">
                          <Button color="secondary" size="sm" onClick={() => setIsEditing(true)}>수정하기</Button>
                        </div>
                    )
                ) : null}

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

                        </p>
                        {/*<h4 className="font-medium mt-4">Skill Set</h4>*/}
                        {/*<hr />*/}
                        {/*<h5 className="mt-4">*/}
                        {/*  Wordpress <span className="float-end">80%</span>*/}
                        {/*</h5>*/}
                        {/*<Progress value={80} />*/}
                        {/*<h5 className="mt-4">*/}
                        {/*  HTML 5 <span className="float-end">90%</span>*/}
                        {/*</h5>*/}
                        {/*<Progress color="success" value={90} />*/}
                        {/*<h5 className="mt-4">*/}
                        {/*  jQuery <span className="float-end">50%</span>*/}
                        {/*</h5>*/}
                        {/*<Progress color="info" value={50} />*/}
                        {/*<h5 className="mt-4">*/}
                        {/*  Photoshop <span className="float-end">70%</span>*/}
                        {/*</h5>*/}
                        {/*<Progress color="warning" value={70} />*/}
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
                              <Input type="text" placeholder={userInfo.userAddress} name='userAddress'
                                     value={changeInfo.userAddress} onChange={onChangeHandler} />
                              <DaumPost changeInfo={changeInfo} setChangeInfo={setChangeInfo}/>
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
        <CustomModal  isOpen={modal} toggle={toggleModal} type = {type} content={content}/>
      </>
  );
};

export default Profile;
