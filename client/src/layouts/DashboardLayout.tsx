import { useState } from 'react';
import { MdOutlineMenu } from 'react-icons/md';
import { Outlet } from 'react-router-dom';

import SideBar from '../components/Nav/SideBar';

const DashboardLayout = () => {
  const [sidebarOpen, setSideBarOpen] = useState(true);
  const [sideBarShown, setSideBarShown] = useState(false);
  // const isConnected = useSelector(fetchConnected);

  // if (!isConnected) {
  // return <Navigate to="/login" />;
  // }

  return (
    <section className="w-screen h-screen bg-light-gray text-dark transition duration-200 dark:bg-dark dark:text-white flex">
      <SideBar
        sidebarOpen={sidebarOpen}
        sideBarShown={sideBarShown}
        setSideBarShown={setSideBarShown}
        setSideBarOpen={setSideBarOpen}
      />
      <div
        className={`w-full ${
          sidebarOpen ? 'lg:w-[calc(100%_-_288px)]' : 'lg:w-[calc(100%_-_80px)]'
        }`}
      >
        <div className="w-full">
          <nav className="h-16 flex items-center p-4 bg-white dark:bg-dark-gray dark:text-white lg:hidden">
            <button
              type="button"
              className="text-2xl"
              onClick={() => {
                setSideBarShown(true);
              }}
            >
              <MdOutlineMenu />
            </button>
          </nav>
          <div className="p-4 lg:h-screen h-[calc(100vh_-_64px)] overflow-y-scroll scrollbar">
            <Outlet />
          </div>
        </div>
      </div>
    </section>
  );
};

export default DashboardLayout;
