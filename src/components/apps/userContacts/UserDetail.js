import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Input, FormGroup, Button, Label, Card, CardBody, CardTitle, CardText } from 'reactstrap';
import { UpdateUser, addUser } from '../../../store/apps/userContact/UserContactSlice';
import ReactMarkdown from 'react-markdown';
import rehypeRaw from 'rehype-raw';
import {
    Row,
    Col,
} from 'reactstrap';
const UserDetail = () => {
    const userDetails = useSelector(
        (state) => state.userContact.users.find(user => user.userCode === state.userContact.userContentCode)
    );

    const dispatch = useDispatch();

    const handleNote = (e) => {
        e.preventDefault();
        const id = userDetails ? userDetails.id + 1 : 1;
        dispatch(addUser(id, 'dummy Title', 'primary'));
    };

    return (
        <div>
            <div className="mb-3">

            </div>
            {userDetails && !userDetails.deleted ? (
                <Card>
                    <CardBody>
                        <Row>
                            <Col sm="12">
                                <div className="p-4">
                                    <Row className="mb-5 d-flex justify-content-center align-items-center text-center">
                                        <Col md="3" xs="6">
                                            <img
                                                src={userDetails.userImg}
                                                alt={`${userDetails.userName}'s profile`}
                                                className="rounded-circle"
                                                style={{ width: '150px', height: '150px', objectFit: 'cover' }}
                                            />
                                        </Col>
                                        <Col md="9" xs="6">
                                            <h4 className="mb-3">{userDetails.userName}</h4>
                                        </Col>
                                    </Row>


                                    <Row className="mb-4">
                                        <Col md="3" xs="6" className="border-end">
                                            <strong>Email</strong>
                                            <br />
                                            <p className="text-muted">{userDetails.userEmail}</p>
                                        </Col>
                                        <Col md="3" xs="6" className="border-end">
                                            <strong>Phone</strong>
                                            <br />
                                            <p className="text-muted">{userDetails.userPhone}</p>
                                        </Col>
                                        <Col md="3" xs="6" className="border-end">
                                            <strong>Address</strong>
                                            <br />
                                            <p className="text-muted">{userDetails.userAddress}</p>
                                        </Col>
                                        <Col md="3" xs="6">
                                            <strong>Role</strong>
                                            <br />
                                            <p className="text-muted">{userDetails.userRole}</p>
                                        </Col>
                                    </Row>

                                    <Row className="mb-4">
                                        <Col sm="12">
                                            <h4 className="font-medium">About</h4>
                                            <hr />
                                            <ReactMarkdown rehypePlugins={[rehypeRaw]}>
                                                {userDetails.userAbout}
                                            </ReactMarkdown>
                                        </Col>
                                    </Row>

                                    <Row>
                                        <Col sm="12">
                                            <strong>Created Date</strong>
                                            <p className="text-muted">{userDetails.createdDate}</p>
                                        </Col>
                                    </Row>
                                </div>
                            </Col>
                        </Row>

                    </CardBody>
                </Card>
            ) : (
                <div className="d-flex mt-3 p-4 flex-column align-items-center justify-content-center">
                    <i className="ti-agenda display-5" />
                    <h4 className="mt-2">유저를 선택하세요.</h4>
                </div>
            )}
        </div>
    );
};

export default UserDetail;
