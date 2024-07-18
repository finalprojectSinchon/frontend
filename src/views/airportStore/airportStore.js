import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import { Card, CardBody, CardTitle, CardSubtitle, Table } from 'reactstrap';
import Cookies from 'js-cookie';

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



const statusFormatter = (cell, row) => {
  let styleClass;
  if (row.storeStatus
    === '운영중') {
    styleClass = 'bg-danger';
  } else {
    styleClass = 'bg-success';
  }
  
  return (
    <span className={`p-2 rounded-circle d-inline-block ${styleClass}`}></span>
  );
};

const AirportStore = () => {

  const [Storedata, setStoredata] = useState([]);
  console.log(Storedata);

  useEffect(() => {
    axios.get('http://localhost:8080/api/v1/store',{
      headers:{
          Authorization: Cookies.get('token')
      }
    })
    .then(res => res.data)
    .then(data => {
      setStoredata(data.data);
    })
  }, []);

  return (
    <div>
      <Card>
        <CardBody>
          <CardTitle tag="h5">점포</CardTitle>
          <CardSubtitle className="mb-2 text-muted" tag="h6">
            점포 조회
          </CardSubtitle>
            <BootstrapTable
              hover
              search
              data={Storedata}
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
              <TableHeaderColumn width="20%" dataField="storeName" dataAlign="center"   isKey>
              storeName
              </TableHeaderColumn>
              <TableHeaderColumn width="20%" dataField="storeType" dataAlign="center">
              storeType
              </TableHeaderColumn>
              <TableHeaderColumn width="20%" dataField="storeManager" dataAlign="center" >
              storeManager
              </TableHeaderColumn>
              <TableHeaderColumn width="20%" dataField="status" dataAlign="center" dataFormat={statusFormatter}>
              Status
              </TableHeaderColumn>
              <TableHeaderColumn width="20%" dataField="storeOperatingTime"dataAlign="center">
              운영시간
              </TableHeaderColumn>
            </BootstrapTable>
   
            </CardBody>
            </Card>
    </div>
  );
};
export default AirportStore;
