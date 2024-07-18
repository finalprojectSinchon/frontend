import React, { useState, useEffect } from 'react';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import '../airplane/ReactBootstrapTable.scss';
import { Card, CardBody, CardTitle, CardSubtitle, Table } from 'reactstrap';
import { useDispatch, useSelector } from 'react-redux';
import { fetchMaintenances } from '../../store/apps/maintenance/maintenanceSlice';

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

const initialTableData = [
  {
    maintenanceDetails: '고장',
    location: "2층 C구역",
    type : "체크인 카운터 - B",
    maintenanceManager : "정고은",
    maintenanceEndDate : "2024-07-15",
    file: null
  },
  {
    maintenanceDetails: '정상',
    location: "1층 A구역",
    type: "수하물 컨베이어",
    maintenanceManager: "김철수",
    maintenanceEndDate: "2024-07-18",
    file: null
  },
  {
    maintenanceDetails: '고장',
    location: "2층 D구역",
    type: "보안 스캐너",
    maintenanceManager: "박영희",
    maintenanceEndDate: "2024-07-20",
    file: null
  },
  {
    maintenanceDetails: '점검중',
    location: "3층 E구역",
    type: "탑승교 - G",
    maintenanceManager: "이민호",
    maintenanceEndDate: "2024-07-22",
    file: null
  },
  {
    maintenanceDetails: '정상',
    location: "1층 B구역",
    type: "체크인 카운터 - D",
    maintenanceManager: "김유정",
    maintenanceEndDate: "2024-07-25",
    file: null
  },
  {
    maintenanceDetails: '점검중',
    location: "3층 F구역",
    type: "탑승교 - H",
    maintenanceManager: "홍길동",
    maintenanceEndDate: "2024-07-27",
    file: null
  }
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
  const [tableData, setTableData] = useState(initialTableData);
  const dispatch = useDispatch();
  const maintenanceList = useSelector((state) => state.maintenances.maintenanceList);
  console.log("maintenanceList", maintenanceList);

  useEffect(() => {
    dispatch(fetchMaintenances());
  }, [dispatch]);

  const handleFileChange = (e, rowIndex) => {
    const file = e.target.files[0];
    const newTableData = [...tableData];
    newTableData[rowIndex].file = URL.createObjectURL(file);
    setTableData(newTableData);
  };

  const fileFormatter = (cell, row) => {
    return cell ? <a href={cell} target="_blank" rel="noopener noreferrer">파일 보기</a> : '파일 없음';
  };

  return (
    <div>
      <Card>
        <CardBody>
          <CardTitle tag="h5">정비</CardTitle>
          <CardSubtitle className="mb-2 text-muted" tag="h6">
            정비 전체 조회
          </CardSubtitle>
          <BootstrapTable
            hover
            search
            data={maintenanceList.data}
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
            <TableHeaderColumn width="20%" dataField="maintenanceCode" dataAlign="center" isKey>
              maintenanceCode
            </TableHeaderColumn>
            <TableHeaderColumn width="20%" dataField="type" dataAlign="center">
              type
            </TableHeaderColumn>
            <TableHeaderColumn width="20%" dataField="location" dataAlign="center">
              location
            </TableHeaderColumn>
            <TableHeaderColumn width="20%" dataField="maintenanceEndDate" dataAlign="center" >
              maintenanceEndDate
            </TableHeaderColumn>
            <TableHeaderColumn width="20%" dataField="file" dataAlign="center" dataFormat={fileFormatter}>
             maintenanceDetails
            </TableHeaderColumn>
          </BootstrapTable>
        </CardBody>
      </Card>
    </div>
  );
};

export default Datatables;
