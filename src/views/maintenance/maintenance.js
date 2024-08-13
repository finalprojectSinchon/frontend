import React, { useEffect } from 'react';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import '../airplane/ReactBootstrapTable.scss';
import { Card, CardBody, CardTitle, CardSubtitle, Button } from 'reactstrap';
import { useDispatch, useSelector } from 'react-redux';
import { fetchMaintenances } from '../../store/apps/maintenance/maintenanceSlice';
import { useNavigate } from 'react-router-dom';

function onAfterDeleteRow(rowKeys) {
  alert(`The rowkey you drop: ${rowKeys}`);
}

function afterSearch(searchText, result) {}

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
  const maintenanceList = useSelector((state) => state.maintenances.maintenanceList);

  const options = {
    afterDeleteRow: onAfterDeleteRow,
    afterSearch,
    onRowClick: (row) => {
      navigate(`/maintenance/${row.maintenanceCode}`);
    },
  };

  useEffect(() => {
    dispatch(fetchMaintenances());
  }, [dispatch]);

  if (!maintenanceList || !maintenanceList.data || !maintenanceList.data.maintenanceList) {
    return <div>Loading...</div>;
  }

  // structure 값에 따라 한글로 변환하는 함수
  const formatStructure = (cell) => {
    switch (cell) {
      case 'gate':
        return '탑승구';
      case 'baggageClaim':
        return '수화물수취대';
      case 'checkinCounter':
        return '체크인 카운터';
      case 'store':
        return '점포';
      case 'storage':
        return '창고';
      default:
        return cell; // 변환할 값이 없으면 원래 값 반환
    }
  };

  return (
      <div>
        <Card>
          <CardBody>
            <div className="d-flex justify-content-between align-items-center">
              <div>
                <CardTitle tag="h5">정비</CardTitle>
                <CardSubtitle className="mb-2 text-muted" tag="h6">
                  정비 전체 조회
                </CardSubtitle>
              </div>
              <Button color="primary" onClick={() => navigate('/maintenance/regist')}>
                등록
              </Button>
            </div>
            <BootstrapTable
                hover
                search
                data={maintenanceList.data.maintenanceList}
                selectRow={selectRowProp}
                pagination
                options={options}
                cellEdit={cellEditProp}
                tableHeaderClass="mb-10"
                exportCSV
                headerStyle={{ width: '100%' }}
            >
              <TableHeaderColumn width="20%" dataField="maintenanceCode" dataAlign="center" isKey>
                정비 번호
              </TableHeaderColumn>
              <TableHeaderColumn width="20%" dataField="structure" dataAlign="center" dataFormat={formatStructure}>
                시설물
              </TableHeaderColumn>
              <TableHeaderColumn width="20%" dataField="location" dataAlign="center">
                위치
              </TableHeaderColumn>
              <TableHeaderColumn width="20%" dataField="maintenanceEndDate" dataAlign="center">
                정비일
              </TableHeaderColumn>
              <TableHeaderColumn width="20%" dataField="file" dataAlign="center">
                비용
              </TableHeaderColumn>
            </BootstrapTable>
          </CardBody>
        </Card>
      </div>
  );
};

export default Datatables;
