import { useEffect, useState } from "react";
import CreateEvent from "./CreateEvent";
import NgoApi from "../../../utils/API";
const ViewAllAndPreviousEvents = () => {
  const [events, setEvents] = useState([]);
  const getAllAndPreviousEvents = async () => {
    const result = await NgoApi.getAllAndPreviousEvents();

    if (result.success) {
      setEvents(result);
    }
  };
  useEffect(() => {
    getAllAndPreviousEvents();
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
      <div>
        {/* Button trigger modal */}
        <button
          type="button"
          className="btnPurple"
          data-bs-toggle="modal"
          data-bs-target="#staticBackdrop"
          onClick={() => {
            getAllAndPreviousEvents();
          }}
        >
          View All
        </button>
        {/* Modal */}
        <div
          className="modal fade"
          id="staticBackdrop"
          data-bs-backdrop="static"
          data-bs-keyboard="false"
          tabIndex={-1}
          aria-labelledby="staticBackdropLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable modal-lg">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="staticBackdropLabel">
                  All Events  (Total {events?.allEvents?.length})
                </h5>
                
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                />
              </div>
              <div className="modal-body">
                {events?.allEvents?.map((eve, i) => {
                  return (
                    <div className="card mb-2" key={i}>
                      <div className="card-header">{eve?.name}</div>
                      <div className="card-body">
                        <h5 className="card-title">Venue:- {eve?.venue}</h5>
                        <div className="d-flex flex-column">
                          <span>Event Date</span>
                          <span className="card-text">
                            From:- {new Date(eve?.date_from).toLocaleString()}
                          </span>
                          <span className="card-text">
                            To:- {new Date(eve?.date_to).toLocaleString()}
                          </span>
                        </div>
                      </div>
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
      <CreateEvent />
      <div>
        {/* Button trigger modal */}
        <button
          type="button"
          data-bs-toggle="modal"
          data-bs-target="#staticBackdrop2"
          className="btnPurple"
        >
          Previous
        </button>

        {/* Modal */}
        <div
          className="modal fade"
          id="staticBackdrop2"
          data-bs-backdrop="static"
          data-bs-keyboard="false"
          tabIndex={-1}
          aria-labelledby="staticBackdrop2Label"
          aria-hidden="true"
        >
          <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable modal-lg">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="staticBackdrop2Label">
                  Previous Event
                </h5>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                />
              </div>
              <div className="modal-body">
                <div className="card mb-2">
                  <div className="card-header">
                    {events?.previousEvent?.name}
                  </div>
                  <div className="card-body">
                    <h5 className="card-title">
                      Venue:- {events?.previousEvent?.venue}
                    </h5>
                    <div className="d-flex flex-column">
                      <span>Event Date</span>
                      <span className="card-text">
                        From:-{" "}
                        {new Date(
                          events?.previousEvent?.date_from
                        ).toLocaleString()}
                      </span>
                      <span className="card-text">
                        To:-{" "}
                        {new Date(
                          events?.previousEvent?.date_to
                        ).toLocaleString()}
                      </span>
                    </div>
                  </div>
                </div>
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

export default ViewAllAndPreviousEvents;
