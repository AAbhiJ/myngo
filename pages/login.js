import React, { useState } from "react";
import NgoApi from "../utils/API";
import Link from "next/link";
import Router from "next/router";
import Cookies from "js-cookie";
import jwt from 'jwt-decode' // import dependency
import Swal from 'sweetalert2'

/* middleware */
import {
  absoluteUrl,
  getAppCookies,
  verifyToken,
  setLogout,
} from "../middleware/utils";

const emailRegEx =
  /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,2|3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

const Login = ({ profile, token }) => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try{
      
    const result = await NgoApi.LoginNgo(formData);

    if (result.success && result.token) {

      Swal.fire({
        title: 'Successfull',
        text: 'Loged In Successfull',
        icon: 'success',
      });

      Cookies.set("token", result.token);
      // Router.push("/");
      const user = jwt(result.token.split(" ")[1]);



      if (user?.userType === "NGO") {
        Router.push("/admin");
      }
      if (user?.userType === "SUPER_ADMIN") {
        Router.push("/superadmin");
      }
    }
  }
  catch(error){
    Swal.fire({
      title: 'Error',
      text: 'Enter correct credentials.',
      icon: 'error',
    });
  }
  };

  return (
    <>
      <div className="container pt-5 mt-5 login">
        <div className="row  shadow-lg">
          <div className="col-6 position-relative leftSide">
            <h1 className="h1">Welcome to Fortunate Folks</h1>
          </div>
          <div className="col-6 rightSide">
            <form
              className="d-flex align-items-center justify-content-center flex-column gap-4 m-4 h-100"
              onSubmit={(e) => {
                handleSubmit(e);
              }}
            >
              <h2 className="fw-bold text-bluish-dark">Sign In</h2>
              <input
                type="email"
                name="email"
                id="email"
                placeholder="Enter your email address"
                className="w-75 borderBottom mt-5"
                onChange={(e) => {
                  handleChange(e);
                }}
                value={formData.email}
                required
              />
              <input
                type="password"
                name="password"
                id="password"
                placeholder="Enter password"
                className="w-75 borderBottom mb-5"
                onChange={(e) => {
                  handleChange(e);
                }}
                value={formData.password}
                required
              />
              <button id="submit" type="submit" className="button bgdark">
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
export async function getServerSideProps(context) {
  const { req } = context;
  const { origin } = absoluteUrl(req);

  const baseApiUrl = `${origin}/api`;

  const { token } = getAppCookies(req);

  const profile = token ? verifyToken(token.split(" ")[1]) : "";
  console.log(profile);
  if (profile?.userType === "NGO") {
    return {
      redirect: {
        destination: "/admin",
        permanent: false,
      },
    };
  }
  if (profile?.userType === "SUPER_ADMIN") {
    return {
      redirect: {
        destination: "/superadmin",
        permanent: false,
      },
    };
  }
  return {
    props: {
      baseApiUrl,
      profile,
    },
  };
}
