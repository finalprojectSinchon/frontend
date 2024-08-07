import { Card, CardBody, CardTitle, Table } from 'reactstrap';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchEquipments } from '../../store/apps/equipment/equipmentSlice';

const ProjectTables = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchEquipments());
    }, [dispatch]);

    const equipments = useSelector(state => state.equipments.equipmentList);
    const equipmentList = equipments.data || [];

    console.log('equipments', equipments);

    return (
        <div>
            <Card>
                <CardBody>
                    <CardTitle tag="h4">장비 재고</CardTitle>
                    <Table className="no-wrap mt-3 align-middle" responsive borderless>
                        <thead>
                            <tr>
                                <th>장비 이름</th>
                                <th>재고 수량</th>
                                <th>위치</th>
                            </tr>
                        </thead>
                        <tbody>
                            {equipmentList
                                .filter(tdata => tdata.equipmentQuantity < 6)
                                .map((tdata) => (
                                    <tr key={tdata.equipmentName} className="border-top">
                                        <td>
                                            <div className="d-flex align-items-center p-2">
                                                <img
                                                    src={tdata.img}
                                                    className="rounded-circle"
                                                    alt="avatar"
                                                    width="45"
                                                    height="45"
                                                />
                                                <div className="ms-3">
                                                    <h5 className="mb-0">{tdata.equipmentName}</h5>
                                                </div>
                                            </div>
                                        </td>
                                        <td>{tdata.equipmentQuantity}</td>
                                        <td>{tdata.location}</td>
                                    </tr>
                                ))}
                        </tbody>
                    </Table>
                </CardBody>
            </Card>
        </div>
    );
};

export default ProjectTables;
