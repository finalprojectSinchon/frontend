import React, { useEffect, useState } from 'react';
import {
  Card,
  CardBody,
  CardTitle,
  Row,
  Col,
  Form,
  FormGroup,
  Label,
  Input,
  FormText,
  Button,
  FormFeedback,
} from 'reactstrap';
import BreadCrumbs from '../../layouts/breadcrumbs/BreadCrumbs';
import { useParams, useNavigate } from 'react-router-dom'; // useNavigate 추가
import api from '../../store/apps/airplane/api';

const InspectionDetail = () => {
  const { inspectionCode } = useParams();
  const [inspectionInfo, setInspectionInfo] = useState({});
  const [readOnly, setReadOnly] = useState(true);
  const navigate = useNavigate(); // useNavigate 추가

  useEffect(() => {
    api.get(`/api/v1/inspection/${inspectionCode}`)
      .then(res => res.data)
      .then(data => setInspectionInfo(data.data))
      .catch(error => console.error("Failed to fetch data:", error));
  }, [inspectionCode]);

  const onChangeHandler = e => {
    const { name, value } = e.target;
    setInspectionInfo(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSave = () => {
    console.log('Saving inspection info:', inspectionInfo); // 상태 출력

    api.put(`/api/v1/inspection/${inspectionCode}/update`, inspectionInfo)
      .then((response) => {
        console.log('API response:', response); // 응답 출력
        alert('수정이 완료되었습니다');
        setReadOnly(true);
        navigate('/api/v1/inspection'); // 페이지 네비게이션
      })
      .catch(error => {
        console.error("Failed to update data:", error);
      });
  };
  console.log("인포 나옴 ?", inspectionInfo)

  const handleDelete = () => {
    api.put(`/api/v1/inspection/${inspectionCode}/delete`)
      .then((response) => {
        console.log("삭제까지 오냐", response); // 응답 출력
        alert('삭제가 완료되었습니다');
        navigate('/api/v1/inspection'); // 삭제 후 네비게이션
      })
      .catch(error => console.error("Failed to delete data:", error));
  };

  return (
    <div>
      <BreadCrumbs />
      <Row>
        <Col md="12">
          <Card>
            <CardBody className="bg-light">
              <CardTitle tag="h2" className="mb-0">Inspection</CardTitle>
            </CardBody>
            <CardBody>
              <Form>
                <Row>
                  <Col md="6">
                    <FormGroup>
                      <Label>Location</Label>
                      <Input
                        type="text"
                        placeholder="안전점검 할 위치를 입력하세요"
                        name="location"
                        onChange={onChangeHandler}
                        readOnly={readOnly}
                        value={inspectionInfo.location || ''}
                      />
                      <FormFeedback valid>Success! You've done it.</FormFeedback>
                    </FormGroup>
                  </Col>
                  <Col md="6">
                    <FormGroup>
                      <Label>Status</Label>
                      <Input
                        type="select"
                        name="status"
                        onChange={onChangeHandler}
                        disabled={readOnly}
                        value={inspectionInfo.status || ''}
                      >
                        <option value="정상">정상</option>
                        <option value="점검중">점검중</option>
                        <option value="중단">중단</option>
                      </Input>
                      <FormText className="muted">This field has error.</FormText>
                    </FormGroup>
                  </Col>
                </Row>
                <Row>
                  <Col md="6">
                    <FormGroup>
                      <Label>Type</Label>
                      <Input
                        type="select"
                        name="type"
                        onChange={onChangeHandler}
                        disabled={readOnly}
                        value={inspectionInfo.type || ''}
                      >
                        <option value="점포">점포</option>
                        <option value="안내소">안내소</option>
                      </Input>
                      <FormText className="muted">Select your type</FormText>
                    </FormGroup>
                  </Col>
                  <Col md="6">
                    <FormGroup>
                      <Label>Manager</Label>
                      <Input
                        type="text"
                        name="manager"
                        placeholder="이름을 입력하세요"
                        readOnly={readOnly}
                        onChange={onChangeHandler}
                        value={inspectionInfo.manager || ''}
                      />
                      <FormText className="muted">이름은 반드시 입력해야 합니다.</FormText>
                    </FormGroup>
                  </Col>
                </Row>
                <Row>
                  <Col md="6">
                    <FormGroup>
                      <Label>Regular Inspection Date</Label>
                      <Input
                        type="text"
                        name="regularInspectionDate"
                        placeholder="점검일을 기입하세요"
                        readOnly={readOnly}
                        onChange={onChangeHandler}
                        value={inspectionInfo.regularInspectionDate || ''}
                      />
                    </FormGroup>
                  </Col>
                  <Col md="6">
                    <FormGroup>
                      <Label>Phone</Label>
                      <Input
                        type="text"
                        name="phone"
                        placeholder="010-****-****"
                        readOnly={readOnly}
                        onChange={onChangeHandler}
                        value={inspectionInfo.phone || ''}
                      />
                      <FormText className="muted">휴대폰 번호는 반드시 입력해야 합니다.</FormText>
                    </FormGroup>
                  </Col>
                </Row>
                <Row>
                  <Col md="6">
                    <FormGroup>
                      <Label>비고</Label>
                      <Input
                        type="textarea"
                        placeholder="특이사항을 입력하세요"
                        rows="6"
                        name="text"
                        readOnly={readOnly}
                        onChange={onChangeHandler}
                        value={inspectionInfo.text || ''}
                      />
                    </FormGroup>
                  </Col>
                </Row>
                <Col className="d-flex justify-content-center">
                  {readOnly ? (
                    <Button className="btn" color="primary" onClick={() => setReadOnly(false)}>
                      수정
                    </Button>
                  ) : (
                    <>
                      <Button className="btn" color="success" onClick={handleSave}>
                        저장
                      </Button>
                      <Button className="btn" color="secondary" onClick={handleDelete}>
                        삭제
                      </Button>
                    </>
                  )}
                </Col>
              </Form>
            </CardBody>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default InspectionDetail;
