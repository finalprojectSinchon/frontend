import React, { useState, useEffect } from 'react';
import {
    Card,
    CardBody,
    CardTitle,
    Col,
    Row,
    Button,
    Form,
    FormGroup,
    Label,
    Input,
    ListGroup,
    ListGroupItem
} from 'reactstrap';
import BreadCrumbs from '../../layouts/breadcrumbs/BreadCrumbs';
import api from "src/store/apps/airplane/api.js";
import {useNavigate} from "react-router-dom";

const UserManagement = () => {
    const [selectedUser, setSelectedUser] = useState('');
    const [userList, setUserList] = useState([]);

    useEffect(() => {
        api.get('/api/v1/admin/newUser')
            .then(res => res.data)
            .then((data) => {
                setUserList(data.data);
            })
            .catch(err => console.log(err));
    }, []);




    const [userInfo, setUserInfo] = useState({
        userCode : '',
        name: '',
        id: '',
        email: '',
        phone: '',
        userRole: ''
    });

    const [userAuth, setUserAuth] = useState({
        role: '',
        department: ''
    });



    const formatPhoneNumber = (phoneNumber) => {
        const cleaned = ('' + phoneNumber).replace(/\D/g, '');
        const match = cleaned.match(/^(\d{3})(\d{4})(\d{4})$/);
        if (match) {
            return match[1] + '-' + match[2] + '-' + match[3];
        }
        return phoneNumber;
    };

    const handleUserSelect = (e) => {
        const userCode = e.target.value;
        setSelectedUser(userCode);
        api.get(`/api/v1/admin/newUser/${userCode}`)
            .then(res => res.data)
            .then(data => {
                setUserInfo({
                    userCode : data.data.userCode,
                    name: data.data.userName,
                    id: data.data.userId,
                    email: data.data.userEmail,
                    phone: formatPhoneNumber(data.data.userPhone),
                    userRole: data.data.userRole,
                })
                setUserAuth({
                    ...userAuth,
                    userCode : data.data.userCode,
                })
            })
    };


    const navigate = useNavigate();

    const handleAuthSubmit = (e) => {
        e.preventDefault();
        api.post('/api/v1/admin/newUser', userAuth)
            .then(res => {
                alert('권한 및 소속이 변경되었습니다.');
                setUserInfo({
                    ...userInfo,
                    userRole : userAuth.role
                })
            })
            .catch(err => console.log(err));
    };

    return (
        <>
            <BreadCrumbs />
            <Row className="mb-4">
                <Col lg="12">
                    <Card>
                        <CardBody>
                            <CardTitle tag="h5">신규 유저 선택</CardTitle>
                            <FormGroup>
                                <Label for="userSelect">유저 선택</Label>
                                <Input
                                    type="select"
                                    name="userSelect"
                                    id="userSelect"
                                    value={selectedUser}
                                    onChange={handleUserSelect}
                                >
                                    <option value="">유저를 선택하세요</option>
                                    {userList.map(user => (
                                        <option key={user.id} value={user.userCode}>{user.userName}</option>
                                    ))}
                                </Input>
                            </FormGroup>
                        </CardBody>
                    </Card>
                </Col>
            </Row>
            <Row>
                <Col lg="6">
                    <Card>
                        <CardBody>
                            <CardTitle tag="h5">사용자 정보</CardTitle>
                            <ListGroup flush>
                                <ListGroupItem>
                                    <strong>이름:</strong> {userInfo.name}
                                </ListGroupItem>
                                <ListGroupItem>
                                    <strong>아이디:</strong> {userInfo.id}
                                </ListGroupItem>
                                <ListGroupItem>
                                    <strong>이메일:</strong> {userInfo.email}
                                </ListGroupItem>
                                <ListGroupItem>
                                    <strong>휴대폰 번호:</strong> {userInfo.phone}
                                </ListGroupItem>
                                <ListGroupItem>
                                    <strong>권한:</strong> {userInfo.userRole  === 'ROLE_USER' ? '등록미완료' : userInfo.userRole  }
                                </ListGroupItem>
                            </ListGroup>
                        </CardBody>
                    </Card>
                </Col>
                <Col lg="1"></Col>
                <Col lg="4">
                    <Card>
                        <CardBody>
                            <CardTitle tag="h5">권한 및 소속 관리</CardTitle>
                            <Form onSubmit={handleAuthSubmit}>
                                <FormGroup>
                                    <Label for="userRole">권한</Label>
                                    <Input
                                        type="select"
                                        name="userRole"
                                        id="userRole"
                                        value={userAuth.role}
                                        onChange={(e) => setUserAuth({...userAuth, role: e.target.value})}
                                    >
                                        <option>선택하세요</option>
                                        <option>항공관련</option>
                                        <option>점포</option>
                                        <option>관리자</option>
                                    </Input>
                                </FormGroup>
                                <FormGroup>
                                    <Label for="userDepartment">소속</Label>
                                    <Input
                                        type="text"
                                        name="userDepartment"
                                        id="userDepartment"
                                        value={userAuth.department}
                                        onChange={(e) => setUserAuth({...userAuth, department: e.target.value})}
                                    />
                                </FormGroup>
                                <Button color="primary" type="submit">
                                    변경사항 저장
                                </Button>
                            </Form>
                        </CardBody>
                    </Card>
                </Col>
            </Row>
        </>
    );
};

export default UserManagement;