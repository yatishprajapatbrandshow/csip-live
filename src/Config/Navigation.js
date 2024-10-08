import {
    ArrowPathIcon,
    ChartPieIcon,
    CursorArrowRaysIcon,
    DocumentChartBarIcon,
    FingerPrintIcon,
    SquaresPlusIcon,
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
          icon: ChartPieIcon 
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
          icon: CursorArrowRaysIcon 
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
          icon: ChartPieIcon 
        },
        { 
          name: 'Remove', 
          description: 'Eliminate outdated topics to keep your curriculum relevant.', 
          href: '#', 
          icon: ChartPieIcon 
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
          icon: ChartPieIcon 
        },
        { 
          name: 'Search by Topic', 
          description: 'Find activities related to specific topics for better focus.', 
          href: '#', 
          icon: ChartPieIcon 
        },
        { 
          name: 'Recommended', 
          description: 'Discover activities suggested based on your preferences and performance.', 
          href: '#', 
          icon: ChartPieIcon 
        },
        { 
          name: 'New', 
          description: 'Explore the latest activities available to enhance your learning.', 
          href: '#', 
          icon: ChartPieIcon 
        },
        { 
          name: 'Trending', 
          description: 'Stay updated with activities that are currently popular among users.', 
          href: '#', 
          icon: ChartPieIcon 
        },
        { 
          name: 'Ongoing', 
          description: 'Track your ongoing activities to stay on top of your learning progress.', 
          href: '#', 
          icon: ChartPieIcon 
        },
        { 
          name: 'Submission Pending', 
          description: 'Manage your activities that are pending submission for evaluation.', 
          href: '#', 
          icon: ChartPieIcon 
        },
        { 
          name: 'Pending Approval', 
          description: 'Check the status of your activities waiting for approval from the authority.', 
          href: '#', 
          icon: ChartPieIcon 
        },
        { 
          name: 'Payment Pending', 
          description: 'Review activities that have payments pending for successful enrollment.', 
          href: '#', 
          icon: ChartPieIcon 
        },
      ],
      subMenuType: "single"
    },
  ];
  