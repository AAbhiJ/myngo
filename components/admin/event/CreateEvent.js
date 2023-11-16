import NgoApi from "../../../utils/API";
import Swal from "sweetalert2";
import { useRef, useState } from "react";
const CreateEvent = () => {
  const btnRef = useRef()
  const [eventsData, setEventsData] = useState({
    name: "",
    venue: "",
    dateFrom: "",
    dateTo: "",
  });
  const handleSubmitEvents = async (e) => {
    e.preventDefault();

    const result = await NgoApi.createEvent(eventsData);

    if (result.success) {
      Swal.fire({
        title: "Successfull",
        text: "Event Created Successfully",
        icon: "success",
      });
      
      handleClearEvents();
      btnRef.current.click()
    }
  };
  const handleClearEvents = () => {
    setEventsData({
      name: "",

      venue: "",
      dateFrom: "",
      dateTo: "",
    });
  };
  const handleChangeEvents = (e) => {
    setEventsData({ ...eventsData, [e.target.name]: e.target.value });
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
          data-bs-target="#staticBackdrop3"
        >
          + New
        </button>
        {/* Modal */}
        <div
          className="modal fade"
          id="staticBackdrop3"
          data-bs-backdrop="static"
          data-bs-keyboard="false"
          tabIndex={-1}
          aria-labelledby="staticBackdrop3Label"
          aria-hidden="true"
        >
          <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable modal-lg">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="staticBackdrop3Label">
                  Add New Event
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
                    handleSubmitEvents(e);
                  }}
                >
                  <input
                    type="text"
                    name="name"
                    value={eventsData.name}
                    onChange={(e) => {
                      handleChangeEvents(e);
                    }}
                    placeholder="Enter Event Name"
                    className="w-75"
                  />
                  <input
                    type="text"
                    name="venue"
                    value={eventsData.venue}
                    onChange={(e) => {
                      handleChangeEvents(e);
                    }}
                    placeholder="Enter Venue"
                    className="w-75"
                  />

                  <div className="d-flex justify-content-between w-75 ">
                    <input
                      type="datetime-local"
                      name="dateFrom"
                      value={eventsData.dateFrom}
                      onChange={(e) => {
                        handleChangeEvents(e);
                      }}
                      placeholder="Enter Date From"
                      className="w-50 "
                    />
                    <input
                      type="datetime-local"
                      name="dateTo"
                      value={eventsData.dateTo}
                      onChange={(e) => {
                        handleChangeEvents(e);
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
                        handleClearEvents();
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

export default CreateEvent;
