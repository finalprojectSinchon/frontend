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
    title: '사용 승인',
    href: '/apps/notes',
    icon: <MaterialIcon icon="description" />,
    id: 2.1,
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
    href: '/apps/calendar',
    icon: <MaterialIcon icon="calendar_today" />,
    id: 2.4,
    collapisble: false,
  },
  {
    title: '안전 점검',
    href: '/inspection',
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
    href: '/apps/treeview',
    icon: <MaterialIcon icon="account_tree" />,
    id: 2.9,
    collapisble: false,
  },
  {
    title: '창고',
    href: '/storage',
    icon: <MaterialIcon icon="grid_view" />,
    id: 3,
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
    title: '장비재고',
    href: '/equipment',
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
    href: '/form-editor',
    icon: <MaterialIcon icon="app_registration" />,
    id: 3.5,
    collapisble: false,
  }
  
];

export default SidebarData;
