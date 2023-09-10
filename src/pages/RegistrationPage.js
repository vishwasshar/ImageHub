import React, { useEffect } from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { loginRedux } from "../redux/UserSlice";
import { useDispatch, useSelector } from "react-redux";

const Registeration = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { auth } = useSelector((state) => state.user);

  useEffect(() => {
    if (auth) {
      navigate("/gallery");
    }
  }, [auth]);

  const signUpUser = async (name, email, password) => {
    try {
      const user = await fetch(process.env.REACT_APP_API_URL + "user/create", {
        method: "PUT",
        body: JSON.stringify({ name, email, password }),
        headers: {
          "content-type": "application/json",
        },
      });
      const res = await user.json();
      if (res) {
        dispatch(loginRedux({ token: res.token, username: res.userName }));
        navigate("/gallery");
      } else {
        alert("Un-authenticated User");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const [value, setValue] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleOnChange = (e) => {
    setValue({ ...value, [e.target.name]: e.target.value });
  };

  const singUpHandler = (e) => {
    e.preventDefault();
    signUpUser(value.name, value.email, value.password);
  };

  return (
    <>
      <div className="min-h-screen flex items-center justify-center">
        <form
          onSubmit={singUpHandler}
          className="w-full sm:w-96 px-4 py-8 bg-white rounded-lg shadow-md"
        >
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-5">Register</h1>
          </div>
          <div className="mb-5">
            <input
              type="text"
              className="w-full p-3 border border-gray-400 rounded-lg"
              name="name"
              value={value.name}
              onChange={handleOnChange}
              placeholder="Enter Name"
            />
          </div>
          <div className="mb-5">
            <input
              type="email"
              className="w-full p-3 border border-gray-400 rounded-lg"
              name="email"
              value={value.email}
              onChange={handleOnChange}
              placeholder="Enter Email"
            />
          </div>
          <div className="mb-5">
            <input
              type="password"
              className="w-full p-3 border border-gray-400 rounded-lg"
              name="password"
              value={value.password}
              onChange={handleOnChange}
              placeholder="Enter Password"
            />
          </div>
          <div className="mb-5 text-center">
            <button
              type="submit"
              onClick={singUpHandler}
              className="bg-black text-white py-3 px-6 w-full mb-2 rounded-lg"
            >
              Submit
            </button>
            <div className="flex justify-center">
              <h5>Already Have An Account ?</h5>
              <Link to="/login" className="text-black">
                <h5 className="font-bold"> Login</h5>
              </Link>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default Registeration;
