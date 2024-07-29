import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import { Card, CardBody, CardTitle, CardSubtitle, Table, CardHeader, Button } from 'reactstrap';
import Cookies from 'js-cookie';
import { Link, useNavigate } from 'react-router-dom'

// This is for the Delete row
function onAfterDeleteRow(rowKeys) {
    alert(`The rowkey you drop: ${rowKeys}`);
}

// This is for the Search item
function afterSearch(SearchText, result) {
    console.log(`Your search text is ${SearchText}`)
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
    console.log("11", storageData)

    useEffect(() => {
        axios.get('http://localhost:8080/api/v1/storage', {
            headers:{
                Authorization: Cookies.get('token')
            }
        })
        .then(res => res.data)
        .then(data => {
            console.log("22", data)
            setStorageData(data.data);
        })
    }, []);


    const options = {
        afterDeleteRow: onAfterDeleteRow,
        afterSearch,
        onRowClick: (row) => {
            console.log('Row clicked: ', row.storageCode);
            navigate(`/storage/${row.storageCode}`);
        }

    }


    return (
        <div>
            <Card>
                <CardBody>
                    <CardTitle tag="h5">창고
                    {/* <Button color="primary" className="ms-5 btn btn-" size="sm" onClick={() => navigate('/storage/dbupdate')}>창고 DB 업데이트</Button> */}
                    </CardTitle>
                    <CardSubtitle className="mb-2 text-muted" tag="h6">
                        창고 조회
                    </CardSubtitle>
                    <Button color="primary" onClick={ () => navigate('/storage/StorageRegist')}>
                        등록
                    </Button>
                        <BootstrapTable
                            hover
                            search
                            data={storageData}
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
                            <TableHeaderColumn width="20%" dataField="storageType" dataAlign="center"   isKey>
                            타입
                            </TableHeaderColumn>
                            <TableHeaderColumn width="20%" dataField="storageLocation" dataAlign="center">
                            위치
                            </TableHeaderColumn>
                            <TableHeaderColumn width="20%" dataField="storageStatus" dataAlign="center" dataFormat={statusFormatter}>
                            상태
                            </TableHeaderColumn>
                            <TableHeaderColumn width="20%" dataField="department" dataAlign="center">
                            담당부서
                            </TableHeaderColumn>
                            <TableHeaderColumn width="20%" dataField="manager" dataAlign="center">
                            담당자
                            </TableHeaderColumn>
                        </BootstrapTable>
                </CardBody>
            </Card>
        </div>
    );
};
export default Storage;