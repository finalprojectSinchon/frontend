import React, {useEffect, useState} from 'react';
import {
    Row,
    Col,
    Card,
    CardBody,
    Carousel,
    CarouselItem,
    CarouselControl,
    Badge,
    Label,
    FormGroup,
    Button,
    Input,
} from 'reactstrap';
import BreadCrumbs from '../../layouts/breadcrumbs/BreadCrum';
import img1 from '../../assets/images/products/s1.jpg';
import img2 from '../../assets/images/products/s2.jpg';
import img3 from '../../assets/images/products/s3.jpg';
import {useParams, useNavigate} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import {fetchEquipment, modifyEquipment, deleteEquipment} from '../../store/apps/equipment/equipmentSlice';
import ManagerDragAndDrop from "src/components/apps/managerDargAndDrop/ManagerDragAndDrop.js";
import api from "src/store/apps/airplane/api.js";



const EquipmentDetail = () => {
    const {equipmentCode} = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const equipmentDetail = useSelector(state => state.equipments.equipmentDetail);

    useEffect(() => {
        dispatch(fetchEquipment({equipmentCode}));
    }, [dispatch, equipmentCode]);

    useEffect(() => {
        if (equipmentDetail && equipmentDetail.data) {
            setEquipmentInfo(equipmentDetail.data);
        }
        setAirportType('equipment');
        api.post('/api/v1/managers', {
            airportType: airportType,
            airportCode: equipmentCode
        })
            .then(res => res.data)
            .then(data => {
                setManager(data.data)
            })
    }, [equipmentDetail]);


    const [equipmentInfo, setEquipmentInfo] = useState({});
    const [readOnly, setReadOnly] = useState(true);
    console.log('equipmentInfo', equipmentInfo);

    const [manager, setManager] = useState([]);
    const [airportType, setAirportType] = useState()

    const [activeIndex, setActiveIndex] = React.useState(0);
    const [animating, setAnimating] = React.useState(false);

    const next = () => {
        if (animating) return;
        const nextIndex = activeIndex === items.length - 1 ? 1 : activeIndex + 1;
        setActiveIndex(nextIndex);
    };

    const previous = () => {
        if (animating) return;
        const nextIndex = activeIndex === 0 ? items.length - 1 : activeIndex - 1;
        setActiveIndex(nextIndex);
    };

    const slides = items.map(item => {
        return (
            <CarouselItem
                onExiting={() => setAnimating(true)}
                onExited={() => setAnimating(false)}
                key={item.src}
            >
                <img src={item.src} alt={item.altText} width="100%"/>
            </CarouselItem>
        );
    });
    const onChangeHandler = e => {
        const {name, value} = e.target;
        setEquipmentInfo({
            ...equipmentInfo,
            [name]: value
        });
    };
    const handleSave = () => {
        dispatch(modifyEquipment({equipmentCode, equipmentInfo: equipmentInfo}))
        // navigate('/equipment');
        // window.location.reload();

    };

    const handleDelete = () => {
        dispatch(deleteEquipment({equipmentCode}))
        navigate('/equipment');
        window.location.reload();
    };

    return (
        <div>
            <BreadCrumbs/>
            <Row>
                <Col lg="12">
                    <Card>
                        <CardBody>
                            <Row>
                                <Col lg="6">
                                    <Carousel activeIndex={activeIndex} next={next} previous={previous}>
                                        {slides}
                                        <CarouselControl
                                            direction="prev"
                                            directionText="Previous"
                                            onClickHandler={previous}
                                        />
                                        <CarouselControl direction="next" directionText="Next" onClickHandler={next}/>
                                    </Carousel>
                                </Col>

                                <Col lg="6">
                                    <Badge color="success">{equipmentInfo.category}</Badge>
                                    <h3 className="mt-2 mb-3">{equipmentInfo.equipmentName}</h3>
                                    <h2>{equipmentInfo.equipmentPrice}원</h2>
                                    <br/>

                                    <Row>
                                        <Col md="6">
                                            <FormGroup>
                                                <Label>Location</Label>
                                                <Input
                                                    type="text"
                                                    placeholder="장비 재고의 위치를 입력하세요"
                                                    name="location"
                                                    onChange={onChangeHandler}
                                                    readOnly={readOnly}
                                                    value={equipmentInfo.location || ''}
                                                />

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
                                                    value={equipmentInfo.status || ''}
                                                >
                                                    <option value="정상">정상</option>
                                                    <option value="점검중">점검중</option>
                                                    <option value="고장">고장</option>
                                                </Input>

                                            </FormGroup>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col md="6">
                                            <FormGroup><Label>Name</Label>
                                                <Input
                                                    type="text"
                                                    name="equipmentName"
                                                    placeholder="장비 이름을 입력하세요"
                                                    readOnly={readOnly}
                                                    onChange={onChangeHandler}
                                                    value={equipmentInfo.equipmentName || ''}
                                                />

                                            </FormGroup>
                                        </Col>
                                        <Col md="6">
                                            <FormGroup>
                                                <Label>Price</Label>
                                                <Input
                                                    type="number"
                                                    name="equipmentPrice"
                                                    placeholder="--원"
                                                    readOnly={readOnly}
                                                    onChange={onChangeHandler}
                                                    value={equipmentInfo.equipmentPrice || ''}
                                                />

                                            </FormGroup>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col md="6">
                                            <FormGroup>
                                                <Label>Quantity</Label>
                                                <Input
                                                    type="text"
                                                    name="equipmentQuantity"
                                                    placeholder='수량을 기입하세요.'
                                                    readOnly={readOnly}
                                                    onChange={onChangeHandler}
                                                    value={equipmentInfo.equipmentQuantity || ''}
                                                />
                                            </FormGroup>
                                        </Col>

                                    </Row>

                                    <br/>
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
                            </Row>
                        </CardBody>
                    </Card>
                </Col>
            </Row>
            <Row>
                <Col>
                    <Card>
                        <CardBody>
                            <h4>장비</h4>
                            <br/>
                            <Row>
                                <Col lg="6">
                                    <h5>항공기 정비 장비</h5>
                                    <hr/>
                                    <p>
                                        - 항공기 견인차 <br/>
                                        - 유압 잭<br/>
                                        - 엔진 리프트<br/>
                                        - 바퀴 및 브레이크 수리 도구<br/>
                                    </p>
                                    <br/>
                                    <h5>전기 및 전자 장비</h5>
                                    <hr/>
                                    <p>
                                        - 활주로 조명 수리 키트 <br/>
                                        - 공항 내부 조명 장비 <br/>
                                        - 전기 배선 검사 도구 <br/>
                                        - 발전기 및 UPS 장비 <br/>
                                    </p>
                                    <br/>
                                    <h5>화재 및 안전 장비</h5>
                                    <hr/>
                                    <p>
                                        - 소화기 및 소화 시스템 검사 도구 <br/>
                                        - 화재 경보기 및 감지기 설치 장비 <br/>
                                        - 비상 대피 장비 <br/>
                                    </p>
                                    <br/>
                                    <h5>건설 및 건축 장비</h5>
                                    <hr/>
                                    <p>
                                        - 드릴 및 해머 <br/>
                                        - 레벨 및 측량 장비 <br/>
                                        - 페인트 도구 및 장비 <br/>
                                        - 목재 및 금속 작업 도구 <br/>
                                    </p>
                                </Col>
                                <Col lg="6">
                                    <h5>활주로 및 계류장 유지보수 장비</h5>
                                    <hr/>
                                    <p>
                                        - 활주로 청소기 <br/>
                                        - 제설 장비 (제설기, 염화칼슘 살포기) <br/>
                                        - 활주로 표지판 설치 도구 <br/>
                                        - 아스팔트 및 콘크리트 보수 장비 <br/>
                                    </p>
                                    <br/>
                                    <h5>통신 및 네트워크 장비</h5>
                                    <hr/>
                                    <p>
                                        - 무선 통신 장비 <br/>
                                        - 네트워크 케이블 검사 도구 <br/>
                                        - 라우터 및 스위치 설치 장비 <br/>
                                    </p>
                                    <br/>
                                    <h5>청소 장비</h5>
                                    <hr/>
                                    <p>
                                        - 진공 청소기 <br/>
                                        - 바닥 세정기 <br/>
                                        - 쓰레기 수거 도구 <br/>
                                        - 오염 물질 처리 장비 <br/>
                                    </p>
                                    <br/>
                                    <h5>운송 및 물류 장비</h5>
                                    <hr/>
                                    <p>
                                        - 리프트 트럭 <br/>
                                        - 팔레트 잭 <br/>
                                        - 카고 컨베이어 <br/>
                                        - 이동식 작업대 <br/>
                                    </p>
                                </Col>
                            </Row>
                        </CardBody>
                    </Card>
               </Col>
            </Row>
        </div>
    );
};

export default EquipmentDetail;
