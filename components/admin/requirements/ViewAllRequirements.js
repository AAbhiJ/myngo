import { useEffect, useState } from "react";
import CreateEvent from "./CreateRequirement";
import NgoApi from "../../../utils/API";
const ViewAllRequirements = () => {
  const [requirement, setRequirement] = useState([]);
  const getAllRequirementsA = async () => {
    const result = await NgoApi.getAllRequirementsA();
console.log(result)
    if (result.success) {
      setRequirement(result);
    }
  };
  useEffect(() => {
    getAllRequirementsA();
  }, []);

  return (
    <>
      <style jsx>{`
        button.btnPurple {
          padding: 0.8rem 1.2rem;
          background: var(--purple);
          color: white;
        }
      `}</style>
      <CreateEvent />
      <div>
        {/* Button trigger modal */}
        <button
          type="button"
          className="btnPurple"
          data-bs-toggle="modal"
          data-bs-target="#staticBackdropreq1"
          onClick={() => {
            getAllRequirementsA();
          }}
        >
          View All
        </button>
        {/* Modal */}
        <div
          className="modal fade"
          id="staticBackdropreq1"
          data-bs-backdrop="static"
          data-bs-keyboard="false"
          tabIndex={-1}
          aria-labelledby="staticBackdropreq1Label"
          aria-hidden="true"
        >
          <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable modal-lg">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="staticBackdropreq1Label">
                  All Requirements
                  (Total {Array.isArray(requirement?.allRequirements)&&requirement?.allRequirements[0]?.name?.length})
                </h5>

                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                />
              </div>
              <div className="modal-body">
                {Array.isArray(requirement?.allRequirements)&&requirement?.allRequirements[0]?.name?.map((eve, i) => {
                  return (
                    <div className="card mb-2" key={i}>
                      <div className="card-header">{eve?.requirement}</div>
                    </div>
                  );
                })}
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
      </div>
    </>
  );
};

export default ViewAllRequirements;
