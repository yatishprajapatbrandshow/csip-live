import {
  AcademicCapIcon,
  ArrowPathIcon,
  ArrowRightEndOnRectangleIcon,
  ArrowTrendingUpIcon,
  ChartPieIcon,
  CurrencyRupeeIcon,
  CursorArrowRaysIcon,
  CursorArrowRippleIcon,
  DocumentChartBarIcon,
  DocumentMagnifyingGlassIcon,
  FingerPrintIcon,
  FolderMinusIcon,
  FolderOpenIcon,
  FolderPlusIcon,
  IdentificationIcon,
  PlusIcon,
  ReceiptRefundIcon,
  SquaresPlusIcon,
  ViewfinderCircleIcon,
  ClipboardDocumentCheckIcon
} from '@heroicons/react/24/outline'


export const MenuItemLinksForCorporate = [
  {
    name: 'Dashboard',
    href: '/corporate/',
    current: true
  },
  {
    name: 'Add Activity',
    href: '/corporate/add',
    current: true
  },
  {
    name: 'Activity List',
    href: '/corporate/activitylist',
    current: true
  },
];
export const MenuItemLinks = [
  {
    name: 'Dashboard',
    href: '/dashboard',
    current: true
  },
  {
    name: 'Curriculum',
    href: '#',
    current: false,
    subMenu: [
      {
        name: 'View',
        description: 'Gain insights into your academic traffic and performance metrics.',
        href: '/curriculum',
        icon: ViewfinderCircleIcon,
        color: 'blue-500'  // Assign color for this icon
      },
      {
        name: 'Choose / Change',
        description: 'Connect with third-party tools to customize your curriculum based on your needs.',
        href: 'AllCurriculum',
        icon: SquaresPlusIcon,
        color: 'green-500'  // Assign color for this icon
      },
      {
        name: 'College Wise',
        description: 'Engage with specific colleges to understand their offerings and expectations.',
        href: 'ChooseCollege',
        icon: AcademicCapIcon,
        color: 'purple-500'  // Assign color for this icon
      }
    ],

    subMenuType: "multiple"
  },
  // {
  //   name: 'Topic',
  //   href: '#',
  //   current: false,
  //   subMenu: [
  //     {
  //       name: 'Add',
  //       description: 'Introduce new topics to enhance your learning experience.',
  //       href: '',
  //       icon: FolderPlusIcon
  //     },
  //     {
  //       name: 'Remove',
  //       description: 'Eliminate outdated topics to keep your curriculum relevant.',
  //       href: 'dashboard',
  //       icon: FolderMinusIcon
  //     },
  //   ],
  //   subMenuType: "single"
  // },
  {
    name: 'Activity',
    href: '#',
    current: false,
    subMenu: [
      {
        name: 'Applied',
        description: 'View all topics you have applied your knowledge to in real scenarios.',
        href: 'AppliedActivity',
        icon: CursorArrowRippleIcon,
        color: 'blue-500'  // Assign color for this icon
      },
      {
        name: 'Search by Topic',
        description: 'Find activities related to specific topics for better focus.',
        href: 'SearchByTopic',
        icon: DocumentMagnifyingGlassIcon,
        color: 'green-500'  // Assign color for this icon
      },
      {
        name: 'Recommended',
        description: 'Discover activities suggested based on your preferences and performance.',
        href: 'RecomendedActivity',
        icon: FolderOpenIcon,
        color: 'yellow-500'  // Assign color for this icon
      },
      {
        name: 'New',
        description: 'Explore the latest activities available to enhance your learning.',
        href: 'NewActivities',
        icon: PlusIcon,
        color: 'purple-500'  // Assign color for this icon
      },
      {
        name: 'Trending',
        description: 'Stay updated with activities that are currently popular among users.',
        href: 'TrendingActivities',
        icon: ArrowTrendingUpIcon,
        color: 'red-500'  // Assign color for this icon
      },
      {
        name: 'Ongoing',
        description: 'Track your ongoing activities to stay on top of your learning progress.',
        href: 'OngoingActivities',
        icon: ArrowRightEndOnRectangleIcon,
        color: 'indigo-500'  // Assign color for this icon
      },
      {
        name: 'Submission Pending',
        description: 'Manage your activities that are pending submission for evaluation.',
        href: '#',
        icon: IdentificationIcon,
        color: 'pink-500'  // Assign color for this icon
      },
      {
        name: 'Pending Approval',
        description: 'Check the status of your activities waiting for approval from the authority.',
        href: '#',
        icon: ReceiptRefundIcon,
        color: 'orange-500'  // Assign color for this icon
      },
      {
        name: 'Payment Pending',
        description: 'Review activities that have payments pending for successful enrollment.',
        href: 'PaymentPending',
        icon: CurrencyRupeeIcon,
        color: 'teal-500'  // Assign color for this icon
      },
      {
        name: 'Transaction List',
        description: 'All completed transaction list.',
        href: 'TransactionList',
        icon: ClipboardDocumentCheckIcon,
        color: 'green-500'  // Assign color for this icon
      }
    ],
    subMenuType: "single"
  },
];
