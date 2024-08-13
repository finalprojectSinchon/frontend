import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import { Card, CardBody, CardTitle, CardSubtitle, Table, CardHeader, Button } from 'reactstrap';
import Cookies from 'js-cookie';
import { Link, useNavigate } from 'react-router-dom'
import api from "src/store/apps/airplane/api.js";

// This is for the Delete row
function onAfterDeleteRow(rowKeys) {
    alert(`The rowkey you drop: ${rowKeys}`);
}


const selectRowProp = {
    mode: 'checkbox',
};
const cellEditProp = {
    mode: 'click'
};

const statusFormatter = (cell, row) => {
    let styleClass;
    if (row.storageStatus
        === '중단') {
            styleClass = 'bg-danger'
        }
        else if (row.storageStatus === '점검중') {
            styleClass = 'bg-warning';
        } else {
            styleClass = 'bg-success';
        }

    return (
        <span className={`p-2 rounded-circle d-inline-block ${styleClass}`}></span>
    );
};



const Storage = () => {
    
    const navigate = useNavigate();

    const [storageData, setStorageData] = useState([]);


    useEffect(() => {
        api.get('/api/v1/storage')
        .then(res => res.data)
        .then(data => {
            setStorageData(data.data);
        })
    }, []);


    const options = {
        afterDeleteRow: onAfterDeleteRow,
        onRowClick: (row) => {
            navigate(`/storage/${row.storageCode}`);
        }

    }


    return (
        <div>
            <Card>
                <CardBody>
                    <div className="d-flex justify-content-between align-items-center">
                        <div>
                            <CardTitle tag="h5">창고
                                {/* <Button color="primary" className="ms-5 btn btn-" size="sm" onClick={() => navigate('/storage/dbupdate')}>창고 DB 업데이트</Button> */}
                            </CardTitle>
                            <CardSubtitle className="mb-2 text-muted" tag="h6">
                                창고 조회
                            </CardSubtitle>
                        </div>
                            <Button color="primary" onClick={() => navigate('/storage/regist')}>
                                등록
                            </Button>
                    </div>
                            <BootstrapTable
                                hover
                                search
                                data={storageData}
                                selectRow={selectRowProp}
                                pagination
                                options={options}
                                cellEdit={cellEditProp}
                                tableHeaderClass="mb-10"
                                exportCSV
                                headerStyle={{width: '100%'}}
                            >
                                <TableHeaderColumn width="25%" dataField="type" dataAlign="center" isKey>
                                    타입
                                </TableHeaderColumn>
                                <TableHeaderColumn width="25%" dataField="location" dataAlign="center">
                                    위치
                                </TableHeaderColumn>
                                <TableHeaderColumn width="25%" dataField="status" dataAlign="center"
                                                   dataFormat={statusFormatter}>
                                    상태
                                </TableHeaderColumn>
                            </BootstrapTable>
                </CardBody>
            </Card>
        </div>
);
};
export default Storage;