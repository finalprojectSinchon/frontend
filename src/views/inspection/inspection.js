import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import { Card, CardBody, CardTitle, CardSubtitle, Table } from 'reactstrap';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';


function onAfterDeleteRow(rowKeys) {
    alert(`The rowkey you drop: ${rowKeys}`);
}

function afterSearch(searchText, result) {
    console.log(`Your search text is ${searchText}`);
    console.log('result', result);
}

const selectRowProp = {
    mode: 'checkbox',
    clickToSelect: true,
    bgColor: 'rgba(0,0,0,0.1)',
    clickToExpand: true
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

        const navigate = useNavigate();
        const dispatch = useDispatch();

        const [tableData, settableData] = useState([]);
    
        useEffect(() => {
        axios.get('http://localhost:8080/api/v1/inspection',{
            headers:{
                Authorization: Cookies.get('token')
            }
        })
        .then(res => res.data)
        .then(data => {
            settableData(data.data);
        })
        }, []);
    
        const options = {
        afterDeleteRow: onAfterDeleteRow, 
        afterSearch, 
        onRowClick: (row) => {
            console.log('Row clicked: ', row.inspectionCode);
            navigate(`/airport/inspection/${row.inspectionCode}`);
        },
        };


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
                        <TableHeaderColumn width="20%" dataField="location" dataAlign="center" isKey>
                            location
                        </TableHeaderColumn>
                        <TableHeaderColumn width="20%" dataField="type" dataAlign="center">
                            type
                        </TableHeaderColumn>
                        <TableHeaderColumn width="20%" dataField="status" dataAlign="center" dataFormat={statusFormatter}>
                            Status
                        </TableHeaderColumn>
                        <TableHeaderColumn width="20%" dataField="regularInspectionDate" dataAlign="center">
                            RegularInspectionDate
                        </TableHeaderColumn>
                        <TableHeaderColumn width="20%" dataField="manager" dataAlign="center">
                            Manager
                        </TableHeaderColumn>
                    </BootstrapTable>
                </CardBody>
            </Card>
        </div>
    );
};

export default Datatables;
