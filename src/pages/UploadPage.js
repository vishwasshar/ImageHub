import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
// import UploadDetail from "../components/UploadDetail";
import { useSelector } from "react-redux";

const UploadPage = () => {
  const navigate = useNavigate();
  const imgRef = useRef();
  const { token } = useSelector((state) => state.user);

  const [value, setValue] = useState({
    title: "",
    description: "",
  });
  const [img, setimg] = useState();
  const [disableSubmit, setDisableSubmit] = useState(false);

  const handleOnChange = (e) => {
    setValue({ ...value, [e.target.name]: e.target.value });
  };

  const uploadHandler = async (e) => {
    e.preventDefault();
    if (!value.title && !value.title && !img)
      return alert("Please fill all fields");
    setDisableSubmit(true);
    try {
      let formData = new FormData();
      await formData.append("img", img);
      await formData.append("title", value.title);
      await formData.append("description", value.description);

      const submit = await fetch(`${process.env.REACT_APP_API_URL}img/submit`, {
        method: "POST",
        headers: {
          Authorization: token,
        },
        body: formData,
      });
      const submitData = await submit.json();
      if (submitData) {
        navigate("/gallery");
        setDisableSubmit(false);
      } else {
        alert("Not Uploaded");
        setDisableSubmit(false);
      }
    } catch (error) {
      console.log(error);
      setDisableSubmit(false);
    }
  };

  return (
    <div className="flex h-[100%]">
      <section className="flex items-center justify-center mx-auto py-10 sm:py-20 h-[100%]">
        <div className="flex items-center justify-center rounded-xl shadow-2xl max-sm:w-[100vw] px-5 py-5">
          <form
            onSubmit={uploadHandler}
            className="w-full sm:w-[23rem] px-4  bg-white rounded-lg flex flex-col gap-8 "
          >
            <div
              className="h-20 border border-dashed border-black rounded-lg bg-gray-200 text-gray-500  flex items-center justify-center w-full"
              onClick={() => {
                imgRef.current?.click();
              }}
              onDragOver={(e) => {
                e.preventDefault();
              }}
              onDragLeave={(e) => {
                e.preventDefault();
              }}
              onDrop={(e) => {
                e.preventDefault();
                setimg(e.dataTransfer.files[0]);
              }}
            >
              {img ? (
                <img
                  src={URL.createObjectURL(img)}
                  className="w-20 max-h-full self-center"
                />
              ) : (
                <>Drop or Click to Upload Image</>
              )}
              <input
                type="file"
                accept=".jpg, .png, .jpeg"
                hidden
                ref={imgRef}
                onChange={(e) =>
                  e.currentTarget.files[0] && setimg(e.currentTarget.files[0])
                }
              />
            </div>
            <div>
              <input
                className="w-full p-3 border border-gray-400 rounded-lg"
                name="title"
                value={value.title}
                onChange={handleOnChange}
                placeholder="Project Title"
              />
            </div>
            <div>
              <textarea
                className="w-full p-3 border border-gray-400 rounded-lg"
                name="description"
                value={value.description}
                onChange={handleOnChange}
                placeholder="Description"
              />
            </div>
            <div className="text-center">
              <button
                type="submit"
                className="bg-black text-white py-3 px-6 w-full mb-3 rounded-lg"
                disabled={disableSubmit}
              >
                {disableSubmit ? "Uploading..." : "Submit"}
              </button>
            </div>
          </form>
        </div>
      </section>
    </div>
  );
};
export default UploadPage;
