import React ,{useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import SimpleBar from 'simplebar-react';
import {
  Navbar,
  Nav,
  NavItem,
  NavbarBrand,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Button, Input,
} from 'reactstrap';
import * as Icon from 'react-feather';
import { ReactComponent as LogoWhite } from '../../assets/images/logos/white-logo-icon.svg';
import MessageDD from './MessageDD';
import NotificationDD from './NotificationDD';
import MegaDD from './MegaDD';
import user1 from '../../assets/images/users/user4.jpg';
import Logo from '../logo/Logo';
import { ToggleMiniSidebar, ToggleMobileSidebar } from '../../store/customizer/CustomizerSlice';
import ProfileDD from './ProfileDD';
import Cookies from 'js-cookie'
import Player from "src/components/apps/audioPlayer/Player.js";
import StatusProfileImg from "src/components/apps/liveStatus/StatusProfileImg.js";
import SosIcon from '@mui/icons-material/Sos';
import {sendSosAlert} from "src/store/apps/websocket/WebSocketSlice.js";

const Header = () => {
  const isDarkMode = useSelector((state) => state.customizer.isDark);
  const topbarColor = useSelector((state) => state.customizer.topbarBg);
  const userInfo = useSelector((state) => state.userInfo);
  const dispatch = useDispatch();

  let navigate = useNavigate();
  const [clearNotifications, setClearNotifications] = useState(false);
  const logoutHandler = () => {
    Cookies.remove('token');
    navigate('auth/loginformik')
  }
  const handleClearNotifications = () => {
    setClearNotifications(true);
    setTimeout(() => setClearNotifications(false), 100);
  };

  const [reason, setReason] = useState('');

  const handleSosClick = () => {
    if(reason) {
      dispatch(sendSosAlert('긴급 상황 발생! \n' + `\n 사유 : ${reason}`));
    } else {
      dispatch(sendSosAlert('긴급 상황 발생!'));
    }
    setReason('');
  }

  const handleInputClick = (e) => {
    e.stopPropagation(); // 이벤트 전파 중지
  };

  return (
    <>
      <Navbar
        color={topbarColor}
        dark={!isDarkMode}
        light={isDarkMode}
        expand="lg"
        className="topbar"
      >
        {/********Logo*******/}
        <div className="d-none d-lg-flex align-items-center logo-space">
          <Logo />
          <span className='d-sm-block d-lg-none'>
          <Button
            close
            size="sm"
            className="ms-auto "
            onClick={() => dispatch(ToggleMobileSidebar())}
          />
          </span>
        </div>
        {/******************************/}
        {/**********Toggle Buttons**********/}
        {/******************************/}
        <div className="d-flex align-items-center">
          <Button
            color={topbarColor}
            className="d-none d-lg-block mx-1 bg-transparent border-0"
            onClick={() => dispatch(ToggleMiniSidebar())}
          >
            <Icon.Menu size={18} />
          </Button>
          <NavbarBrand href="/dashboards/dashboard1" className="d-sm-block d-lg-none">
            <LogoWhite />
          </NavbarBrand>
          <Button
            color={topbarColor}
            className="d-sm-block d-lg-none bg-transparent border-0 mx-1"
            onClick={() => dispatch(ToggleMobileSidebar())}
          >
            <i className="bi bi-list" />
          </Button>
        </div>

        {/******************************/}
        {/**********Left Nav Bar**********/}
        {/******************************/}

        <Nav className="me-auto d-flex flex-row align-items-center" navbar>
          {/******************************/}
          {/**********Mega DD**********/}
          {/******************************/}
          <UncontrolledDropdown className="mega-dropdown mx-1">
            <DropdownToggle className="bg-transparent border-0" color={topbarColor}>
              <Icon.Grid size={18} />
            </DropdownToggle>
            <DropdownMenu>
              <MegaDD />
            </DropdownMenu>
          </UncontrolledDropdown>
          <NavItem className="d-md-block d-none">
            <Link to="/about" className={`nav-link ${topbarColor === 'white' ? 'text-dark' : ''}`}>
              About
            </Link>
          </NavItem>
        </Nav>
        <div className="d-flex align-items-center">
          <UncontrolledDropdown className="mx-0">
            <DropdownToggle className="bg-transparent border-0" color={topbarColor}>
              <Icon.PlayCircle size={18} />
            </DropdownToggle>
            <DropdownMenu className="ddWidth">
              <DropdownItem header>
                <Player/>
              </DropdownItem>
            </DropdownMenu>
          </UncontrolledDropdown>
          {/******************************/}
          {/**********Notification DD**********/}
          {/******************************/}
          <UncontrolledDropdown className="mx-1">
            <DropdownToggle className="bg-transparent border-0" color={topbarColor}>
              <Icon.MessageSquare size={18} />
            </DropdownToggle>
            <DropdownMenu className="ddWidth">
              <DropdownItem header>
                <span className="mb-0 fs-5">알림</span>
              </DropdownItem>
              <DropdownItem divider />
              <SimpleBar style={{ maxHeight: '350px' }}>
                <NotificationDD clearNotifications={clearNotifications}  />
              </SimpleBar>
              <DropdownItem divider />
              <div className="p-2 px-3">
                <Button color="primary" size="sm" block onClick={handleClearNotifications}>
                  Check All
                </Button>
              </div>
            </DropdownMenu>
          </UncontrolledDropdown>
          {/******************************/}
          {/**********SOS DD**********/}
          {/******************************/}
          <UncontrolledDropdown className="mx-1">
            <DropdownToggle className="bg-transparent border-0" color={topbarColor}>
              <SosIcon size={18} />
            </DropdownToggle>
            <DropdownMenu className="ddWidth">
              <DropdownItem header>
                <span className="mb-0 fs-5">SOS 버튼</span>
              </DropdownItem>
              <DropdownItem divider />
              <SimpleBar style={{ height: '380px' }}>
                <div className="px-3"> {/* DropdownItem 대신 div 사용 */}
                  <img
                      src="https://i.postimg.cc/mrFKBHq0/2024-08-10-6-32-40.png"
                      alt="Siren"
                      style={{ width: '100%', marginBottom: '10px', cursor: 'pointer' }}
                      onClick={handleSosClick}
                  />
                </div>
                <DropdownItem divider />
                <div className="px-3 py-2"> {/* DropdownItem 대신 div 사용 */}
                  <Input
                      type="text"
                      placeholder="호출 사유를 입력해주세요"
                      value={reason}
                      onChange={(e) => setReason(e.target.value)}
                      onClick={handleInputClick} // 클릭 이벤트 처리
                      style={{ marginBottom: '10px' }}
                  />
                  <p style={{ color: 'red', fontSize: '14px', marginTop: '10px', textAlign: 'center' }}>
                    반드시 위급 상황시에만 눌러주세요!
                  </p>
                </div>
              </SimpleBar>
            </DropdownMenu>
          </UncontrolledDropdown>
          {/******************************/}
          {/**********Profile DD**********/}
          {/******************************/}
          <UncontrolledDropdown>
            <DropdownToggle color="transparent">
              <StatusProfileImg userCode={userInfo.userCode} src={userInfo.userImg} width={40} />
            </DropdownToggle>
            <DropdownMenu className="ddWidth profile-dd">
              <ProfileDD />
              <div className="p-2 px-3">
                <Button color="danger" size="sm" onClick={logoutHandler}>
                  로그아웃
                </Button>
              </div>
            </DropdownMenu>
          </UncontrolledDropdown>
        </div>
      </Navbar>
    </>
  );
};

export default Header;
