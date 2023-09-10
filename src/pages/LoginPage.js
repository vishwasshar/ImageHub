import React, { useEffect } from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loginRedux } from "../redux/UserSlice";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { auth } = useSelector((state) => state.user);

  useEffect(() => {
    if (auth) {
      navigate("/gallery");
    }
  }, [auth]);

  const loginUser = async (email, password) => {
    try {
      const loginReq = await fetch(
        process.env.REACT_APP_API_URL + "user/login",
        {
          method: "Post",
          body: JSON.stringify({ email: email, password: password }),
          headers: {
            "content-type": "application/json",
          },
        }
      );
      loginReq.json().then((res) => {
        if (res.message) {
          dispatch(loginRedux({ token: res.token, username: res.userName }));
          navigate("/gallery");
        } else {
          alert("Un-authenticated User");
        }
      });
    } catch (e) {}
  };

  const [value, setValue] = useState({
    email: "",
    password: "",
  });

  const handleOnChange = (e) => {
    setValue({ ...value, [e.target.name]: e.target.value });
  };

  const loginHandler = (e) => {
    e.preventDefault();
    loginUser(value.email, value.password);
  };

  return (
    <div className="min-h-screen flex items-center justify-center py-10">
      <form
        onSubmit={loginHandler}
        className="w-full sm:w-96 px-4 py-8 bg-white rounded-lg shadow-md"
      >
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-5">Login</h1>
        </div>
        <div className="mb-5">
          <input
            type="email"
            className="w-full p-3 border border-gray-400 rounded-lg"
            name="email"
            value={value.email}
            onChange={handleOnChange}
            placeholder="Enter Email/Username"
          />
        </div>
        <div className="mb-5">
          <input
            type="password"
            className="w-full p-3 border border-gray-400 rounded-lg"
            name="password"
            onChange={handleOnChange}
            placeholder="Enter Password"
          />
        </div>
        <div className="mb-3 text-center">
          <button
            type="submit"
            className="bg-black text-white py-3 px-6 w-full mb-3 rounded-lg"
          >
            Submit
          </button>
          <div className="flex justify-center">
            <h5>Don’t Have An Account ? </h5>
            <Link to="/signup" className="text-black px-1">
              <h5 className="font-bold"> Sign Up</h5>
            </Link>
          </div>
        </div>
        <div className="text-center"></div>
      </form>
    </div>
  );
};

export default Login;
