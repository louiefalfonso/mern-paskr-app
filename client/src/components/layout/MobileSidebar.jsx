import { useDispatch, useSelector } from "react-redux";
import { Fragment } from "react";
import { setOpenSidebar } from "../../redux/slices/authSlice";
import { Transition } from "@headlessui/react";
import { IoClose } from "react-icons/io5";
import clsx from "clsx";
import Sidebar from "./Sidebar";

const MobileSidebar = () => {
  const { isSidebarOpen } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const handleSidebarClose = () => {
    dispatch(setOpenSidebar(false));
  };

  return (
    <Transition
      show={isSidebarOpen}
      as={Fragment}
      enter="transition-opacity duration-700"
      enterFrom="opacity-0"
      enterTo="opacity-100"
      leave="transition-opacity duration-700"
      leaveFrom="opacity-100"
      leaveTo="opacity-0"
    >
      <div
        className={clsx(
          "md:hidden w-full h-full bg-black/40 transition-all duration-700 transform"
        )}
        onClick={handleSidebarClose}
      >
        <div className="bg-white w-3/4 h-full">
          <div className="w-full flex justify-end px-0">
            <button
              type="button"
              onClick={handleSidebarClose}
              className="flex justify-end items-end"
            >
              <IoClose size={25} />
            </button>
          </div>

          <div className="">
            <Sidebar />
          </div>
        </div>
      </div>
    </Transition>
  );
};

export default MobileSidebar;
