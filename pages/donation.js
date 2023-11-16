import Image from "next/image";
import React from "react";
import StepCard from "../components/skillDonation/StepCard";
import SkillDonation from "./../public/assets/images/skillDonation.png";
import Gallary from "../components/Gallery";

import list from "./../public/assets/images/icons/list.png";
import details from "./../public/assets/images/icons/details.png";
import analyze from "./../public/assets/images/icons/analyze.png";
import contact from "./../public/assets/images/icons/contact.png";

import gallery_1 from "./../public/assets/images/gallery/gallery_1.png";
import gallery_2 from "./../public/assets/images/gallery/gallery_2.png";
import gallery_3 from "./../public/assets/images/gallery/gallery_3.png";
import gallery_4 from "./../public/assets/images/gallery/gallery_4.png";

function Donation() {
  return (
    <>
      <div className="container">
        <div className="row pt-3">
          <div className="col-12 mt-3">
            <div className="d-flex justify-content-center align-items-center flex-column p-5 gap-4">
              <h2 className="h1 fw-bold">What is Skill Donation</h2>
              <div className="px-5">
                <Image src={SkillDonation} alt="Skill Donation" />
              </div>
              <p className="text-center w-75">
                SKILL DONATION is all about proving that donation doesn’t
                require money it only and only requires willingness and pure
                intentions. The user range of this column has largely extended
                from youngsters to forever youngsters. We hope you all will
                enjoy sharing your skills and knowlege with the under
                priveledged one and enjoy sheer happiness.
              </p>
            </div>
          </div>
        </div>

        <div className="row pt-3">
          <div className="col-12 mt-3 mb-5">
            <h2 className="h1 fw-bold text-center ">
              Please go through the procedure
            </h2>
          </div>
          <StepCard
            i="1"
            icon={list}
            heading="Check the list of NGO "
            link="#"
            description="Want to know the complete list of NGOs affialted with fortunate folks here is the list for you. Please click on CHECK NOW button to get the list."
          />
          <StepCard
            i="2"
            icon={details}
            heading="Check NGO Details "
            link="#"
            description="To know more about the particular NGO here are the details provided of each and every NGO.Please click on CHECK NOW button to get the more details about NGO."
          />
          <StepCard
            i="3"
            icon={analyze}
            heading="Analyze"
            link=""
            description="After getting the list and knowing more about the NGOs here comes your job to analyze your skills and connect it with the respective NGO."
          />
          <StepCard
            i="4"
            icon={contact}
            heading="Contact NGO"
            link="#"
            description="Once you decide what skills you can share with what NGO the part comes which is contacting to its office. We are making it easy for you just click on CHECK NOW button and get the contacts of ur desired NGO."
          />
        </div>
      </div>
    </>
  );
}

export default Donation;
