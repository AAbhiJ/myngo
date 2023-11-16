import React from "react";
import RightText from "../components/home/RightText";
import LeftText from "../components/home/LeftText";

import team from "./../public/assets/images/about/team_rect.png";
import college from "./../public/assets/images/about/college_rect.png";
import department from "./../public/assets/images/about/department_rect.png";
import guide from "./../public/assets/images/about/guide.png";
function about() {
  return (
    <>
      <style jsx>{`
        .aboutheading {
          background-image: url("assets/images/aboutBG.png");
          background-size:contain;
          background-repeat:no-repeat;
          background-position:center;
          width:100%;
          min-height:30rem;
          row-gap:2.5rem;
        }
      `}</style>
      <div className="container mt-5 py-5">
        <div className="aboutheading d-flex align-items-center justify-content-end flex-column text-center">
          <h1 className="h2">Goal of Future Folks</h1>
          <p>
            Usually goals are categorised into shortterm, longterm etc. But when
            you wrk on your dream project every goal becomes as important as
            your life. This site came from the thought of helping people on
            large scale and with innovative ideas. And we converted this thought
            into our goal. The one and only goal we are carrying right now is to
            reach to people with the help of this platform and help them get a
            different prespective regarding donation.
          </p>
        </div>
        <div className="pt-3">
          <h2 className="h2"> About Teamwork :</h2>
          <RightText
            image={team}
            alt="Team"
            heading=""
            description="A captain is as good as his team. In marathi there is a saying that”व्यक्ती तितक्या प्रकृती”. Despite of having this it diffiult to get a team who strives really hard to see the mutual dream and own it. We saw a dream and extremely happy to announce that we are accomplishing it."
          />
        </div>
        <div className="py-3">
          <h2 className="h2"> Our Strengths :</h2>
          <RightText
            image={college}
            alt="Gharda Institute Of Technology"
            heading="Gharda Institute Of Technology"
            description="Gharda institute of technology has always had our back. And supported us like a strong pillar. It takes a huge heart to be the backend team so that there students can do there dream project."
          />
          <LeftText
            image={department}
            alt="Computer Enginnering Department"
            heading="Computer Enginnering Department"
            description="Seeing a dream is not enough. Every dream need a mentor, a guide and computer department has always the role. from helping us get a clear picture till helping us plan everything comp dept has played a very vital role."
          />
          {/* <RightText
            image={guide}
            alt="Project Guide"
            heading="Project Guide"
            description="We are fortunate in all angles of life. Firstly opportunity to do this project and the next an dmost important part to get a guide like Prof.Sameer Tathre sir. Very supportive and understanding in walks and stages of project. We are learning numerous things from him and willl continue to do so."
            imgSize={100}
          /> */}
        </div>
      </div>
    </>
  );
}

export default about;
