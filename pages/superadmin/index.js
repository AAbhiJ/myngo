import { route } from "next/dist/server/router";
import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import {
  absoluteUrl,
  getAppCookies,
  verifyToken,
} from "../../middleware/utils";
import NgoApi from "../../utils/API";
import Swal from "sweetalert2";
import { Chart, Line } from "react-chartjs-2";
import ChartDataLabels from "chartjs-plugin-datalabels";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
  ArcElement,
} from "chart.js";
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  Filler
);
const options = {
  responsive: true,
  scales: {
    x: {
      display: true,
    },
    y: {
      display: true,
    },
  },
  plugins: {
    legend: {
      display: false,
      position: "top",
    },
    title: {
      display: false,
      text: "Chart.js Line Chart",
    },
  },
};
let m = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const doughnutOptions = {
  responsive: true,
  plugins: {
    legend: {
      position: "bottom",
    },
    title: {
      display: false,
      text: "Chart.js Bar Chart",
    },
  },
};

const Index = ({ profile }) => {
  const [ngos, setNgos] = useState([{}]);
  const [events, setEvents] = useState([{}]);
  const [members, setMembers] = useState([{}]);
  const [monthlyRequirements, setMonthlyRequirements] = useState([{}]);
  const [monthlyDrives, setMonthlyDrives] = useState([{}]);
  const [membersCount, setMembersCount] = useState(0);
  const [drivesData, setDrivesData] = useState();
  const [ngo, setNgo] = useState();
  const [donations, setDonations] = useState();
  const getAllNgos = async () => {
    const res = await NgoApi.getAllNgosSA();

    setNgos(res.ngos);
  };

  const verifyNgo = async (email) => {
    Swal.fire({
      title: `Do you want to verify ${email} NGO?`,
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: "Verify NGO",
      denyButtonText: `Don't Verify NGO`,
      icon: "info",
    }).then(async (result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        try {
          const res = await NgoApi.generateCreds({ email: email });

          if (res.success) {
            Swal.fire({
              title: "Successfull",
              text: "Credentials Generated and Sent.",
              icon: "success",
            });
            getAllNgos();
          }
        } catch (error) {
          Swal.fire({
            title: "Error",
            text: "Something Went Wrong",
            icon: "error",
          });
        }
      } else if (result.isDenied) {
        Swal.fire(`${email} NGO not verified!`, "", "warning");
      }
    });
  };

  const deleteNgo = async (email) => {
    Swal.fire({
      title: `Do you want to Delete ${email} NGO?`,
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: "Delete NGO",
      denyButtonText: `Don't Delete NGO`,
      icon: "warning",
    }).then(async (result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        try {
          const res = await NgoApi.deleteNgo({ email: email });

          if (res.success) {
            Swal.fire({
              title: "Successfull",
              text: "Ngo Deleted Successfully",
              icon: "success",
            });
            getAllNgos();
          }
        } catch (error) {
          Swal.fire({
            title: "Error",
            text: "Something Went Wrong",
            icon: "error",
          });
        }
      } else if (result.isDenied) {
        Swal.fire(`${email} NGO not deleted!`, "", "info");
      }
    });
  };

  useEffect(() => {
    getAllNgos();
    if (profile === "Token Expired") {
      Cookies.remove("token");
    }
  }, []);

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
      name: "Registration Number",
      selector: (row) => row.registration_number,
      sortable: true,
    },
    {
      name: "Email",
      selector: (row) => row.email,
      sortable: true,
    },
    {
      name: "Address",
      selector: (row) => row.address,
      sortable: true,
    },
    {
      name: "Status",
      selector: (row) => row.verified,
      sortable: true,
      cell: (row, index, column, id) => {
        return !row.verified ? (
          <button className="btn btn-md" onClick={() => verifyNgo(row?.email)}>
            <span className="badge rounded-pill bg-danger ">Not Verified</span>
          </button>
        ) : (
          <button className="btn btn-md" disabled={true}>
            <span className="badge rounded-pill bg-success ">Verified</span>
          </button>
        );
      },
    },
    {
      name: "Actions",
      selector: (row) => row.verified,
      sortable: true,
      cell: (row, index, column, id) => {
        return (
          <button
            className="btn btn-sm btn-danger"
            onClick={() => deleteNgo(row?.email)}
          >
            Delete
          </button>
        );
      },
    },
  ];
  const columnsevents = [
    {
      name: "Event",
      selector: (row) => row.event,
      sortable: true,
    },
  ];
  const columnsdrives = [
    {
      name: "Drive",
      selector: (row) => row.drive,
      sortable: true,
    },
  ];
  const columnsmembers = [
    {
      name: "Name",
      selector: (row) => row.name,
      sortable: true,
    },
    {
      name: "Email",
      selector: (row) => row.email,
      sortable: true,
    },
    {
      name: "Contact",
      selector: (row) => row.contact,
      sortable: true,
    },
  ];
  const columnsrequirements = [
    {
      name: "Requirement",
      selector: (row) => row.requirement,
      sortable: true,
    },
  ];

  const handleChangeSelect = async (e) => {
    if (e?.target?.value) {
      try {
        setNgo(e?.target?.value?.split(",")[1]);
        const res = await NgoApi.getNgoByIdSA({
          id: e?.target?.value?.split(",")[0],
        });

        console.log(res);

        if (res.success) {
          setMembersCount(res?.members?.length);
          setMonthlyDrives(res?.monthlyDrives[0]?.drives);
          setMonthlyRequirements(res?.monthlyRequirements[0]?.name);
          setEvents(res?.events[0]?.events);
          setMembers(res?.members);
          // setDonations(res?.donations);

          const driveLabels = [];
          const DriveChartData = {
            labels: driveLabels,
            datasets: [
              {
                label: `Total Drives for ${m[new Date().getMonth()]} Month`,
                data: [],
                borderColor: "rgb(255, 99, 132)",
                backgroundColor: "rgba(255, 99, 132, 0.5)",
                fill: true,
                tension: 0.4,
              },
            ],
          };

          res?.monthlyDrives.sort((a, b) => {
            return a.week - b.week;
          });

          res?.monthlyDrives?.map((ma, i) => {
            driveLabels.push(`Week ${ma.week + 1}`);
            DriveChartData.datasets[0].data.push(ma.count);
          });

          setDrivesData(DriveChartData);

          const doughnutData = {
            labels: ["Total"],
            datasets: [
              {
                type: "pie",
                label: "Amount",
                data: [res?.donations?.totalAmount],
                backgroundColor: ["rgba(255, 99, 132, 0.5)"],
                borderColor: ["rgba(255, 99, 132, 0.5)"],
                borderWidth: 1,
                datalabels: {
                  color: "#fff",
                  formatter: function (value, context) {
                    return `₹ ${value}`;
                  },
                },
              },
              {
                type: "pie",
                label: "Skills in hr",
                data: [res?.donations?.totalHrs],
                backgroundColor: ["#123544af"],
                borderColor: ["#123544af"],
                borderWidth: 1,
                datalabels: {
                  color: "#fff",
                  formatter: function (value, context) {
                    return `${value} Hrs`;
                  },
                },
              },
            ],
          };

          setDonations(doughnutData);
        }
      } catch (e) {}
    } else {
      setNgo(null);
    }
  };
  return (
    <>
      <div className="container">
        <div className="row p-3 row-gap-2">
          <div className=" container col-12 shadow rounded-4 p-3 box-d">
            <div className="d-flex  mx-4">
              <div className="d-flex w-100 align-items-end justify-content-between">
                <h2 className="h3">NGOS : </h2>
                <button
                  type="button"
                  className="bgdark"
                  data-bs-toggle="modal"
                  data-bs-target="#analytics"
                >
                  Analytics
                </button>
              </div>
              <div
                className="modal fade"
                id="analytics"
                data-bs-backdrop="static"
                data-bs-keyboard="false"
                tabIndex={-1}
                aria-labelledby="analyticsLabel"
                aria-hidden="true"
              >
                <div className="modal-dialog  modal-dialog-scrollable modal-fullscreen">
                  <div className="modal-content">
                    <div className="modal-header">
                      <h5 className="modal-title" id="analyticsLabel">
                        Analytics of {ngo ? ngo : "NGO"}
                      </h5>
                      <button
                        type="button"
                        className="btn-close"
                        data-bs-dismiss="modal"
                        aria-label="Close"
                      />
                    </div>
                    <div className="modal-body">
                      <div className="container mb-4">
                        <div className="d-flex my-2 mx-2">
                          <div className="ms-auto">
                            <select
                              className="form-select  form-select-sm"
                              onChange={(e) => {
                                handleChangeSelect(e);
                              }}
                            >
                              <option value={""}>Select Ngo</option>
                              {ngos?.map((ngo, i) => {
                                return (
                                  <option
                                    value={[ngo?._id, ngo?.name]}
                                    key={ngo?._id}
                                  >
                                    {ngo?.name}
                                  </option>
                                );
                              })}
                            </select>
                          </div>
                        </div>
                      </div>
                      <div className="container-fluid my-4">
                        <div className="col-12 shadow rounded-4 p-3 box-d">
                          <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4 p-0 m-0">
                            <div className="col">
                              <div className="card bg-white h-100 border-0  p-0 m-0">
                                <div className="card-body p-0 m-0">
                                  <div className="stat d-flex align-items-center justify-content-center h-100">
                                    <h1 className="display-5 fw-bold position-relative">
                                      {membersCount}
                                    </h1>
                                  </div>
                                </div>
                                <div className="card-footer bg-white border-0 text-center">
                                  <h1 className="h6">Members</h1>
                                </div>
                              </div>
                            </div>

                            <div className="col">
                              <div className="card bg-white h-100 border-0 p-0 m-0">
                                <div className="card-body p-0 m-0">
                                  <div className="d-flex flex-col chartSize px-4 h-100 text-center">
                                    {drivesData?.datasets[0]?.data?.length ? (
                                      <Line
                                        options={options}
                                        data={drivesData}
                                      />
                                    ) : (
                                      "No Drives Data Available"
                                    )}
                                  </div>
                                </div>
                                <div className="card-footer bg-white border-0 text-center">
                                  <h1 className="h6">Monthly Drives</h1>
                                </div>
                              </div>
                            </div>

                            <div className="col">
                              <div className="card bg-white h-100 border-0 p-0 m-0">
                                <div className="card-body p-0 m-0">
                                  <h1 className="display-5 fw-bold position-relative text-center">
                                    {donations?.datasets[0]?.data[0] && (
                                      <Chart
                                        options={doughnutOptions}
                                        data={donations}
                                        plugins={[ChartDataLabels]}
                                      />
                                    )}
                                  </h1>
                                </div>
                                <div className="card-footer bg-white border-0 text-center">
                                  <h1 className="h6">Donations</h1>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="container-fluid my-4">
                        <div className="row g-2 p-0 m-0">
                          <div className="col-12 col-md-6 ">
                            <div className="border p-3">
                              <DataTable
                                title={`${
                                  m[new Date().getMonth()]
                                } Month Events `}
                                pagination
                                columns={columnsevents}
                                data={events}
                              />
                            </div>
                          </div>
                          <div className="col-12 col-md-6 ">
                            <div className="border p-3">
                              <DataTable
                                title={`${
                                  m[new Date().getMonth()]
                                } Month Requirements `}
                                pagination
                                columns={columnsrequirements}
                                data={monthlyRequirements}
                              />
                            </div>
                          </div>

                          <div className="col-12 col-md-6 ">
                            <div className="border p-3">
                              <DataTable
                                title={`${
                                  m[new Date().getMonth()]
                                } Month Drives `}
                                pagination
                                columns={columnsdrives}
                                data={monthlyDrives}
                              />
                            </div>
                          </div>
                          <div className="col-12 col-md-6 ">
                            <div className="border p-3">
                              <DataTable
                                title={`${
                                  m[new Date().getMonth()]
                                } Month Members `}
                                pagination
                                columns={columnsmembers}
                                data={members}
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="modal-footer">
                      <button
                        type="button"
                        className="btn btn-danger"
                        data-bs-dismiss="modal"
                      >
                        Close
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="container my-4">
              <DataTable pagination columns={columns} data={ngos} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Index;
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
  if (profile?.userType === "NGO") {
    return {
      redirect: {
        destination: "/admin",
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
