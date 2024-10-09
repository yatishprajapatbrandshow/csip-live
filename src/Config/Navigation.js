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
  } from '@heroicons/react/24/outline'
  

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
          href: '/AllCurriculum', 
          icon: ViewfinderCircleIcon 
        },
        { 
          name: 'Choose / Change', 
          description: 'Connect with third-party tools to customize your curriculum based on your needs.', 
          href: '#', 
          icon: SquaresPlusIcon 
        },
        { 
          name: 'College Wise', 
          description: 'Engage with specific colleges to understand their offerings and expectations.', 
          href: '#', 
          icon: AcademicCapIcon 
        },
      ],
      subMenuType: "multiple"
    },
    { 
      name: 'Topic', 
      href: '#', 
      current: false,
      subMenu: [
        { 
          name: 'Add', 
          description: 'Introduce new topics to enhance your learning experience.', 
          href: '#', 
          icon: FolderPlusIcon 
        },
        { 
          name: 'Remove', 
          description: 'Eliminate outdated topics to keep your curriculum relevant.', 
          href: '#', 
          icon: FolderMinusIcon 
        },
      ],
      subMenuType: "single"
    },
    { 
      name: 'Activity', 
      href: '#', 
      current: false,
      subMenu: [
        { 
          name: 'Applied', 
          description: 'View all topics you have applied your knowledge to in real scenarios.', 
          href: '#', 
          icon: CursorArrowRippleIcon 
        },
        { 
          name: 'Search by Topic', 
          description: 'Find activities related to specific topics for better focus.', 
          href: '#', 
          icon: DocumentMagnifyingGlassIcon 
        },
        { 
          name: 'Recommended', 
          description: 'Discover activities suggested based on your preferences and performance.', 
          href: '#', 
          icon: FolderOpenIcon 
        },
        { 
          name: 'New', 
          description: 'Explore the latest activities available to enhance your learning.', 
          href: '#', 
          icon: PlusIcon 
        },
        { 
          name: 'Trending', 
          description: 'Stay updated with activities that are currently popular among users.', 
          href: '#', 
          icon: ArrowTrendingUpIcon 
        },
        { 
          name: 'Ongoing', 
          description: 'Track your ongoing activities to stay on top of your learning progress.', 
          href: '#', 
          icon: ArrowRightEndOnRectangleIcon 
        },
        { 
          name: 'Submission Pending', 
          description: 'Manage your activities that are pending submission for evaluation.', 
          href: '#', 
          icon: IdentificationIcon 
        },
        { 
          name: 'Pending Approval', 
          description: 'Check the status of your activities waiting for approval from the authority.', 
          href: '#', 
          icon: ReceiptRefundIcon 
        },
        { 
          name: 'Payment Pending', 
          description: 'Review activities that have payments pending for successful enrollment.', 
          href: '#', 
          icon: CurrencyRupeeIcon 
        },
      ],
      subMenuType: "single"
    },
  ];
  