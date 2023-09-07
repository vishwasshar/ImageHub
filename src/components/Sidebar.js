import React from "react";
import { AiOutlineClose } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { logoutRedux } from "../redux/UserSlice";

const Sidebar = (props) => {
  const dispatch = useDispatch();
  const removeModalHandler = () => {
    props.setShowModal(false);
  };
  const { username } = useSelector((state) => state.user);

  return (
    <div
      className={
        "h-[100vh] w-[100vw] z-30 bg-[#ffffff33] backdrop-blur-sm fixed sm:hidden " +
        props.className
      }
    >
      <div className="w-[80%] h-[100%] bg-white flex flex-col gap-5 items-center absolute right-0 rounded-lg">
        <button className=" p-3 mb-10 self-end" onClick={removeModalHandler}>
          <AiOutlineClose />
        </button>

        <Link
          to="/uploadImage"
          className="font-semibold hover:text-[#635DFF]"
          onClick={() => {
            props.setShowModal(false);
          }}
        >
          Upload
        </Link>
        <Link
          to="/gallery"
          className="font-semibold hover:text-[#635DFF]"
          onClick={() => {
            props.setShowModal(false);
          }}
        >
          Gallery
        </Link>
        <p
          className="font-semibold hover:bg-gray-200  py-1 px-3 rounded-lg flex justify-center items-center"
          onClick={() => {
            props.setShowModal(false);
          }}
        >
          <span className="pr-1">{username}</span>
        </p>
        <button
          onClick={() => {
            props.setShowModal(false);
            dispatch(logoutRedux());
          }}
          className="bg-[#635DFF]  hover:bg-[#635Daa] font-semibold  text-white border border-gray-500 py-1 px-3 rounded-lg"
        >
          Sign Out
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
