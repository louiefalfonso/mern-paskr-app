import { FaTasks, FaTrashAlt, FaUsers } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import { setOpenSidebar } from "../../redux/slices/authSlice";
import clsx from "clsx";
import PropTypes from "prop-types";
import {
  MdDashboard,
  MdTaskAlt,
  MdOutlinePendingActions,
} from "react-icons/md";
import logo from "../../assets/paskr-logo.png";



const linkData = [
  {
    label: "Dashboard",
    link: "/dashboard",
    icon: <MdDashboard />,
  },
  {
    label: "Teams",
    link: "/users",
    icon: <FaUsers />,
  },
  {
    label: "Tasks",
    link: "/tasks",
    icon: <FaTasks />,
  },
  /*
  {
    label: "Completed",
    link: "/completed/completed",
    icon: <MdTaskAlt />,
  },
  {
    label: "In Progress",
    link: "/in-progress/in-progress",
    icon: <MdOutlinePendingActions />,
  },
  {
    label: "To Do",
    link: "/todo/todo",
    icon: <MdOutlinePendingActions />,
  },
  {
    label: "Trash",
    link: "/trashed",
    icon: <FaTrashAlt />,
  },
  */
];

const Sidebar = () => {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const location = useLocation();

  const path = location.pathname.split("/")[1];
  const sidebarLinks = user?.isAdmin ? linkData : linkData.slice(0, 5);
  const closeSidebar = () => {
    dispatch(setOpenSidebar(false));
  };


  const NavLink = ({ el }) => {
    return (
      <Link
        to={el.link}
        onClick={closeSidebar}
        className={clsx(
          "w-full lg:w-3/4 flex gap-2 px-3 py-2 rounded-full items-center text-gray-800 text-base hover:bg-[#a7f3d0]",
          path === el.link.split("/")[1]
            ? "bg-emerald-400 text-neutral-100"
            : ""
        )}
      >
        {el.icon}
        <span className="hover:text-[#10b981]">{el.label}</span>
      </Link>
    );
  };

  NavLink.propTypes = {
    el: PropTypes.shape({
      label: PropTypes.string.isRequired,
      link: PropTypes.string.isRequired,
      icon: PropTypes.node.isRequired,
    }).isRequired,
  };

  return (
    <div className="w-full h-full flex flex-col gap-6 p-5">
      <img src={logo} alt="Paskr Logo" className="scale-75" />
      <div className="flex-1 flex flex-col gap-y-5 py-8">
        {sidebarLinks.map((link) => (
          <NavLink el={link} key={link.label} />
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
