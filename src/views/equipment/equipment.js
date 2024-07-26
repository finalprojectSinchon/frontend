import axios from 'axios';
import React, { useEffect } from 'react';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import { Card, CardBody, CardTitle, CardSubtitle } from 'reactstrap';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchEquipments } from '../../store/apps/equipment/equipmentSlice';

function onAfterDeleteRow(rowKeys) {
    alert(`The rowkey you drop: ${rowKeys}`);
}

function afterSearch(searchText, result) {
    console.log(`Your search text is ${searchText}`);
    console.log('result', result);
}

const selectRowProp = {
    mode: 'checkbox', // 체크박스 모드 유지
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
    const equipmentList = useSelector((state) => state.equipments.equipmentList);
    console.log('equipmentList',equipmentList)

    useEffect(() => {
        dispatch(fetchEquipments());
    }, [dispatch]);

    if (!equipmentList || !equipmentList.data) {
        return <div>Loading...</div>;
    }

    const options = {
        afterDeleteRow: onAfterDeleteRow,
        afterSearch,
        onRowClick: (row) => {
            navigate(`/equipment/${row.equipmentCode}`); // 페이지 네비게이션
        },
    };

    return (
        <div>
            <Card>
                <CardBody>
                    <CardTitle tag="h5">장비 재고</CardTitle>
                    <CardSubtitle className="mb-2 text-muted" tag="h6">
                    장비 재고 전체 조회
                    </CardSubtitle>
                    <BootstrapTable
                        hover
                        search
                        data={equipmentList.data}
                        keyField='equipmentCode'
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
                            dataField="equipmentName"
                            dataAlign="center"
                            // isKey
                            dataFormat={(cell, row) => (
                                <div onClick={() => navigate(`/equipment/${row.equipmentCode}`)}>
                                    {cell}
                                </div>
                            )}
                        >
                            Name
                        </TableHeaderColumn>
                        <TableHeaderColumn
                            width="20%"
                            dataField="equipmentLocation"
                            dataAlign="center"
                            dataFormat={(cell, row) => (
                                <div onClick={() => navigate(`/equipment/${row.equipmentCode}`)}>
                                    {cell}
                                </div>
                            )}
                        >
                            Location
                        </TableHeaderColumn>
                        <TableHeaderColumn
                            width="20%"
                            dataField="status"
                            dataAlign="center"
                            dataFormat={(cell, row) => (
                                <div onClick={() => navigate(`/equipment/${row.equipmentCode}`)}>
                                    {statusFormatter(cell, row)}
                                </div>
                            )}
                        >
                            Status
                        </TableHeaderColumn>

                        <TableHeaderColumn
                            width="20%"
                            dataField="equipmentQuantity"
                            dataAlign="center"
                            dataFormat={(cell, row) => (
                                <div onClick={() => navigate(`/equipment/${row.equipmentCode}`)}>
                                    {cell}
                                </div>
                            )}
                        >
                            Quantity
                        </TableHeaderColumn>
                        <TableHeaderColumn
                            width="20%"
                            dataField="equipmentManager"
                            dataAlign="center"
                            dataFormat={(cell, row) => (
                                <div onClick={() => navigate(`/equipment/${row.equipmentCode}`)}>
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
