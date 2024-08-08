import React, { useState, useRef, useEffect } from 'react';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import { Card, CardBody, CardTitle, Table, Button } from 'reactstrap';
import { useDispatch, useSelector } from 'react-redux';
import { fetchGates1 } from '../../store/apps/airplane/gateSlice';
import BreadCrumbs from '../../layouts/breadcrumbs/BreadCrumbs';
import './gate2.css';

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

const Gate2 = () => {
    const dispatch2 = useDispatch();
    const gateList2 = useSelector((state) => state.gates.gateList);
    const initialMapData2 = [
        { id: 101, coords: "95%,47%,98%,57%", label: "101" },
        { id: 102, coords: "94%,32%,97%,42%", label: "102" },
        { id: 103, coords: "92%,70%,95%,80%", label: "103" },
        { id: 104, coords: "90.5%,20%,93.5%,30%", label: "104" },
        { id: 105, coords: "87%,74%,90%,84%", label: "105" },
        { id: 106, coords: "87%,14%,90%,24%", label: "106" },
        { id: 107, coords: "80%,74%,83%,84%", label: "107" },
        { id: 108, coords: "81%,14%,84%,24%", label: "108" },
        { id: 109, coords: "74.5%,74%,77.5%,84%", label: "109" },
        { id: 110, coords: "75%,14%,78%,24%", label: "110" },
        { id: 111, coords: "66.5%,74%,69.5%,84%", label: "111" },
        { id: 112, coords: "67%,14%,70%,24%", label: "112" },
        { id: 113, coords: "60%,74%,63%,84%", label: "113" },
        { id: 114, coords: "60%,14%,63%,24%", label: "114" },
        { id: 115, coords: "54%,74%,57%,84%", label: "115" },
        { id: 117, coords: "48%,74%,51%,84%", label: "117" },
        { id: 118, coords: "43%,14%,46%,24%", label: "118" },
        { id: 119, coords: "42%,80%,45%,90%", label: "119" },
        { id: 120, coords: "42%,90%,45%,100%", label: "120" },
        { id: 121, coords: "35%,74%,38%,84%", label: "121" },
        { id: 122, coords: "35%,14%,38%,24%", label: "122" },
        { id: 123, coords: "28.3%,74%,31.3%,84%", label: "123" },
        { id: 124, coords: "28.5%,14%,31.5%,24%", label: "124" },
        { id: 125, coords: "20.5%,74%,23.5%,84%", label: "125" },
        { id: 126, coords: "21%,14%,24%,24%", label: "126" },
        { id: 127, coords: "14%,74%,17%,84%", label: "127" },
        { id: 128, coords: "14%,14%,17%,24%", label: "128" },
        { id: 129, coords: "9%,74%,12%,84%", label: "129" },
        { id: 130, coords: "10%,14%,13%,24%", label: "130" },
        { id: 131, coords: "3%,64%,6%,74%", label: "131" },
        { id: 132, coords: "2%,40%,5%,50%", label: "132" }
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
        dispatch2(fetchGates1());
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
    const matchedGate2 = gateList2.data.gateList.find(gate => gate.gateCode === (hoveredAreaData2 ? hoveredAreaData2.label : ''));


    console.log(matchedGate2,"ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ")
    return (
        <div>
            <div className="image-map-container">
                <img
                    src='/4.png'
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
                    // const circleClass = gateList2.data.gateList.find(gate => gate.gateCode === area.label).status == "사용가능" ? 'green-circle2' : 'red-circle2';
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
                                        <td>{matchedGate2.location}</td>
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

export default Gate2;
