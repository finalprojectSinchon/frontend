import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import { Card, CardBody, CardTitle, CardSubtitle, Button } from 'reactstrap';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';
import api from "src/store/apps/airplane/api.js";
import {useSelector} from "react-redux";

const deleteStore = async (storeId) => {
  api.put(`/api/v1/store/${storeId}/delete`)
      .then(res => {
        alert("삭제 성공")
      })
      .catch(err => {
        alert("삭제 실패")
        console.error('err',err)
      })
};


function onAfterDeleteRow(rowKeys) {
  rowKeys.forEach(deleteStore);
}


function afterSearch(searchText, result) {

}

const selectRowProp = {
  mode: 'checkbox',
};

const cellEditProp = {
  mode: 'click',
  blurToSave: true,
};

const statusFormatter = (cell, row) => {
  let styleClass;
  if (row.storeStatus === '중단') {
    styleClass = 'bg-danger';
  } else if (row.storeStatus === '점검중') {
    styleClass = 'bg-warning';
  } else {
    styleClass = 'bg-success';
  }

  return (
      <span className={`p-2 rounded-circle d-inline-block ${styleClass}`}></span>
  );
};

const AirportStore = () => {
  const navigate = useNavigate();
  const [Storedata, setStoredata] = useState([]);

  const userInfo = useSelector((state) => state.userInfo)

  useEffect(() => {
    if (userInfo && userInfo.userRole) {
      if (userInfo.userRole !== "ROLE_ADMIN" && userInfo.userRole !== "ROLE_STORE") {
        navigate('/auth/permission-error');
      }
    }
  }, [userInfo, navigate]);

  useEffect(() => {
    api.get('/api/v1/store', {
      headers: {
        Authorization: Cookies.get('token')
      }
    })
        .then(res => res.data)
        .then(data => {
          setStoredata(data.data);
        })
        .catch(error => console.error('Error fetching store data:', error));
  }, []);

  const options = {
    afterDeleteRow: onAfterDeleteRow,
    afterSearch,
    onRowClick: (row) => {
      console.log('Row clicked: ', row.storeId);
      navigate(`/airport/store/${row.storeId}`);
    },
  };

  return (
      <div>
        <Card>
          <CardBody>
            <CardTitle tag="h5">점포
              <Button color="primary" className="ms-5 btn btn-" size="sm" onClick={() => navigate('/airport/store/dbupdate')}>점포 DB 업데이트</Button>
            </CardTitle>
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
                keyField="storeId"
                tableHeaderClass="mb-10"
                exportCSV
                headerStyle={{ width: '100%' }}
            >
              <TableHeaderColumn width="20%" dataField="storeLocation" dataAlign="center">
                타입
              </TableHeaderColumn>
              <TableHeaderColumn width="20%" dataField="storeName" dataAlign="center">
                점포명
              </TableHeaderColumn>
              <TableHeaderColumn width="20%" dataField="storeContact" dataAlign="center">
                연락처
              </TableHeaderColumn>
              <TableHeaderColumn width="20%" dataField="status" dataAlign="center" dataFormat={statusFormatter}>
                Status
              </TableHeaderColumn>
              <TableHeaderColumn width="20%" dataField="storeOperatingTime" dataAlign="center">
                운영시간
              </TableHeaderColumn>
            </BootstrapTable>
          </CardBody>
        </Card>
      </div>
  );
};

export default AirportStore;
