import React, { useState } from 'react';
// import SearchView from '../ui/SearchView';
import SearchView from '../ui/SearchView';

const Sidebar = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeMenuItem, setActiveMenuItem] = useState('Dashboard');

  const menuSections = [
    {
      title: 'Main',
      items: [
        {
          id: 'dashboard',
          name: 'Dashboard',
          icon: '/images/img_frame_white_a700.svg',
          isActive: true,
          gradient: true
        }
      ]
    },
    {
      title: 'Attendance & Leave',
      items: [
        {
          id: 'leave',
          name: 'Leave',
          icon: '/images/img_assignmentsicon.svg',
          isActive: false
        },
        {
          id: 'permission',
          name: 'Permission',
          icon: '/images/img_usertime03icon.svg',
          isActive: false
        },
        {
          id: 'onduty',
          name: 'On-Duty',
          icon: '/images/img_briefcase05icon.svg',
          isActive: false
        },
        {
          id: 'onsite',
          name: 'On Site Attendance',
          icon: '/images/img_calendarcheckout01icon.svg',
          isActive: false
        },
        {
          id: 'mispunch',
          name: 'Mispunch',
          icon: '/images/img_fingerprintscanicon.svg',
          isActive: false
        }
      ]
    },
    {
      title: 'Payroll & Finance',
      items: [
        {
          id: 'loan',
          name: 'Loan Application',
          icon: '/images/img_savemoneydollaricon.svg',
          isActive: false
        },
        {
          id: 'tds',
          name: 'TDS Declaration',
          icon: '/images/img_wallet02icon.svg',
          isActive: false
        },
        {
          id: 'reimbursement',
          name: 'Reimbursement',
          icon: '/images/img_moneyreceivesquareicon.svg',
          isActive: false
        }
      ]
    },
    {
      title: 'Communication',
      items: [
        {
          id: 'mailtemplate',
          name: 'Mail Template',
          icon: '/images/img_mail02icon.svg',
          isActive: false
        },
        {
          id: 'mailmapping',
          name: 'Mail Mapping',
          icon: '/images/img_mail02icon.svg',
          isActive: false
        }
      ]
    },
    {
      title: 'Approvals',
      items: [
        {
          id: 'approvalstage',
          name: 'Approval Stage',
          icon: '/images/img_validationapprovalicon.svg',
          isActive: false
        },
        {
          id: 'approvaltemplate',
          name: 'Approval Template',
          icon: '/images/img_validationapprovalicon.svg',
          isActive: false
        }
      ]
    },
    {
      title: 'Reports',
      items: [
        {
          id: 'attendancereport',
          name: 'Attendance Report',
          icon: '/images/img_calendarusericon.svg',
          isActive: false
        },
      ]
    }
  ];

  const handleMenuItemClick = (itemId) => {
    setActiveMenuItem(itemId);
    console.log(`Navigating to: ${itemId}`);
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e?.target?.value);
  };

  const filteredMenuSections = menuSections?.map(section => ({
    ...section,
    items: section?.items?.filter(item =>
      item?.name?.toLowerCase()?.includes(searchQuery?.toLowerCase())
    )
  }))?.filter(section => section?.items?.length > 0);

  return (
    <aside className="w-60 h-screen bg-gradient-to-b from-[#005183] to-[#00253c] flex flex-col">
      {/* Logo */}
      <div className="p-4 pt-5">
        <img
          src="/images/img_sidebar_logo.png"
          alt="Company Logo"
          className="w-48 h-11 mx-auto"
        />
      </div>
      {/* Search */}
      <div className="px-4 mt-2">
        <SearchView
          placeholder="Search"
          value={searchQuery}
          onChange={handleSearchChange}
          leftImage={{
            src: '/images/img_frame.svg',
            width: 20,
            height: 20
          }}
          className="w-full bg-transparent border-white/50 text-white placeholder-white/75"
        />
      </div>
      {/* Navigation Menu */}
      <nav className="flex-1 mt-6 overflow-y-auto no-scrollbar ">
        {filteredMenuSections?.map((section, sectionIndex) => (
          <div key={sectionIndex} className="mb-6 mx-3">
            {/* Section Title */}
            <h3 className="px-4 mb-3 text-xs font-medium text-white/80  tracking-wider">
              {section?.title}
            </h3>

            {/* Menu Items */}
            <ul className="space-y-1">
              {section?.items?.map((item) => (
                <li key={item?.id}>
                  <button
                    onClick={() => handleMenuItemClick(item?.id)}
                    className={`
                      w-full flex items-center px-4 py-2 text-sm font-medium text-white transition-all duration-200
                      hover:bg-white/10 focus:outline-none focus:bg-white/10
                      ${item?.isActive
                        ? 'bg-gradient-to-r  from-cyan-400/30 to-cyan-600/30 shadow-lg rounded-4xl border-solid '
                        : ''
                      }
                      ${item?.special
                        ? 'bg-gradient-to-r from-cyan-400/30 to-cyan-600/30 mx-2 rounded-lg' : ''
                      }
                    `}
                    role="menuitem"
                    aria-current={item?.isActive ? 'page' : undefined}
                  >
                    <img
                      src={item?.icon}
                      alt=""
                      className="w-5 h-5 mr-3 flex-shrink-0"
                    />
                    <span className={`truncate ${item?.special ? 'flex-1 text-right mr-2' : ''} text-`}>
                      {item?.name}
                    </span>
                    {item?.special && (
                      <img
                        src="/images/img_frame_white_a700_20x20.svg"
                        alt=""
                        className="w-5 h-5 ml-2"
                      />
                    )}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        ))}

      </nav>
      {/* Pending Approvals Fixed Button */}
      <div className="w-full">
        <button
          onClick={() => handleMenuItemClick('pendingapprovals')}
          className={`
            w-full py-2 flex justify-center items-center transition-all duration-200
            ${activeMenuItem === 'pendingapprovals'
              ? 'bg-[#004A77]'
              : 'bg-[#003C5A]'
            }
            hover:bg-[#005183] focus:outline-none border-t border-white/10
          `}
          title="Pending Approvals"
        >
          <img
            src="/images/img_frame_white_a700_20x20.svg"
            alt="Pending Approvals"
            className="w-5 h-5"
          />
        </button>
      </div>


      {/* Empty state when search yields no results */}
      {searchQuery && filteredMenuSections?.length === 0 && (
        <div className="px-4 py-8 text-center text-white/60 text-sm">
          No menu items found for "{searchQuery}"
        </div>
      )}
    </aside>
  );
};

export default Sidebar;