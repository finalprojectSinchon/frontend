import axios from 'axios';
import React, { useEffect } from 'react';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import { Card, CardBody, CardTitle, CardSubtitle, Button } from 'reactstrap';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
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
    clickToExpand: true,
    onSelect: (row, isSelected, rowIndex, e) => {
        console.log(`Row selected: ${isSelected}, rowIndex: ${rowIndex}`);
        console.log('Selected row: ', row);
    },
    onSelectAll: (isSelected, rows) => {
        console.log(`All rows selected: ${isSelected}`);
        console.log('Selected rows: ', rows);
    }
};



const cellEditProp = {
    mode: 'click',
    blurToSave: true,
};

const statusFormatter = (cell) => {
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
    const navigate = useNavigate(); // useNavigate 추가
    const dispatch = useDispatch();
    const inspectionList = useSelector((state) => state.inspections.inspectionList);

    useEffect(() => {
        dispatch(fetchInspections());
    }, [dispatch]);



    const options = {
        afterDeleteRow: onAfterDeleteRow,
        afterSearch,
        onRowClick: (row) => {
            navigate(`/inspection/${row.inspectionCode}`); // 페이지 네비게이션
        },
    };

    return (
        <div>
            <Card>
                <CardBody>
                    <div className="d-flex justify-content-between align-items-center">
                <div>
                <CardTitle tag="h5">안전 점검</CardTitle>
                <CardSubtitle className="mb-2 text-muted" tag="h6">
                안전 점검 전체 조회
                </CardSubtitle>
                </div>
                <Button color="primary" onClick={() => navigate('/inspection/inspectionRegist')}>
                등록
                </Button>
            </div>
                    <BootstrapTable
                        hover
                        search
                        data={inspectionList.data}
                        keyField='inspectionCode'
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
                        <TableHeaderColumn
                            width="20%"
                            dataField="location"
                            dataAlign="center"
                            // isKey
                            dataFormat={(cell, row) => (
                                <div onClick={() => navigate(`/inspection/${row.inspectionCode}`)}>
                                    {cell}
                                </div>
                            )}
                        >
                            location
                        </TableHeaderColumn>
                        <TableHeaderColumn
                            width="20%"
                            dataField="type"
                            dataAlign="center"
                            dataFormat={(cell, row) => (
                                <div onClick={() => navigate(`/inspection/${row.inspectionCode}`)}>
                                    {cell}
                                </div>
                            )}
                        >
                            type
                        </TableHeaderColumn>
                        <TableHeaderColumn
                            width="20%"
                            dataField="status"
                            dataAlign="center"
                            dataFormat={(cell, row) => (
                                <div onClick={() => navigate(`/inspection/${row.inspectionCode}`)}>
                                    {statusFormatter(cell, row)}
                                </div>
                            )}
                        >
                            Status
                        </TableHeaderColumn>
                        <TableHeaderColumn
                            width="20%"
                            dataField="regularInspectionDate"
                            dataAlign="center"
                            dataFormat={(cell, row) => (
                                <div onClick={() => navigate(`/inspection/${row.inspectionCode}`)}>
                                    {cell}
                                </div>
                            )}
                        >
                            RegularInspectionDate
                        </TableHeaderColumn>
                        <TableHeaderColumn
                            width="20%"
                            dataField="manager"
                            dataAlign="center"
                            dataFormat={(cell, row) => (
                                <div onClick={() => navigate(`/inspection/${row.inspectionCode}`)}>
                                    {cell}
                                </div>
                            )}
                        >
                            Manager
                        </TableHeaderColumn>
                    </BootstrapTable>
                </CardBody>
            </Card>
        </div>
    );
};

export default Datatables;
