import React, { useState } from 'react';
// import SearchView from '../ui/SearchView';
import SearchView from '../ui/SearchView';
import sidebarLogo from "@/assets/images/img_sidebar_logo.png";
import dashboardLogo from "@/assets/images/img_frame_white_a700.svg";


import assignmentsIcon from "@/assets/images/img_assignmentsicon.svg";
import userTimeIcon from "@/assets/images/img_usertime03icon.svg";
import briefcaseIcon from "@/assets/images/img_briefcase05icon.svg";
import calendarCheckoutIcon from "@/assets/images/img_calendarcheckout01icon.svg";
import fingerprintIcon from "@/assets/images/img_fingerprintscanicon.svg";

import saveMoneyIcon from "@/assets/images/img_savemoneydollaricon.svg";
import walletIcon from "@/assets/images/img_wallet02icon.svg";
import moneyReceiveIcon from "@/assets/images/img_moneyreceivesquareicon.svg";

import mailIcon from "@/assets/images/img_mail02icon.svg";
import approvalIcon from "@/assets/images/img_validationapprovalicon.svg";
import calendarUserIcon from "@/assets/images/img_calendarusericon.svg";
import searchIcon from "@/assets/images/img_frame.svg";
import frameIcon from "@/assets/images/img_frame_white_a700_20x20.svg";
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
          icon: dashboardLogo,
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
          icon: assignmentsIcon,
          isActive: false
        },
        {
          id: 'permission',
          name: 'Permission',
          icon: userTimeIcon,
          isActive: false
        },
        {
          id: 'onduty',
          name: 'On-Duty',
          icon: briefcaseIcon,
          isActive: false
        },
        {
          id: 'onsite',
          name: 'On Site Attendance',
          icon: calendarCheckoutIcon,
          isActive: false
        },
        {
          id: 'mispunch',
          name: 'Mispunch',
          icon: fingerprintIcon,
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
          icon: saveMoneyIcon,
          isActive: false
        },
        {
          id: 'tds',
          name: 'TDS Declaration',
          icon: walletIcon,
          isActive: false
        },
        {
          id: 'reimbursement',
          name: 'Reimbursement',
          icon: moneyReceiveIcon,
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
          icon: mailIcon,
          isActive: false
        },
        {
          id: 'mailmapping',
          name: 'Mail Mapping',
          icon:mailIcon,
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
          icon: approvalIcon,
          isActive: false
        },
        {
          id: 'approvaltemplate',
          name: 'Approval Template',
          icon: approvalIcon,
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
          icon: calendarUserIcon,
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
          src={sidebarLogo}
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
            src: searchIcon,
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
                         src={frameIcon}

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
              src={frameIcon}

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