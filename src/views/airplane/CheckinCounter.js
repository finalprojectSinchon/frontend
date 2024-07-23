import React, { useState, useRef, useEffect } from 'react';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import { Card, CardTitle, CardBody, Popover, PopoverHeader, PopoverBody } from 'reactstrap';
import { useDispatch, useSelector } from 'react-redux';
import { fetchChkinCounters } from '../../store/apps/airplane/chkinCounterSlice';
import { useNavigate } from 'react-router-dom';
import BreadCrumbs from '../../layouts/breadcrumbs/BreadCrumbs';
import './img.css';

function onAfterDeleteRow(rowKeys) {
  alert(`The rowkey you drop: ${rowKeys}`);
}

function afterSearch(searchText, result) {
  console.log(`Your search text is ${searchText}`);
  console.log('result', result);
}

const selectRowProp = {
  mode: 'checkbox',
};

const cellEditProp = {
  mode: 'click',
  blurToSave: true,
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
  const [popoverOpen, setPopoverOpen] = useState(null); // Popover의 상태 관리

  const imageRef = useRef(null);

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

  const handleMouseEnter = (id) => {
    setPopoverOpen(id);
  };

  const handleMouseLeave = () => {
    setPopoverOpen(null);
  };

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
                onMouseLeave={handleMouseLeave}
              />
            ))}
          </map>
          {imageLoaded && mapData.map(area => {
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
              >
                {popoverOpen === area.id && (
                  <Popover
                    placement='top'
                    isOpen={true}
                    target={`area-${area.id}`}
                    toggle={handleMouseLeave}
                  >
                    <PopoverHeader>{area.label}</PopoverHeader>
                    <PopoverBody>
                      여기에 정보를 입력하세요.
                    </PopoverBody>
                  </Popover>
                )}
              </div>
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
            <TableHeaderColumn width="14.28%" dataField="scheduleDateTime" dataAlign="center">
              Schedule Date Time
            </TableHeaderColumn>
            <TableHeaderColumn width="14.28%" dataField="status" dataAlign="center" dataFormat={statusFormatter}>
              Status
            </TableHeaderColumn>
            <TableHeaderColumn width="14.28%" dataField="remark" dataAlign="center">
              Remark
            </TableHeaderColumn>
          </BootstrapTable>
        </CardBody>
      </Card>
    </div>
  );
};

export default Datatables;
