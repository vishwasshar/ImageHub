import React, { useEffect, useState } from "react";
import { BiSearch } from "react-icons/bi";
import { useDispatch, useSelector } from "react-redux";
import {
  getImages,
  searchImage,
  setImages,
  updateImgView,
} from "../redux/ImageSlice";
import ImgPrvModal from "../components/ImgPrvModal";

const Gallery = () => {
  const [showPrv, setShowPrv] = useState(false);
  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.user);
  const { images } = useSelector((state) => state.Images);
  let timer;

  const fetchData = async (query) => {
    let body = { que: "" };

    query && (body = { que: query });
    try {
      const submit = await fetch(process.env.REACT_APP_API_URL + "img", {
        method: "POST",
        body: JSON.stringify(body),
        headers: {
          Authorization: token,
          "Content-type": "application/json",
        },
      });
      const img = await submit.json();
      if (img instanceof Array) {
        dispatch(setImages(img));
      } else {
        alert("Can't fetch ");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const updateView = async (id) => {
    try {
      const submit = await fetch(
        `${process.env.REACT_APP_API_URL}img/updateView/${id}`,
        {
          method: "PUT",
          headers: {
            Authorization: token,
            "Content-type": "application/json",
          },
        }
      );
      const image = await submit.json();
      if (image._id) {
        dispatch(updateImgView(image));
      } else {
        alert("Couldn't update view ");
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);
  return (
    <>
      <ImgPrvModal
        className={showPrv ? "block" : "hidden"}
        showHandler={setShowPrv}
      />
      <div className="px-5 flex flex-col gap-10 pb-10 overflow-hidden">
        <div className="mt-5 w-[70vw] md:w-[60vw] mx-auto self-start">
          <div className="relative w-full">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <BiSearch />
            </div>
            <input
              type="search"
              id="default-search"
              className=" w-full py-3 px-4 shadow mb-4 block p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-full bg-gray-50  "
              placeholder="Search Codes..."
              onChange={(e) => {
                clearTimeout(timer);
                timer = setTimeout(() => {
                  dispatch(searchImage(e.target.value));
                }, 200);
              }}
            />
          </div>
        </div>
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-10 md:px-10">
          {images.length > 0 ? (
            images.map((project) => {
              return (
                <div
                  className="flex flex-col shadow rounded-br-2xl rounded-bl-2xl hover:scale-110 transition-transform duration-300 cursor-pointer"
                  onClick={() => {
                    dispatch(getImages(project?._id));
                    setShowPrv(true);
                    updateView(project?._id);
                  }}
                  key={project?._id}
                >
                  <div className=" mt-2 flex justify-center items-center">
                    <img
                      src={project?.img}
                      className="w-full max-w-xs max-h-32"
                      alt=""
                    />
                  </div>
                  <div className=" p-4 flex flex-col items-center justify-between">
                    <h3 className="mb-4 mt-2 text-xl font-semibold capitalize">
                      {project?.title}
                    </h3>
                    <p>{project?.description}</p>
                  </div>
                  <div className=" p-4 flex items-center justify-between">
                    <p className="text-sm">
                      Views:
                      <br /> {project?.views}
                    </p>
                    <p className="text-sm text-end">
                      Uploaded By:
                      <br /> {project?.userId?.name}
                    </p>
                  </div>
                </div>
              );
            })
          ) : (
            <div>No data found</div>
          )}
        </div>
      </div>
    </>
  );
};

export default Gallery;
