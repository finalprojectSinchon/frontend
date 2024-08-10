import React, { useState, useRef, useEffect } from 'react';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import { Card, CardBody, CardTitle, Table, Button } from 'reactstrap';
import { useDispatch, useSelector } from 'react-redux';
import { fetchGates3 } from '../../store/apps/airplane/gateSlice';
import BreadCrumbs from '../../layouts/breadcrumbs/BreadCrumbs';
import './gate.css';

function onAfterDeleteRow2(rowKeys) {
    alert(`The rowkey you drop: ${rowKeys}`);
}

function afterSearch2(searchText, result) {
    console.log(`Your search text is ${searchText}`);
    console.log('result', result);
}

const selectRowProp2 = {
    mode: 'checkbox',
};

const convertPercentToCoords2 = (percentCoords, imgWidth, imgHeight) => {
    const coordsArray = percentCoords.split(',').map(coord => parseFloat(coord));

    return coordsArray.map((coord, index) => {
        return index % 2 === 0
            ? Math.round((coord / 100) * imgWidth)
            : Math.round((coord / 100) * imgHeight);
    }).join(',');
};

const statusFormatter2 = (cell, row) => {
    let styleClass;
    if (cell === '사용중') {
        styleClass = 'bg-danger2';
    } else if (cell === '사용가능') {
        styleClass = 'bg-success2';
    } else {
        styleClass = 'bg-success2';
    }

    return (
        <span className={`p-2 rounded-circle d-inline-block ${styleClass}`}></span>
    );
};
const formatDateTime = (dateTime) => {
    if (!dateTime || dateTime === '미정') return '미정';
    const date = new Date(dateTime);
    return date.toLocaleString();
};
const Gate4 = () => {
    const dispatch2 = useDispatch();
    const gateList2 = useSelector((state) => state.gates.gateList);

    const initialMapData2 = [
        { id: 12, coords: "52%,92%,60%,102%", label: "12" },
        { id: 14, coords: "56%,75%,64%,85%", label: "14" },
        { id: 15, coords: "62%,60%,70%,70%", label: "15" },
        { id: 16, coords: "66%,42%,74%,52%", label: "16" },
        { id: 17, coords: "68%,30%,76%,40%", label: "17" },
        { id: 18, coords: "64%,18%,72%,28%", label: "18" },
        { id: 19, coords: "54%,10%,62%,20%", label: "19" },
        { id: 20, coords: "43%,10%,51%,20%", label: "20" },
        { id: 21, coords: "33%,15%,41%,25%", label: "21" },
        { id: 22, coords: "29%,30%,37%,40%", label: "22" },
        { id: 23, coords: "23%,45%,31%,55%", label: "23" },
        { id: 24, coords: "21%,62%,29%,72%", label: "24" },
        { id: 26, coords: "17%,82%,25%,92%", label: "26" },




    ];

    const [mapData2, setMapData2] = useState(initialMapData2);
    const [imageLoaded2, setImageLoaded2] = useState(false);
    const [hoveredArea2, setHoveredArea2] = useState(null);
    const imageRef2 = useRef(null);
    const cardRef2 = useRef(null);

    const adjustCoords2 = () => {
        if (imageRef2.current) {
            const imgWidth2 = imageRef2.current.clientWidth;
            const imgHeight2 = imageRef2.current.clientHeight;

            const adjustedMapData2 = initialMapData2.map(area => {
                const newCoords = convertPercentToCoords2(area.coords, imgWidth2, imgHeight2);
                return { ...area, coords: newCoords };
            });

            setMapData2(adjustedMapData2);
        }
    };

    useEffect(() => {
        dispatch2(fetchGates3());
    }, [dispatch2]);

    useEffect(() => {
        if (imageLoaded2) {
            adjustCoords2();
        }
        window.addEventListener('resize', adjustCoords2);
        return () => {
            window.removeEventListener('resize', adjustCoords2);
        };
    }, [imageLoaded2]);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (cardRef2.current && !cardRef2.current.contains(event.target)) {
                setHoveredArea2(null);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const handleMouseEnter2 = (id) => {
        setHoveredArea2(id);
    };

    const handleMouseLeave2 = () => {
        // Do nothing; retain last hovered area
    };

    const handlerRegist2 = (location) => () => {
        // Navigate to registration page if needed
        // navigate(`/airplane/gate/regist`, { state: { location: location } });
    };

    const hoveredAreaData2 = mapData2.find(area => area.id === hoveredArea2);
    const matchedGate2 = gateList2.data.gateList.find(gate => gate.gateCode == (hoveredAreaData2 ? hoveredAreaData2.label : ''));

    return (
        <div>
            <div className="image-map-container">
                <img
                    src='/6.png'
                    useMap='#roadmap2'
                    alt='Roadmap'
                    ref={imageRef2}
                    onLoad={() => setImageLoaded2(true)}
                />
                <map name='roadmap2'>
                    {mapData2.map(area => (
                        <area
                            key={area.id}
                            shape='rect'
                            coords={area.coords}
                            alt={area.label}
                            id={`area-${area.id}`}
                            onMouseEnter={() => handleMouseEnter2(area.id)}
                            onMouseLeave={handleMouseLeave2}
                        />
                    ))}
                </map>
                {mapData2.map(area => {
                    const [x1, y1, x2, y2] = area.coords.split(',').map(Number);

                    return (
                        <div
                            key={`border-${area.id}`}
                            className='red-border-area'
                            style={{
                                left: `${x1}px`,
                                top: `${y1}px`,
                                width: `${x2 - x1}px`,
                                height: `${y2 - y1}px`,
                            }}
                        ></div>
                    );
                })}
                {mapData2.map(area => {
                    const [x1, y1, x2, y2] = area.coords.split(',').map(Number);
                    const circleClass = (() => {
                        const matchedGate = gateList2.data.gateList.find(gate => gate.gateCode == area.label);

                        if (!matchedGate) {
                            // 만약 매칭되는 항목이 없으면 기본 색상으로 설정
                            console.warn(`Gate with code ${area.label} not found.`);
                            return 'red-circle2';
                        }

                        return matchedGate.status === "사용가능" ? 'green-circle2' : 'red-circle2';
                    })();
                    return (
                        <div
                            key={`circle-${area.id}`}
                            className={circleClass}
                            style={{
                                left: `${x1 + (x2 - x1) / 2}px`,
                                top: `${y1 + (y2 - y1) / 2}px`,
                                position: 'absolute',
                                transform: 'translate(-50%, -50%)',
                            }}
                        ></div>
                    );
                })}
                {hoveredArea2 && (
                    <Card className='custom-card2 card-hover2' ref={cardRef2}>
                        <CardBody>
                            <div className="d-flex justify-content-between">
                                <CardTitle>{hoveredAreaData2?.label} 탑승구</CardTitle>
                                <Button
                                    close
                                    onClick={() => setHoveredArea2(null)}
                                />
                            </div>
                            {matchedGate2 ? (
                                <Table className='custom-table2'>
                                    <tbody>
                                    <tr>
                                        <td><strong>항공사:</strong></td>
                                        <td>{matchedGate2.airline}</td>
                                    </tr>
                                    <tr>
                                        <td><strong>위치:</strong></td>
                                        <td>{`${matchedGate2.gateCode} 번 탑승구`}</td>
                                    </tr>
                                    <tr>
                                    <td><strong>상태:</strong></td>
                                        <td>{statusFormatter2(matchedGate2.status)}</td>
                                    </tr>
                                    <tr>
                                        <td><strong>출발/도착 시간:</strong></td>
                                        <td>{formatDateTime(matchedGate2.scheduleDateTime)}</td>
                                    </tr>
                                    </tbody>
                                </Table>
                            ) : (
                                <div>해당 탑승구 정보 없음</div>
                            )}
                            <div className='custom-button-wrapper2'>
                                <Button className='custom-button2' onClick={handlerRegist2(hoveredAreaData2?.label)}>등록</Button>
                            </div>
                        </CardBody>
                    </Card>
                )}
            </div>

            <Card>
                <CardBody>
                    <BootstrapTable
                        data={gateList2.data.gateList.map(gate => ({
                            ...gate,
                            airline: gate.airline || '미정',
                            scheduleDateTime: formatDateTime(gate.scheduleDateTime)
                        }))}
                        pagination={true}
                        deleteRow={true}
                        selectRow={selectRowProp2}
                        options={{
                            afterDeleteRow: onAfterDeleteRow2,
                            afterSearch: afterSearch2,
                        }}
                        search={true}
                        hover={true}
                        exportCSV
                        bordered={false}
                        className="custom-table2"
                    >
                        <TableHeaderColumn width="10%" isKey dataField="gateCode" dataSort={true} headerAlign="center" dataAlign="center">
                            탑승구 코드
                        </TableHeaderColumn>
                        <TableHeaderColumn width="20%" dataField="manager" dataSort={true} headerAlign="center" dataAlign="center">
                            담당자
                        </TableHeaderColumn>
                        <TableHeaderColumn width="20%" dataField="status" dataSort={true} headerAlign="center" dataAlign="center" dataFormat={statusFormatter2}>
                            상태
                        </TableHeaderColumn>
                        <TableHeaderColumn width="20%" dataField="airline" dataSort={true} headerAlign="center" dataAlign="center">
                            항공사
                        </TableHeaderColumn>
                        <TableHeaderColumn width="20%" dataField="scheduleDateTime" dataSort={true} headerAlign="center" dataAlign="center">
                            출발/도착 시간
                        </TableHeaderColumn>
                    </BootstrapTable>
                </CardBody>
            </Card>
        </div>
    );
};

export default Gate4;
