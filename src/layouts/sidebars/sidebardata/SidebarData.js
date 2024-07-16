import MaterialIcon from '@material/react-material-icon';

const SidebarData = [
  { caption: 'Home' },
  {
    title: 'Dashboards',
    href: '/dashboards',
    id: 1,
    icon: <MaterialIcon icon="speed" />,
    collapisble: true,
    
  },
  { caption: 'Menu' },
  {
    title: '사용승인',
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
    title: '사원 조회',
    href: '/apps/calendar',
    icon: <MaterialIcon icon="calendar_today" />,
    id: 2.4,
    collapisble: false,
  },
  {
    title: '안전 점검',
    href: '/apps/email',
    icon: <MaterialIcon icon="mail_outline" />,
    suffix: 'New',
    suffixColor: 'bg-success',
    id: 2.5,
    collapisble: false,
  },
  {
    title: '정비',
    href: '/casl',
    icon: <MaterialIcon icon="manage_accounts" />,
    id: 2.6,
    collapisble: false,
  },
  { caption: '시설물' },

  {
    title: '이동 수단',
    href: '/ecom',
    icon: <MaterialIcon icon="shopping_cart" />,
    id: 2.7,
    collapisble: true,
  
  },
  {
    title: '비행기',
    href: '/tickt',
    icon: <MaterialIcon icon="confirmation_number" />,
    id: 2.8,
    collapisble: true,
    children: [
      {
        title: '체크인 카운터 등록',
        href: '/tickt/ticket-list',
        icon: <MaterialIcon icon="radio_button_checked" />,
      },
      {
        title: '수화물 수취대 등록',
        href: '/tickt/ticket-detail',
        icon: <MaterialIcon icon="radio_button_checked" />,
      },
      {
        title: '탑승구 등록',
        href: '/tickt/ticket-detail',
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
    href: '/ui',
    id: 2,
    suffix: '22',
    suffixColor: 'bg-info',
    icon: <MaterialIcon icon="grid_view" />,
    collapisble: true,
  
  },
  {
    title: '편의 시설',
    href: '/form-layout',
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
  { caption: 'Other' },
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
  },
  {
    title: 'Logout',
    href: '/tables/basic-table',
    icon: <MaterialIcon icon="table_chart" />,
    id: 4.1,
    collapisble: false,
  },
  {
    title: 'React Table',
    href: '/tables/react-table',
    icon: <MaterialIcon icon="table_rows" />,
    id: 4.2,
    collapisble: false,
  },
  {
    title: 'Bootstrap Datatable',
    href: '/tables/data-table',
    icon: <MaterialIcon icon="backup_table" />,
    id: 4.3,
    collapisble: false,
  },
  { caption: 'Charts' },
  {
    title: 'Apexchart',
    href: '/charts/apex',
    icon: <MaterialIcon icon="scatter_plot" />,
    id: 5.1,
    collapisble: false,
  },
  {
    title: 'ChartJs',
    href: '/charts/chartjs',
    icon: <MaterialIcon icon="area_chart" />,
    id: 5.2,
    collapisble: false,
  },
  { caption: 'Extra' },
  {
    title: 'Sample Pages',
    href: '/sample-pages',
    icon: <MaterialIcon icon="copy_all" />,
    id: 6.1,
    collapisble: true,
    children: [
      {
        title: 'Starterkit',
        href: '/sample-pages/starterkit',
        icon: <MaterialIcon icon="radio_button_checked" />,
      },
      {
        title: 'Profile',
        href: '/sample-pages/profile',
        icon: <MaterialIcon icon="radio_button_checked" />,
      },
      {
        title: 'Search Result',
        href: '/sample-pages/search-result',
        icon: <MaterialIcon icon="radio_button_checked" />,
      },
      {
        title: 'Gallery',
        href: '/sample-pages/gallery',
        icon: <MaterialIcon icon="radio_button_checked" />,
      },
      {
        title: 'Helper Class',
        href: '/sample-pages/helper-class',
        icon: <MaterialIcon icon="radio_button_checked" />,
      },
    ],
  },
  {
    title: 'Widget',
    href: '/widget',
    icon: <MaterialIcon icon="widgets" />,
    id: 6.4,
    collapisble: false,
  },
  {
    title: 'Icons',
    href: '/icons',
    icon: <MaterialIcon icon="face" />,
    id: 6.2,
    collapisble: true,
    children: [
      {
        title: 'Bootstrap',
        href: '/icons/bootstrap',
        icon: <MaterialIcon icon="radio_button_checked" />,
      },
      {
        title: 'Feather',
        href: '/icons/feather',
        icon: <MaterialIcon icon="radio_button_checked" />,
      },
    ],
  },
  {
    title: 'Vector Map',
    href: '/map/vector',
    icon: <MaterialIcon icon="place" />,
    id: 6.3,
    collapisble: false,
  },
  {
    title: 'Authentication',
    href: '/auth',
    icon: <MaterialIcon icon="lock" />,
    id: 6.5,
    collapisble: true,
    children: [
      {
        title: 'Login',
        href: '/auth/loginformik',
        icon: <MaterialIcon icon="radio_button_checked" />,
      },
      {
        title: 'Register',
        href: '/auth/registerformik',
        icon: <MaterialIcon icon="radio_button_checked" />,
      },
      {
        title: 'Maintanance',
        href: '/auth/maintanance',
        icon: <MaterialIcon icon="radio_button_checked" />,
      },
      {
        title: 'Lockscreen',
        href: '/auth/lockscreen',
        icon: <MaterialIcon icon="radio_button_checked" />,
      },
      {
        title: 'Recover Password',
        href: '/auth/recoverpwd',
        icon: <MaterialIcon icon="radio_button_checked" />,
      },
      {
        title: 'Error',
        href: '/auth/404',
        icon: <MaterialIcon icon="radio_button_checked" />,
      },
    ],
  },
  {
    title: 'DD Menu',
    href: '/',
    id: 7,
    collapisble: true,
    icon: <MaterialIcon icon="subject" />,
    children: [
      {
        title: 'Simple dd 1',
        href: '/',
        icon: <MaterialIcon icon="radio_button_checked" />,
      },
      {
        title: 'Simple dd 2',
        href: '/',
        icon: <MaterialIcon icon="radio_button_checked" />,
      },
      {
        title: 'Simple dd 3',
        href: '/',
        icon: <MaterialIcon icon="radio_button_checked" />,
        children: [
          {
            title: 'Simple dd 1.1',
            href: '/alerts',
            icon: <MaterialIcon icon="radio_button_checked" />,
          },
        ],
      },
    ],
  },
];

export default SidebarData;
