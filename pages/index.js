import Carousel from "../components/home/Carousel";
import DriveFeed from "../components/home/DriveFeed";
import ProcessCard from "../components/home/processCard";
import RightText from "../components/home/RightText";
import LeftText from "../components/home/LeftText";

import understand from "./../public/assets/images/icons/understand.png";
import communicate from "./../public/assets/images/icons/communicating.png";
import deliver from "./../public/assets/images/icons/deliver.png";

import NoMoney from "./../public/assets/images/noMoney.png";
import LogoRect from "./../public/assets/images/squareLogo.png";

import college from "./../public/assets/images/about/collegeRound.png";
import department from "./../public/assets/images/about/departmentRound.png";
import team from "./../public/assets/images/about/teamMember.png";
import NgoApi from "../utils/API";
import ActiveLink from "../components/ActiveLink";
const Home = () => {
  return (
    <>
      <div className="container">
        <div className="row pt-3">
          <div className="col-8 mt-6">
            <Carousel />
          </div>
          <div className="col-4">
            <div className="d-flex justify-content-center align-items-center flex-column">
              <ActiveLink href="/requirement" activeClassName="">
                <a className="bg-blueish-dark btn rounded-3">Donate</a>
              </ActiveLink>
              <DriveFeed />
            </div>
          </div>
        </div>
        <div className="row">
          <ProcessCard
            image={understand}
            heading="UNDERSTAND"
            description="The most important step which we usually skip is to understand the concept and moto of the institution and there needs. It usually happens that we give what we want to and not according to requirement."
          />
          <ProcessCard
            image={communicate}
            heading="COMMUNICATE"
            description="After understanding next essential part whicharises is communication. The establishment of communication through a proper channel is important."
          />
          <ProcessCard
            image={deliver}
            heading="DELIVER"
            description="Last but not the least you reaching out to the NGO and delivering your skills,thoughts and help. NO FRAUD!! DIRECT CONTACT!!"
          />
        </div>

        <>
          <RightText
            image={LogoRect}
            alt="No Money"
            heading="Donation Needs No Money!!!"
            description="Fortunate Folks will prove it that money does’nt buy happiness and donation don’t need money but willingness to contribute a peice of self to the society.
            We believe that everyone is blessed with one nor the other skills. Then why not SHARE these skills with the underprivilegded one?"
          />
          <LeftText
            image={NoMoney}
            alt="Unity Is strength"
            heading="Unity Is strength"
            description="The Core of our values are built in the childhood itself. Our interests always was inclined towards stories. The story which made a high impact was UNITED WE STAND DIVIDED WE FALL. Fortunate folks is all about bringing the best in the society together and be the change we want to see. "
          />
        </>

        <div className="row">
          <ProcessCard
            image={college}
            heading="Gharda Institute of technology"
            description=""
          />
          <ProcessCard
            image={department}
            heading="Computer Engineering Department"
            description=""
          />
          <ProcessCard image={team} heading="Team Member" description="" />
        </div>

        <div className="text-center">
          <h1 className="h5">Contact Us</h1>
          <p className="fs-6">
            (302) 739-4452
            <br />
            361 Rt 4
            <br />
            Adrian, Missouri(MO), 64720
          </p>
        </div>
      </div>
    </>
  );
};
export default Home;
export async function getServerSideProps(context) {
  const { req } = context;
  const ip = req?.headers["x-forwarded-for"] || req?.connection?.remoteAddress;
  const result = await NgoApi.createSiteVisit({ ip });

  return {
    props: {},
  };
}
