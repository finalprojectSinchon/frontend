import React from 'react';
import { DropdownItem } from 'reactstrap';
import { User, FileText, Star, Settings, Droplet } from 'react-feather';
import user1 from '../../assets/images/users/user4.jpg';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

const ProfileDD = () => {

  const userInfo = useSelector(state => state.userInfo);

  return (
    <div>
      <div className="d-flex gap-3 p-3 border-bottom pt-2 align-items-center">
        <img src={userInfo.userImg} alt="user" className="rounded-circle" width="60" />
        <span>
          <h5 className="mb-0">{userInfo.userName}</h5>
          <small className='fs-6 text-muted'>{userInfo.userEmail}</small>
        </span>
      </div>
      <DropdownItem className="px-4 py-3" tag={Link} to="/profile">
        <User size={20} />
        &nbsp; My Profile
      </DropdownItem>
      <DropdownItem className="px-4 py-3">
        <FileText size={20} />
        &nbsp; Edit Profile
      </DropdownItem>
      <DropdownItem className="px-4 py-3">
        <Star size={20} />
        &nbsp; My Balance
      </DropdownItem>
      <DropdownItem className="px-4 py-3">
        <Droplet size={20} />
        &nbsp; Customize
      </DropdownItem>
      <DropdownItem divider />
      <DropdownItem className="px-4 py-3">
        <Settings size={20} />
        &nbsp; Settings
      </DropdownItem>
      <DropdownItem divider />
    </div>
  );
};

export default ProfileDD;
