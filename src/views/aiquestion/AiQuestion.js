import React, { useState } from 'react';
import {Card, CardBody, CardTitle, Button, Row, Col, Input, Modal, ModalBody, Spinner} from 'reactstrap';
import BreadCrumbs from "src/layouts/breadcrumbs/BreadCrumbs.js";
import axios from 'axios';
import ReactMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw";
import api from "src/store/apps/airplane/api.js";

// 카드 컴포넌트
const InfoCard = ({ title, onClick }) => (
    <Card className="mb-3">
        <CardBody>
            <CardTitle tag="h5">{title}</CardTitle>
            <Button color="primary" onClick={onClick}>질문하기</Button>
        </CardBody>
    </Card>
);

// 상세보기 컴포넌트
const DetailView = ({ question, setQuestion, answer, selectedCard, onSubmit }) => (
    <Row>
        <Col md={6}>
            <Card>
                <CardBody>
                    <CardTitle tag="h5"><h3>{selectedCard.title}</h3> 에 대해 질문하실 것이 무엇인가요?</CardTitle>
                    <Input
                        type="textarea"
                        value={question}
                        onChange={(e) => setQuestion(e.target.value)}
                        placeholder="질문을 입력하세요..."
                    />
                    <Button color="primary" className="mt-3" onClick={onSubmit}>질문하기</Button>
                </CardBody>
            </Card>
        </Col>
        <Col md={6}>
            <Card>
                <CardBody>
                    <CardTitle tag="h5">답변</CardTitle>
                    <ReactMarkdown rehypePlugins={[rehypeRaw]}>
                        {answer}
                    </ReactMarkdown>
                </CardBody>
            </Card>
        </Col>
    </Row>
);

const LoadingModal = ({ isOpen }) => (
    <Modal isOpen={isOpen} centered>
        <ModalBody className="text-center">
            <img src='https://i.postimg.cc/nzMSGBVr/plane-6593-256.gif' alt='loading,...'/>
            <h4 className="mt-3">AI가 분석중입니다...</h4>
        </ModalBody>
    </Modal>
);


const AiQuestion = () => {
    const [selectedCard, setSelectedCard] = useState(null);
    const [question, setQuestion] = useState('');
    const [answer, setAnswer] = useState('');
    const [isLoading, setIsLoading] = useState(false);


    const cardInfo = [
        { title: '공항 관련 정보', value: 'airport' },
        { title: '체크인 카운터 정보', value: 'checkInCounter' },
        { title: '탑승구 정보', value: 'gate' },
        { title: '수화물 수취대 정보', value: 'baggageClaim' },
        { title: '점포 정보', value: 'store' },
        { title: '편의 시설 정보', value: 'facilities' },
        { title: '창고 정보', value: 'storage' },
        { title: '장비재고 정보', value: 'equipment' },
    ];

    const handleSubmit = async () => {
        if (!selectedCard || !question) return;

        setIsLoading(true);
        try {
            const response = await api.post(`/api/v1/ai/info/${selectedCard.value}`, {
                messages: [
                    { role: "user", content: question }
                ],
                model: "gpt-4-32k"
            });

            if (response.data && response.data.data && response.data.data.choices && response.data.data.choices.length > 0) {
                setAnswer(response.data.data.choices[0].message.content);
            } else {
                setAnswer('응답을 받아오는 데 문제가 발생했습니다.');
            }
        } catch (error) {
            console.error('Error:', error);
            setAnswer('서버 요청 중 오류가 발생했습니다.');
        } finally {
            setIsLoading(false);
        }
    };

    const handleCardClick = (card) => {
        setSelectedCard({
            title: card.title,
            value: card.value,
        });
        setAnswer('');
        setQuestion('');
    };


    return (
        <>
            <BreadCrumbs />
            <div>
                <Row>
                    {cardInfo.map((card, index) => (
                        <Col key={index} md={3}>
                            <InfoCard
                                title={card.title}
                                onClick={() => handleCardClick(card)}
                            />
                        </Col>
                    ))}
                </Row>
                {selectedCard !== null && (
                    <DetailView
                        question={question}
                        setQuestion={setQuestion}
                        answer={answer}
                        selectedCard={selectedCard}
                        onSubmit={handleSubmit}
                    />
                )}
            </div>
            <LoadingModal isOpen={isLoading} />
        </>
    );
};

export default AiQuestion;