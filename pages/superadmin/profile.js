import React, { useState } from "react";
import {
  absoluteUrl,
  getAppCookies,
  verifyToken,
} from "../../middleware/utils";

const Profile = () => {
  const [formData, setFormData] = useState({
    name: "",
    regNumber: "",
    phoneNumber: "",
    email: "",
    address: "",
  });
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const [resetPasswordFormData, setResetPasswordFormData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmNewPassword: "",
  });
  const handleResetChange = (e) => {
    setResetPasswordFormData({ ...resetPasswordFormData, [e.target.name]: e.target.value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData);
    // const res = await NgoApi.RegisterNgo(formData);
    // if(res.success){
    //   handleClear();
    //   Swal.fire({
    //     title: 'Successfull',
    //     text: 'NGO Registed Successfully. After aproval you will get you credentials on your registered mail.',
    //     icon: 'success',
    //     confirmButtonText: 'Cool'
    //   });
    // }else{
    //   Swal.fire({
    //     title: 'Error',
    //     text: 'Something went wrong',
    //     icon: 'error',
    //     confirmButtonText: 'oh noo!'
    //   });
    // }
  };

  return (
    <>
      <style jsx>{``}</style>
      <div className="container-fluid box-d w-100 ">
        <div className="container">
          <div className="row p-3 row-gap-2 shadow rounded-4">
            <h2 className="h3">Profile : </h2>
            <div className="col-6 p-3 mx-auto form border-0">
              <form
                className="d-flex justify-content-center align-items-center flex-column gap-4"
                onSubmit={(e) => {
                  handleSubmit(e);
                }}
              >
                <div className="d-flex justify-content-center align-items-center flex-column gap-2 w-100">
                  <label htmlFor="name">NGO Name :</label>
                  <input
                    type="text"
                    name="name"
                    id="name"
                    className="w-100"
                    placeholder="Enter NGO Name Here"
                    required
                    value={formData.name}
                    onChange={(e) => {
                      handleChange(e);
                    }}
                  />
                </div>
                <div className="d-flex justify-content-center align-items-center flex-column gap-2 w-100">
                  <label htmlFor="regNumber">NGO Registration Number :</label>
                  <input
                    type="text"
                    name="regNumber"
                    id="regNumber"
                    className="w-100"
                    placeholder="Enter NGO Registration Number Here"
                    required
                    value={formData.regNumber}
                    onChange={(e) => {
                      handleChange(e);
                    }}
                  />
                </div>
                <div className="d-flex justify-content-center align-items-center flex-column gap-2 w-100">
                  <label htmlFor="phoneNumber">NGO Phone Number :</label>
                  <input
                    type="tel"
                    name="phoneNumber"
                    id="phoneNumber"
                    className="w-100"
                    placeholder="Enter NGO Phone Number Here"
                    required
                    value={formData.phoneNumber}
                    onChange={(e) => {
                      handleChange(e);
                    }}
                  />
                </div>
                <div className="d-flex justify-content-center align-items-center flex-column gap-2 w-100">
                  <label htmlFor="email">NGO Email ID :</label>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    className="w-100"
                    placeholder="Enter NGO Email ID Here"
                    required
                    value={formData.email}
                    onChange={(e) => {
                      handleChange(e);
                    }}
                  />
                </div>
                <div className="d-flex justify-content-center align-items-center flex-column gap-2 w-100">
                  <label htmlFor="address">NGO Detailed Address :</label>
                  {/* <input type="text" name="address" id="address" className="w-100" placeholder="Enter NGO Detailed Address Here"/> */}
                  <textarea
                    name="address"
                    id="address"
                    className="w-100"
                    placeholder="Enter NGO Detailed Address Here"
                    cols="30"
                    rows="10"
                    required
                    value={formData.address}
                    onChange={(e) => {
                      handleChange(e);
                    }}
                  ></textarea>
                </div>
                <div className="d-flex justify-content-evenly w-100 align-items-center">
                  <button id="register" type="submit" className="bgdark">
                    Save
                  </button>
                  <button
                    data-bs-toggle="modal"
                    data-bs-target="#resetPassword"
                    id="resetpassword"
                    type="button"
                    className="clear"
                  >
                    Reset Password
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      {/* Modal */}
      <div
        className="modal fade"
        id="resetPassword"
        data-bs-backdrop="static"
        data-bs-keyboard="false"
        tabIndex={-1}
        aria-labelledby="resetPasswordLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable modal-md">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="resetPasswordLabel">
                    Reset Password
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              />
            </div>
            <div className="modal-body">

                    <form className="d-flex flex-column gap-4">
                    <div className="d-flex justify-content-center align-items-center flex-column gap-2 w-100">
                  <label htmlFor="name" className="text-start w-50">Current Password :</label>
                  <input
                    type="text"
                    name="currentPassword"
                    id="currentPassword"
                    className="w-50"
                    placeholder="Enter Current Password here"
                    required
                    value={resetPasswordFormData.currentPassword}
                    onChange={(e) => {
                      handleResetChange(e);
                    }}
                  />
                </div>
                <div className="d-flex justify-content-center align-items-center flex-column gap-2 w-100">
                  <label htmlFor="name" className="text-start w-50">New Password :</label>
                  <input
                    type="text"
                    name="newPassword"
                    id="newPassword"
                    className="w-50"
                    placeholder="Enter New Password here"
                    required
                    value={resetPasswordFormData.newPassword}
                    onChange={(e) => {
                      handleResetChange(e);
                    }}
                  />
                </div>
                <div className="d-flex justify-content-center align-items-center flex-column gap-2 w-100">
                  <label htmlFor="name" className="text-start w-50">Confirm New Password :</label>
                  <input
                    type="text"
                    name="confirmNewPassword"
                    id="confirmNewPassword"
                    className="w-50"
                    placeholder="Enter New Password again here"
                    required
                    value={resetPasswordFormData.confirmNewPassword}
                    onChange={(e) => {
                      handleResetChange(e);
                    }}
                  />
                </div>
                    </form>

            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;

export async function getServerSideProps(context) {
  const { req } = context;
  const { origin } = absoluteUrl(req);

  const baseApiUrl = `${origin}/api`;

  const { token } = getAppCookies(req);

  const profile = token ? verifyToken(token.split(" ")[1]) : "";
  console.log(profile);
  // if (profile?.userType === "NGO") {
  //   return {
  //     redirect: {
  //       destination: "/admin",
  //       permanent: false,
  //     },
  //   };
  // }
  // if (profile?.userType === "SUPER_ADMIN") {
  //   return {
  //     redirect: {
  //       destination: "/superadmin",
  //       permanent: false,
  //     },
  //   };
  // }
  return {
    props: {
      baseApiUrl,
      profile,
    },
  };
}
