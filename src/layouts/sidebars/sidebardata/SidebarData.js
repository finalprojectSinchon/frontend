import MaterialIcon from '@material/react-material-icon';
import { useSelector } from "react-redux";

const SidebarData = () => {
  const userInfo = useSelector((state) => state.userInfo);

  const data = [
    {
      title: 'Main',
      href: '/main',
      id: 1,
      icon: <MaterialIcon icon="dashboard" />,
      collapisble: true,
    },
    {
      title: '메세지',
      href: '/chatting',
      icon: <MaterialIcon icon="chat" />,
      id: 3,
      collapisble: false,
    },


      {
    title: '캘린더',
    href: '/calendar',
    id: 3.6,
    icon: <MaterialIcon  icon="calendar_today" />,
    collapisble: true,

    },

    {
      title: '사원조회',
      href: '/contact',
      icon: <MaterialIcon icon="contacts" />,
      id: 4,
      collapisble: false,
    },
    {
      title: 'AI - 손님응대',
      href: '/ai-question',
      icon: <MaterialIcon icon="smart_toy" />,
      id: 4.1,
      collapisble: false,
    },
    {
      title: '안전 점검',
      href: '/inspection',
      icon: <MaterialIcon icon="security" />,
      suffixColor: 'bg-success',
      id: 5,
      collapisble: false,
    },
    {
      title: '정비',
      href: '/maintenance',
      icon: <MaterialIcon icon="build" />,
      id: 6,
      collapisble: false,
    },
    {
      title: '편의시설',
      href: '/facilities',
      icon: <MaterialIcon icon="store" />,
      id:  7,
      collapisble: true,
    },
    // {
    //   title: 'Logout',
    //   href: '/logout',
    //   icon: <MaterialIcon icon="logout" />,
    //   id: 12,
    //   collapisble: false,
    // },
  ];

  if (userInfo.userRole === 'ROLE_ADMIN') {
    data.push({
      title: '관리자',
      href: '/',
      icon: <MaterialIcon icon="admin_panel_settings" />,
      id: 2,
      collapisble: false,
      children: [
        {
          title: '인증코드 발급',
          href: '/code-issuance',
          icon: <MaterialIcon icon="vpn_key" />,
        },
        {
          title: 'QR코드 생성',
          href: '/qrcode',
          icon: <MaterialIcon icon="qr_code" />,
        },
        {
          title: '사용 승인',
          href: '/approve',
          icon: <MaterialIcon icon="check_circle" />,
        },
        {
          title: '신규 유저 권한 등록',
          href: '/role',
          icon: <MaterialIcon icon="person_add" />,
        },
      ],
    });
  }

  if (userInfo.userRole === 'ROLE_ADMIN' || userInfo.userRole === "ROLE_AIRPLANE") {
    data.push({
      title: '비행기',
      href: '/airplane',
      icon: <MaterialIcon icon="airplanemode_active" />,
      id:9,
      collapisble: false,
      children: [
        {
          title: '비행기',
          href: '/airplane',
          icon: <MaterialIcon icon="flight" />,
        },
        {
          title: '체크인 카운터',
          href: '/airplane/checkin-counter',
          icon: <MaterialIcon icon="check_circle" />,
        },
        {
          title: '탑승구',
          href: '/airplane/gate',
          icon: <MaterialIcon icon="door_front" />,
        },
        {
          title: '수화물 수취대',
          href: '/airplane/baggage-claim',
          icon: <MaterialIcon icon="luggage" />,
        },
      ],
    });
  }

  if (userInfo.userRole === 'ROLE_ADMIN' || userInfo.userRole === 'ROLE_STORE') {
    data.push({
      title: '점포',
      href: '/airport/store',
      icon: <MaterialIcon icon="storefront" />,
      id: 10,
      collapisble: false,
    });
  }

  if (userInfo.userRole === 'ROLE_ADMIN' || userInfo.userRole === 'ROLE_STORE') {
    data.push({
      title: '창고',
      href: '/storage',
      icon: <MaterialIcon icon="warehouse" />,
      id: 7,
      collapisble: true,
      children: [
        {
          title: '창고',
          href: '/storage',
          icon: <MaterialIcon icon="inventory" />,
        },
        {
          title: '장비재고',
          href: '/equipment',
          icon: <MaterialIcon icon="engineering" />,
        },
      ],
    });
  }

  data.sort((a, b) => a.id - b.id);

  return data;
};

export default SidebarData;
