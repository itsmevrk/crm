import React, { useState } from 'react';
import Button from '../ui/Button';
import SearchView from '../ui/SearchView';
import Dropdown from '../ui/Dropdown';
import BreadCrumb from '../ui/BreadCrumb';
import frameGrayIcon from "@/assets/images/img_frame_gray_900.svg";
import frameGray20Icon from "@/assets/images/img_frame_gray_900_20x20.svg";
import notificationIcon from "@/assets/images/img_group_545.png";
import userProfileImg from "@/assets/images/img_user_profile.png";
import dropdownArrowIcon from "@/assets/images/img_frame_20x20.svg";
import searchGrayIcon from "@/assets/images/img_frame_gray_900_20x20.svg";
const Header = () => {
  const [searchValue, setSearchValue] = useState('');
  const [selectedUser, setSelectedUser] = useState('Kamalesh');

  const userOptions = [
    { label: 'Kamalesh', value: 'kamalesh' },
    { label: 'Profile Settings', value: 'settings' },
    { label: 'Logout', value: 'logout' }
  ];

  const handleSearchChange = (e) => {
    setSearchValue(e?.target?.value);
  };

  const handleUserChange = (option) => {
    setSelectedUser(option?.label);
    if (option?.value === 'logout') {
      // Handle logout logic
      console.log('Logout clicked');
    } else if (option?.value === 'settings') {
      // Handle settings navigation
      console.log('Settings clicked');
    }
  };

  return (
    <header style={{ background: '#e9eef6' }} className="w-full px-4 sm:px-6  lg:px-8 py-3 sm:py-4 border-b border-border-light">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 lg:gap-8">
        {/* Breadcrumb Navigation */}
        <div className="flex-shrink-0">
          <BreadCrumb
            items={[
              { label: 'Main', href: '/', isActive: false },
              { label: 'Dashboard', href: '/dashboard', isActive: true }
            ]}
            className="text-base"
          />
        </div>

        {/* Search and User Section */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4 lg:gap-6 flex-1 lg:flex-none">
          {/* Search Section */}
          <div className="flex-1 lg:flex-none lg:w-[330px] relative">
            <div className="relative bg-gray-200 rounded-4xl p-1.5">
              {/* Quick Search Button */}
              <div className="flex items-center  justify-end  mb-2 lg:mb-0 lg:absolute  lg:top-2 lg:right-1.5 lg:z-10">
                <Button
                  text="F"
                  className="text-sm px-2 py-1.5 bg-white rounded-tl-[10px] rounded-bl-[10px] rounded-tr-[30px] rounded-br-[30px] shadow-sm border border-gray-200 "
                  leftImage={{
                    src: frameGrayIcon,
                    width: 14,
                    height: 14
                  }}
                />
              </div>

              {/* Search Input */}
              <div className="flex items-center gap-2 text-gray-500 px-2 py-1 rounded-4xl">
                <img
                  src={frameGray20Icon}
                  alt="Search"
                  className="w-5 h-5 flex-shrink-0"
                />
                <input
                  type="text"
                  placeholder="Global search"
                  value={searchValue}
                  onChange={handleSearchChange}
                  className="flex-1 bg-transparent text-sm placeholder-gray-400 focus:outline-none"
                />
              </div>
            </div>
          </div>
          {/* Divider */}
          <div className="hidden lg:block w-px h-6 bg-gray-300"></div>
          {/* Notification Icon */}
          <div className="flex-shrink-0 lg:block">

            <button
              className="w-10 h-10 bg-white rounded-[25px] flex items-center justify-center hover:bg-gray-100 transition-colors duration-200"
              aria-label="Notifications"
            >
              <img
                src={notificationIcon }
                alt="Notifications"
                className="w-6 h-6"
              />
            </button>
          </div>

          {/* User Profile Section */}
          <div className="flex items-center gap-3 flex-shrink-0">
            {/* Divider */}
            <div className="hidden lg:block w-px h-6 bg-gray-300"></div>

            {/* User Avatar */}
            <div className="relative">
              <div
                className="w-10 h-10 rounded-full bg-cover bg-center border border-gray-200"
                style={{
                  backgroundImage: `url(${userProfileImg})`
                }}
              />
            </div>

            {/* Greeting + User Dropdown */}
            <div className="flex flex-col leading-tight border-0 bg-transparent p-0 font-semibold text-gray-900">
              {/* Greeting text */}
              <span className="text-xs text-gray-500 font-medium">
                Hey, Welcome!
              </span>

              {/* Username + Dropdown */}
              <div className="flex items-center gap-1">
                <Dropdown
                  placeholder={selectedUser}
                  options={userOptions}
                  onChange={handleUserChange}
                  rightImage={{
                    src: dropdownArrowIcon,
                    width: 16,
                    height: 16
                  }}
                  className="border-0 bg-transparent p-0 font-semibold text-gray-900 "
                />
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Mobile Search (Hidden on desktop) */}
      <div className="lg:hidden mt-4">
        <SearchView
          placeholder="Search..."
          value={searchValue}
          onChange={handleSearchChange}
          leftImage={{
            src: searchGrayIcon,
            width: 20,
            height: 20
          }}
          className="w-full bg-gray-50 border-gray-200 text-gray-900 placeholder-gray-500"
        />
      </div>
    </header>
  );
};

export default Header;