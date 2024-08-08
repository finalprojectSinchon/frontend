import React, { useState, useRef, useEffect } from 'react';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import { Card, CardBody, CardImg, Container, Button } from 'reactstrap';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAirplanes } from '../../store/apps/airplane/airplaneSlice';
import { useNavigate } from 'react-router-dom';
import BreadCrumbs from '../../layouts/breadcrumbs/BreadCrumbs';
import './img.css';
import api from "src/store/apps/airplane/api.js";

function onAfterDeleteRow(rowKeys) {
  rowKeys.forEach(deleteRow);

}

const deleteRow = async (airplaneCode) => {
  api.put(`/api/v1/airplane/${airplaneCode}/delete`)
      .then(res => {
        alert("삭제 성공")
      })
      .catch(err => {
        alert("삭제 실패")
        console.error('err',err)
      })
};

function afterSearch(searchText, result) {
  console.log(`Your search text is ${searchText}`);
  console.log('result',result)
}


const selectRowProp = {
  mode: 'checkbox',

};

const cellEditProp = {
  mode: 'click',
  blurToSave: true,
};



const Datatables = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const AirplaneList = useSelector((state) => state.airplanes.airplaneList);

  const formatDateTime = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleString();
  };

  const [updateList, setUpdateList] = useState([])

  useEffect(() => {
    if (AirplaneList && AirplaneList.data && AirplaneList.data.airplaneList) {
      const updatedList = AirplaneList.data.airplaneList.map((airplane) => ({
        ...airplane,
        scheduleDateTime: formatDateTime(airplane.scheduleDateTime),
      }));
      setUpdateList(updatedList);
    }
  }, [AirplaneList]);




  const options = {
    afterDeleteRow: onAfterDeleteRow,
    afterSearch,
    onRowClick: (row) => {
      console.log('Row clicked: ', row);
      navigate(`/airplane/${row.airplaneCode}`);
    },
  };

  const { status, error } = useSelector((state) => state.airplanes);

  useEffect(() => {
    if (status === 'failed' && error) {
      navigate('/auth/permission-error');
    }
  }, [status, error, navigate]);

  useEffect(() => {
    dispatch(fetchAirplanes());
  }, [dispatch]);

  if (!AirplaneList || !AirplaneList.data || !AirplaneList.data.airplaneList) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      
      <Card>
        <CardBody>
          <BreadCrumbs />
          <BootstrapTable
            hover
            search 
            data={updateList}
            insertRow
            deleteRow
            selectRow={selectRowProp}
            pagination
            options={options}
            tableHeaderClass="mb-10"
            exportCSV
            headerStyle={{ width: '100%' }}
          >
            <TableHeaderColumn width="12.5%" dataField="airplaneCode" dataAlign="center" isKey>
              Airplane Code
            </TableHeaderColumn>
            <TableHeaderColumn width="12.5%" dataField="airline" dataAlign="center">
              Airline
            </TableHeaderColumn>
            <TableHeaderColumn width="12.5%" dataField="airport" dataAlign="center">
              Airport
            </TableHeaderColumn>
            <TableHeaderColumn width="12.5%" dataField="carousel" dataAlign="center">
              수화물 수취대
            </TableHeaderColumn>
            <TableHeaderColumn width="12.5%" dataField="chkinrange" dataAlign="center">
              체크인 카운터
            </TableHeaderColumn>
            <TableHeaderColumn width="12.5%" dataField="gatenumber" dataAlign="center">
              탑승구
            </TableHeaderColumn>
            <TableHeaderColumn width="12.5%" dataField="scheduleDateTime" dataAlign="center">
              Schedule DateTime
            </TableHeaderColumn>
          </BootstrapTable>
        </CardBody>
      </Card>
    </div>
  );
};

export default Datatables;
