import React from 'react';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
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
clickToSelect: true, // allows row to be selected by clicking on it
bgColor: 'rgba(0,0,0,0.1)', // background color for selected rows
clickToExpand: true// enables expanding/collapsing rows by clicking
}; 

const cellEditProp = {
mode: 'click',
blurToSave: true,
};

const tableData = [
    {
    status: '점검 중',
    location: "5층 C구역",
    type : "엘레베이터 -A",
    regularInspectionDate : "2024-07-15",
    lastInspectionDate: "2022/11/20",
    file: "시말서01.pdf",
    manager: "이권한"
    },
    {
    status: '수리 중',
    location: "2층 A구역",
    type : "에스컬레이터 -B",
    regularInspectionDate : "2024-07-15",
    lastInspectionDate: "2022/11/20",
    file: "보고서04.pdf",
    manager: "정고윽"

    },
    {
    status: '점검 중',
    location: "1층 D구역",
    type : "엘레베이터 -C",
    status : "점검중",
    regularInspectionDate : "2024-07-15",
    lastInspectionDate: "2022/11/20",
    file: "보고서01.pdf",
    manager: "이지은"

    },
    
    {
    status: '점검 중',
    location: "3층 B구역",
    type : "무빙 워크 -A",
    status : "점검중",
    regularInspectionDate : "2024-07-15",
    lastInspectionDate: "2022/11/20",
    file: "보고서01.pdf",
    manager: "박재중"

    },
    {
    status: '점검 중',
    location: "1층 C구역",
    type : "에스컬레이터 -B",
    status : "점검중",
    regularInspectionDate : "2024-07-15",
    lastInspectionDate: "2022/11/20",
    file: "보고서01.pdf",
    manager: "전준귝"

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
            <CardTitle tag="h5">안전 점검</CardTitle>
            <CardSubtitle className="mb-2 text-muted" tag="h6">
            안전 점검 전체 조회
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
                <TableHeaderColumn width="20%" dataField="status"dataAlign="center"dataFormat={statusFormatter}>
                Status
                </TableHeaderColumn>
                <TableHeaderColumn width="20%" dataField="regularInspectionDate"dataAlign="center">
                RegularInspectionDate
                </TableHeaderColumn>
                <TableHeaderColumn width="20%" dataField="manager"dataAlign="center">
                Manager
                </TableHeaderColumn>
            </BootstrapTable>
    
            </CardBody>
            </Card>
    </div>
    );
};
export default Datatables;
