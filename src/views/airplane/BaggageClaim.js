import React, { useState, useRef, useEffect } from 'react';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import { Card, CardBody, Popover, PopoverHeader, PopoverBody, Table, Button } from 'reactstrap';
import { useDispatch, useSelector } from 'react-redux';
import { fetchBaggageClaims  } from '../../store/apps/airplane/baggageClaimSlice';
import { useNavigate } from 'react-router-dom';
import BreadCrumbs from '../../layouts/breadcrumbs/BreadCrumbs';
import './img.css';
import api from "src/store/apps/airplane/api.js";




function onAfterDeleteRow(rowKeys) {
  rowKeys.forEach(deleteRow);

}

const deleteRow = async (baggageClaimCode) => {
  api.put(`/api/v1/airplane/baggage-claim/${baggageClaimCode}/delete`)
      .then(res => {
        alert("삭제 성공")
      })
      .catch(err => {
        alert("삭제 실패")
        console.error('err',err)
      })
};


function afterSearch(searchText, result) {
  console.log(`Your search text is ${searchText}`);
  console.log('result',result)
}


const selectRowProp = {
  mode: 'checkbox',

};

const cellEditProp = {
  mode: 'click',
  blurToSave: true,
};

// 좌표를 퍼센트에서 픽셀로 변환
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
  if (cell === '사용중') {
    styleClass = 'bg-success2';
  } else if (cell === '사용가능') {
    styleClass = 'bg-danger2';
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
const Datatables = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const baggageClaimList = useSelector((state) => state.baggageClaims.baggageClaimList);

  const userInfo = useSelector((state) => state.userInfo)

  useEffect(() => {
    if (userInfo && userInfo.userRole) {
      if (userInfo.userRole !== "ROLE_ADMIN" && userInfo.userRole !== "ROLE_AIRPLANE") {
        navigate('/auth/permission-error');
      }
    }
  }, [userInfo, navigate]);

  // 초기 퍼센트 좌표 설정
  const initialMapData = [
    { id: 1, coords: "24%,55%,27%,75%", href: "#section1", label: "13" },
    { id: 2, coords: "27.5%,50%,30.5%,70%", href: "#section2", label: "12" },
    { id: 3, coords: "31%,45%,34%,65%", href: "#section3", label: "11" },
    { id: 4, coords: "34.5%,40%,37.5%,60%", href: "#section4", label: "10" },
    { id: 5, coords: "39%,35%,42%,55%", href: "#section5", label: "9" },
    { id: 6, coords: "43%,30%,46%,50%", href: "#section6", label: "8" },
    { id: 7, coords: "51%,30%,55%,50%", href: "#section7", label: "7" },
    { id: 8, coords: "56%,35%,59.5%,55%", href: "#section8", label: "6" },
    { id: 9, coords: "60%,37%,63.5%,58%", href: "#section9", label: "5" },
    { id: 10, coords: "64.5%,39%,68%,60%", href: "#section10", label: "4" },
    { id: 11, coords: "68.5%,42%,72%,62%", href: "#section11", label: "3" },
    { id: 12, coords: "72.5%,47%,75%,67%", href: "#section12", label: "2" },
    { id: 13, coords: "75.5%,53%,78%,72%", href: "#section13", label: "1" }
  ];

  const [mapData, setMapData] = useState(initialMapData);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [popoverOpen, setPopoverOpen] = useState(null);
  const imageRef = useRef(null);
  const popoverTargets = useRef({});

  // 좌표 조정 함수
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

  // 창 크기 변경 및 초기 로딩 시 좌표 조정
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
      console.log('Row clicked: ', row);
      navigate(`/airplane/baggage-claim/${row.baggageClaimCode}`);
    
    },
  };


  useEffect(() => {
    dispatch(fetchBaggageClaims());
  }, [dispatch]);

  

  if (!baggageClaimList || !baggageClaimList.data || !baggageClaimList.data.baggageClaimList) {
    return <div>Loading...</div>;
  }

  const flatBaggageClaimList = baggageClaimList.data.baggageClaimList.map(baggageClaim => ({
    ...baggageClaim,
    airline: baggageClaim?.airline,
    scheduleDateTime: formatDateTime(baggageClaim.scheduleDateTime)
  }));

  const handleMouseEnter = (id) => {
    setPopoverOpen(id);
  };

  const handleMouseLeave = () => {
    setPopoverOpen(null);
  };

  const handlerRegist = (location) => () => {
    navigate(`/airplane/baggage-claim/regist`, { state: { location: location } });
  };

  const onClickHandler = (baggageClaimCode) =>() => {
    navigate('/airplane/baggage-claim/'+baggageClaimCode);
  }


  return (
    
    <div>
      <div className="container">
        <div style={{ position: 'relative' }}>
          <img
            src='/1.png'
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
            // const matchedCounter = flatBaggageClaimList.find(chkincounter => chkincounter.baggageClaimCode === area.id);
            // const circleClass = matchedCounter ? 'red-circle' : 'green-circle'; // 조건에 따른 동그라미 색상
            const circleClass = (() => {
              const matchedCounter = flatBaggageClaimList.find(chkincounter => chkincounter.baggageClaimCode == area.id);

              if (!matchedCounter) {
                // 만약 매칭되는 항목이 없으면 기본 색상으로 설정
                console.warn(`Gate with code ${area.id} not found.`);
                return 'red-circle';
              }

              return matchedCounter.status === "사용가능" ? 'green-circle' : 'red-circle';
            })();
            return (
              <div
                key={`circle-${area.id}`}
                className={circleClass}
                style={{
                  left: `${x1+23}px`, // 동그라미의 중심 위치
                  top: `${y1 + (y2 - y1) / 2}px`, // 동그라미의 중심 위치
                  position: 'absolute'
                }}
              ></div>
            );
          })}
          {mapData.map(area => {
            const [x1, y1, x2, y2] = area.coords.split(',').map(Number);
            const matchedCounter = flatBaggageClaimList.find(chkincounter => chkincounter.baggageClaimCode == area.label);

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
                  width:'260px'
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
                          <td>{matchedCounter?.airline}</td>
                        </tr>
                        <tr>
                          <td><strong>출발/도착시간:</strong></td>
                          <td>{matchedCounter?.scheduleDateTime}</td>
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
                        <Button className='custom-button' onClick={onClickHandler(matchedCounter.baggageClaimCode)}>
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
          {/* <CardTitle tag="h5">비행기</CardTitle>
          <CardSubtitle className="mb-2 text-muted" tag="h6">
            수화물 수취대  
          </CardSubtitle> */}
          <BreadCrumbs />
        
          <BootstrapTable
            hover
            search 
            data={flatBaggageClaimList}
            insertRow
            deleteRow
            selectRow={selectRowProp}
            // pagination
            options={options}
            tableHeaderClass="mb-10"
            exportCSV
            headerStyle={{ width: '100%' }}
          >
            <TableHeaderColumn width="20.00%" dataField="baggageClaimCode" dataAlign="center" isKey>
              수화물 수취대번호
            </TableHeaderColumn>
                 <TableHeaderColumn width="20.00%" dataField="manager" dataAlign="center">
              담당자
            </TableHeaderColumn>
            <TableHeaderColumn width="20.00%" dataField="airline" dataAlign="center">
              항공사
            </TableHeaderColumn>
            <TableHeaderColumn width="20.00%" dataField="status" dataAlign="center" dataFormat={statusFormatter}>
              상태
            </TableHeaderColumn>
            <TableHeaderColumn width="20.00%" dataField="scheduleDateTime" dataAlign="center">
              비행기 도착시간
            </TableHeaderColumn>
            
          </BootstrapTable>
        </CardBody>
      </Card>
    </div>
  );
};

export default Datatables;
