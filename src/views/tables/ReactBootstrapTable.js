import React from 'react';
import { Row, Col } from 'reactstrap';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import * as data from './DataBootstrapTable';
import './ReactBootstrapTable.scss';
import BreadCrumbs from '../../layouts/breadcrumbs/BreadCrumbs';
import { Card, CardBody, CardTitle, CardSubtitle, Table } from 'reactstrap';
import ComponentCard from '../../components/ComponentCard';
import user1 from '../../assets/images/users/user1.jpg';
import user2 from '../../assets/images/users/user2.jpg';
import user3 from '../../assets/images/users/user3.jpg';
import user4 from '../../assets/images/users/user4.jpg';
import user5 from '../../assets/images/users/user5.jpg';

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
    avatar: user1,
    status: '고장',
    location: "2층 C구역",
    type : "체크인 카운터 - B",
    airline : "대한항공",
    scheduleDateTime : "2024-07-15"
  },
  {
    avatar: user2,
    status: '정상',
    location: "1층 C구역",
    type : "체크인 카운터 - F",
    airline : "대한항공",
    scheduleDateTime : "2024-07-15"
  },
  {
    avatar: user3,
    status: '점검중',
    location: "2층 B구역",
    type : "체크인 카운터 - C",
    airline : "대한항공",
    scheduleDateTime : "2024-07-15"
  },
  {
    avatar: user4,
    status: '점검중',
    location: "3층 C구역",
    type : "체크인 카운터 - F",
    airline : "대한항공",
    scheduleDateTime : "2024-07-15"
  },
  {
    avatar: user5,
    status: '정상',
    location: "2층 F구역",
    type : "체크인 카운터 - A",
    airline : "대한항공",
    scheduleDateTime : "2024-07-15"
  },
];

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
              <TableHeaderColumn width="20%" dataField="Status"dataAlign="center">
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
