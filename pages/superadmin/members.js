import React,{ useEffect, useState } from "react";
import { absoluteUrl, getAppCookies, verifyToken } from '../../middleware/utils';
import NgoApi from "../../utils/API";
import DataTable from "react-data-table-component";
const columns = [
  {
    name: "Name",
    selector: (row) => row?.name,
    sortable: true,
  },
  {
    name: "Contact",
    selector: (row) => row?.contact,
    sortable: true,
  },
  {
    name: "Email",
    selector: (row) => row?.email,
    sortable: true,
  },
  {
    name: "Associated NGO",
    selector: (row) => row?.ngo?.name,
    sortable: true,
  },
];
const Members = ({profile}) => {

  const [members, setMembers] = useState([{}]);
  const getAllMembers = async () => {
    const res = await NgoApi.getAllMembersSA();
    setMembers(res.members);    
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
            <div className="container my-4">
              <DataTable columns={columns} data={members} />
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
