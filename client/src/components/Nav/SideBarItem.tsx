import { Link } from 'react-router-dom';

type SideBarItemProps = {
  sidebarOpen: boolean;
  name: string;
  to: string;
  icon: React.ReactNode;
};

const SideBarItem = ({ sidebarOpen, name, to, icon }: SideBarItemProps) => (
  <li className="hover:bg-primary hover:text-white dark:text-light-gray transition duration-100 font-semibold rounded-md h-12">
    <Link
      to={to}
      className={`flex gap-2 px-3 items-center w-full h-full ${
        sidebarOpen ? '' : 'justify-center'
      }`}
    >
      <div className="text-xl">{icon}</div>
      {sidebarOpen && <span>{name}</span>}
    </Link>
  </li>
);

export default SideBarItem;
