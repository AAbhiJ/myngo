import React, { useEffect, useState } from "react";
import {
  absoluteUrl,
  getAppCookies,
  verifyToken,
} from "../../middleware/utils";
import Swal from "sweetalert2";
import NgoApi from "../../utils/API";
const Profile = () => {
  const [formData, setFormData] = useState({
    about: "",
  });
  const [ngoDetail, setNgoDetail] = useState({});
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const [resetPasswordFormData, setResetPasswordFormData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmNewPassword: "",
  });
  const handleResetChange = (e) => {
    setResetPasswordFormData({
      ...resetPasswordFormData,
      [e.target.name]: e.target.value,
    });
  };
  const handleResetClear = (e) => {
    setResetPasswordFormData({
      currentPassword: "",
      newPassword: "",
      confirmNewPassword: "",
    });
  };
  const handleClear = (e) => {
    setFormData({
      about: "",
    });
  };

  const handleResetSubmit = async (e) => {
    e.preventDefault();
    console.log(resetPasswordFormData);
    if (
      resetPasswordFormData.newPassword !==
      resetPasswordFormData.confirmNewPassword
    ) {
      return Swal.fire({
        title: "Error",
        text: "New Password and Confirm Password not maching!",
        icon: "error",
        confirmButtonText: "oh noo!",
      });
    }
    const res = await NgoApi.updateNgoPassword(resetPasswordFormData);

    if (res.success) {
      handleResetClear();
      Swal.fire({
        title: "Successfull",
        text: "Password Updated Successfully. ",
        icon: "success",
        confirmButtonText: "Cool",
      });
    } else {
      Swal.fire({
        title: "Error",
        text: "Something went wrong",
        icon: "error",
        confirmButtonText: "oh noo!",
      });
    }
  };
  const getNgoDetails = async () => {
    const res = await NgoApi.getNgoDetails();
    console.log(res);
    setNgoDetail(res?.ngos);
  };
  useEffect(() => {
    getNgoDetails();
  }, []);
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData);

    const res = await NgoApi.updateNgoDetails(formData);

    if (res.success) {
      handleClear();
      getNgoDetails()
      Swal.fire({
        title: "Successfull",
        text: "NGO Updated Successfully. ",
        icon: "success",
        confirmButtonText: "Cool",
      });
    } else {
      Swal.fire({
        title: "Error",
        text: "Something went wrong",
        icon: "error",
        confirmButtonText: "oh noo!",
      });
    }
  };

  return (
    <>
      <style jsx>{``}</style>
      <div className="container-fluid box-d w-100 ">
        <div className="container">
          <div className="row p-3 row-gap-2 shadow rounded-4">
            <h2 className="h3">Profile : </h2>
            <div className="col-6 p-3 border-0">
              <div className="row m-0 p-0 gy-4">
                <div className="d-flex justify-content-between align-items-center">
                  <h1 className="h6">Name : </h1> <p>{ngoDetail?.name}</p>
                </div>
                <div className="d-flex justify-content-between align-items-center">
                  <h1 className="h6">Registration Number : </h1>{" "}
                  <p>{ngoDetail?.registration_number}</p>
                </div>
                <div className="d-flex justify-content-between align-items-center">
                  <h1 className="h6">Phone Number : </h1>{" "}
                  <p>{ngoDetail?.contact}</p>
                </div>
                <div className="d-flex justify-content-between align-items-center">
                  <h1 className="h6">Email ID : </h1> <p>{ngoDetail?.email}</p>
                </div>
                <div className="d-flex justify-content-between align-items-center">
                  <h1 className="h6">Detailed Address : </h1>{" "}
                  <p>{ngoDetail?.address}</p>
                </div>
                <div className="d-flex justify-content-between align-items-center">
                  <h1 className="h6">Verified : </h1>
                  <p>
                    
                    {!ngoDetail?.verified ? (
                      <span className="badge rounded-pill bg-danger">
                        Not Verified
                      </span>
                    ) : (
                      <span className="badge rounded-pill bg-success">
                        Verified
                      </span>
                    )}
                  </p>
                </div>
                <div className="d-flex justify-content-between align-items-center">
                  <h1 className="h6">About : </h1> <p>{ngoDetail?.about}</p>
                </div>
              </div>
            </div>
            <div className="col-6 form border-0">
              <form
                className="d-flex justify-content-center align-items-center flex-column gap-4"
                onSubmit={(e) => {
                  handleSubmit(e);
                }}
              >
                <div className="d-flex justify-content-center align-items-center flex-column gap-2 w-100">
                  <label htmlFor="address">NGO About :</label>
                  {/* <input type="text" name="address" id="address" className="w-100" placeholder="Enter NGO Detailed Address Here"/> */}
                  <textarea
                    name="about"
                    id="about"
                    className="w-100"
                    placeholder="Enter NGO Detailed About Here"
                    cols="30"
                    rows="5"
                    required
                    value={formData.about}
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
              <form
                className="d-flex flex-column gap-4 form border-0"
                onSubmit={(e) => {
                  handleResetSubmit(e);
                }}
              >
                <div className="d-flex justify-content-center align-items-center flex-column gap-2 w-100">
                  <label htmlFor="name" className="text-start w-50">
                    Current Password :
                  </label>
                  <input
                    type="text"
                    name="currentPassword"
                    id="currentPassword"
                    className="w-75"
                    placeholder="Enter Current Password"
                    required
                    value={resetPasswordFormData.currentPassword}
                    onChange={(e) => {
                      handleResetChange(e);
                    }}
                  />
                </div>
                <div className="d-flex justify-content-center align-items-center flex-column gap-2 w-100">
                  <label htmlFor="name" className="text-start w-50">
                    New Password :
                  </label>
                  <input
                    type="text"
                    name="newPassword"
                    id="newPassword"
                    className="w-75"
                    placeholder="Enter New Password"
                    required
                    value={resetPasswordFormData.newPassword}
                    onChange={(e) => {
                      handleResetChange(e);
                    }}
                  />
                </div>
                <div className="d-flex justify-content-center align-items-center flex-column gap-2 w-100">
                  <label htmlFor="name" className="text-start w-50">
                    Confirm New Password :
                  </label>
                  <input
                    type="text"
                    name="confirmNewPassword"
                    id="confirmNewPassword"
                    className="w-75"
                    placeholder="Enter New Password again"
                    required
                    value={resetPasswordFormData.confirmNewPassword}
                    onChange={(e) => {
                      handleResetChange(e);
                    }}
                  />
                </div>
                <div className="d-flex justify-content-center align-items-center flex-column gap-2 w-100">
                  <button id="submit" type="submit" className="button bgdark">
                    Reset Password
                  </button>
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
