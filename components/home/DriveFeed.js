import { useEffect, useState } from "react";
import NgoApi from "../../utils/API";

const DriveFeed = () => {
  const [drives, setDrives] = useState([{}]);
  const fetchDrives = async (e) => {
    e?.preventDefault();

    const result = await NgoApi.getAllDrives();
    setDrives(result.data);
  };
  useEffect(() => {
    fetchDrives();
  }, []);
  return (
    <>
      <style jsx>{`
        .marquee {
          margin: 0;
          padding: 0 1em;
          line-height: 1.5em;
          top: 6em;
          position: relative;
          box-sizing: border-box;
          animation: marquee 15s linear infinite;
        }
        .marquee:hover {
          animation-play-state: paused;
        }
        @keyframes marquee {
          0% {
            top: 8em;
          }
          100% {
            top: -11em;
          }
        }
        .driveFeed {
          border: 2px solid var(--blueish-dark);
          height: clamp(30rem, 30rem, 30rem);
          overflow-y: hidden;
          border-radius: 8px;
        }
      `}</style>
      <div className="driveFeed my-5 mx-2 w-100">
        <div className="marquee">
          {drives?.map((dri, i) => {
            return (
              <div key={i}>
                <h3 className="h6">{dri?.name}</h3>
                <p>
                 {dri?.extra_information}
                </p>
                <p>
                  {console.log(dri?.ngo?.name)}
                 Conducted By:- {dri?.ngo?.name}
                </p>
                <hr />
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default DriveFeed;
