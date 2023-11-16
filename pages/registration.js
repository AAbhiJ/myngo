import React, { useState } from "react";
import NgoApi from "../utils/API";
// import Toast from "../components/toast";
import Swal from 'sweetalert2'
const Registration = () => {
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
  const handleClear = () => {
    setFormData({
      name: "",
      regNumber: "",
      phoneNumber: "",
      email: "",
      address: "",
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData);
    const res = await NgoApi.RegisterNgo(formData);
    if(res.success){
      handleClear();
      Swal.fire({
        title: 'Successfull',
        text: 'NGO Registed Successfully. After aproval you will get you credentials on your registered mail.',
        icon: 'success',
        confirmButtonText: 'Cool'
      });
    }else{
      Swal.fire({
        title: 'Error',
        text: 'Something went wrong',
        icon: 'error',
        confirmButtonText: 'oh noo!'
      });
    }
  };


  return (
    <>
      <div className="container pt-5">
        <div className="row d-flex align-items-center justify-content-center">
          <div className="col-6">
            <div className="form">
              <h2 className="h5 text-center mb-5 formHeading">
                NGO Registration
              </h2>
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
                  {/* <button id="cancel" className="cancel">
                    Cancel
                  </button> */}
                  <button
                    id="clear"
                    type="button"
                    className="clear"
                    onClick={() => {
                      handleClear();
                    }}
                  >
                    Clear Fields
                  </button>

                  <button id="register" type="submit" className="bgdark">
                    Register Now
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
        <div className="terms my-5">
          <h2 className="h4">Terms and Conditions : </h2>
          <ul>
            <li>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsum,
              doloribus.
            </li>
            <li>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsum,
              doloribus.
            </li>
            <li>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsum,
              doloribus.
            </li>
          </ul>
        </div>
      </div>
    </>
  );
};

export default Registration;
