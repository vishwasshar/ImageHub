import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logoutRedux } from "../redux/UserSlice";
import { IoReorderThree } from "react-icons/io5";
import Sidebar from "./Sidebar";

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [showSidebar, setShowSidebar] = useState(false);
  const { token, username, auth } = useSelector((state) => state.user);

  useEffect(() => {
    if (!auth) {
      navigate("/");
    }
  }, [auth]);

  const showModalHandler = () => {
    setShowSidebar(true);
  };

  const userSignOut = () => {
    dispatch(logoutRedux());
  };

  return (
    <>
      <Sidebar
        className={`${showSidebar ? "block" : "hidden"}`}
        setShowModal={setShowSidebar}
      />
      {token && (
        <header className="flex justify-between py-5 px-10 md:px-15 lg:px-20 shadow-xl">
          <Link className="text-[#635DFF] text-xl font-semibold">
            {"{ImageHub}"}
          </Link>

          <div className=" justify-center items-center gap-5 hidden sm:flex">
            <>
              <Link
                to="/uploadImage"
                className="font-semibold hover:text-[#635DFF]"
              >
                Upload
              </Link>
              <Link
                to="/gallery"
                className="font-semibold hover:text-[#635DFF]"
              >
                Gallery
              </Link>
              <p className="font-semibold hover:bg-gray-200  py-1 px-3 rounded-lg flex justify-center items-center">
                <span className="pr-1">{username}</span>
              </p>
              <button
                onClick={userSignOut}
                className="bg-[#635DFF]  hover:bg-[#635Daa] font-semibold  text-white border border-gray-500 py-1 px-3 rounded-lg"
              >
                Sign Out
              </button>
            </>
          </div>

          <button onClick={showModalHandler} className="sm:hidden">
            <IoReorderThree size={30} />
          </button>
        </header>
      )}
    </>
  );
};

export default Header;
