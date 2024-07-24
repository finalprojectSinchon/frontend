import MaterialIcon from '@material/react-material-icon';

const SidebarData = [

  {
    title: 'Dashboards',
    href: '/dashboards',
    id: 1,
    icon: <MaterialIcon icon="speed" />,
    collapisble: true,
  
  },
  {
    title: '관리자',
    href: '/',
    icon: <MaterialIcon icon="how_to_reg" />,
    id: 2.83,
    collapisble: false,
    children: [
      {
        title: '인증코드 발급',
        href: '/code-issuance',
        icon: <MaterialIcon icon="radio_button_checked" />,
      },
    ],
  },
  {
    title: '사용 승인',
    href: '/apps/notes',
    icon: <MaterialIcon icon="description" />,
    id: 2.1,
    collapisble: false,
  },
  {
    title: '커뮤니티',
    href: '/apps/chat',
    icon: <MaterialIcon icon="chat" />,
    id: 2.2,
    collapisble: false,
  },
  {
    title: '메세지',
    href: '/apps/contacts',
    icon: <MaterialIcon icon="person_outline" />,
    id: 2.3,
    collapisble: false,
  },
  {
    title: '사원조회',
    href: '/contact',
    icon: <MaterialIcon icon="calendar_today" />,
    id: 2.4,
    collapisble: false,
  },
  {
    title: '안전 점검',
    href: '/api/v1/inspection',
    icon: <MaterialIcon icon="mail_outline" />,
    suffix: 'New',
    suffixColor: 'bg-success',
    id: 2.5,
    collapisble: false,
  },
  {
    title: '정비',
    href: '/maintenance',
    icon: <MaterialIcon icon="manage_accounts" />,
    id: 2.6,
    collapisble: false,
  },


  {
    title: '이동수단',
    href: '/ecom',
    icon: <MaterialIcon icon="shopping_cart" />,
    id: 2.7,
    collapisble: true,
  
  },
  {
    title: '비행기',
    href: '/airplane',
    icon: <MaterialIcon icon="confirmation_number" />,
    id: 2.8,
    collapisble: false,
    children: [
      {
        title: '비행기',
        href: '/airplane',
        icon: <MaterialIcon icon="radio_button_checked" />,
      },
      {
        title: '체크인 카운터',
        href: '/airplane/checkin-counter',
        icon: <MaterialIcon icon="radio_button_checked" />,
      },
      {
        title: '탑승구',
        href: '/airplane/gate',
        icon: <MaterialIcon icon="radio_button_checked" />,
      },
      {
        title: '수화물 수취대',
        href: '/airplane/baggage-claim',
        icon: <MaterialIcon icon="radio_button_checked" />,
      },
    ],
  },
  {
    title: '점포',
    href: '/airport/store',
    icon: <MaterialIcon icon="account_tree" />,
    id: 2.9,
    collapisble: false,
  },
  {
    title: '창고',
    href: '/ui',
    id: 3,
    suffix: '22',
    suffixColor: 'bg-info',
    icon: <MaterialIcon icon="grid_view" />,
    collapisble: true,
  
  },
  {
    title: '편의시설',
    href: '/facilities',
    icon: <MaterialIcon icon="feed" />,
    id: 3.1,
    collapisble: true,
  
  },
  {
    title: '안내소',
    href: '/form-pickers',
    icon: <MaterialIcon icon="colorize" />,
    id: 3.2,
    collapisble: true,
  
  },
  {
    title: '장비재고',
    href: '/form-validation',
    icon: <MaterialIcon icon="assignment_turned_in" />,
    id: 3.3,
    collapisble: false,
  },
  {
    title: 'Settings',
    href: '/form-steps',
    icon: <MaterialIcon icon="toc" />,
    id: 3.4,
    collapisble: false,
  },
  {
    title: 'Logout',
    href: '/logout',
    icon: <MaterialIcon icon="app_registration" />,
    id: 3.5,
    collapisble: false,
  },

];

export default SidebarData;
