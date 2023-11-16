import React, { useEffect, useState } from "react";
import NgoApi from "../utils/API";
const Requirement = () => {
  const [requirements, setRequirements] = useState([{}]);
  const fetchRequirements = async (e) => {
    e?.preventDefault();

    const result = await NgoApi.getAllRequirements();
    console.log(result.data);
    setRequirements(result.data);
  };
  useEffect(() => {
    fetchRequirements();
  }, []);
  return (
    <>
      <div className="container my-5 requirement">
        <h1 className="text-center mb-3">NGO Requirements</h1>
        <div className="p-4 border border-4 border-redish-dark radius-23px">
          {requirements?.map((ngo, j) => {
            if(ngo?.name?.length)
            return  <div className="req_1" key={j}>
              <div className="d-flex justify-content-between align-items-center">
                <h1 className="h6">{ngo?.ngoDetails?.name}</h1>
                <a
                  href={`tel:+91 ${ngo?.ngoDetails?.contact}`}
                >{`+91 ${ngo?.ngoDetails?.contact}`}</a>
              </div>
              <div className="row">
                {ngo?.name?.map((requ, i) => {
                  return (
                    <>
                      <div className="col-6" key={i}>
                        <p className="circleBullet">{requ?.requirement}</p>
                      </div>
                    </>
                  );
                })}
              </div>
              <hr />
            </div>;
          })}
        </div>
      </div>
    </>
  );
};

export default Requirement;
