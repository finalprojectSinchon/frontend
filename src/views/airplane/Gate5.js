import React, { useState, useRef, useEffect } from 'react';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import { Card, CardBody, CardTitle, Table, Button } from 'reactstrap';
import { useDispatch, useSelector } from 'react-redux';
import { fetchGates } from '../../store/apps/airplane/gateSlice';
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
    if (cell === '고장') {
        styleClass = 'bg-danger2';
    } else if (cell === '점검중') {
        styleClass = 'bg-warning2';
    } else {
        styleClass = 'bg-success2';
    }

    return (
        <span className={`p-2 rounded-circle d-inline-block ${styleClass}`}></span>
    );
};

const Gate4 = () => {
    const dispatch2 = useDispatch();
    const gateList2 = useSelector((state) => state.gates.gateList);

    const initialMapData2 = [
        { id: 50, coords: "12%,92%,15%,102%", label: "Section 50" },
        { id: 49, coords: "7%,90%,10%,100%", label: "Section 49" },
        { id: 48, coords: "3%,72%,6%,82%", label: "Section 48" },
        { id: 47, coords: "4.5%,58%,7.5%,68%", label: "Section 47" },
        { id: 46, coords: "9%,42%,12%,52%", label: "Section 46" },
        { id: 45, coords: "13%,30%,16%,40%", label: "Section 45" },
        { id: 43, coords: "18%,18%,21%,28%", label: "Section 43" },
        { id: 42, coords: "23%,10%,26%,20%", label: "Section 42" },
        { id: 29, coords: "38%,3%,41%,13%", label: "Section 29" },
        { id: 28, coords: "45.3%,5%,48.3%,15%", label: "Section 28" },
        { id: 27, coords: "50.7%,5%,53.7%,15%", label: "Section 27" },
        { id: 26, coords: "56.2%,5%,59.2%,15%", label: "Section 26" },
        { id: 25, coords: "61%,6%,64%,16%", label: "Section 25" },
        { id: 11, coords: "79%,18%,82%,28%", label: "Section 11" },
        { id: 10, coords: "83%,28%,86%,38%", label: "Section 10" },
        { id: 9, coords: "88%,40%,91%,50%", label: "Section 9" },
        { id: 8, coords: "91%,53%,94%,63%", label: "Section 8" },
        { id: 7, coords: "92%,67%,95%,77%", label: "Section 7" },
        { id: 6, coords: "91%,83%,94%,93%", label: "Section 6" },








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
        dispatch2(fetchGates());
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
    const matchedGate2 = gateList2.data.gateList.find(gate => gate.location === (hoveredAreaData2 ? hoveredAreaData2.label : ''));

    return (
        <div>
            <div className="image-map-container">
                <img
                    src='/7.png'
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
                    const circleClass = gateList2.data.gateList.find(gate => gate.location === area.label) ? 'red-circle2' : 'green-circle2';

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
                                        <td>{matchedGate2.scheduleDateTime || '미정'}</td>
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
                            scheduleDateTime: gate.scheduleDateTime || '미정'
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
                        <TableHeaderColumn isKey dataField="gateCode" dataSort={true} headerAlign="center" dataAlign="center">
                            탑승구 코드
                        </TableHeaderColumn>
                        <TableHeaderColumn dataField="location" dataSort={true} headerAlign="center" dataAlign="center">
                            위치
                        </TableHeaderColumn>
                        <TableHeaderColumn dataField="status" dataSort={true} headerAlign="center" dataAlign="center" dataFormat={statusFormatter2}>
                            상태
                        </TableHeaderColumn>
                        <TableHeaderColumn dataField="airline" dataSort={true} headerAlign="center" dataAlign="center">
                            항공사
                        </TableHeaderColumn>
                        <TableHeaderColumn dataField="scheduleDateTime" dataSort={true} headerAlign="center" dataAlign="center">
                            출발/도착 시간
                        </TableHeaderColumn>
                    </BootstrapTable>
                </CardBody>
            </Card>
        </div>
    );
};

export default Gate4;