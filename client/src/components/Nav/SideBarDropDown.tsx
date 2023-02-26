import React, { useState, useEffect } from "react";

import { MdOutlineKeyboardArrowRight } from "react-icons/md";
import { Link } from "react-router-dom";

type SideBarDropDownProps = {
  sidebarOpen: boolean;
  name: string;
  icon: React.ReactNode;
  childrens: {
    to: string;
    name: string;
    icon: React.ReactNode;
  }[];
};

const SideBarDropDown = ({
  sidebarOpen,
  childrens,
  name,
  icon,
}: SideBarDropDownProps) => {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!sidebarOpen) {
      setOpen(false);
    }
  }, [sidebarOpen]);

  return (
    <li
      className={`transition duration-100 uppercase ${
        open ? "bg-light-gray dark:bg-dark-gray rounded-md" : ""
      }`}
    >
      <button
        onClick={() => {
          setOpen(!open);
        }}
        className={`${
          open ? "bg-primary text-white dark:text-light-gray" : ""
        } hover:bg-primary h-12 font-semibold rounded-md justify-center  hover:text-white dark:text-light-gray flex gap-2 px-3 items-center w-full`}
      >
        <div className="text-xl">{icon}</div>
        {sidebarOpen && (
          <div className="flex items-center justify-between w-full uppercase ">
            <span>{name}</span>

            <div className={`text-xl ${open ? "rotate-90" : ""}`} />
            <MdOutlineKeyboardArrowRight />
          </div>
        )}
      </button>
      <div className={`${open ? " p-2 rounded-md" : "h-0 overflow-hidden"}  `}>
        <ul className="flex flex-col gap-2">
          {childrens.map((child, index) => (
            <li
              key={index}
              className="h-12 hover:bg-primary font-semibold rounded-md  hover:text-white dark:text-light-gray flex items-center"
            >
              <Link
                to={child.to}
                className={`flex w-full h-full items-center ${
                  sidebarOpen ? "gap-2 px-3" : "justify-center"
                }`}
              >
                <div className="text-xl">{child.icon}</div>
                {sidebarOpen && <span>{child.name}</span>}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </li>
  );
};

export default SideBarDropDown;
