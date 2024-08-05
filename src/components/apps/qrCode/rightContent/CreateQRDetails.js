import React from "react";
import { useSelector } from "react-redux";
import { Container, Row, Col, Card, CardBody, CardTitle, Button } from "reactstrap";
import QRCode from "qrcode.react";
import './CreateQRDetails.css'; // Assuming you will create this CSS file for custom styles

const CreateQRDetails = () => {
    const content = useSelector((state) => state.createQR.rightContent);

    // Function to validate data
    const validateData = (data) => {
        if (!data.facilityId || !data.facilityName) return false;
        return true;
    };

    // Function to handle the download of QR code
    const handleDownloadClick = () => {
        if (!validateData(content)) {
            alert('올바르게 데이터를 입력해주세요');
            return;
        }

        const canvas = document.querySelector('canvas');
        const url = canvas ? canvas.toDataURL('image/png') : '';
        const link = document.createElement('a');
        link.href = url;
        link.download = `qr-${content.facilityId}.png`;
        link.click();
    };

    return (
        <Container className="my-5">
            <Row className="justify-content-center">
                <Col xs="auto">
                    <Card className="border-primary rounded-lg shadow-sm">
                        <CardBody className="p-4 text-center">
                            {content ? (
                                <>
                                    <CardTitle tag="h4" className="mb-4 text-primary">
                                        시설물 QR 코드
                                    </CardTitle>
                                    <CardBody>
                                    <QRCode
                                        value={JSON.stringify(content)}
                                        size={250} // Larger size for better visibility
                                        fgColor="#333"
                                        bgColor="#f9f9f9"
                                        className="my-4 qr-code"
                                    />
                                    </CardBody>
                                    <Button
                                        color="primary"
                                        className="mt-3"
                                        onClick={handleDownloadClick}
                                    >
                                        QR 코드 다운로드
                                    </Button>
                                </>
                            ) : (
                                <h3 className="text-muted">시설물을 클릭하세요</h3>
                            )}
                        </CardBody>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
};

export default CreateQRDetails;
