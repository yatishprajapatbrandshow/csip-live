'use client';
import React from 'react';
import Image from 'next/image'


const CommentsSlider = ({ data = "inProcess", slug }) => {
  const Text = [
    {
      title: "Executive Sponsor",
      imgURL: "https://media.istockphoto.com/id/1359662582/photo/group-of-happy-college-student-stock-photo.jpg?s=612x612&w=0&k=20&c=Oq4d6V5XJi9LayES7cH6n2obZWqVuzJOq2CtSBSiP6g=",
      description: "The Executive Sponsor is a senior-level executive who oversees the intrapreneurship program. They are responsible for providing strategic guidance, ensuring that projects are aligned with company goals, and offering budget and resource support. You will report to this individual during key project milestones."
    },
    {
      title: "Team Manager",
      imgURL: "https://img.freepik.com/free-photo/portrait-young-happy-blogger-with-modern-laptop-outdoors_231208-2072.jpg?t=st=1729156611~exp=1729160211~hmac=cd05514d590c5d7391b17d1b0ebfda4aa952cafdb76a49e97021092ed26fd436&w=996",
      description: "The Team Manager oversees the day-to-day operations of the project team. They ensure that resources are properly allocated, deadlines are met, and that communication between departments is smooth. You will collaborate closely with the Team Manager to ensure your project stays on track."
    },
    {
      title: "Project Leads",
      imgURL: "https://img.freepik.com/free-photo/young-asian-student-university-campus-with-laptop_231208-1862.jpg?t=st=1729156654~exp=1729160254~hmac=3ed853e962dc14fcc6f31312b2dd5fbdda6b62a92494275fb80b6af864488023&w=996",
      description: "You will be working with several project leads from different departments (e.g., engineering, marketing, and design) who are responsible for their respective domains. These leads will be crucial in helping you navigate the pivot and adjust the project to fit the new requirements."
    },
    {
      title: "Your Role",
      imgURL: "https://img.freepik.com/free-photo/student-sharing-her-knowledge-with-her-colleagues_329181-8498.jpg?t=st=1729156682~exp=1729160282~hmac=586b36dda45f4358ddac3a93a6feced62e7f256c89136e8bceb186a846d226ed&w=996",
      description: "As the Project Leader, you are responsible for the overall vision and success of the project. You manage cross-functional collaboration, ensure that team goals align with the company’s strategic priorities, and maintain communication with both the Team Manager and Executive Sponsor."
    }
  ]

  const toolsData = [
    {
      id: 1,
      name: 'Visual Studio Code',
      description: 'A powerful source code editor developed by Microsoft for Windows, macOS, and Linux.',
      category: 'Development',
      version: '1.60',
      status: 'active',
      releaseDate: '29/04/21',
      img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/9a/Visual_Studio_Code_1.35_icon.svg/1024px-Visual_Studio_Code_1.35_icon.svg.png'
    },
    {
      id: 2,
      name: 'Microsoft Excel',
      description: 'A spreadsheet program used for data calculations and analysis.',
      category: 'Productivity',
      version: '2021',
      status: 'active',
      releaseDate: '23/09/21',
      img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTroU91FLk1e5CTmveZCstER9A-qLpJGNtZvA&s'
    },
    {
      id: 3,
      name: 'Microsoft Word',
      description: 'A word processing application used for creating and editing documents.',
      category: 'Productivity',
      version: '2021',
      status: 'active',
      releaseDate: '10/10/21',
      img: 'https://cdn-dynmedia-1.microsoft.com/is/image/microsoftcorp/Word_1500x1500'
    },
    {
      id: 4,
      name: 'Adobe Photoshop',
      description: 'A software used for photo editing, graphic design, and digital art.',
      category: 'Design',
      version: '2023',
      status: 'active',
      releaseDate: '15/02/23',
      img: 'https://w7.pngwing.com/pngs/587/253/png-transparent-adobe-photoshop-hd-logo-thumbnail.png'
    },
    {
      id: 5,
      name: 'Slack',
      description: 'A communication platform for teams to collaborate in real-time.',
      category: 'Communication',
      version: '4.22.0',
      status: 'active',
      releaseDate: '12/07/23',
      img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d5/Slack_icon_2019.svg/2048px-Slack_icon_2019.svg.png'
    }
  ];

  const jobsData = [
    {
      jobTitle: "Project Manager",
      jobRole: "IT Project Management",
      description: "Oversee project planning, execution, and delivery within a specific timeline and budget.",
      averageSalary: 90000,
      employmentType: "Full-Time",
      skillsRequired: [
        "Agile Methodologies",
        "Risk Management",
        "Communication",
        "Leadership",
        "Time Management"
      ]
    },
    {
      jobTitle: "Operations Manager",
      jobRole: "Business Operations",
      description: "Manage day-to-day operations and ensure the organization runs efficiently and effectively.",
      averageSalary: 85000,
      employmentType: "Full-Time",
      skillsRequired: [
        "Process Improvement",
        "Budget Management",
        "Team Leadership",
        "Problem Solving",
        "Analytical Skills"
      ]
    },
    {
      jobTitle: "Product Manager",
      jobRole: "Product Development",
      description: "Define the product vision and strategy while overseeing the development lifecycle from conception to launch.",
      averageSalary: 95000,
      employmentType: "Full-Time",
      skillsRequired: [
        "Market Research",
        "Data Analysis",
        "User Experience",
        "Cross-Functional Team Leadership",
        "Strategic Thinking"
      ]
    },
    {
      jobTitle: "Sales Manager",
      jobRole: "Sales Team Leadership",
      description: "Lead the sales team to achieve revenue targets and develop effective sales strategies.",
      averageSalary: 80000,
      employmentType: "Full-Time",
      skillsRequired: [
        "Sales Strategy",
        "Team Management",
        "Customer Relationship Management",
        "Negotiation",
        "Market Analysis"
      ]
    },
    {
      jobTitle: "Human Resources Manager",
      jobRole: "HR Leadership",
      description: "Oversee HR functions including recruitment, employee relations, and compliance with labor laws.",
      averageSalary: 85000,
      employmentType: "Full-Time",
      skillsRequired: [
        "Employee Engagement",
        "Conflict Resolution",
        "Organizational Development",
        "Training and Development",
        "HR Policies"
      ]
    },
    {
      jobTitle: "Marketing Manager",
      jobRole: "Marketing Strategy",
      description: "Develop and implement marketing strategies to promote products and services effectively.",
      averageSalary: 90000,
      employmentType: "Full-Time",
      skillsRequired: [
        "Digital Marketing",
        "Brand Management",
        "Market Research",
        "Content Creation",
        "Social Media Strategy"
      ]
    },
    {
      jobTitle: "Financial Manager",
      jobRole: "Financial Planning and Analysis",
      description: "Manage financial planning, reporting, and analysis to support strategic decision-making.",
      averageSalary: 95000,
      employmentType: "Full-Time",
      skillsRequired: [
        "Financial Analysis",
        "Budgeting",
        "Forecasting",
        "Risk Management",
        "Financial Reporting"
      ]
    },
    {
      jobTitle: "Supply Chain Manager",
      jobRole: "Logistics and Operations",
      description: "Manage the supply chain process from procurement to production to distribution.",
      averageSalary: 90000,
      employmentType: "Full-Time",
      skillsRequired: [
        "Logistics Management",
        "Inventory Control",
        "Supplier Relationship Management",
        "Data Analysis",
        "Project Management"
      ]
    },
    {
      jobTitle: "Business Development Manager",
      jobRole: "Growth Strategy",
      description: "Identify and pursue new business opportunities to drive growth and expand market reach.",
      averageSalary: 90000,
      employmentType: "Full-Time",
      skillsRequired: [
        "Strategic Planning",
        "Negotiation",
        "Networking",
        "Market Research",
        "Sales Skills"
      ]
    },
    {
      jobTitle: "IT Manager",
      jobRole: "Information Technology Management",
      description: "Oversee IT operations, including infrastructure, support, and security, to ensure reliable and efficient systems.",
      averageSalary: 95000,
      employmentType: "Full-Time",
      skillsRequired: [
        "IT Infrastructure",
        "Team Leadership",
        "Project Management",
        "Cybersecurity",
        "Vendor Management"
      ]
    }
  ]


  const studyMaterials = [
    {
      id: '1',
      title: 'Introduction to Algebra',
      description: 'A comprehensive guide to understanding algebraic concepts.',
      link: 'https://example.com/introduction-to-algebra',
      thumbnail: 'https://img.freepik.com/free-vector/flat-abstract-education-thumbnail_23-2148913303.jpg?w=1380',
      duration: '2 hours',
      skills: ['Understanding basic algebraic operations', 'Solving equations', 'Graphing linear functions']
    },
    {
      id: '2',
      title: 'Physics for Beginners',
      description: 'An introductory book on the fundamentals of physics.',
      link: 'https://example.com/physics-for-beginners',
      thumbnail: 'https://img.freepik.com/free-vector/flat-geometric-education-thumbnail_23-2148900774.jpg?w=1380',
      duration: '1.5 hours',
      skills: ['Understanding Newton\'s laws', 'Basic principles of motion', 'Introduction to energy and forces']
    },
    {
      id: '3',
      title: 'Mastering Chemistry',
      description: 'A complete resource for mastering chemistry principles and applications.',
      link: 'https://example.com/mastering-chemistry',
      thumbnail: 'https://img.freepik.com/free-vector/youtube-background-education-thumbnail_1361-2732.jpg?w=1380',
      duration: '3 hours',
      skills: ['Understanding the periodic table', 'Chemical reactions and equations', 'Stoichiometry basics']
    },
    {
      id: '4',
      title: 'Learning Python Programming',
      description: 'A beginner-friendly guide to programming with Python.',
      link: 'https://example.com/learning-python-programming',
      thumbnail: 'https://img.freepik.com/free-vector/flat-abstract-business-youtube-thumbnail_23-2148925265.jpg?t=st=1729171146~exp=1729174746~hmac=4461b6f8b0be1809b91efc457dca55d71a66208d86e34f977b5d6f41e65b9d52&w=1380',
      duration: '2.5 hours',
      skills: ['Basic syntax and data types', 'Control flow and loops', 'Functions and modules']
    },
    {
      id: '5',
      title: 'Understanding Data Structures',
      description: 'A comprehensive resource on data structures and algorithms.',
      link: 'https://example.com/understanding-data-structures',
      thumbnail: 'https://img.freepik.com/free-vector/modern-youtube-background-thumbnail-with-papercut-effect_1361-2739.jpg?t=st=1729171163~exp=1729174763~hmac=fe88216569aa458de184a720c6cd390e013b3e1d697fb036e53a20d7a3ba3f7d&w=1380',
      duration: '4 hours',
      skills: ['Understanding arrays and linked lists', 'Trees and graphs basics', 'Algorithm analysis']
    }
  ];


  const News = [
    {
      id: '1',
      title: 'Leadership Trends Shaping Management Today',
      description: 'Explore the principles of effective leadership and how they impact organizational success.',
      link: 'https://example.com/effective-leadership',
      thumbnail: 'https://img.freepik.com/free-photo/leader-authority-boss-coach-director-manager-concept_53876-133859.jpg?t=st=1729171698~exp=1729175298~hmac=0433fff834ec2828c57fdd127b98c7e346248b166d8ef2f04ab54651f33af68f&w=900'
    },
    {
      id: '2',
      title: 'How Digital Transformation is Revolutionizing Business',
      description: 'Learn about the digital transformation process and its significance in today\'s business landscape.',
      link: 'https://example.com/digital-transformation',
      thumbnail: 'https://img.freepik.com/free-photo/rendering-anime-doctors-work_23-2151151812.jpg?t=st=1729171730~exp=1729175330~hmac=fe20ebb9c7f94507a3b0d07964bcae21f041aac5b0becd16b8512d85caa14771&w=1060'
    },
    {
      id: '3',
      title: '2024: Key Technology Trends to Watch',
      description: 'Stay updated with the latest trends in technology for 2024 and their implications for businesses.',
      link: 'https://example.com/tech-trends-2024',
      thumbnail: 'https://img.freepik.com/free-photo/teenager-dressed-white-t-shirt-using-virtual-reality-glasses-with-graph-charts-numbers-lines-technology-concept_613910-5157.jpg?t=st=1729171746~exp=1729175346~hmac=4f385d384d4883d6c73746270b257f17660d9f211515ac63262b21788a9d6794&w=996'
    },
    {
      id: '4',
      title: 'Embracing Agile: The Future of Project Management',
      description: 'An introduction to Agile methodologies and how they can improve project management efficiency.',
      link: 'https://example.com/agile-project-management',
      thumbnail: 'https://img.freepik.com/free-photo/businesswoman-wearing-mask-coronavirus-meeting-new-normal_53876-101929.jpg?t=st=1729171800~exp=1729175400~hmac=56a9ab9c5bc757b008b5596534adf66bac2e99d7f548ee9caf7cca1295a2f88d&w=900'
    },
    {
      id: '5',
      title: 'Navigating Remote Work: Strategies for Success',
      description: 'Discover strategies for managing remote teams effectively in a post-pandemic world.',
      link: 'https://example.com/future-of-work',
      thumbnail: 'https://img.freepik.com/free-photo/executive-assistant-talking-business-team-remote-videocall-chatting-online-teleconference-call-with-colleagues-using-computer-webcam-attend-videoconference-telework-meeting_482257-48550.jpg?t=st=1729171835~exp=1729175435~hmac=7e21a28cfc0ce490c5c0a2edfca678de58c13ab4cb8dece1e1274ee2b13f9740&w=996'
    }
  ];

  const TopEmp = [
    {
      name: "John Doe",
      image: "https://img.freepik.com/free-photo/portrait-smiling-young-businesswoman-standing-with-her-arm-crossed-against-gray-wall_23-2147943827.jpg?t=st=1729173588~exp=1729177188~hmac=8fa23a5c4ee938078afcfc9e1667561f11949359600e45dde80c48e8eb04b293&w=740",
      linkedin: "https://www.linkedin.com/in/johndoe"
    },
    {
      name: "Jane Smith",
      image: "https://img.freepik.com/free-photo/brunette-businesswoman-posing_23-2148142767.jpg?t=st=1729173610~exp=1729177210~hmac=8a865c422e0bd31024aae837427fc8f6a280657141f8eaa59d8af2c5fcc9b466&w=740",
      linkedin: "https://www.linkedin.com/in/janesmith"
    },
    {
      name: "Alice Johnson",
      image: "https://img.freepik.com/free-photo/brunette-businesswoman-showing-her-tablet_23-2148142790.jpg?t=st=1729173625~exp=1729177225~hmac=0935b7d68cc9de76ae7b715cffe61dd35e68081072d3467f279f445739d2a761&w=740",
      linkedin: "https://www.linkedin.com/in/alicejohnson"
    },
    {
      name: "Bob Brown",
      image: "https://img.freepik.com/free-photo/photorealistic-lifestyle-lawyer_23-2151054006.jpg?t=st=1729173642~exp=1729177242~hmac=b1fffa96b043352c3ac3f9f56e0fba5e08f58905c9b20e55001b868946797cb0&w=740",
      linkedin: "https://www.linkedin.com/in/bobbrown"
    },
    {
      name: "Charlie Black",
      image: "https://img.freepik.com/free-photo/business-woman-standing-with-clipboard_23-2148073119.jpg?t=st=1729173694~exp=1729177294~hmac=a392ea98cf2ed9c8d3adaf0dfd92e6f0f288146197d8cea25e424d19cb00e124&w=740",
      linkedin: "https://www.linkedin.com/in/charlieblack"
    }
  ]


  console.log(data);


  return (
    <section className='mt-5 pb-32'>
      {data === "inProcess" ? <>
        <p>Loading ...</p>
      </> : data && data !== "inProcess" ? <>

        {data.objective && (
          <div>
            <p className='px-3 text-sm py-1 rounded-full border border-green-400/50 w-max bg-green-50'>{data.objective.short_name}</p>
            <p className='text-lg mt-5 text-gray-800 font-bold'>{data.objective.name}</p>
            {/* <p className="text-base text-justify font-light mt-5 text-gray-700"
                        dangerouslySetInnerHTML={{ __html: data.objective.short_desc }} /> */}
            <p className="text-base text-justify font-light mt-5 text-gray-700"
              dangerouslySetInnerHTML={{ __html: data.objective.objective }} />
          </div>
        )}


        {data['virtual-scenario'] && (
          <div>
            <h2 className='text-lg mt-5 text-gray-800 font-bold'>{data['virtual-scenario'].case_scenario_title}</h2>
            <p className='text-base text-justify font-light mt-5 text-gray-700'>{data['virtual-scenario'].case_scenario}</p>
            {/* You can also render description or note if needed */}
            {data['virtual-scenario'].description && (
              <p className="text-base text-justify font-light mt-5 text-gray-700"
                dangerouslySetInnerHTML={{ __html: data['virtual-scenario'].description }} />
            )}
            {data['virtual-scenario'].note && (
              <p className='text-base text-justify font-light mt-5 text-gray-700'>{data['virtual-scenario'].note}</p>
            )}
          </div>
        )}





        {data.hierarchy && (
          <div >
            <h2 className='text-lg mt-5 text-gray-800 font-bold'>Hierarchy</h2>
            {/* <p>{data.hierarchy.corporate_hierarchy_overview}</p> */}
            <div className='mt-10'>
              {Text.map((item, index) => (
                <div className='mb-4'>
                  <p className="relative text-xl/7 text-gray-700">{item.title}</p>
                  <p className="text-sm/6 font-normal text-gray-700">{item.description}</p>
                </div>
              ))}
            </div>
            {/* <ul className='grid grid-cols-3 gap-5 mt-5'>
                        {Text.map((item, index)=>(
                            <>
                            <div
                            style={{ opacity: 1 }}
                            className="relative flex aspect-[9/12] w-full shrink-0 snap-start scroll-ml-[var(--scroll-padding)] flex-col justify-end overflow-hidden rounded-3xl "
                            >
                                <div className='min-h-20'>
                                    <img
                                        alt=""
                                        src={item.imgURL}
                                        className="absolute inset-x-0 top-0 aspect-square w-full object-cover"
                                    />
                                </div>
                                <div
                                    aria-hidden="true"
                                    className="absolute inset-0 rounded-3xl bg-gradient-to-t from-black from-[calc(7/16*100%)] ring-1 ring-inset ring-gray-950/10 sm:from-25%"
                                />
                                <figure className="relative p-10">
                                    <blockquote>
                                    <p className="relative text-xl/7 text-white">

                                        {item.title}
                                    </p>
                                    </blockquote>
                                    <figcaption className="mt-6 border-t border-white/20 pt-6">
                                        <p className="text-sm/6 font-normal text-white">{item.description}</p>
                                    </figcaption>
                                </figure>
                            </div>
                            </>
                        ))}
                     </ul> */}
          </div>
        )}

        {data.tools && (
          <>
            {/* <div className='shadow-sm'>
                     <h2 className='text-lg mt-5 text-gray-800 font-bold'>Tools used</h2>
                     <table className="min-w-full bg-white mt-10">
                      <thead>
                        <tr className='bg-blue-100 '>
                          <th className="py-4 text-sm font-semibold px-4 ">ID</th>
                          <th className="py-4 text-sm font-semibold px-4 ">Image</th>
                          <th className="py-4 text-left text-sm font-semibold px-4 ">Name</th>
                          <th className="py-4 text-left text-sm font-semibold px-4 ">Description</th>
                          <th className="py-4 text-sm font-semibold px-4 ">SnapShot</th>
                          <th className="py-4 text-sm font-semibold px-4 ">Version</th>
                          <th className="py-4 text-sm font-semibold px-4 ">Download</th>
                        </tr>
                      </thead>
                      <tbody>
                        {data.tools.tools_used.map((tool) => (
                          <tr key={tool.id} className='border-b border-b-gray-100'>
                            <td className="py-2 px-4">{tool.id}</td>
                            <td className="py-2 px-4">
                              <img src={`https://upload.wikimedia.org/wikipedia/commons/thumb/9/9a/Visual_Studio_Code_1.35_icon.svg/1024px-Visual_Studio_Code_1.35_icon.svg.png`} alt={tool.name} className="h-8 w-8 object-contain" />
                            </td>
                            <td className="py-2 text-sm px-4">{tool.name}</td>
                            <td className="py-2 text-sm px-4" dangerouslySetInnerHTML={{__html: tool.description}} />
                            <td className="py-2 text-sm px-4 bg-blue-300 text-center">View</td>
                            <td className="py-2 text-sm px-4">{tool.version}</td>
                            <td className="py-2 text-sm px-4 text-gray-500"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-download"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" x2="12" y1="15" y2="3"/></svg></td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div> */}
            {data.tools.tools_used.map((tool) => (
              <div className="w-fit items-end overflow-hidden rounded-[2.5rem] border bg-white p-2 shadow-md shadow-gray-950/5">
                <div className="space-y-1.5 rounded-[2rem] border bg-gray-200/50 p-1.5 sm:w-[16rem]">
                  <div className="space-y-3 rounded-b-lg rounded-t-[1.625rem] bg-white p-4">
                    <div className="flex flex-col items-start justify-between">
                      <div className='w-10 h-10 bg-gray-200 rounded-lg overflow-hidden mb-2'>
                        <img src={`https://csip-image.blr1.digitaloceanspaces.com/csip-image/img/content/${tool.image}`} />
                      </div>
                      <div className="space-y-1">
                        <div className="text-sm font-medium">{tool.name}</div>
                        <p className='text-xs text-justify' dangerouslySetInnerHTML={{ __html: tool.description }} />
                      </div>
                    </div>
                  </div>
                  <div className="rounded-b-[1.625rem] rounded-t-lg bg-white p-4">
                    <div className="flex justify-between items-center">
                      <p className="flex gap-1.5 justify-start items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-image"><rect width="18" height="18" x="3" y="3" rx="2" ry="2" /><circle cx="9" cy="9" r="2" /><path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21" /></svg>
                        <span className="text-sm">Show all snapshot</span>
                      </p>
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="text-placeholder size-4">
                        <path fillRule="evenodd" d="M8.22 5.22a.75.75 0 0 1 1.06 0l4.25 4.25a.75.75 0 0 1 0 1.06l-4.25 4.25a.75.75 0 0 1-1.06-1.06L11.94 10 8.22 6.28a.75.75 0 0 1 0-1.06Z" clipRule="evenodd"></path>
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </>
        )}
        {data['jobs-and-role'] && (
          <div className="mx-auto ">
            {data['jobs-and-role'].job_roles_and_description.map((job, index) => (
              <div key={index} className="flex flex-col items-start pb-5 mb-5 border-b border-b-pink-200">
                <h2 id={`job-${index}`} className="mt-2 text-lg font-bold text-slate-900">
                  {job.jobTitle}
                </h2>
                <time
                  datetime="2022-02-24T00:00:00.000Z"
                  className="order-first font-mono text-sm leading-7 text-slate-500"
                >
                  {job.employmentType} | Average Salary: {job.averageSalary}
                </time>
                <p className="mt-1 text-sm leading-7 text-slate-700" dangerouslySetInnerHTML={{ __html: job.description }} />
                <div className="mt-4 flex items-center gap-4">
                  <div
                    className=" flex justify-start items-start gap-4"
                  >
                    <svg
                      aria-hidden="true"
                      viewBox="0 0 10 10"
                      className="h-2.5 w-2.5 fill-current text-pink-500"
                    >
                      <path d="M8.25 4.567a.5.5 0 0 1 0 .866l-7.5 4.33A.5.5 0 0 1 0 9.33V.67A.5.5 0 0 1 .75.237l7.5 4.33Z"></path>
                    </svg>
                    <div className='flex flex-wrap gap-2'>
                      {job.skillsRequired ?
                        job.skillsRequired.map((item, index) => (
                          <span className='text-sm font-medium text-pink-500 border border-pink-500 py-0 px-2 rounded-md' key={index}>{item}</span>
                        ))
                        : null}
                    </div>
                  </div>


                </div>
              </div>
            ))}
          </div>
        )}

        {data['video-podcast-link'] && (
          <div className="mx-auto ">
            <p className='text-xl font-bold capitalize mb-4'>Video podcast link</p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {data['video-podcast-link'].youtube_video_link.map((link, index) => (
                <div key={index} className="bg-white overflow-hidden">
                  <button
                    onClick={() => window.open(link, '_blank')}
                    className=" hover:underline bg-blue-600 text-white p-4"
                  >
                    {`Watch tutorial ${index + 1}`}
                  </button>
                </div>
              ))}
              {/* {studyMaterials.map((material) => (
                <div key={material.id} className="bg-white rounded-lg overflow-hidden">
                  <div className="relative">
                    <Image
                      src={material.thumbnail}
                      alt={material.title}
                      width={360}
                      height={200}
                      className="w-full object-cover"
                    />
                  </div>
                  <div className="pt-4">
                    <div className="flex items-start space-x-3">
                      <div className="flex-1 min-w-0">
                        <h3 className="text-sm font-semibold line-clamp-2">{material.title}</h3>
                        <p className="text-xs text-gray-600 mt-1">{material.description}</p>
                        <p className="text-xs text-gray-600 mt-1">Duration: {material.duration}</p>
                        <p className="text-xs text-gray-600 mt-1">What you will learn:</p>
                        <ul className="text-xs text-gray-600 mt-1">
                          {material.skills.map((skill, index) => (
                            <li key={index}>• {skill}</li>
                          ))}
                        </ul>
                        <a href={material.link} className="text-sm mt-3 block text-blue-500 hover:underline">Start Learning</a>
                      </div>
                    </div>
                  </div>
                </div>
              ))} */}
            </div>
          </div>
        )}

        {data['related-topic-news'] && (
          < div className="mx-auto ">
            <p className='text-xl font-bold capitalize mb-4'>Related topic news</p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {data['related-topic-news'].related_topic_news?.map((material) => (
                <div key={material.id} className="bg-white rounded-lg overflow-hidden">
                  <div className="relative">
                    <img
                      src={`https://csip-image.blr1.digitaloceanspaces.com/csip-image/img/content/${material?.image}`}
                      alt={material.title}
                      className="w-full h-52 object-cover"
                    />
                  </div>
                  <div className="pt-4">
                    <div className="flex items-start space-x-3">
                      <div className="flex-1 min-w-0">
                        <h3 className="text-sm font-semibold line-clamp-2">{material.title}</h3>
                        <p className="text-xs text-gray-600 mt-1" dangerouslySetInnerHTML={{ __html: material.description }} />
                        {/* <p className="text-xs text-gray-600 mt-1">Duration: {material.duration}</p>
                        <p className="text-xs text-gray-600 mt-1">What you will learn:</p> */}
                        <button onClick={() => window.open(material.link, '_blank')} className='text-sm mt-3 block text-blue-500 hover:underline'>Start Learning</button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {data['top-employees'] && (
          <div className="mx-auto w-full">
            <p className='text-xl font-bold capitalize mb-4'>top employees</p>
            <div className="container mx-auto pt-2">
              <div className="flex gap-4 flex-wrap">
                {data['top-employees'].top_employees.map((employee, index) => (
                  <div key={index} className="border p-4 rounded-lg shadow-md flex flex-col justify-center items-start min-w-60">
                    {/* <img src={employee.image} alt={employee.name} className="rounded-full w-24 h-24 mb-2" /> */}
                    <h2 className="text-sm text-left font-semibold">Name: {employee.name}</h2>
                    <h2 className="text-sm text-left font-semibold">Company Name: {employee.companyName}</h2>
                    <a
                      href={employee.linkedInProfile}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-500 text-xs mt-4"
                    >
                      View LinkedIn Profile
                    </a>
                  </div>
                ))}
              </div>
            </div>

          </div>
        )}


      </> : null
      }

    </section >
  );
};

export default CommentsSlider;
