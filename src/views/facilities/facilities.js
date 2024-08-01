import React, {useEffect, useState} from 'react';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';

import { Card, CardBody, CardTitle, CardSubtitle, Table, CardHeader, Button } from 'reactstrap';
import {useNavigate} from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie";
import {navigate} from "react-big-calendar/lib/utils/constants.js";
import api from "src/store/apps/airplane/api.js";


function onAfterDeleteRow(rowKeys) {
    // Call the deleteStore function for each selected row
    rowKeys.forEach(deletefacilities);
}

const deletefacilities = async (facilitiesCode) => {
    api.put(`/api/v1/facilities/${facilitiesCode}/delete`)
        .then(res => {
            alert("삭제 성공")
        })
        .catch(err => {
            alert("삭제 실패")
            console.error('err',err)
        })
};

function afterSearch(searchText, result) {
    console.log(`Your search text is ${searchText}`)
}

const selectRowProp = {
    mode: 'checkbox',
};
const cellEditProp = {
    mode: 'click',
    blurToSave: true,
};

const tableData = [
    {
        status: '고장',
        location: "2층 C구역",
        type: "엘리베이터",
        manager: "담당자1",
        scheduleDateTime: "2024-07-19",
        lastInspectionDate:"2024-07-17"
    }
];

const statusFormatter = (cell, row) => {
    let styleClass;
    if (cell === '중단') {
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

const Facilities = () => {
    const navigate = useNavigate();
    const options = {
        afterDeleteRow: onAfterDeleteRow,
        afterSearch,
        onRowClick: (row) => {
            console.log('sssssssssssssssssss' , row.facilitiesCode)
            navigate(`/facilities/${row.facilitiesCode}`);
        }
    };

    const [FacilitiesData, setFacilitiesData ] = useState([]);
    console.log('ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ ', FacilitiesData)

    useEffect(() => {
        axios.get('http://localhost:8080/api/v1/facilities',{
            headers:{
                Authorization: Cookies.get('token')
            }
        })
            .then(res => res.data)
            .then(res => {
                setFacilitiesData(res.data)
            })

    }, []);


    return (
        <div>
            <Card>
                <CardBody>
                    <CardTitle tag="h5">시설물</CardTitle>
                    <CardSubtitle className="mb-2 text-muted" tag="h6">
                        편의시설
                    </CardSubtitle>
                    <Button color="primary" onClick={ () => navigate('/facilities/regist')}>
                        등록
                    </Button>
                    <BootstrapTable
                        hover
                        search
                        data={FacilitiesData}
                        insertRow
                        deleteRow
                        selectRow={selectRowProp}
                        pagination
                        options={options}
                        cellEdit={cellEditProp}
                        tableHeaderClass="mb-10"
                        exportCSV
                        headerStyle={{ width: '100%' }}
                        keyField = "facilitiesCode"
                    >

                        <TableHeaderColumn width="15%" dataField="facilitiesManager" dataAlign="center">
                            담당자
                        </TableHeaderColumn>
                        <TableHeaderColumn width="20%" dataField="facilitiesLocation" dataAlign="center" >
                            위치
                        </TableHeaderColumn>
                        <TableHeaderColumn width="20%" dataField="facilitiesClass" dataAlign="center">
                            분류
                        </TableHeaderColumn>
                        <TableHeaderColumn width="20%" dataField="facilitiesName" dataAlign="center">
                            시설물이름
                        </TableHeaderColumn>
                        <TableHeaderColumn width="15%" dataField="facilitiesType" dataAlign="center">
                            종류
                        </TableHeaderColumn>
                        <TableHeaderColumn width="10%" dataField="facilitiesStatus" dataAlign="center" dataFormat={statusFormatter}>
                            상태
                        </TableHeaderColumn>
                    </BootstrapTable>
                </CardBody>
            </Card>
        </div>
    );
};

export default Facilities;
