import React, { useEffect, useRef, useState } from "react";

import DataTable from "react-data-table-component";
import Swal from "sweetalert2";
import NgoApi from "../../utils/API";

import {
  absoluteUrl,
  getAppCookies,
  verifyToken,
} from "../../middleware/utils";
const skillColumns = [
  {
    name: "Name",
    selector: (row) => row.name,
    sortable: true,
  },
  {
    name: "Contact",
    selector: (row) => row.contact,
    sortable: true,
  },
  {
    name: "Email",
    selector: (row) => row.email,
    sortable: true,
  },
  {
    name: "Skill Type",
    selector: (row) => row.skillType,
    sortable: true,
  },
  {
    name: "Hrs Per Day",
    selector: (row) => row.hrsPerDay,
    sortable: true,
  },
  {
    name: "Days Per Week",
    selector: (row) => row.daysPerWeek,
    sortable: true,
  },
  {
    name: "Date From",
    selector: (row) => new Date(row.date_from).toLocaleDateString(),
    sortable: true,
  },
  {
    name: "Date To",
    selector: (row) => new Date(row.date_to).toLocaleDateString(),
    sortable: true,
  },
];

const amountColumns = [
  {
    name: "Name",
    selector: (row) => row.name,
    sortable: true,
  },
  {
    name: "Contact",
    selector: (row) => row.contact,
    sortable: true,
  },
  {
    name: "Email",
    selector: (row) => row.email,
    sortable: true,
  },
  {
    name: "Amount",
    selector: (row) => row.amount,
    sortable: true,
  },
];


const Donations = ({ profile }) => {
  const closeRef = useRef();
  const [formData, setFormData] = useState({
    name: "",
    contact: "",
    email: "",
    donationMethod: "",
    amount: "",
    skillType: "",
    hrsPerDay: "",
    daysPerWeek: "",
    date_from: "",
    date_to: "",
  });
  const [donations, setDonations] = useState([{}]);
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const handleClear = () => {
    setFormData({
      name: "",
      contact: "",
      email: "",
      donationMethod: formData.donationMethod,
      amount: "",
      skillType: "",
      hrsPerDay: "",
      daysPerWeek: "",
      date_from: "",
      date_to: "",
    });
  };
  const getAllDonations = async () => {
    const res = await NgoApi.getAllDonationsA();
    setDonations(res?.donations?.sort((a,b)=>{
      if (a.donationMethod < b.donationMethod) {
         return -1;
       }
       if (a.donationMethod > b.donationMethod) {
         return 1;
       }
       return 0;
     }));


     console.log(res?.donations?.sort((a,b)=>{
      if (a.donationMethod < b.donationMethod) {
         return -1;
       }
       if (a.donationMethod > b.donationMethod) {
         return 1;
       }
       return 0;
     }));

  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData);
    const res = await NgoApi.createDonations(formData);
    console.log(res);
    if (res.success) {
      handleClear();
      getAllDonations();
      Swal.fire({
        title: "Successfull",
        text: "Dontation Record Added Successfully.",
        icon: "success",
        confirmButtonText: "Cool",
      });
      closeRef.current?.click();
    } else {
      Swal.fire({
        title: "Error",
        text: "Something went wrong",
        icon: "error",
        confirmButtonText: "oh noo!",
      });
    }
  };

  useEffect(() => {
    getAllDonations();
    if (profile === "Token Expired") {
      Cookies.remove("token");
    }
  }, []);
  return (
    <>
      <style jsx>{``}</style>
      <div className="container-fluid">
        <div className="row p-3 row-gap-2">
          <div className="col-12 shadow rounded-4 p-3 box-d">
            <h2 className="h3">Donations : </h2>
            <div className="d-flex w-100 align-items-end justify-content-end">
              <button
                data-bs-toggle="modal"
                data-bs-target="#addMember"
                id="resetpassword"
                type="button"
                className="bgdark me-5"
              >
                Add Donation
              </button>
            </div>
            <div className="container my-4">
              <DataTable columns={amountColumns} title="Amount Donation" data={donations[0]?.donations} />
            </div>
            <div className="container my-4">
              <DataTable columns={skillColumns} title="Skill Donation" data={donations[1]?.donations} />
            </div>
          </div>
        </div>
      </div>
      {/* Modal */}
      <div
        className="modal fade"
        id="addMember"
        data-bs-backdrop="static"
        data-bs-keyboard="false"
        tabIndex={-1}
        aria-labelledby="addMemberLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable modal-xl">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="addMemberLabel">
                Add Donations
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
                ref={closeRef}
              />
            </div>
            <div className="modal-body">
              <form>
                <div className="row m-0 p-0">
                  <div className="col-6">
                    <div className="d-flex justify-content-center align-items-center flex-column gap-4 mx-auto form border-0">
                      <div className="d-flex justify-content-center align-items-center flex-column gap-2 w-100">
                        <label htmlFor="name">Name :</label>
                        <input
                          type="text"
                          name="name"
                          id="name"
                          className="w-100"
                          placeholder="Enter Name Here"
                          required
                          value={formData.name}
                          onChange={(e) => {
                            handleChange(e);
                          }}
                        />
                      </div>

                      <div className="d-flex justify-content-center align-items-center flex-column gap-2 w-100">
                        <label htmlFor="phoneNumber">Contact :</label>
                        <input
                          type="tel"
                          name="contact"
                          id="phoneNumber"
                          className="w-100"
                          placeholder="Enter Contact Here"
                          required
                          value={formData.contact}
                          onChange={(e) => {
                            handleChange(e);
                          }}
                        />
                      </div>
                      <div className="d-flex justify-content-center align-items-center flex-column gap-2 w-100">
                        <label htmlFor="email">Email ID :</label>
                        <input
                          type="email"
                          name="email"
                          id="email"
                          className="w-100"
                          placeholder="Enter Email ID Here"
                          required
                          value={formData.email}
                          onChange={(e) => {
                            handleChange(e);
                          }}
                        />
                      </div>
                      <div className="d-flex justify-content-center align-items-center flex-column gap-2 w-100">
                        <label htmlFor="email">Donation Type :</label>
                        <select
                          name="donationMethod"
                          id="donationMethod"
                          className="form-select  form-select-sm"
                          value={formData.donationMethod}
                          onChange={(e) => {
                            handleChange(e);
                          }}
                          required
                        >
                          <option value={""} disabled>
                            Select Donation Type
                          </option>
                          <option value="amount">Amount</option>
                          <option value="skill">Skill</option>
                        </select>
                      </div>
                    </div>
                  </div>
                  <div className="col-6">
                    <div className="d-flex justify-content-center align-items-center flex-column gap-4 mx-auto form border-0">
                      {formData.donationMethod === "skill" ? (
                        <>
                          <div className="d-flex justify-content-center align-items-center flex-column gap-2 w-100">
                            <label htmlFor="skill">Skill :</label>
                            <input
                              type="skillType"
                              name="skillType"
                              id="skillType"
                              className="w-100"
                              placeholder="Enter skillType Here"
                              required
                              value={formData.skillType}
                              onChange={(e) => {
                                handleChange(e);
                              }}
                            />
                          </div>

                          <div className="d-flex justify-content-center align-items-center flex-column gap-2 w-100">
                            <label htmlFor="hrsPerDay">Hrs Per Day :</label>
                            <input
                              type="hrsPerDay"
                              name="hrsPerDay"
                              id="hrsPerDay"
                              className="w-100"
                              placeholder="Enter Hrs Per Day Here"
                              required
                              value={formData.hrsPerDay}
                              onChange={(e) => {
                                handleChange(e);
                              }}
                            />
                          </div>

                          <div className="d-flex justify-content-center align-items-center flex-column gap-2 w-100">
                            <label htmlFor="daysPerWeek">Days Per Week :</label>
                            <input
                              type="daysPerWeek"
                              name="daysPerWeek"
                              id="daysPerWeek"
                              className="w-100"
                              placeholder="Enter Days Per Week Here"
                              required
                              value={formData.daysPerWeek}
                              onChange={(e) => {
                                handleChange(e);
                              }}
                            />
                          </div>

                          <div className="d-flex justify-content-between flex-column gap-2 w-100 ">
                            <label htmlFor="date_from">Date From</label>
                            <input
                              type="date"
                              name="date_from"
                              value={formData.date_from}
                              onChange={(e) => {
                                handleChange(e);
                              }}
                              placeholder="Enter Date From"
                              className="w-100 "
                            />
                            <label htmlFor="date_from">Date Till</label>
                            <input
                              type="date"
                              name="date_to"
                              value={formData.date_to}
                              onChange={(e) => {
                                handleChange(e);
                              }}
                              placeholder="Enter Date To"
                              className="w-100"
                            />
                          </div>
                        </>
                      ) : (
                        <div className="d-flex justify-content-center align-items-center flex-column gap-2 w-100">
                          <label htmlFor="amount">Amount:</label>
                          <input
                            type="amount"
                            name="amount"
                            id="amount"
                            className="w-100"
                            placeholder="Enter Amount Here"
                            required
                            value={formData.amount}
                            onChange={(e) => {
                              handleChange(e);
                            }}
                          />
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <div className="d-flex justify-content-evenly w-100 align-items-center">
                <button id="cancel" className="cancel" data-bs-dismiss="modal">
                  Cancel
                </button>
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

                <button
                  id="register"
                  type="submit"
                  className="bgdark"
                  onClick={(e) => {
                    handleSubmit(e);
                  }}
                >
                  Add Donation Record
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Donations;
export async function getServerSideProps(context) {
  const { req } = context;
  const { origin } = absoluteUrl(req);

  const baseApiUrl = `${origin}/api`;

  const { token } = getAppCookies(req);

  const profile = token ? verifyToken(token.split(" ")[1]) : "";
  console.log(profile);

  if (profile === "Token Expired" || !profile) {
    return {
      redirect: {
        destination: "/login",
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
