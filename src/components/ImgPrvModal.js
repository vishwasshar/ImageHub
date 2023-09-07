import React from "react";
import ReactDOM from "react-dom";
import { useSelector } from "react-redux";

const ImgPrvModal = (props) => {
  const { filteredImg } = useSelector((state) => state.Images);
  return ReactDOM.createPortal(
    <div
      className={
        "z-50 fixed h-[100vh] w-[100vw] left-0 top-0 flex items-center justify-center  " +
        props.className
      }
    >
      <div
        className="h-[100vh] w-full bg-[#000000aa] backdrop-blur-md absolute cursor-pointer"
        onClick={() => {
          props.showHandler(false);
        }}
      ></div>
      <div className="z-50 max-w-[90%] max-h-[80%] overflow-auto">
        <img src={filteredImg[0]?.img} />
      </div>
    </div>,
    document.getElementById("ImagePrv")
  );
};

export default ImgPrvModal;
