import NgoApi from "../../../utils/API";
import Swal from "sweetalert2";
import { useRef, useState } from "react";
const CreateRequirements = () => {
  const btnRef = useRef();
  const [reqData, setReqData] = useState({
    name: "",
  });
  const handleSubmitReq = async (e) => {
    e.preventDefault();

    const result = await NgoApi.createRequirement(reqData);

    if (result.success) {
      Swal.fire({
        title: "Successfull",
        text: "Requirement Created Successfully",
        icon: "success",
      });

      handleClearReq();
      btnRef.current.click();
    }
  };
  const handleClearReq = () => {
    setReqData({
      name: "",
    });
  };
  const handleChangeReq = (e) => {
    setReqData({ ...reqData, [e.target.name]: e.target.value });
  };
  return (
    <>
      <style jsx>{`
        form input {
          border: none;
          outline: none;
          border-bottom: 1px solid black;
          padding-bottom: 4px;
        }

        button.btnPurple {
          padding: 0.8rem 1.2rem;
          background: var(--purple);
          color: white;
        }
      `}</style>
      <div>
        {/* Button trigger modal */}
        <button
          type="button"
          className="btnPurple"
          data-bs-toggle="modal"
          data-bs-target="#staticBackdropreq"
        >
          + New
        </button>
        {/* Modal */}
        <div
          className="modal fade"
          id="staticBackdropreq"
          data-bs-backdrop="static"
          data-bs-keyboard="false"
          tabIndex={-1}
          aria-labelledby="staticBackdropreqLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable modal-lg">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="staticBackdropreqLabel">
                  Add New Requirement
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
                  className="d-flex justify-content-center align-items-center flex-column gap-3 "
                  onSubmit={(e) => {
                    handleSubmitReq(e);
                  }}
                >
                  <input
                    type="text"
                    name="name"
                    value={reqData.name}
                    onChange={(e) => {
                      handleChangeReq(e);
                    }}
                    placeholder="Enter Requirement"
                    className="w-75"
                  />
                  <div className="d-flex justify-content-evenly align-items-center w-100">
                    <button
                      className="clear"
                      type="button"
                      onClick={() => {
                        handleClearReq();
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
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  data-bs-dismiss="modal"
                  ref={btnRef}
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

export default CreateRequirements;
