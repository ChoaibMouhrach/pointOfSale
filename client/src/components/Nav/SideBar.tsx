import React, { useState } from "react";
import {
  MdAdd,
  MdAllInbox,
  MdBookmarkBorder,
  MdClose,
  MdOutlineCountertops,
  MdOutlineDashboard,
  MdOutlineDeliveryDining,
  MdOutlineExitToApp,
  MdOutlineFormatQuote,
  MdOutlineNightlight,
  MdOutlineReceiptLong,
  MdOutlineSettings,
  MdOutlineShoppingBasket,
  MdOutlineShoppingCart,
  MdOutlineSupervisedUserCircle,
  MdOutlineWbSunny,
} from "react-icons/md";

import SideBarButton from "./SideBarButton";
import SideBarDropDown from "./SideBarDropDown";
import SideBarItem from "./SideBarItem";
import { useLogoutMutation } from "../../features/apis/authApi";
import { useDispatch } from "react-redux";
import { deleteUser } from "../../features/slices/userSlice";
import { setTheme } from "../../features/slices/themeSlice";
import { useNavigate } from "react-router-dom";

type SideBarProps = {
  sidebarOpen: boolean;
  setSideBarOpen: (barOpen: boolean) => void;
  sideBarShown: boolean;
  setSideBarShown: (barShown: boolean) => void;
};

const SideBar = ({ sidebarOpen, setSideBarOpen, sideBarShown, setSideBarShown }: SideBarProps) => {
  // states
  const [logout] = useLogoutMutation();
  const [mode, setMode] = useState(localStorage.getItem("mode") ?? "light");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  function handleTheme() {
    if (localStorage.getItem("mode") === "dark") {
      window.document.documentElement.className = "";
      setMode("light");
      dispatch(setTheme("light"));
      localStorage.setItem("mode", "light");
    } else {
      window.document.documentElement.className = "dark";
      setMode("dark");
      dispatch(setTheme("dark"));
      localStorage.setItem("mode", "dark");
    }
  }

  function handleClose() {
    setSideBarOpen(!sidebarOpen);
  }

  async function handleLogout() {
    await logout();
    dispatch(deleteUser());
    localStorage.removeItem("authToken");
  }

  return (
    <div className={`z-10 ${sideBarShown ? "fixed lg:static w-full lg:w-auto bg-semiblack h-screen" : "hidden lg:block"}`}>
      <div className="absolute right-0 p-4 lg:hidden">
        <button
          className="text-2xl text-white dark:text-white"
          onClick={() => {
            setSideBarShown(false);
          }}
        >
          <MdClose />
        </button>
      </div>
      <div
        className={`bg-white dark:bg-dark transition duration-200 dark:border-r dark:border-dark-gray text-sm flex flex-col h-screen ${
          sidebarOpen ? "w-72" : "w-24 overflow-hidden"
        } `}
      >
        <div className="h-20 flex items-center p-4 justify-center gap-4 font-bold uppercase">
          <div className="w-12 relative ">
            <div onClick={handleClose} className="w-12 h-12 bg-yellow-400 rounded-full object-cover"></div>
          </div>
          {sidebarOpen && (
            <div className="flex-1 flex flex-col">
              <span className="text-primary dark:text-light-gray">{`${"mouhrach.com"}`}</span>
              <span className="text-blue-gray">Owner</span>
            </div>
          )}
        </div>
        <div className="p-4 flex-1 overflow-y-scroll scrollbar scrollbar-whitebg">
          <ul className="flex flex-col gap-4 text-dark">
            <SideBarItem name="Dashboard" to="/" icon={<MdOutlineDashboard />} sidebarOpen={sidebarOpen} />
            <SideBarItem name="Cart" to="/cart" icon={<MdOutlineShoppingCart />} sidebarOpen={sidebarOpen} />

            <SideBarDropDown
              name="Products"
              icon={<MdOutlineCountertops />}
              childrens={[
                {
                  name: "Products",
                  to: "/products",
                  icon: <MdOutlineShoppingCart />,
                },
                {
                  name: "Create Prouct",
                  to: "/products/create",
                  icon: <MdAdd />,
                },
              ]}
              sidebarOpen={sidebarOpen}
            />
            <SideBarDropDown
              name="Brands"
              icon={<MdBookmarkBorder />}
              childrens={[
                {
                  name: "Brands",
                  to: "/brands",
                  icon: <MdBookmarkBorder />,
                },
                {
                  name: "Create Brand",
                  to: "/brands/create",
                  icon: <MdAdd />,
                },
              ]}
              sidebarOpen={sidebarOpen}
            />
            <SideBarDropDown
              name="Categories"
              icon={<MdAllInbox />}
              childrens={[
                {
                  name: "Categories",
                  to: "/categories",
                  icon: <MdAllInbox />,
                },
                {
                  name: "Create Category",
                  to: "/categories/create",
                  icon: <MdAdd />,
                },
              ]}
              sidebarOpen={sidebarOpen}
            />
            <SideBarDropDown
              name="Units"
              icon={<MdOutlineFormatQuote />}
              childrens={[
                {
                  name: "Units",
                  to: "/units",
                  icon: <MdOutlineFormatQuote />,
                },
                {
                  name: "Create Unit",
                  to: "/units/create",
                  icon: <MdAdd />,
                },
              ]}
              sidebarOpen={sidebarOpen}
            />
            <SideBarDropDown
              name="Sales"
              icon={<MdOutlineShoppingBasket />}
              childrens={[
                {
                  name: "Sales",
                  to: "/sales",
                  icon: <MdOutlineShoppingBasket />,
                },
                {
                  name: "Create Sale",
                  to: "/sales/create",
                  icon: <MdAdd />,
                },
              ]}
              sidebarOpen={sidebarOpen}
            />
            <SideBarDropDown
              name="Purchases"
              icon={<MdOutlineReceiptLong />}
              childrens={[
                {
                  name: "Purchases",
                  to: "/purchases",
                  icon: <MdOutlineReceiptLong />,
                },
                {
                  name: "Create Purchase",
                  to: "/purchases/create",
                  icon: <MdAdd />,
                },
              ]}
              sidebarOpen={sidebarOpen}
            />
            <SideBarDropDown
              name="Suppliers"
              icon={<MdOutlineDeliveryDining />}
              childrens={[
                {
                  name: "Suppliers",
                  to: "/suppliers",
                  icon: <MdOutlineDeliveryDining />,
                },
                {
                  name: "Create Supplier",
                  to: "/suppliers/create",
                  icon: <MdAdd />,
                },
              ]}
              sidebarOpen={sidebarOpen}
            />
            <SideBarDropDown
              name="Users"
              icon={<MdOutlineSupervisedUserCircle />}
              childrens={[
                {
                  name: "Users",
                  to: "/users",
                  icon: <MdOutlineSupervisedUserCircle />,
                },
                {
                  name: "Create User",
                  to: "/users/create",
                  icon: <MdAdd />,
                },
              ]}
              sidebarOpen={sidebarOpen}
            />
          </ul>
        </div>
        <div className="p-4">
          <ul className="flex flex-col gap-4">
            <SideBarButton name="SETTINGS" handleClick={() => navigate("/settings")} icon={<MdOutlineSettings />} sidebarOpen={sidebarOpen} />
            <SideBarButton name="LOG OUT" handleClick={handleLogout} icon={<MdOutlineExitToApp />} sidebarOpen={sidebarOpen} />
            <SideBarButton
              name={`${mode === "dark" ? "light" : "dark"} MODE`}
              handleClick={handleTheme}
              icon={mode === "dark" ? <MdOutlineWbSunny className="text-xl" /> : <MdOutlineNightlight className="text-xl" />}
              sidebarOpen={sidebarOpen}
            />
          </ul>
        </div>
      </div>
    </div>
  );
};

export default SideBar;
