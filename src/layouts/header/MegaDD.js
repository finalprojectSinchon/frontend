import React, { useState } from 'react';
import {
    Row,
    Col,
    CardTitle,
    Button,
    Input,
    FormGroup,
} from 'reactstrap';
import './MegaDD.css'; // CSS 파일 임포트

const MegaDD = () => {
    // 각 섹션의 메모를 저장할 상태 변수
    const [personalNotes, setPersonalNotes] = useState('');
    const [frequentContacts, setFrequentContacts] = useState('');

    // 개인 메모 변경 핸들러
    const handlePersonalNotesChange = (e) => {
        setPersonalNotes(e.target.value);
    };

    // 자주 연락하는 사람 변경 핸들러
    const handleFrequentContactsChange = (e) => {
        setFrequentContacts(e.target.value);
    };

    return (
        <Row>
            <Col lg="6">
                <div className="notebook p-4 text-dark rounded">
                    <CardTitle tag="h4" className='mb-4'>개인 메모장</CardTitle>
                    <Row>
                        <Col>
                            <FormGroup>
                                <Input
                                    type="textarea"
                                    value={personalNotes}
                                    onChange={handlePersonalNotesChange}
                                    rows="10" // 10줄로 설정
                                    className="lined-textarea"
                                    placeholder="여기에 메모를 입력하세요..."
                                />
                            </FormGroup>
                            <Button color="primary" className="mt-2">Save</Button>
                        </Col>
                    </Row>
                </div>
            </Col>
            <Col lg="6">
                <div className="notebook p-4 text-dark rounded">
                    <CardTitle tag="h4" className='mb-4'>공유 메모장</CardTitle>
                    <Row>
                        <Col>
                            <FormGroup>
                                <Input
                                    type="textarea"
                                    value={frequentContacts}
                                    onChange={handleFrequentContactsChange}
                                    rows="10" // 10줄로 설정
                                    className="lined-textarea"
                                    placeholder="여기에 자주 연락하는 사람의 정보를 입력하세요..."
                                />
                            </FormGroup>
                            <Button color="primary" className="mt-2">Save</Button>
                        </Col>
                    </Row>
                </div>
            </Col>
        </Row>
    );
};

export default MegaDD;
