import React, { useState, useRef, useEffect } from 'react';
import Button from '../../components/ui/Button';
import SeekBar from '../../components/ui/SeekBar';

// Chart component for User Time Log
const ChartComponent = () => {
  const chartData = [
    { day: 'SUN', value: 0, color: '#d1d5db', bg: '#eef0f3' }, // Gray
    { day: 'MON', value: 4.5, color: '#5f0a87', bg: '#f2e6f7' }, // Purple
    { day: 'TUE', value: 7.5, color: '#2096a5', bg: '#e0f1f3' }, // Teal
    { day: 'WED', value: 4, color: '#f42b03', bg: '#feeaeb' }, // Red/Orange
    { day: 'THU', value: 5.8, color: '#560b1e', bg: '#eee6e8' }, // Maroon
    { day: 'FRI', value: 7.2, color: '#322d99', bg: '#eaebf5' }, // Blue
    { day: 'SAT', value: 2, color: '#03205e', bg: '#e6e9ef' }, // Navy
  ];

  const yLabels = ['10 hr', '8 hr', '6 hr', '4 hr', '2 hr', '0 hr'];

  return (
    <div className="w-full h-full min-h-[200px]" role="img" aria-label="Weekly user time log chart">
      <div className="flex h-full gap-4">
        {/* Y-Axis Labels */}
        <div className="flex flex-col justify-between py-6 h-[200px] flex-shrink-0">
          {yLabels?.map((label, index) => (
            <span key={index} className="text-xs font-medium text-text-muted text-right">
              {label}
            </span>
          ))}
        </div>

        {/* Chart Area */}
        <div className="flex-1 flex justify-between items-end h-[200px] pt-4 relative">
          {chartData?.map((item, index) => (
            <div key={index} className="flex flex-col items-center justify-end gap-3 h-full flex-1">
              {/* Bar Container */}
              <div className="relative w-[17px] h-full rounded-t-lg bg-transparent flex flex-col justify-end">
                {/* Background Track (Full Height representation relative to max 10h) */}
                {/* Actually, visually the track seems to be the full height of the 'max' area. 
                        We can set the wrapper height to fit the '10h' scale.  */}
                <div
                  className="w-full absolute bottom-0 left-0 right-0 rounded-t-md"
                  style={{
                    height: '100%',
                    backgroundColor: item?.bg,
                    opacity: item?.value > 0 ? 1 : 0 // Hide track if 0? Image shows Sun has small marker but no bar? Image shows faint track for Sun? 
                    // Actually Sun has a tiny marker. Let's keep bg for all or conditionally.
                    // Image shows Sun has a very small pill at bottom, no big track. "0 value".
                    // I will keep logic simple: show track.
                  }}
                ></div>

                {/* Fill Bar */}
                <div
                  className="w-full relative z-10 rounded-t-md transition-all duration-500"
                  style={{
                    height: `${(item?.value / 10) * 100}%`, // Assuming 10h is max
                    backgroundColor: item?.color
                  }}
                ></div>
              </div>

              {/* Bottom Marker */}
              <div
                className="w-4 sm:w-6 h-1 rounded-full"
                style={{ backgroundColor: item?.color }}
              />

              {/* X-Axis Label */}
              <span className="text-[10px] sm:text-xs font-medium text-text-muted uppercase">
                {item?.day}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const EmployeeDashboard = () => {
  const [selectedMonth, setSelectedMonth] = useState('October 2025');
  const [currentDate] = useState(new Date());
  const scrollContainerRef = useRef(null);

  useEffect(() => {
    const container = scrollContainerRef.current;
    if (container) {
      const handleWheel = (e) => {
        if (e.deltaY !== 0) {
          e.preventDefault();
          container.scrollLeft += e.deltaY;
        }
      };
      // Add passive: false to allow preventDefault
      container.addEventListener('wheel', handleWheel, { passive: false });
      return () => container.removeEventListener('wheel', handleWheel);
    }
  }, []);

  // Leave balance data
  const leaveTypes = [
    {
      name: 'Annual Leave',
      color: '#ffa800',
      daysLeft: 6,
      totalDays: 12,
      bgColor: '#ffffff',
      bglight: "/images/yellow-light-shade.png",
      bgdark: "/images/yellow-dark-shade.png"

    },
    {
      name: 'Bereavement Leave',
      color: '#ef2917',
      daysLeft: 10,
      totalDays: 12,
      bgColor: '#ffffff',
      bglight: "/images/red-light-shade.png",
      bgdark: "/images/red-dark-shade.png"

    },
    {
      name: 'Sick Leave',
      color: '#a663cc',
      daysLeft: 8,
      totalDays: 12,
      bgColor: '#ffffff',
      bglight: "/images/purple-light-shade.png",
      bgdark: "/images/purple-dark-shade.png"

    },
    {
      name: 'Casual Leave',
      color: '#7371fc',
      daysLeft: 12,
      totalDays: 12,
      bgColor: '#ffffff',
      bglight: "/images/indigo-light-shade.png",
      bgdark: "/images/indigo-dark-shade.png"

    }
  ];

  // Team break days data
  const teamBreakDays = [
    {
      name: 'Albert Flores',
      dates: '11 Aug - 13 Aug',
      leaveType: 'Casual Leave',
      avatar: '/images/img_rectangle_4781.png',
      icon: '/images/img_image_1655.png'
    },
    {
      name: 'Jenny Wilson',
      dates: '11 Aug - 13 Aug',
      leaveType: 'Sick Leave',
      avatar: '/images/img_rectangle_4781_30x30.png',
      icon: '/images/img_image_99.png'
    },
    {
      name: 'Jenny Wilson',
      dates: '11 Aug - 13 Aug',
      leaveType: 'Sick Leave',
      avatar: '/images/img_rectangle_4781_1.png',
      icon: '/images/img_image_99.png'
    }
  ];

  // Company announcements data
  const announcements = [
    {
      title: 'Leadership Update',
      description: 'Exciting organizational changes are underway to drive product innovation and growth.',
      icon: '/images/img_frame_2147224794.svg',
      bgColor: '#ffffff'
    },
    {
      title: 'Policy Update',
      description: 'We are introducing a flexible hybrid work model to support better work–life balance.',
      icon: '/images/img_frame_2147224794_deep_purple_a200.svg',
      bgColor: '#eacfff'
    },
    {
      title: 'Leadership Update',
      description: 'Exciting organizational changes are underway to drive product innovation and growth.',
      icon: '/images/img_frame_2147224794_red_100.svg',
      bgColor: '#ffffff'
    }
  ];

  // Leave requests data
  const leaveRequests = [
    {
      date: '25-03-2025',
      days: '02',
      status: 'Pending',
      statusColor: '#f3a118',
      approvers: [
        { initials: 'JM', bgColor: '#ffe6dd' },
        { avatar: '/images/img_image.png' },
        { avatar: '/images/img_image_24x24.png' }
      ]
    },
    {
      date: '25-03-2025',
      days: '02',
      status: 'Approved',
      statusColor: '#0f973d',
      approvers: [
        { initials: 'JM', bgColor: '#ffe6dd' },
        { avatar: '/images/img_image.png' },
        { avatar: '/images/img_image_24x24.png' }
      ]
    },
    {
      date: '25-03-2025',
      days: '02',
      status: 'Pending',
      statusColor: '#f3a118',
      approvers: [
        { initials: 'JM', bgColor: '#ffe6dd' },
        { avatar: '/images/img_image.png' },
        { avatar: '/images/img_image_24x24.png' }
      ]
    }
  ];

  // Holidays data
  const holidays = [
    {
      type: 'Government Holiday',
      name: 'Tamil New Year',
      borderColor: '#5f0a87'
    },
    {
      type: 'Government Holiday',
      name: 'Tamil New Year',
      borderColor: '#0a5787'
    },
    {
      type: 'Government Holiday',
      name: 'Tamil New Year',
      borderColor: '#0a5787'
    }
  ];

  // Milestone celebrations data
  const milestones = [
    {
      name: 'Aisha Kapoor',
      type: 'Birthday',
      date: 'Oct 12, 2025',
      initials: 'AK',
      bgColor: '#ff4d6d',
      icon: '/images/img_birthday_cake.png'
    },
    {
      name: 'Rohan Menon',
      type: 'Work Anniversary',
      date: 'Oct 08, 2025',
      initials: 'RM',
      bgColor: '#ffd734',
      icon: '/images/img_image_1357.png'
    },
    {
      name: 'Rohan Menon',
      type: 'Wedding Anniversary',
      date: 'Oct 08, 2025',
      avatar: '/images/img_frame_2147224800.png',
      icon: '/images/img_image_1347.png'
    }
  ];

  // Calendar data for attendance
  // const calendarWeeks = [
  //   [
  //     { date: 28, type: 'prev-month', status: null },
  //     { date: 29, type: 'prev-month', status: null },
  //     { date: 30, type: 'prev-month', status: null },
  //     { date: 1, type: 'current', status: 'Payable Days', color: '#0588f0', bgColor: '#e6f4fe' },
  //     { date: 2, type: 'current', status: 'Gandhi Jayanthi', color: '#ff762d', bgColor: '#fff4ee' },
  //     { date: 3, type: 'current', status: 'Payable Days', color: '#0588f0', bgColor: '#e6f4fe' },
  //     { date: 4, type: 'current', status: 'Payable Days', color: '#0588f0', bgColor: '#e6f4fe' }
  //   ],
  //   [
  //     { date: 5, type: 'weekend', status: null },
  //     { date: 6, type: 'current', status: 'Sick Leave', color: '#dc3e42', bgColor: '#feebec' },
  //     { date: 7, type: 'current', status: 'On - Duty', color: '#2b9a66', bgColor: '#e6f6eb' },
  //     { date: 8, type: 'current', status: 'Half - Day', color: '#f76b15', bgColor: '#ffefd6' },
  //     { date: 9, type: 'current', status: 'Payable Days', color: '#0588f0', bgColor: '#e6f4fe' },
  //     { date: 10, type: 'current', status: 'Payable Days', color: '#0588f0', bgColor: '#e6f4fe' },
  //     { date: 11, type: 'current', status: 'Second Sat', color: '#df3478', bgColor: '#fbcfe8' }
  //   ]
  // ];
  const calendarWeeks = [
    // Week 1 (Sep + Oct)
    [
      { date: 28, type: "prev-month", status: null },
      { date: 29, type: "prev-month", status: null },
      { date: 30, type: "prev-month", status: null },
      { date: 1, type: "current", status: "Payable Days", color: "#0588f0", bgColor: "#e6f4fe" },
      { date: 2, type: "current", status: "Gandhi Jayanthi", color: "#ff762d", bgColor: "#FFEEE5 ", labelBgColor: "#FFF4EF" },
      { date: 3, type: "current", status: "Payable Days", color: "#0588f0", bgColor: "#e6f4fe" },
      { date: 4, type: "current", status: "Payable Days", color: "#0588f0", bgColor: "#e6f4fe" }
    ],

    // Week 2
    [
      { date: 5, type: "weekend", status: null },
      { date: 6, type: "current", status: "Sick Leave", color: "#dc3e42", bgColor: "#feebec" },
      { date: 7, type: "current", status: "On - Duty", color: "#2b9a66", bgColor: "#e6f6eb" },
      { date: 8, type: "current", status: "Half - Day", color: "#f76b15", bgColor: "#ffefd6" },
      { date: 9, type: "current", status: "Payable Days", color: "#0588f0", bgColor: "#e6f4fe" },
      { date: 10, type: "current", status: "Payable Days", color: "#0588f0", bgColor: "#e6f4fe" },
      { date: 11, type: "current", status: "Second Sat", color: "#DF3478", bgColor: "#FFE9F0", labelBgColor: "#FBCFE8" }
    ],

    // Week 3
    [
      { date: 12, type: "weekend", status: null },
      { date: 13, type: "current", status: "Payable Days", color: "#0588f0", bgColor: "#e6f4fe" },
      { date: 14, type: "current", status: "Payable Days", color: "#0588f0", bgColor: "#e6f4fe" },
      { date: 15, type: "current", status: "Payable Days", color: "#0588f0", bgColor: "#e6f4fe" },
      { date: 16, type: "current", status: "Payable Days", color: "#0588f0", bgColor: "#e6f4fe" },
      { date: 17, type: "current", status: "Payable Days", color: "#0588f0", bgColor: "#e6f4fe" },
      { date: 18, type: "weekend", status: "Half - Day", color: "#f76b15", bgColor: "#e6f4fe" }
    ],

    // Week 4
    [
      { date: 19, type: "weekend", status: null },
      { date: 20, type: "current", status: "Payable Days", color: "#0588f0", bgColor: "#e6f4fe" },
      { date: 21, type: "current", status: "Payable Days", color: "#0588f0", bgColor: "#e6f4fe" },
      { date: 22, type: "current", status: "On - Duty", color: "#2b9a66", bgColor: "#e6f6eb" },
      { date: 23, type: "current", status: "Payable Days", color: "#0588f0", bgColor: "#e6f4fe" },
      { date: 24, type: "current", status: "Payable Days", color: "#0588f0", bgColor: "#e6f4fe" },
      { date: 25, type: "current", status: "Fourth Sat", color: "#DF3478", bgColor: "#FFE9F0", labelBgColor: "#FBCFE8" }
    ],

    // Week 5 (till 30 only)
    [
      { date: 26, type: "weekend", status: null },
      { date: 27, type: "current", status: "Payable Days", color: "#0588f0", bgColor: "#e6f4fe" },
      { date: 28, type: "current", status: "Payable Days", color: "#0588f0", bgColor: "#e6f4fe" },
      { date: 29, type: "current", status: "Payable Days", color: "#0588f0", bgColor: "#e6f4fe" },
      { date: 30, type: "current", status: "Payable Days", color: "#0588f0", bgColor: "#e6f4fe" },
      { date: 31, type: "next-month", status: null },
      { date: 1, type: "next-month", status: null }
    ]
  ];


  const attendanceLegend = [
    { name: 'Payable Days', icon: '/images/img_1.svg' },
    { name: 'Half - Day', icon: '/images/img_2.svg' },
    { name: 'On - Duty', icon: '/images/img_3.svg' },
    { name: 'Earned Leave', icon: '/images/img_4.svg' },
    { name: 'Sick Leave', icon: '/images/img_5.svg' },
    { name: 'Casual Leave', icon: '/images/img_5_gray_300_01.svg' }
  ];

  const dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

  return (
    <div className="space-y-6 sm:space-y-8 lg:space-y-12 px-2 sm:px-4 lg:px-6">
      <div className="px-1 sm:px-4 lg:px-4 bg-background-card rounded-xl border border-[#e6edff] p-4 sm:p-6 shadow-sm">
        {/* Welcome Section */}
        <section  >
          <div className="space-y-6 sm:space-y-8 lg:space-y-12">
            {/* Welcome Header */}
            <div className="space-y-2">
              <h1 className="text-lg sm:text-xl lg:text-2xl font-medium text-primary leading-7 sm:leading-8">
                Welcome Back, Kamalesh
              </h1>
              <p className="text-sm sm:text-base lg:text-lg font-medium text-text-muted leading-5 sm:leading-6">
                Manage your work, track your progress, and access essential services—all in one place.
              </p>
            </div>

            {/* Leave Details & Team Break Days */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 lg:gap-4 ">
              {/* Leave Details Card */}
              <div className="lg:col-span-2 bg-background-card rounded-xl border border-[#e6edff] p-4 sm:p-6 shadow-sm">
                <div className="space-y-4 sm:space-y-6">
                  {/* Header */}
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <div className="space-y-1">
                      <h2 className="text-base sm:text-lg font-semibold text-primary">
                        Leave Details
                      </h2>
                      <p className="text-xs sm:text-sm font-medium text-text-muted">
                        You can View, apply, and track your leave balances with ease.
                      </p>
                    </div>
                    <div className="flex items-center gap-3">
                      <Button
                        text="Apply Leave"
                        style={{ backgroundColor: "var(--button-primary-bg)" }}
                        className="px-4 sm:px-6 py-2  text-white rounded-lg shadow-sm hover:opacity-90 text-xs sm:text-sm font-semibold"
                      />
                    </div>
                  </div>

                  {/* Leave Balance Cards - Horizontal Scroll */}
                  <div
                    id="leave-scroll-container"
                    ref={scrollContainerRef}
                    className="flex overflow-x-auto gap-4 sm:gap-4 no-scrollbar snap-x snap-mandatory scroll-smooth"
                  >
                    {leaveTypes?.map((leave, index) => (
                      <div
                        key={index}
                        className="bg-background-card border border-gray-200 shadow-sm flex-shrink-0 snap-center relative overflow-hidden box-border"
                        style={{
                          background: `linear-gradient(to left, ${leave?.color}20, #ffffff)`,
                          width: '250px',
                          height: '135px',
                          minWidth: '250px',
                          borderRadius: '6px',
                          padding: '15px 16px 16px 16px'
                        }}
                      >
                        {/* Background Images - Positioned at bottom */}
                        <div className="absolute bottom-0 left-0 w-full z-0">
                          {/* Light background image - bottom layer */}
                          <img
                            src={leave?.bglight}
                            alt=""
                            className="w-full h-auto"
                          />
                        </div>
                        <div className="absolute bottom-0 left-0 w-full z-[1]">
                          {/* Dark background image - top layer */}
                          <img
                            src={leave?.bgdark}
                            alt=""
                            className="w-full h-auto"
                          />
                        </div>

                        <div className="relative z-10 flex flex-col h-full justify-between">
                          {/* Header */}
                          <div className="flex items-start justify-between">
                            <div className="flex-1">
                              <h3 className="text-sm font-bold text-primary truncate leading-tight">
                                {leave?.name}
                              </h3>
                              <p className="text-[10px] text-text-muted mt-0.5">
                                Total Leave {leave?.totalDays} Days
                              </p>
                            </div>
                          </div>

                          {/* Days Counter - Single Line */}
                          <div className="flex items-center gap-2 mt-1">
                            <span className="text-2xl font-bold text-black font-mono tracking-widest leading-none">
                              {leave?.daysLeft < 10 ? `0${leave?.daysLeft}` : leave?.daysLeft}
                            </span>
                            <span className="text-xs font-bold text-primary leading-none pt-1">
                              Days Left
                            </span>
                          </div>

                          {/* Custom Progress Bar */}
                          <div className="w-full h-1.5 bg-gray-100 rounded-full overflow-hidden mt-auto mb-8">
                            <div
                              className="h-full rounded-full"
                              style={{
                                width: `${(leave?.daysLeft / leave?.totalDays) * 100}%`,
                                backgroundColor: leave?.color
                              }}
                            />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Team Break Days Card */}
              <div className="bg-background-card rounded-xl border border-[#e6edff] p-4 sm:p-6 shadow-sm">
                <div className="space-y-4">
                  <div className="space-y-1">
                    <h2 className="text-base sm:text-lg font-semibold text-primary">
                      Team Break Days
                    </h2>
                    <p className="text-xs sm:text-sm font-medium text-text-muted">
                      View your team's leave schedule and plan your work.
                    </p>
                  </div>

                  <div className="space-y-3 h-[115px] overflow-y-auto pr-2 custom-scrollbar">
                    {teamBreakDays?.map((member, index) => (
                      <div key={index}>
                        <div className="flex items-center justify-between py-2">
                          <div className="flex items-center gap-2">
                            <img
                              src={member?.avatar}
                              alt={member?.name}
                              className="w-8 h-8 rounded-lg"
                            />
                            <div>
                              <p className="text-xs font-medium text-primary">
                                {member?.dates}
                              </p>
                              <p className="text-xs text-text-muted">
                                {member?.name}
                              </p>
                            </div>
                          </div>
                          <div className="flex flex-col items-end justify-between  gap-1 ">
                            <img
                              src={member?.icon}
                              alt={member?.leaveType}
                              className="w-4 h-4"
                            />

                            <p className="text-xs text-text-muted">
                              {member?.leaveType}
                            </p>
                          </div>
                        </div>
                        {index < teamBreakDays?.length - 1 && (
                          <div className="w-full h-px bg-[#e6edff7f]" />
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* User Time Log & Clock In/Out Section */}
        <section className='mt-6'>
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-4 lg:gap-4">
            {/* User Time Log Chart */}
            <div className="lg:col-span-2 bg-background-card rounded-xl border border-[#e6edff] p-4 sm:p-6 shadow-sm">
              <div className="space-y-2">
                <h2 className="text-base sm:text-lg font-semibold text-primary">
                  User Time Log
                </h2>
                <p className="text-sm text-text-muted">
                  Hours spent on tasks and shifts
                </p>
              </div>
              <ChartComponent />
            </div>

            {/* Clock In & Out Time */}
            <div className="lg:col-span-3 bg-background-card rounded-xl border border-[#e6edff] p-4 sm:p-6 shadow-sm">
              <div className="space-y-6">
                {/* Header */}
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                  <div className="space-y-1">
                    <h2 className="text-base sm:text-lg font-semibold text-primary">
                      Clock In & Out Time
                    </h2>
                    <p className="text-sm text-text-muted">
                      Easily record your work timings and track your attendance seamlessly.
                    </p>
                  </div>
                  <Button
                    text="Clock Out"
                    text_color="#f42b03"  // This is the accent-orange color value
                    className="px-4 sm:px-6 py-2 border border-accent-orange text-accent-orange bg-transparent rounded-md hover:bg-accent-orange hover:text-white text-sm font-medium whitespace-nowrap"
                  />
                </div>

                {/* Shift Info & Date */}
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <img
                      src="/images/img_frame_light_blue_800.svg"
                      alt="Shift"
                      className="w-6 h-6"
                    />
                    <span className="text-sm font-medium text-[#2f3b53]">
                      Shift Time - 9:30 AM - 6:30 PM
                    </span>
                  </div>
                  <div className="flex items-center gap-1">
                    <img
                      src="/images/img_group.svg"
                      alt="Calendar"
                      className="w-6 h-6"
                    />
                    <span className="text-sm font-medium text-black">
                      July, 08 , 2025
                    </span>
                  </div>
                </div>

                {/* Time Log */}
                <div className="space-y-6">
                  {/* Legend */}
                  <div className="flex items-center justify-end gap-3 -mb-2">
                    <div className="flex items-center gap-1.5">
                      <div className="w-2 h-2 rounded-full bg-[#e34d14]" />
                      <span className="text-[10px] sm:text-xs font-medium text-text-muted">Late</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <div className="w-2 h-2 rounded-full bg-[#1476b9]" />
                      <span className="text-[10px] sm:text-xs font-medium text-text-muted">Working Time</span>
                    </div>
                    {/* <div className="flex items-center gap-1.5">
                      <div className="w-2 h-2 rounded-full bg-[#00a94b]" />
                      <span className="text-[10px] sm:text-xs font-medium text-text-muted">Overtime</span>
                    </div> */}
                  </div>

                  {/* Today's Times - Progress Bar Layout */}
                  <div className="flex items-center justify-between gap-4">
                    {/* Clock In */}
                    {/* <div className="text-center flex-shrink-0">
                      <p className="text-sm font-medium text-[#7a9dbe]">Clock -in</p>
                      <p className="text-base font-bold text-black">9:30 AM</p>
                    </div> */}
                    {/* <div className="hidden lg:block w-px h-10 bg-gray-300"></div> */}

                    {/* Progress Bar Container */}
                    <div className="flex-1 h-9 bg-gray-50 rounded overflow-hidden flex text-xs font-medium text-white relative">
                      {/* Late Segment */}
                      <div
                        className="bg-[#e34d14] relative flex items-center justify-center"
                        style={{ width: '11%' }} // Mock Value
                      >
                        1:00
                      </div>
                      {/* Working Time Segment */}
                      <div
                        className="bg-[#1476b9] relative flex items-center justify-center"
                        style={{ width: '55%' }} // Mock Value
                      >
                        4:57
                      </div>

                      {/* Overtime Segment */}
                      {/* <div
                        className="bg-[#00a94b] relative"
                        style={{ width: '5%' }} // Mock Value
                      /> */}
                    </div>

                    {/* <div className="hidden lg:block w-px h-10 bg-gray-300"></div> */}

                    {/* Clock Out */}
                    {/* <div className="text-center flex-shrink-0">
                      <p className="text-sm font-medium text-[#7a9dbe]">Clock - out</p>
                      <p className="text-base font-bold text-black">6:30 PM</p>
                    </div> */}
                  </div>

                  {/* Additional Time Entries */}
                  <div className="flex flex-wrap items-center justify-center sm:justify-around gap-4 sm:gap-8 pt-8 border-t border-[#d8e3f3]">
                    <div className="flex items-center gap-4">
                      <div className="w-px h-10 bg-[#d8e3f3]" />
                      <div className="text-center px-2">
                        <p className="text-sm font-medium text-[#7a9dbe]">Clock - in</p>
                        <p className="text-sm font-medium text-[#00a94b]">10:30 AM</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="w-px h-10 bg-[#d8e3f3]" />
                      <div className="text-center px-2">
                        <p className="text-sm font-medium text-[#7a9dbe]">Clock - out</p>
                        <p className="text-sm font-medium text-black">-</p>
                      </div>
                    </div>
                    {/* <div className="flex items-center gap-4">
                      <div className="w-px h-10 bg-[#d8e3f3]" />
                      <div className="text-center px-4">
                        <p className="text-sm font-medium text-[#7a9dbe]">Late</p>
                        <p className="text-sm font-medium text-[#e34d14]">1 Hour</p>
                      </div>
                      <div className="w-px h-10 bg-[#d8e3f3]" />
                    </div> */}
                    {/* <div className="flex items-center gap-4">
                      <div className="w-px h-10 bg-[#d8e3f3]" />
                      <div className="text-center px-4">
                        <p className="text-sm font-medium text-[#7a9dbe]">OverTime</p>
                        <p className="text-sm font-medium text-[#e34d14]">1 Hour</p>
                      </div>
                      <div className="w-px h-10 bg-[#d8e3f3]" />
                    </div> */}
                    <div className="flex items-center gap-4">
                      <div className="w-px h-10 bg-[#d8e3f3]" />
                      <div className="text-center px-4">
                        <p className="text-sm font-medium text-[#7a9dbe]">Total Duration</p>
                        <p className="text-sm font-medium text-black">-</p>
                      </div>
                      <div className="w-px h-10 bg-[#d8e3f3]" />
                    </div>
                    {/* <div className="text-center px-1">
                      <p className="text-sm font-medium text-[#7a9dbe]">Total Duration</p>
                      <p className="text-sm font-medium text-black">-</p>
                    </div> */}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Company Announcements, Leave Requests & Holidays Section */}
        <section className='mt-6'>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-4">
            {/* Left Column */}
            <div className="space-y-6 lg:space-y-8">
              {/* Company Announcements */}
              <div className="bg-background-card rounded-xl border border-[#e6edff] p-4 sm:p-6 shadow-lg">
                <div className="space-y-4 sm:space-y-6">
                  <div className="space-y-1">
                    <h2 className="text-lg sm:text-xl font-semibold text-primary">
                      Company Announcement
                    </h2>
                    <p className="text-sm font-medium text-text-muted">
                      Official Communication from Management
                    </p>
                  </div>

                  <div className="space-y-4 max-h-[296px] overflow-y-auto custom-scrollbar">
                    {announcements?.map((announcement, index) => (
                      <div key={index}>
                        <div className="flex items-start gap-4">
                          <div
                            className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0"
                            style={{ backgroundColor: announcement?.bgColor }}
                          >
                            <img
                              src={announcement?.icon}
                              alt=""
                              className="w-6 h-6"
                            />
                          </div>
                          <div className="flex-1 space-y-1">
                            <h3 className="text-base font-semibold text-[#101928]">
                              {announcement?.title}
                            </h3>
                            <p className="text-sm font-medium text-text-muted leading-relaxed">
                              {announcement?.description}
                            </p>
                          </div>
                        </div>
                        {index < announcements?.length - 1 && (
                          <div className="w-full h-px bg-[#dee3eb] mt-4" />
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Leave Request */}
              <div className="bg-background-card rounded-xl border border-[#e6edff] p-4 sm:p-6 shadow-lg">
                <div className="space-y-4 sm:space-y-6">
                  <div className="space-y-1">
                    <h2 className="text-lg sm:text-xl font-semibold text-primary">
                      Leave Request
                    </h2>
                    <p className="text-sm font-medium text-text-muted">
                      Apply for leave, check approval status, and manage your time off easily.
                    </p>
                  </div>

                  <h3 className="text-base font-semibold text-[#101928]">
                    Upcoming Leave
                  </h3>

                  <div className="space-y-4 max-h-64 overflow-y-auto custom-scrollbar">
                    {leaveRequests?.map((request, index) => (
                      <div
                        key={index}
                        className="bg-background-card rounded-2xl  p-1"
                      >
                        <div className="flex items-center gap-6">
                          {/* Date */}
                          <div className="space-y-1">
                            <p className="text-sm text-[#1d2639]">Date</p>
                            <p className="text-base font-medium text-[#1d26397f]">
                              {request?.date}
                            </p>
                          </div>

                          {/* Days */}
                          <div className="flex items-center gap-3">
                            <div className="w-px h-14 bg-[#eff1f4]" />
                            <div className="text-center">
                              <p className="text-sm text-[#1d2639] mb-1">Days</p>
                              <p className="text-base font-medium text-accent-orange">
                                {request?.days}
                              </p>
                            </div>
                            <div className="w-px h-14 bg-[#eff1f4]" />
                          </div>

                          {/* Approved By */}
                          <div className="flex-1 space-y-1">
                            <p className="text-sm font-medium text-[#1d2639]">Approved</p>
                            <div className="flex items-center gap-2">
                              {request?.approvers?.map((approver, idx) => (
                                <div key={idx}>
                                  {approver?.initials ? (
                                    <div
                                      className="w-6 h-6 rounded-xl flex items-center justify-center text-xs font-semibold text-[#101928] border border-white"
                                      style={{ backgroundColor: approver?.bgColor }}
                                    >
                                      {approver?.initials}
                                    </div>
                                  ) : (
                                    <img
                                      src={approver?.avatar}
                                      alt=""
                                      className="w-6 h-6 rounded-xl"
                                    />
                                  )}
                                </div>
                              ))}
                            </div>
                          </div>

                          {/* Status */}
                          <div className="space-y-1">
                            <p className="text-sm text-[#1d2639]">Status</p>
                            <span
                              className="inline-block px-3 py-1 rounded-xl text-sm font-medium text-white"
                              style={{ backgroundColor: request?.statusColor }}
                            >
                              {request?.status}
                            </span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column */}
            <div className="space-y-6 lg:space-y-8">
              {/* Upcoming Holidays */}
              <div className="bg-background-card rounded-xl border border-[#e6edff] p-4 sm:p-6 shadow-lg">
                <div className="space-y-4 sm:space-y-6">
                  <div className="space-y-1">
                    <h2 className="text-lg sm:text-xl font-semibold text-primary">
                      Upcoming Holidays
                    </h2>
                    <p className="text-sm font-medium text-text-muted">
                      Know your holidays in advance and plan your time.
                    </p>
                  </div>

                  <div className="flex items-center justify-between mt-2">
                    <h3 className="text-base font-semibold text-primary">
                      April, 2025
                    </h3>
                    <div className="flex items-center gap-5">
                      <img
                        src="/images/img_frame_blue_gray_900.svg"
                        alt="Previous"
                        className="w-6 h-6 cursor-pointer"
                      />
                      <img
                        src="/images/img_arrow_right.svg"
                        alt="Next"
                        className="w-6 h-6 cursor-pointer"
                      />
                    </div>
                  </div>

                  <div className="space-y-4 max-h-[296px] overflow-y-auto custom-scrollbar">
                    {holidays?.map((holiday, index) => (
                      <div
                        key={index}
                        className="bg-background-card rounded-sm p-3 border-l-4"
                        style={{ borderLeftColor: holiday?.borderColor }}
                      >
                        <h4 className="text-base font-semibold text-primary">
                          {holiday?.type}
                        </h4>
                        <p className="text-sm font-medium text-primary mt-1">
                          {holiday?.name}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Milestones & Memories */}
              <div className="bg-background-card rounded-xl border border-[#e6edff] p-4 sm:p-6 shadow-lg">
                <div className="space-y-4 sm:space-y-6">
                  <div className="space-y-1">
                    <h2 className="text-lg sm:text-xl font-semibold text-primary">
                      Cheers to Milestones & Memories
                    </h2>
                    <p className="text-sm font-medium text-text-muted">
                      Birthdays · Work Anniversaries · Wedding Anniversaries
                    </p>
                  </div>

                  <p className="text-sm font-medium text-primary leading-relaxed">
                    This month, we celebrate our teammates' special moments — from birthdays to milestones at work and wedding anniversaries. Spread your wishes and cheer for them!
                  </p>

                  <div className="space-y-4 max-h-64 overflow-y-auto custom-scrollbar">
                    {milestones?.map((milestone, index) => (
                      <div key={index} className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          {milestone?.initials ? (
                            <div
                              className="w-9 h-9 rounded-2xl flex items-center justify-center text-sm font-medium text-white"
                              style={{ backgroundColor: milestone?.bgColor }}
                            >
                              {milestone?.initials}
                            </div>
                          ) : (
                            <img
                              src={milestone?.avatar}
                              alt={milestone?.name}
                              className="w-9 h-9 rounded-2xl"
                            />
                          )}
                          <div>
                            <p className="text-sm font-medium text-primary">
                              {milestone?.name}
                            </p>
                            <p className="text-xs font-medium text-text-muted">
                              {milestone?.type}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          <p className="text-xs font-semibold text-primary-dark">
                            {milestone?.date}
                          </p>
                          <img
                            src={milestone?.icon}
                            alt=""
                            className="w-9 h-9"
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Attendance Calendar Section */}
        <section className='mt-6'>
          <div className="bg-background-card rounded-xl border border-[#e6edff] p-4 sm:p-6 shadow-sm">
            <div className="space-y-6 sm:space-y-8">
              {/* Header */}
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div className="space-y-1">
                  <h2 className="text-lg sm:text-xl font-semibold text-primary">
                    Attendance
                  </h2>
                  <p className="text-sm font-medium text-text-muted">
                    Monitor your daily attendance, check-in times, and work hours effortlessly.
                  </p>
                </div>
                <div className="flex items-center gap-5">
                  <button className="w-8 h-8 bg-white border-2 border-[#d2d5dd78] rounded-2xl flex items-center justify-center shadow-sm">
                    <img
                      src="/images/img_arrow_left.svg"
                      alt="Previous month"
                      className="w-4 h-4"
                    />
                  </button>
                  <h3 className="text-base font-medium text-primary">
                    October 2025
                  </h3>
                  <button className="w-8 h-8 bg-white border-2 border-[#d2d5dd78] rounded-2xl flex items-center justify-center shadow-sm">
                    <img
                      src="/images/img_arrow_right_blue_gray_900.svg"
                      alt="Next month"
                      className="w-4 h-4"
                    />
                  </button>
                </div>
              </div>

              {/* Attendance Legend */}
              <div className="flex flex-wrap items-center gap-3 sm:gap-6">
                {attendanceLegend?.map((item, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <img
                      src={item?.icon}
                      alt={item?.name}
                      className="w-8 sm:w-10 h-8 sm:h-10 rounded-xl"
                    />
                    <span className="text-xs  font-medium text-black">
                      {item?.name}
                    </span>
                  </div>
                ))}
              </div>

              {/* Calendar */}
              <div className="overflow-x-auto">
                <table className="w-full min-w-[800px]">
                  {/* Calendar Header */}
                  <thead>
                    <tr>
                      {dayNames?.map((day, index) => (
                        <th
                          key={index}
                          className="bg-background-light text-base font-medium text-text-secondary p-3 text-left first:rounded-l-lg last:rounded-r-lg"
                        >
                          {day}
                        </th>
                      ))}
                    </tr>
                  </thead>

                  {/* Calendar Body */}
                  <tbody>
                    {calendarWeeks?.map((week, weekIndex) => (
                      <tr key={weekIndex}>
                        {week?.map((day, dayIndex) => {
                          const isHoliday = day?.status && ![
                            'Payable Days',
                            'Half - Day',
                            'On - Duty',
                            'Earned Leave',
                            'Sick Leave',
                            'Casual Leave'
                          ].includes(day.status);

                          return (
                            <td
                              key={dayIndex}
                              className={`
                                      border border-[#f3f6ff] p-2 h-24 align-top
                                      ${day?.type === 'weekend' && !isHoliday ? 'bg-background-purple-light' : ''}
                                      ${day?.type === 'prev-month' ? 'bg-background-light' : ''}
                                      ${!day?.type || day?.type === 'current' && !isHoliday ? 'bg-[#fdfcfe]' : ''}
                                    `}
                              style={isHoliday ? { backgroundColor: day.bgColor } : {}}
                            >
                              <div className="h-full flex flex-col">
                                <span
                                  className={`
                                          text-sm font-medium mb-1
                                          ${day?.type === 'prev-month' ? 'text-text-secondary' : 'text-text-primary'}
                                        `}
                                >
                                  {day?.date}
                                </span>

                                {day?.status && (
                                  <div
                                    className={`
                                              px-2 py-1 rounded text-xs font-semibold mt-auto truncate
                                              ${isHoliday ? 'w-full text-center flex items-center justify-center' : ''}
                                            `}
                                    style={{
                                      color: day?.color,
                                      // backgroundColor: isHoliday ? 'transparent' : day?.bgColor,
                                      backgroundColor: day?.labelBgColor || day?.bgColor,
                                      // borderLeft: isHoliday ? `4px solid ${day?.color}` : 'none'
                                      borderLeft: `4px solid ${day?.color}`
                                    }}
                                  >
                                    {day?.status}
                                  </div>
                                )}
                              </div>
                            </td>
                          );
                        })}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default EmployeeDashboard;