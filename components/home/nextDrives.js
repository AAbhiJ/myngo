import Image from "next/image";
import React from "react";

const NextDrives = ({drive}) => {
  return (
    <>
      <div
        id="carouselExampleIndicators"
        className="carousel carousel-dark slide"
        data-bs-ride="carousel"
      >
        <div className="carousel-inner">
          <div className="carousel-item active">
            <div className="p-3 col-12 d-flex justify-content-center align-items-center flex-column driveDetails">
              <h2 className="h4 text-start w-100 heading">{drive?.name}</h2>
              <p className="text-muted">
               {drive?.extra_information}
              </p>
            </div>
          </div>
         
        </div>
      </div>
    </>
  );
};

export default NextDrives;
