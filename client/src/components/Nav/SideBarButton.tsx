import React from "react";

type SideBarItemProps = {
  sidebarOpen: boolean;
  name: string;
  handleClick: () => void;
  icon: React.ReactNode;
};

const SideBarButton = ({
  sidebarOpen,
  name,
  handleClick,
  icon,
}: SideBarItemProps) => {
  return (
    <li className="hover:bg-primary hover:text-white dark:text-light-gray transition duration-100 font-semibold rounded-md h-12">
      <button
        onClick={handleClick}
        className={`flex gap-2 px-3 items-center w-full h-full ${
          sidebarOpen ? "" : "justify-center"
        }`}
      >
        <div className="text-xl">{icon}</div>
        {sidebarOpen && <span>{name}</span>}
      </button>
    </li>
  );
};

export default SideBarButton;
