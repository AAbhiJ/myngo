import Image from "next/image";
import React, { useState } from "react";
import NgoApi from "../../utils/API";
function StepCard({ i, icon, heading, link, description }) {
  const [ngos, setNgos] = useState([{}]);
  const fetchNgos = async (e) => {
    e.preventDefault();

    const result = await NgoApi.getAllNgos();
    console.log(result)
    setNgos(result.data);
  };
  return (
    <>
      <style jsx>
        {`
          a.dark {
            color: var(--blueish-dark);
            border-color: var(--blueish-dark);
            font-size: 1.2rem;
          }
          .textXl.Number {
            font-size: 15rem;
            color: #12354450;
            line-height: 0;
          }
        `}
      </style>
      <div className="col-12">
        <div className="row w-100">
          <div className="col-3 d-flex justify-content-center align-items-center">
            <div className="textXl Number">0{i}</div>
          </div>
          <div className="col-9">
            <div className="d-flex justify-content-center align-items-center flex-column gap-3 px-5">
              <div className="d-flex justify-content-between align-items-center w-100">
                <div className="d-flex  justify-content-between align-items-center">
                  <div className="px-5">
                    <Image src={icon} alt={heading} className="imgW" />
                  </div>

                  <h3 className="h4 ms-4">{heading}</h3>
                </div>
                {link && (
                  <>
                    <a
                      href={link}
                      className="border-bottom dark"
                      type="button"
                      data-bs-toggle="modal"
                      data-bs-target="#exampleModal"
                      onClick={(e) => {
                        fetchNgos(e);
                      }}
                    >
                      Check Now
                    </a>
                    <div
                      className="modal fade"
                      id="exampleModal"
                      data-bs-backdrop="static"
                      data-bs-keyboard="false"
                      tabIndex={-1}
                      aria-labelledby="exampleModalLabel"
                      aria-hidden="true"
                    >
                      <div className="modal-dialog modal-lg modal-dialog-centered modal-dialog-scrollable">
                        <div className="modal-content">
                          <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">
                              NGO List
                            </h5>
                            <button
                              type="button"
                              className="btn-close"
                              data-bs-dismiss="modal"
                              aria-label="Close"
                            />
                          </div>
                          <div className="modal-body">
                            {ngos?.map((ngo, i) => {
                              return (
                                <div className="req_1" key={i}>
                                  <div className="d-flex justify-content-between align-items-center">
                                    <h1 className="h6">{ngo?.name}</h1>
                                    <a href={`tel:+91 ${ngo?.contact}`}>{`+91 ${ngo?.contact}`}</a>
                                  </div>
                                    <p>{ngo?.about}</p>
                                  <hr />
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      </div>
                    </div>
                  </>
                )}
              </div>
              <div className="d-flex justify-content-center align-items-center">
                <p>{description}</p>
              </div>
            </div>
          </div>
        </div>
        <hr />
      </div>
    </>
  );
}

export default StepCard;
