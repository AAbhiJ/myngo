import React, { useEffect, useRef, useState } from "react";

import DataTable from "react-data-table-component";
import Swal from "sweetalert2";
import NgoApi from "../../utils/API";

import {
  absoluteUrl,
  getAppCookies,
  verifyToken,
} from "../../middleware/utils";
const columns = [
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
];

const Members = ({ profile }) => {
  const closeRef = useRef();
  const [formData, setFormData] = useState({
    name: "",
    contact: "",
    email: "",
  });
  const [members, setMembers] = useState([{}]);
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const handleClear = () => {
    setFormData({
      name: "",
      contact: "",
      email: "",
    });
  };
  const getAllMembers = async () => {
    const res = await NgoApi.getAllMembersA();
    setMembers(res.data);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData);
    const res = await NgoApi.createMember(formData);
    if (res.success) {
      handleClear();
      getAllMembers();
      Swal.fire({
        title: "Successfull",
        text: "Member Created Successfully. ",
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
    getAllMembers();
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
            <h2 className="h3">Members : </h2>
            <div className="d-flex w-100 align-items-end justify-content-end">
              <button
                data-bs-toggle="modal"
                data-bs-target="#addMember"
                id="resetpassword"
                type="button"
                className="bgdark me-5"
              >
                Add Member
              </button>
            </div>
            <div className="container my-4">
              <DataTable columns={columns} data={members} />
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
        <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable modal-md">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="addMemberLabel">
                Add Member
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
              <form className="d-flex justify-content-center align-items-center flex-column gap-4 w-75 mx-auto form border-0">
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
                  Register Now
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Members;
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
