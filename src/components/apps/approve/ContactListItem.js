import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { NavItem } from 'reactstrap';
import PropTypes from 'prop-types';
import { ToggleInnerRightPart } from '../../../store/customizer/CustomizerSlice';
import './Style.css'; // 스타일 파일 임포트

const ContactListItem = ({
  onContactClick,
  onStarredClick,
  onDeleteClick,
  approvalCode,
  id,
  firstname,
  lastname,
  image,
  department,
  starred,
  active,
  checkinCounter,
  baggageClaim,
  facilities,
  gate,
  storage,
  store,
  type,
  status, // 승인 상태 추가
}) => {
  const dispatch = useDispatch();
  const [hover, setHover] = useState(false); // 호버 상태 관리

  return (
    <NavItem
      onClick={onContactClick}
      onMouseEnter={() => setHover(true)} // 마우스 엔터시 호버 상태 활성화
      onMouseLeave={() => setHover(false)} // 마우스 리브시 호버 상태 비활성화
      className={`w-100 cursor-pointer ${active === id ? 'bg-light' : ''} ${status === 'Y' ? 'approved' : ''} ${hover ? 'hover' : ''}`} // 호버 클래스 추가
      style={{ borderBottom: '1px solid #ccc' }} // 목록마다 줄 선 추가
    >
      <div
        className="d-flex align-items-center p-3 mb-1"
        onClick={() => dispatch(ToggleInnerRightPart())}
      >
        <div>
          <img src={image} alt="user" className="rounded-circle" width="50" />
        </div>
        <div className="mx-2 flex-grow-1">
          <h5 className="mb-0 text-truncate" style={{ width: '140px' }}>
            {checkinCounter?.manager}  {storage?.manager} {facilities?.manager} {baggageClaim?.manager} {gate?.manager} {store?.manager}
          </h5>
          <small>{type} </small>
        </div>
        <div className="d-flex flex-shrink-0">
          <i
            className="bi bi-star-fill mx-2"
            onClick={onStarredClick}
            style={{ color: starred ? '#FFC107' : '#495057' }}
          />
          <i onClick={onDeleteClick} className="bi bi-trash" />
        </div>
      </div>
    </NavItem>
  );
};

ContactListItem.propTypes = {
  firstname: PropTypes.string,
  lastname: PropTypes.string,
  image: PropTypes.string,
  department: PropTypes.string,
  starred: PropTypes.bool,
  id: PropTypes.number,
  active: PropTypes.any,
  onStarredClick: PropTypes.func,
  onDeleteClick: PropTypes.func,
  onContactClick: PropTypes.func,
  status: PropTypes.string, // 승인 상태 Prop 추가
};

export default ContactListItem;
