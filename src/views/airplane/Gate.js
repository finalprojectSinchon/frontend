import React, { useEffect } from 'react';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import { Card, CardBody, CardTitle, CardSubtitle, Button } from 'reactstrap';
import { useDispatch, useSelector } from 'react-redux';
import { fetchGates  } from '../../store/apps/airplane/gateSlice';
import { useNavigate } from 'react-router-dom';


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
  const gateList = useSelector((state) => state.gates.gateList);

  const options = {
    afterDeleteRow: onAfterDeleteRow, 
    afterSearch, 
    onRowClick: (row) => {
      console.log('Row clicked: ', row);
      navigate(`/api/v1/airplane/gate/${row.gateCode}`);
    
    },
  };


  useEffect(() => {
    dispatch(fetchGates());
  }, [dispatch]);

  

  if (!gateList || !gateList.data || !gateList.data.gateList) {
    return <div>Loading...</div>;
  }

  const flatGateList = gateList.data.gateList.map(gate => ({
    ...gate,
    airline: gate.airplane.airline,
    scheduleDateTime: gate.airplane.scheduleDateTime
  }));



  return (
    <div>
      <Card>
        <CardBody>
          <CardTitle tag="h5">비행기</CardTitle>
          <CardSubtitle className="mb-2 text-muted" tag="h6">
            탑승구
          </CardSubtitle>
          <BootstrapTable
            hover
            search 
            data={flatGateList}
            insertRow
            deleteRow
            selectRow={selectRowProp}
            pagination
            options={options}
            tableHeaderClass="mb-10"
            exportCSV
            headerStyle={{ width: '100%' }}
          >
            <TableHeaderColumn width="14.28%" dataField="gateCode" dataAlign="center" isKey>
              Gate Code
            </TableHeaderColumn>
            <TableHeaderColumn width="14.28%" dataField="location" dataAlign="center">
              Location
            </TableHeaderColumn>
            <TableHeaderColumn width="14.28%" dataField="gateType" dataAlign="center">
              Type
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
