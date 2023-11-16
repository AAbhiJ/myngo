import React, { useEffect, useState } from "react";

import NextDrives from "../../components/home/nextDrives";
import {
  absoluteUrl,
  getAppCookies,
  verifyToken,
} from "../../middleware/utils";
import Cookies from "js-cookie";
import NgoApi from "../../utils/API";
import { Line, Chart } from "react-chartjs-2";
import ChartDataLabels from "chartjs-plugin-datalabels";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  Filler,
  ArcElement,
} from "chart.js";
import Swal from "sweetalert2";
import ViewAllAndPreviousEvents from "../../components/admin/event/ViewAllAndPreviousEvents";
import ViewAllRequirements from "../../components/admin/requirements/ViewAllRequirements";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
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

let drivesData;

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

const doughnutData = {
  labels: ["Total"],
  datasets: [
    {
      type: "pie",
      label: "Amount",
      data: [],
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
      data: [],
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

function NGOAdmin({ profile, chartData }) {
  // console.log(donationsData)
  const [drives, setDrives] = useState({
    name: "",
    teamLeader: "",
    extraInformation: "",
    dateFrom: "",
    dateTo: "",
  });

  const [nextDrive, setNextDrive] = useState();
  const [membersCount, setMembersCount] = useState(0);

  const getMembersCount = async () => {
    const res = await NgoApi.getAllMembersA();
    setMembersCount(res.data.length);
  };

  const getDonationsData = async () => {
    const donations = await NgoApi.getAllDonationsA();
    donations?.donations?.sort((a, b) => {
      if (a.donationMethod < b.donationMethod) {
        return -1;
      }
      if (a.donationMethod > b.donationMethod) {
        return 1;
      }
      return 0;
    });

    let totalAmount = (() => {
      let amtDonations = donations.donations[0]?.donations;
      return amtDonations?.reduce((total, amt) => total + amt.amount, 0);
    })();

    let totalHrs = (() => {
      let skillDonations = donations.donations[1]?.donations;

      const getTotalHrForSkill = (skill) => {
        let perdayhr,
          daysperweek,
          fromdate,
          todate,
          totalDays,
          totalweeks,
          daysAfterWeek,
          afterweektotalwork;
        perdayhr = parseInt(skill.hrsPerDay);
        daysperweek = parseInt(skill.daysPerWeek);
        fromdate = new Date(skill.date_from);
        todate = new Date(skill.date_to);

        totalDays =
          parseInt(Math.abs((todate - fromdate) / (1000 * 60 * 60 * 24))) + 1;
        totalweeks = parseInt(Math.abs(totalDays / 7));
        daysAfterWeek = parseInt(Math.floor(totalDays % 7));
        afterweektotalwork = Math.min(daysperweek, daysAfterWeek);
        // console.log(`totalhr : ${totalweeks * Math.min(daysperweek,totalDays) * perdayhr + (afterweektotalwork * perdayhr)}, totalweeks : ${totalweeks},daysafterweek : ${daysAfterWeek}, afterweektotalwork : ${afterweektotalwork} mindaysperweek-totaldays : ${Math.min(daysperweek,totalDays)}, totaldays : ${totalDays}, perhr : ${perdayhr}` );
        return (
          totalweeks * Math.min(daysperweek, totalDays) * perdayhr +
          afterweektotalwork * perdayhr
        );
      };
      return skillDonations?.reduce((total, skill) => {
        let totalhr = getTotalHrForSkill(skill);
        return total + totalhr;
      }, 0);
    })();
    // setDoughnutData({totalAmount:totalAmount,totalHrs:totalHrs})
    // console.log(totalAmount,totalHrs,doughnutData)
    doughnutData?.datasets[0]?.data?.push(totalAmount);
    doughnutData?.datasets[1]?.data?.push(totalHrs);
  };

  useEffect(() => {
    if (profile === "Token Expired") {
      Cookies.remove("token");
    }
    getNextDrive();
    getMembersCount();
    getDonationsData();
    // setDonations(donationsData);
  }, []);
  const getNextDrive = async () => {
    const result = await NgoApi.getNextDrive();

    if (result.success) {
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
      // const allDrives = await NgoApi.getNextDrive();
      // console.log("DRIVES",DriveChartData,allDrives);
      console.log("DRIVEChartttt", DriveChartData);
      result?.drivesCount.sort((a, b) => {
        return a.week - b.week;
      });

      result?.drivesCount?.map((ma, i) => {
        driveLabels.push(`Week ${ma.week + 1}`);
        DriveChartData.datasets[0].data.push(ma.count);
      });
      console.log("nextDrive", result);

      drivesData = DriveChartData;
      setNextDrive(result?.nextDrive);
    }
  };
  const handleSubmitDrive = async (e) => {
    e.preventDefault();

    const result = await NgoApi.createDrive(drives);

    if (result.success) {
      Swal.fire({
        title: "Successfull",
        text: "Drive Created Successfully",
        icon: "success",
      });
      getNextDrive();
      handleClearDrive();
    }
  };
  const handleClearDrive = () => {
    setDrives({
      name: "",
      teamLeader: "",
      extraInformation: "",
      dateFrom: "",
      dateTo: "",
    });
  };
  const handleChangeDrive = (e) => {
    setDrives({ ...drives, [e.target.name]: e.target.value });
  };
  return (
    <>
      {/* .membersStats .stat h1::before {
          content: "";
          position: absolute;
          right: -1.5rem;
          top: -1.5rem;
          border: 1rem solid green;
          border-left-color: transparent;
          border-right-color: transparent;
          border-top-color: transparent;
        } */}

      <style jsx>{`
        .chartSize {
          width: 100%;
        }
        form input {
          border: none;
          outline: none;
          border-bottom: 1px solid black;
          padding-bottom: 4px;
        }
        .border-left {
          border-left: 1px solid black;
        }
        button.btnPurple {
          padding: 0.8rem 1.2rem;
          background: var(--purple);
          color: white;
        }
        .row-gap-2 {
          row-gap: 1.5rem;
        }
        .nextDrives {
          width: 100%;
          border: 1px solid var(--blueish-dark);
          border-radius: 5px;
        }
        .nextDrives > h2 {
          border-bottom: 1px solid var(--blueish-dark);
        }
        .driveDetailsContainer {
          position: relative;
          height: 100%;
          overflow: hidden;
        }
        .driveDetails {
          width: 100%;
        }
      `}</style>
      <div className="container-fluid">
        <div className="row p-3 row-gap-2">

                      <div className="container-fluid my-4">
                        <div className="col-12 shadow rounded-4 p-3 box-d">
                          <h2 className="h3">Analytics : </h2>
                          <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 row-cols-xl-4  g-4  p-0 m-0">
                            <div className="col">
                              <div className="card bg-white h-100 border-0  p-0 m-0">
                                <div className="card-body p-0 m-0">
                                  <div className="stat d-flex align-items-center justify-content-center h-100">
                                    <h1 className="display-5 fw-bold position-relative w-100">
                                    <Line options={options} data={chartData} />
                                    </h1>
                                  </div>
                                </div>
                                <div className="card-footer bg-white border-0 text-center">
                                  <h1 className="h6">Site Visits</h1>
                                </div>
                              </div>
                            </div>
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
                                  <div className="d-flex flex-col chartSize  px-4 h-100">
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
                              <div className="card bg-white h-100 border-0  p-0 m-0">
                                <div className="card-body p-0 m-0">
                                  <div className="stat d-flex align-items-center justify-content-center h-100">
                                    <h1 className="display-5 fw-bold position-relative">
                                    {doughnutData?.datasets[0]?.data?.length && (
                                      <Chart
                                        options={doughnutOptions}
                                        data={doughnutData}
                                        plugins={[ChartDataLabels]}
                                      />
                                    )}
                                    </h1>
                                  </div>
                                </div>
                                <div className="card-footer bg-white border-0 text-center">
                                  <h1 className="h6">Donations</h1>
                                </div>
                              </div>
                            </div>


                          </div>
                        </div>
                      </div>

         

          <div className="col-12 shadow rounded-4 p-3 py-5 box-d">
            <div className="row p-0 m-0 w-100">
              <div className="col-6">
                <h2 className="h3">Upcomming Drives : </h2>
                <form
                  action="#"
                  className="d-flex justify-content-center align-items-center flex-column gap-3 p-3"
                  onSubmit={(e) => {
                    handleSubmitDrive(e);
                  }}
                >
                  <input
                    type="text"
                    name="name"
                    value={drives.name}
                    onChange={(e) => {
                      handleChangeDrive(e);
                    }}
                    placeholder="Enter Drive Name"
                    className="w-75"
                  />
                  <input
                    type="text"
                    name="teamLeader"
                    value={drives.teamLeader}
                    onChange={(e) => {
                      handleChangeDrive(e);
                    }}
                    placeholder="Enter name of team leader"
                    className="w-75"
                  />
                  <input
                    type="text"
                    name="extraInformation"
                    value={drives.extraInformation}
                    onChange={(e) => {
                      handleChangeDrive(e);
                    }}
                    placeholder="Enter Extra information here (if any)"
                    className="w-75"
                  />
                  <div className="d-flex justify-content-between w-75 ">
                    <input
                      type="datetime-local"
                      name="dateFrom"
                      value={drives.dateFrom}
                      onChange={(e) => {
                        handleChangeDrive(e);
                      }}
                      placeholder="Enter Date From"
                      className="w-50 "
                    />
                    <input
                      type="datetime-local"
                      name="dateTo"
                      value={drives.dateTo}
                      onChange={(e) => {
                        handleChangeDrive(e);
                      }}
                      placeholder="Enter Date To"
                      className="w-50 ms-2"
                    />
                  </div>
                  <div className="d-flex justify-content-evenly align-items-center w-100">
                    <button
                      className="clear"
                      type="button"
                      onClick={() => {
                        handleClearDrive();
                      }}
                    >
                      Clear
                    </button>
                    <button className="bgdark" type="submit">
                      Submit
                    </button>
                  </div>
                </form>
              </div>
              <div className="col-6 border-left">
                <div className="my-3 p-3 nextDrives d-flex justify-content-center align-items-center flex-column">
                  <h2 className="h4 text-start w-100 heading">Next Drive</h2>

                  <NextDrives drive={nextDrive} />
                </div>
              </div>
            </div>
          </div>

          <div className="col-6 p-1">
            <div className="border-2 border rounded-4 p-3">
              <div className="d-flex justify-content-between align-items-center mb-5">
                <h2 className="h3">Events</h2>
              </div>
              <div className="d-flex justify-content-evenly align-items-center">
                <ViewAllAndPreviousEvents />
              </div>
            </div>
          </div>
          <div className="col-6  p-1">
            <div className="border-2 border rounded-4 p-3">
              <div className="d-flex justify-content-between align-items-center mb-5">
                <h2 className="h3">Monthly Requirements </h2>
              </div>
              <div className="d-flex justify-content-evenly align-items-center">
                <ViewAllRequirements />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default NGOAdmin;
export async function getServerSideProps(context) {
  const { req } = context;
  const { origin } = absoluteUrl(req);

  const baseApiUrl = `${origin}/api`;

  const { token } = getAppCookies(req);

  const profile = token ? verifyToken(token.split(" ")[1]) : "";
  console.log(profile);
  //chart
  const labels = [];
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
  const chartData = {
    labels,
    datasets: [
      {
        label: `Total Site Visits for ${m[new Date().getMonth()]} Month`,
        data: [],
        borderColor: "rgb(255, 99, 132)",
        backgroundColor: "rgba(255, 99, 132, 0.5)",
        fill: true,
        tension: 0.4,
      },
    ],
  };
  //chart

  const result = await NgoApi.getAllSiteVisits();
  const monthVisits = result?.data?.filter((da, i) => {
    return da.month === new Date().getMonth() + 1;
  });
  monthVisits.sort((a, b) => {
    return a.week - b.week;
  });
  monthVisits?.map((ma, i) => {
    labels.push(`Week ${ma.week + 1}`);
    chartData.datasets[0].data.push(ma.count);
  });

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
      chartData: chartData,
      // donationsData: {donations},
    },
  };
}
