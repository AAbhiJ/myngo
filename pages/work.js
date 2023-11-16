import React, { useEffect, useState } from "react";
import Gallery from "./../components/Gallery";
import NgoApi from "../utils/API";
import Image from "next/image";

function Work() {
  const [gallery, setGallery] = useState([]);

  const getAllGallery = async () => {
    const response = await NgoApi.getAllGallery();
    console.log(response.data.length);
    setGallery(response.data);

  };

  useEffect(() => {
    getAllGallery();
  }, []);

  return (
    <>
      <style jsx>{`
        .work ul .active {
          position: relative;
        }
        .work ul .active::before {
          content: "";
          position: absolute;
          bottom: 0px;
          border-bottom: 4px solid var(--blueish-dark);
          width: 50%;
          border-radius: 2px;
        }
        #myTab .nav-link{
          color:var(--blueish-dark)
        }
      `}</style>
      <div className="container py-5 work">
        <div className="d-flex justify-content-evenly align-items-center">
          {
            gallery?.length>0?
            <div className="w-100">
            <ul className="nav" id="myTab" role="tablist">
              {gallery?.map((ngo, i) => {
                return (
                  <li className="nav-item" role="presentation" key={i}>
                    <button
                      className={`nav-link ${i===0?"active":""}`}
                      id={`${ngo?.ngoId}-tab`}
                      data-bs-toggle="tab"
                      data-bs-target={`#ngo-${ngo?.ngoId}`}
                      type="button"
                      role="tab"
                      aria-controls={`${ngo?.ngoId}`}
                      aria-selected="true"
                    >
                      {ngo?.ngoDetails?.name}
                    </button>
                  </li>
                );
              })}
            </ul>
            <hr />
            <div className="tab-content mt-3" id="myTabContent">
              {gallery?.map((ngo, i) => {
                console.log(i,ngo);
                return (
                  <div
                    className={`tab-pane fade ${i===0?"active show":""}`}
                    id={`ngo-${ngo?.ngoId}`}
                    role="tabpanel"
                    aria-labelledby={`${ngo?.ngoId}-tab`}
                    key={i}
                  >
                    <div className="row m-0 p-0 w-100">
                    {
                      ngo?.photos?.map((photo, i) => {
                        console.log(photo);
                        return (
                          <div
                            className="col-4 d-flex justify-content-center align-items-center p-1"
                            key={i}
                          >
                            <Image
                              src={`/static/uploads/${photo?.image}`}
                              alt={photo?._id}
                              width={600}
                              height={400}
                              className="imgFit"
                            />
                          </div>
                        );
                      })
                    }
                    </div>
                  </div>
                );
              })}
            </div>
          </div>:<h1>No Photos</h1>
          }
        </div>

      </div>
    </>
  );
}

export default Work;
