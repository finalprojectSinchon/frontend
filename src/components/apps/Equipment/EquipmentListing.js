import { Row, Col } from 'reactstrap';
import { Link } from 'react-router-dom';

import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchEquipments } from '../../../store/apps/equipment/equipmentSlice.js';

const EquipmentListing = () => {


    const equipmentList = useSelector((state) => state.equipments.equipmentList);
    const equipments = equipmentList.data || [];
    console.log('equipmentList',equipmentList);
    const dispatch = useDispatch();
    const currentFilter = useSelector(state => state.equipments.currentFilter);
    const sort = useSelector(state => state.equipments.sort);

    console.log('sort',sort)
    useEffect(() => {
         dispatch(fetchEquipments());
     }, [dispatch]);
    const getVisibleEquipments = (approveList, filter,sortOption) => {
        let filteredEquipments = [...approveList];

        if (filter !== 'show_all') {
            filteredEquipments = filteredEquipments.filter(equip => {
                if (filter == '항공기정비장비' && equip.category == '항공기정비장비') return true;
                if (filter == '활주로및계류장유지보수장비' && equip.category == '활주로및계류장유지보수장비') return true;
                if (filter == '전기및전자장비' && equip.category == '전기및전자장비') return true;
                if (filter == '통신및네트워크장비' && equip.category == '통신및네트워크장비') return true;
                if (filter == '화재및안전장비' && equip.category == '화재및안전장비') return true;
                if (filter == '청소및환경관리장비' && equip.category == '청소및환경관리장비') return true;
                if (filter == '건설및건축장비' && equip.category == '건설및건축장비') return true;
                if (filter == '운송및물류장비' && equip.category == '운송및물류장비') return true;
                return false;
            });
        }
        console.log('sortOption',sortOption)
        if (sortOption === 'quantity_low_high') {
           return filteredEquipments.sort((a, b) => a.equipmentQuantity - b.equipmentQuantity);
        } else if (sortOption === 'quantity_high_low') {
          return  filteredEquipments.sort((a, b) => b.equipmentQuantity - a.equipmentQuantity);
        }

        return filteredEquipments;
    };
    const visibleContacts = getVisibleEquipments(equipments, currentFilter,sort);

    return (
    <div className="p-4">
      <Row>
        {visibleContacts.map((equipment) => (
          <Col lg="4" key={equipment.equipmentCode} className="mb-4">
              <Link to={`/equipment/${equipment.equipmentCode}`}>
              <img  src={equipment.img} className="img-fluid rounded-3" style={{width:'150px'}} />
            </Link>
            <div className="pt-2">
              <small>{equipment.category}</small>
              <h5 className="mb-3">{equipment.equipmentName}</h5>
              <div className="d-flex align-items-center">
                <h5>{equipment.equipmentQuantity}개</h5>

              </div>
            </div>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default EquipmentListing;
