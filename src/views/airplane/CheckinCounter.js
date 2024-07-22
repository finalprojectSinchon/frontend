import React, { useState, useRef, useEffect } from 'react';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import { Card, CardBody, CardTitle, CardSubtitle, Button } from 'reactstrap';
import { useDispatch, useSelector } from 'react-redux';
import { fetchChkinCounters  } from '../../store/apps/airplane/chkinCounterSlice';
import { useNavigate } from 'react-router-dom';
import BreadCrumbs from '../../layouts/breadcrumbs/BreadCrumbs';
import './img.css';

function onAfterDeleteRow(rowKeys) {
  alert(`The rowkey you drop: ${rowKeys}`);
}

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
  if (cell === '고장') {
    styleClass = 'bg-danger';
  } else if (cell === '점검중') {
    styleClass = 'bg-warning';
  } else {
    styleClass = 'bg-success';
  }
  
  return (
    <span className={`p-2 rounded-circle d-inline-block ${styleClass}`}></span>
  );
};


const Datatables = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const chkinCounterList = useSelector((state) => state.chkinCounters.chkinCounterList);

   // 초기 퍼센트 좌표 설정
   const initialMapData = [
    { id: 1, coords: "12.5%,58%,16%,80%", href: "#section1", label: "Section 1" },
    { id: 2, coords: "17%,50%,21%,70%", href: "#section2", label: "Section 2" },
    { id: 3, coords: "22%,40%,25.5%,60%", href: "#section3", label: "Section 3" },
    { id: 4, coords: "27%,33%,30%,49%", href: "#section4", label: "Section 4" },
    { id: 5, coords: "33%,28%,36%,45%", href: "#section5", label: "Section 5" },
    { id: 6, coords: "39%,23%,42%,43%", href: "#section6", label: "Section 6" },
    { id: 7, coords: "51%,23%,54%,43%", href: "#section7", label: "Section 7" },
    { id: 8, coords: "57%,24%,60%,44%", href: "#section8", label: "Section 8" },
    { id: 9, coords: "62%,27%,65.5%,49%", href: "#section9", label: "Section 9" },
    { id: 10, coords: "68%,29%,71%,53%", href: "#section10", label: "Section 10" },
    { id: 11, coords: "73%,36%,77%,60%", href: "#section11", label: "Section 11" },
    { id: 12, coords: "79%,47%,82%,67%", href: "#section12", label: "Section 12" },
    { id: 13, coords: "83%,55%,87%,75%", href: "#section13", label: "Section 13" }
  ];

  const [mapData, setMapData] = useState(initialMapData);
  const imageRef = useRef(null);

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
    adjustCoords();
    window.addEventListener('resize', adjustCoords);

    return () => {
      window.removeEventListener('resize', adjustCoords);
    };
  }, []);


  const options = {
    afterDeleteRow: onAfterDeleteRow, 
    afterSearch, 
    onRowClick: (row) => {
      console.log('Row clicked: ', row);
      navigate(`/airplane/checkin-counter/${row.checkinCounterCode}`);
    
    },
  };


  useEffect(() => {
    dispatch(fetchChkinCounters());
  }, [dispatch]);

  

  if (!chkinCounterList || !chkinCounterList.data || !chkinCounterList.data.chkinCounterList) {
    return <div>Loading...</div>;
  }

  const flatChkinCounterList = chkinCounterList.data.chkinCounterList.map(chkincounter => ({
    ...chkincounter,
    airline: chkincounter.airplane.airline,
    scheduleDateTime: chkincounter.airplane.scheduleDateTime
  }));



  return (
    <div>
    <div style={{ position: 'relative' }}>
        <img 
          src='/3.png' 
          useMap='#roadmap' 
          alt='Roadmap' 
          ref={imageRef} 
          style={{ width: '100%', height: 'auto' }}
        />
        <map name='roadmap'>
          {mapData.map(area => (
            <area 
              key={area.id}
              shape='rect'
              coords={area.coords}
              href={area.href}
              onClick={() => console.log(`Clicked on ${area.label}`)}
              alt={area.label}
            />
          ))}
        </map>
        {/* 스타일 적용 영역 */}
        {mapData.map(area => {
          const [x1, y1, x2, y2] = area.coords.split(',').map(Number);
          return (
            <div
              key={area.id}
              className='image-map-area'
              style={{
                position: 'absolute',
                border: '2px solid rgba(255, 0, 0, 0.5)',
                backgroundColor: 'rgba(255, 0, 0, 0.2)',
                left: `${x1}px`,
                top: `${y1}px`,
                width: `${x2 - x1}px`,
                height: `${y2 - y1}px`,
              }}
            />
          );
        })}
      </div>
      
      <Card>
        <CardBody>
          <BreadCrumbs />
          {/* <CardTitle tag="h5">비행기</CardTitle>
          <CardSubtitle className="mb-2 text-muted" tag="h6">
            체크인 카운터
          </CardSubtitle> */}
          
          <BootstrapTable
            hover
            search 
            data={flatChkinCounterList}
            insertRow
            deleteRow
            selectRow={selectRowProp}
            pagination
            options={options}
            tableHeaderClass="mb-10"
            exportCSV
            headerStyle={{ width: '100%' }}
          >
            <TableHeaderColumn width="14.28%" dataField="checkinCounterCode" dataAlign="center" isKey>
              Counter Code
            </TableHeaderColumn>
            <TableHeaderColumn width="14.28%" dataField="location" dataAlign="center">
              Location
            </TableHeaderColumn>
            <TableHeaderColumn width="14.28%" dataField="manager" dataAlign="center">
              Manager
            </TableHeaderColumn>
            <TableHeaderColumn width="14.28%" dataField="airline" dataAlign="center">
              Airline
            </TableHeaderColumn>
            <TableHeaderColumn width="14.28%" dataField="status" dataAlign="center" dataFormat={statusFormatter}>
              Status
            </TableHeaderColumn>
            <TableHeaderColumn width="14.28%" dataField="scheduleDateTime" dataAlign="center">
              Schedule DateTime
            </TableHeaderColumn>
            
          </BootstrapTable>
        </CardBody>
      </Card>
    </div>
  );
};

export default Datatables;
