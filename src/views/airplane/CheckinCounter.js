import React, { useState, useRef, useEffect } from 'react';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import { Card, CardBody, Popover, PopoverHeader, PopoverBody, Table, Button } from 'reactstrap';
import { useDispatch, useSelector } from 'react-redux';
import { fetchChkinCounters } from '../../store/apps/airplane/chkinCounterSlice';
import { useNavigate } from 'react-router-dom';
import BreadCrumbs from '../../layouts/breadcrumbs/BreadCrumbs';
import './img.css';
import api from "src/store/apps/airplane/api.js";

function onAfterDeleteRow(rowKeys) {
  rowKeys.forEach(deleteRow);

}

const deleteRow = async (checkinCounterCode) => {
  api.put(`/api/v1/airplane/checkin-counter/${checkinCounterCode}/delete`)
      .then(res => {
        alert("삭제 성공")
      })
      .catch(err => {
        alert("삭제 실패")
        console.error('err',err)
      })
};

function afterSearch(searchText, result) {

}

const selectRowProp = {
  mode: 'checkbox',

};
const formatDateTime = (dateTime) => {
  if (!dateTime || dateTime === '미정') return '미정';
  const date = new Date(dateTime);
  return date.toLocaleString();
};
const convertPercentToCoords = (percentCoords, imgWidth, imgHeight) => {
  const coordsArray = percentCoords.split(',').map(coord => parseFloat(coord));

  return coordsArray.map((coord, index) => {
    return index % 2 === 0
      ? Math.round((coord / 100) * imgWidth)
      : Math.round((coord / 100) * imgHeight);
  }).join(',');
};

const statusFormatter = (cell, row) => {
  let styleClass;

  // 항공사가 미정일 경우 상태와 상관없이 bg-danger로 설정
  if (row.airline === '미정') {
    styleClass = 'bg-danger';
  } else {
    // 기존 상태에 따른 스타일 설정
    if (cell === '사용가능') {
      styleClass = 'bg-success2';
    } else if (cell === '사용중') {
      styleClass = 'bg-warning';
    } else {
      styleClass = 'bg-success2';
    }
  }

  return (
      <span className={`p-2 rounded-circle d-inline-block ${styleClass}`}></span>
  );
};

const Datatables = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const chkinCounterList = useSelector((state) => state.chkinCounters.chkinCounterList);

  const userInfo = useSelector((state) => state.userInfo)

  useEffect(() => {
    if (userInfo && userInfo.userRole) {
      if (userInfo.userRole !== "ROLE_ADMIN" && userInfo.userRole !== "ROLE_AIRPLANE") {
        navigate('/auth/permission-error');
      }
    }
  }, [userInfo, navigate]);

  const initialMapData = [
    { id: 1, coords: "12.5%,58%,16%,80%", href: "#section1", label: "N" },
    { id: 2, coords: "17%,50%,21%,70%", href: "#section2", label: "M" },
    { id: 3, coords: "22%,40%,25.5%,60%", href: "#section3", label: "L" },
    { id: 4, coords: "27%,33%,30%,49%", href: "#section4", label: "K" },
    { id: 5, coords: "33%,28%,36%,45%", href: "#section5", label: "J" },
    { id: 6, coords: "39%,23%,42%,43%", href: "#section6", label: "H" },
    { id: 7, coords: "51%,23%,54%,43%", href: "#section7", label: "G" },
    { id: 8, coords: "57%,24%,60%,44%", href: "#section8", label: "F" },
    { id: 9, coords: "62%,27%,65.5%,49%", href: "#section9", label: "E" },
    { id: 10, coords: "68%,29%,71%,53%", href: "#section10", label: "D" },
    { id: 11, coords: "73%,36%,77%,60%", href: "#section11", label: "C" },
    { id: 12, coords: "79%,47%,82%,67%", href: "#section12", label: "B" },
    { id: 13, coords: "83%,55%,87%,75%", href: "#section13", label: "A" }
  ];

  const [mapData, setMapData] = useState(initialMapData);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [popoverOpen, setPopoverOpen] = useState(null);

  const imageRef = useRef(null);
  const popoverTargets = useRef({});

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

  useEffect(() => {
    dispatch(fetchChkinCounters());
  }, [dispatch]);

  useEffect(() => {
    if (imageLoaded) {
      adjustCoords();
    }
    window.addEventListener('resize', adjustCoords);
    return () => {
      window.removeEventListener('resize', adjustCoords);
    };
  }, [imageLoaded]);

  const options = {
    afterDeleteRow: onAfterDeleteRow,
    afterSearch,
    onRowClick: (row) => {
      navigate(`/airplane/checkin-counter/${row.checkinCounterCode}`);
    },
  };

  if (!chkinCounterList || !chkinCounterList.data || !chkinCounterList.data.chkinCounterList) {
    return <div>Loading...</div>;
  }

  const flatChkinCounterList = chkinCounterList.data.chkinCounterList.map(chkincounter => ({
    ...chkincounter,
    airline: chkincounter?.airline,
    scheduleDateTime: chkincounter?.scheduleDateTime,
    remark:chkincounter?.remark
  }));

  const handleMouseEnter = (id) => {
    setPopoverOpen(id);
  };

  const handleMouseLeave = () => {
    setPopoverOpen(null);
  };

  const handlerRegist = (location) => () => {
    navigate(`/airplane/checkin-counter/regist`, { state: { location: location } });
  };

  const onClickHandler = (checkinCounterCode) => () =>{
    navigate('/airplane/checkin-counter/'+checkinCounterCode);
  }
  return (
    <div>
      <div className="container">
        <div style={{ position: 'relative' }}>
          <img
            src='/3.png'
            useMap='#roadmap'
            alt='Roadmap'
            ref={imageRef}
            style={{ width: '100%', height: 'auto' }}
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
                onMouseEnter={() => handleMouseEnter(area.id)}
                ref={(el) => { popoverTargets.current[area.id] = el; }}
              />
            ))}
          </map>
          {mapData.map(area => {
            const [x1, y1, x2, y2] = area.coords.split(',').map(Number);
            const matchedCounter = flatChkinCounterList.find(chkincounter => chkincounter.location === area.label);
            if (!matchedCounter) {

            }
            const circleClass = matchedCounter ? 'green-circle' : 'red-circle'; // 조건에 따른 동그라미 색상 red-circle  green-circle

            return (
              <div
                key={`circle-${area.id}`}
                className={circleClass}
                style={{
                  left: `${x1+22}px`, // 동그라미의 중심 위치
                  top: `${y1 + (y2 - y1) / 2}px`, // 동그라미의 중심 위치
                  position: 'absolute'
                }}
              ></div>
            );
          })}
          {mapData.map(area => {
            const [x1, y1, x2, y2] = area.coords.split(',').map(Number);
            const matchedCounter = flatChkinCounterList.find(chkincounter => chkincounter.location === area.label);

            return (
              <Popover
                key={area.id}
                placement='top'
                isOpen={popoverOpen === area.id}
                target={`area-${area.id}`}
                toggle={handleMouseLeave}
                className='custom-popover'
                style={{
                  position: 'absolute',
                  left: `${x1}px`,
                  top: `${y1}px`,
                  transform: 'translate(-50%, -80%)', 
                  width:'250px'
                }}
              >
                <PopoverHeader className='custom-popover-header'>
                  {area.label} 카운터
                  <Button close onClick={handleMouseLeave} />
                </PopoverHeader>
                <PopoverBody className='custom-popover-body'>
                  {matchedCounter ? (
                    <Table className='custom-table'>
                      <tbody>
                        <tr>
                          <td><strong>항공사:</strong></td>
                          <td>{matchedCounter.airline}</td>
                        </tr>
                        <tr>
                          <td><strong>출발/도착시간:</strong></td>
                          <td>{formatDateTime(matchedCounter.scheduleDateTime)}</td>
                        </tr>
                        <tr>
                          <td><strong>위치:</strong></td>
                          <td>{matchedCounter.location} 탑승구</td>
                        </tr>
                      </tbody>
                    </Table>
                  ) : (
                    <Table className='custom-table'>
                      <tbody>
                      <tr>
                          <td><strong>항공사:</strong></td>
                          <td>등록 필요</td>
                        </tr>
                        <tr>
                          <td><strong>출발/도착시간:</strong></td>
                          <td>등록 필요</td>
                        </tr>
                        <tr>
                          <td><strong>위치:</strong></td>
                          <td>{area.label} 탑승구</td>
                        </tr>
                      </tbody>
                    </Table>
                  )}
                    <div className="custom-button-wrapper">
                      {matchedCounter ? (
                        <Button className='custom-button' onClick={onClickHandler(matchedCounter.checkinCounterCode)}>
                          상세보기
                        </Button>
                      ) : (
                        <Button className='custom-button' onClick={handlerRegist(area.label)}>
                          등록
                        </Button>
                      )}
                    </div>
                </PopoverBody>
              </Popover>
            );
          })}
        </div>
      </div>
      <Card>
        <CardBody>
          <BreadCrumbs />
          <BootstrapTable
            hover
            search
            data={flatChkinCounterList.map(data =>({
              ...data,
              airline: data.airline || '미정',
              scheduleDateTime: formatDateTime(data.scheduleDateTime)
            }))}
            selectRow={selectRowProp}
            pagination
            options={options}
            tableHeaderClass="mb-10"
            exportCSV
            headerStyle={{ width: '100%' }}
          >
            <TableHeaderColumn width="5%" dataField="checkinCounterCode" dataAlign="center" isKey>
              번호
            </TableHeaderColumn>
            <TableHeaderColumn width="20%" dataField="manager" dataAlign="center">
              담당자
            </TableHeaderColumn>
            <TableHeaderColumn width="20%" dataField="location" dataAlign="center">
              카운터
            </TableHeaderColumn>
            <TableHeaderColumn width="20%" dataField="airline" dataAlign="center">
              항공사
            </TableHeaderColumn>
            <TableHeaderColumn width="25%" dataField="scheduleDateTime" dataAlign="center">
              출발시간
            </TableHeaderColumn>
            <TableHeaderColumn width="20%" dataField="status" dataAlign="center" dataFormat={statusFormatter}>
              상태
            </TableHeaderColumn>
          </BootstrapTable>
        </CardBody>
      </Card>
    </div>
  );
};

export default Datatables;
