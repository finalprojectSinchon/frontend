import React, { useState, useRef, useEffect } from 'react';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import { Card, CardBody, Modal, ModalHeader, ModalBody, Button } from 'reactstrap';
import { useDispatch, useSelector } from 'react-redux';
import { fetchGates } from '../../store/apps/airplane/gateSlice';
import { useNavigate } from 'react-router-dom';
import BreadCrumbs from '../../layouts/breadcrumbs/BreadCrumbs';
import Gate2 from './Gate2';
import Gate3 from './Gate3';
import Gate4 from './Gate4';
import Gate5 from './Gate5';
import './gateimg2.css'; // Ensure this file contains necessary styles

const Datatables = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const gateList = useSelector((state) => state.gates.gateList);

  const initialMapData = [
    { id: 1, coords: "0%,0%,100%,25%", href: "#section1", label: "Section 1", component: 'Gate2' },
    { id: 2, coords: "0%,25%,50%,55%", href: "#section2", label: "Section 2", component: 'Gate3' },
    { id: 3, coords: "50%,25%,100%,55%", href: "#section3", component: 'Gate4' },
    { id: 4, coords: "0%,55%,100%,100%", href: "#section4", component: 'Gate5' }
  ];

  const [mapData, setMapData] = useState(initialMapData);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [openModals, setOpenModals] = useState({
    1: false, 2: false, 3: false, 4: false
  });
  const [hoveredArea, setHoveredArea] = useState(null);

  const imageRef = useRef(null);

  useEffect(() => {
    dispatch(fetchGates());
  }, [dispatch]);

  useEffect(() => {
    const adjustCoords = () => {
      if (imageRef.current) {
        const imgWidth = imageRef.current.clientWidth;
        const imgHeight = imageRef.current.clientHeight;

        const adjustedMapData = initialMapData.map(area => {
          const newCoords = convertPercentToCoords(area.coords, imgWidth, imgHeight);
          return { ...area, coords: newCoords };
        });

        setMapData(adjustedMapData);
      }
    };

    if (imageLoaded) {
      adjustCoords();
    }

    window.addEventListener('resize', adjustCoords);
    return () => {
      window.removeEventListener('resize', adjustCoords);
    };
  }, [imageLoaded]);

  useEffect(() => {
    if (Object.values(openModals).every(value => !value)) {
      dispatch(fetchGates());
    }
  }, [openModals, dispatch]);

  const handleClick = (id) => {
    setOpenModals(prevState => ({
      ...prevState,
      [id]: !prevState[id]
    }));
  };
  const statusFormatter = (cell) => {
    let styleClass;
    if (cell === '사용중') {
      styleClass = 'bg-danger';
    } else if (cell === '사용가능') {
      styleClass = 'bg-success1';
    } else {
      styleClass = 'bg-success1';
    }
    return (
        <span className={`p-2 rounded-circle d-inline-block ${styleClass}`}></span>
    );
  };

  if (!gateList || !gateList.data || !gateList.data.gateList) {
    return <div>Loading...</div>;
  }

  const flatGateList = gateList.data.gateList.map(gate => ({
    ...gate,
    airline: gate.airline || '미정',
    scheduleDateTime: formatDateTime(gate.scheduleDateTime) || '미정'
  }));

  const options = {
    afterDeleteRow: onAfterDeleteRow,
    afterSearch,
    onRowClick: (row) => {
      navigate(`/airplane/gate/${row.gateCode}`);
    },
  };

  return (
      <div>
        <div className="container">
          <BreadCrumbs />
          <div style={{ position: 'relative' }}>
            <img
                src='/2.png'
                useMap='#roadmap'
                alt='Roadmap'
                ref={imageRef}
                style={{ width: '100em', height: '40em' }}
                onLoad={() => setImageLoaded(true)}
            />
            <map name='roadmap'>
              {mapData.map(area => (
                  <area
                      key={area.id}
                      shape='rect'
                      coords={area.coords}
                      href={area.href}
                      alt={area.label}
                      id={`area-${area.id}`}
                      onClick={() => handleClick(area.id)}
                      onMouseEnter={() => setHoveredArea(area.id)}
                      onMouseLeave={() => setHoveredArea(null)}
                  />
              ))}
            </map>
            {mapData.map(area => {
              const [x1, y1, x2, y2] = area.coords.split(',').map(Number);
              const matchedGate = flatGateList.find(gate => gate.location === area.label);
              const circleClass = matchedGate ? 'red-circle' : 'green-circle';

              const ComponentToRender = componentMapping[area.component];

              return (
                  <React.Fragment key={`visual-${area.id}`}>
                    <div
                        className='image-map-area'
                        style={{
                          left: `${x1}px`,
                          top: `${y1}px`,
                          width: `${x2 - x1}px`,
                          height: `${y2 - y1}px`,
                          backgroundColor: hoveredArea === area.id ? 'rgba(0, 0, 0, 0.3)' : 'transparent',
                          pointerEvents: 'none'
                        }}
                    ></div>
                    <div
                        className={circleClass}
                        style={{
                          left: `${x1 + (x2 - x1) / 2}px`,
                          top: `${y1 + (y2 - y1) / 2}px`,
                          position: 'absolute',
                          width: '15px',
                          height: '15px',
                          borderRadius: '50%',
                          transform: 'translate(-50%, -50%)'
                        }}
                    ></div>
                    <Modal
                        isOpen={openModals[area.id] || false}
                        toggle={() => handleClick(area.id)}
                        className='custom-modal'
                        size="xl"
                    >
                      <ModalHeader toggle={() => handleClick(area.id)} className='custom-modal-header'>
                        {area.label}
                      </ModalHeader>
                      <ModalBody className='custom-modal-body'>
                        {ComponentToRender && <ComponentToRender hoveredArea={hoveredArea} areaId={area.id} />}
                        {matchedGate && (
                            <div>
                              <p>Location: {matchedGate.location}</p>
                              <p>Airline: {matchedGate.airline}</p>
                              <p>Schedule: {matchedGate.scheduleDateTime}</p>
                              <Button onClick={handlerRegist(matchedGate.location)}>Register</Button>
                              <Button onClick={onClickHandler(matchedGate.gateCode)}>View Details</Button>
                            </div>
                        )}
                      </ModalBody>
                    </Modal>
                  </React.Fragment>
              );
            })}
          </div>
          <div className="row mt-3">
            <div className="col-md-12">
              <Card>
                <CardBody>
                  <BootstrapTable
                      data={flatGateList}
                      pagination={true}
                      deleteRow={true}
                      selectRow={selectRowProp}
                      options={options}
                      search={true}
                      hover={true}
                      exportCSV
                      bordered={false}
                      className="custom-table1"
                  >
                    <TableHeaderColumn width="10%" isKey dataField="gateCode" dataSort={true} headerAlign="center" dataAlign="center">
                      탑승구 코드
                    </TableHeaderColumn>
                    <TableHeaderColumn width="20%" dataField="manager" dataSort={true} headerAlign="center" dataAlign="center">
                      담당자
                    </TableHeaderColumn>
                    <TableHeaderColumn width="20%" dataField="status" dataSort={true} headerAlign="center" dataAlign="center" dataFormat={statusFormatter}>
                      상태
                    </TableHeaderColumn>
                    <TableHeaderColumn  width="20%" dataField="airline" dataSort={true} headerAlign="center" dataAlign="center">
                      항공사
                    </TableHeaderColumn>
                    <TableHeaderColumn width="30%" dataField="scheduleDateTime" dataSort={true} headerAlign="center" dataAlign="center">
                      일정
                    </TableHeaderColumn>
                  </BootstrapTable>
                </CardBody>
              </Card>
            </div>
          </div>
        </div>
      </div>
  );
};

const convertPercentToCoords = (percentCoords, imgWidth, imgHeight) => {
  const percentValues = percentCoords.split(',').map(value => parseFloat(value.trim().replace('%', '')));
  return percentValues.map((percent, index) => (
      index % 2 === 0 ? (percent / 100) * imgWidth : (percent / 100) * imgHeight
  )).join(',');
};

const formatDateTime = (dateTime) => {
  if (!dateTime || dateTime === '미정') return '미정';
  const date = new Date(dateTime);
  return date.toLocaleString();
};

const statusFormatter = (cell, row) => {
  // Define your custom status formatting logic here
  return cell;
};

const onAfterDeleteRow = (rowKeys) => {
  // Handle row deletion here
};

const afterSearch = (searchText) => {
  // Handle search event here
};

const handlerRegist = (location) => () => {
  console.log("Register for location: ", location);
};

const onClickHandler = (gateCode) => () => {
  console.log("View details for gateCode: ", gateCode);
};

const selectRowProp = {
  mode: 'checkbox'
};

const componentMapping = {
  Gate2,
  Gate3,
  Gate4,
  Gate5
};

export default Datatables;
