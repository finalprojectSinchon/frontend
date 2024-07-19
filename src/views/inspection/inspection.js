import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import { Card, CardBody, CardTitle, CardSubtitle, Table } from 'reactstrap';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';
import { useDispatch ,useSelector } from 'react-redux';
import { fetchInspections } from '../../store/apps/inspection/inspectionSlice';


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
        const inspectionList = useSelector((state) => state.inspections.inspectionList);
        console.log('inspectionList ',inspectionList)

    
        useEffect(() => {
            dispatch(fetchInspections())
        }, [dispatch]);

        if (!inspectionList || !inspectionList.data  ) {
            return <div>Loading...</div>;
        }
    
        const options = {
        afterDeleteRow: onAfterDeleteRow, 
        afterSearch, 
        onRowClick: (row) => {
            console.log('Row clicked: ', row.inspectionDetail);
            navigate(`/airport/inspection/${row.inspectionDetail}`);
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
                        data={inspectionList.data}
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
