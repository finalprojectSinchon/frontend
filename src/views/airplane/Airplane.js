import React from 'react';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import './ReactBootstrapTable.scss';
import { Card, CardBody, CardTitle, CardSubtitle, Table } from 'reactstrap';

//This is for the Delete row
function onAfterDeleteRow(rowKeys) {
  alert(`The rowkey you drop: ${rowKeys}`);
}

//This is for the Search item
function afterSearch(searchText, result) {
  console.log(`Your search text is ${searchText}`)
}
const options = {
  afterDeleteRow: onAfterDeleteRow, // A hook for after droping rows.
  afterSearch, // define a after search hook
};
const selectRowProp = {
  mode: 'checkbox',

};
const cellEditProp = {
  mode: 'click',
  blurToSave: true,
};

const tableData = [
  {
    status: '고장',
    location: "2층 C구역",
    type : "체크인 카운터 - B",
    airline : "대한항공",
    scheduleDateTime : "2024-07-15"
  },
  {
    status: '정상',
    location: "1층 C구역",
    type : "체크인 카운터 - F",
    airline : "대한항공",
    scheduleDateTime : "2024-07-15"
  },
  {
    status: '점검중',
    location: "2층 B구역",
    type : "체크인 카운터 - C",
    airline : "대한항공",
    scheduleDateTime : "2024-07-15"
  },
  {
    status: '점검중',
    location: "3층 C구역",
    type : "체크인 카운터 - F",
    airline : "대한항공",
    scheduleDateTime : "2024-07-15"
  },
  {
    status: '정상',
    location: "2층 F구역",
    type : "체크인 카운터 - A",
    airline : "대한항공",
    scheduleDateTime : "2024-07-15"
  },
];


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
  return (
    <div>
      <Card>
        <CardBody>
          <CardTitle tag="h5">비행기</CardTitle>
          <CardSubtitle className="mb-2 text-muted" tag="h6">
            체크인 카운터
          </CardSubtitle>
            <BootstrapTable
              hover
              search
              data={tableData}
              insertRow
              deleteRow
              selectRow={selectRowProp}
              pagination
              options={options}
              cellEdit={cellEditProp}
              tableHeaderClass="mb-10"
              exportCSV
              headerStyle={{ width: '100%' }}
              >
              <TableHeaderColumn width="20%" dataField="location" dataAlign="center"   isKey>
              location
              </TableHeaderColumn>
              <TableHeaderColumn width="20%" dataField="type" dataAlign="center">
              type
              </TableHeaderColumn>
              <TableHeaderColumn width="20%" dataField="airline"dataAlign="center" >
              Airline
              </TableHeaderColumn>
              <TableHeaderColumn width="20%" dataField="status"dataAlign="center"dataFormat={statusFormatter}>
              
              Status
              </TableHeaderColumn>
              <TableHeaderColumn width="20%" dataField="scheduleDateTime"dataAlign="center">
              scheduleDateTime
              </TableHeaderColumn>
            </BootstrapTable>
  
            </CardBody>
            </Card>
    </div>
  );
};
export default Datatables;
