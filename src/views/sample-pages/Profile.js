import React, { useState } from 'react';
import Iframe from 'react-iframe';
import {
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
import { useSelector } from 'react-redux';

import DaumPostcode from "react-daum-postcode";



const Profile = () => {
  const [activeTab, setActiveTab] = useState('1');

  const toggle = (tab) => {
    if (activeTab !== tab) {
      setActiveTab(tab);
    }
  };

  const userInfo = useSelector((state) => state.userInfo);

  const formatPhoneNumber = (phoneNumber) => {
    // 정규 표현식을 사용하여 전화번호를 원하는 형식으로 변환
    const cleaned = ('' + phoneNumber).replace(/\D/g, '');
    const match = cleaned.match(/^(\d{3})(\d{4})(\d{4})$/);
    if (match) {
      return match[1] + '-' + match[2] + '-' + match[3];
    }
    return phoneNumber; // 변환이 실패한 경우 그대로 반환
  };


  return (
    <>
      <BreadCrumbs />
      <Row>
        <Col xs="12" md="12" lg="4">
          <Card>
            <CardBody className="p-4">
              <div className="text-center mt-4">
                <img src={img1} className="rounded-circle" width="150" alt="" />
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
                  Timeline
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink
                  className={activeTab === '2' ? 'active bg-transparent' : 'cursor-pointer'}
                  onClick={() => {
                    toggle('2');
                  }}
                >
                  Profile
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink
                  className={activeTab === '3' ? 'active bg-transparent' : 'cursor-pointer'}
                  onClick={() => {
                    toggle('3');
                  }}
                >
                  Setting
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
                        <FormGroup>
                          <Label>Name</Label>
                          <Input type="text" placeholder={userInfo.userName}/>
                        </FormGroup>
                        <FormGroup>
                          <Label>Email</Label>
                          <Input type="email" placeholder={userInfo.userEmail} />
                        </FormGroup>
                        <FormGroup>
                          <Label>Phone</Label>
                          <Input type="text" placeholder={formatPhoneNumber(userInfo.userPhone)}/>
                        </FormGroup>
                        <FormGroup>
                          <Label>Address</Label>
                          <InputGroup>
                          <Input type="text" placeholder={formatPhoneNumber(userInfo.userAddress)}/>
                          <Button color='success'>주소찾기</Button>
                          </InputGroup>
                        </FormGroup>
                        <FormGroup>
                          <Label>About</Label>
                          <Input type="textarea" placeholder={userInfo.userAbout}/>
                        </FormGroup>
                        <Button color="primary">Update Profile</Button>
                      </Form>
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
